import React, { useEffect, useState } from "react";
import WatchIcon from '@mui/icons-material/Watch';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from "axios";
import BookOnlineIcon from '@mui/icons-material/BookOnline';

import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader, 
  Chip, 
  CircularProgress, 
  Alert, 
  Box,
  Button
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled Card for better visuals
const StyledCard = styled(Card)(({
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  transition: "0.3s",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const statusColors = {
  Pending: "warning",
  Confirmed: "success",
  Cancelled: "error",
  Completed: "primary",
};

const ViewBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [watchBookings, setWatchBooking] = useState([]);
  const [SpareBookings, setSpareBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/confirmed-bookings");
        setBookings(response.data);
      } catch (err) {
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();

    const fetchWatchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/WatchConfirmed-bookings");
        setWatchBooking(response.data);
      } catch (err) {
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchWatchBookings();

    const fetchSpareBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/ShopConfirmed-bookings");
        setSpareBooking(response.data);
      } catch (err) {
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchSpareBookings();
  }, []);

  const handleAcceptBooking = async (bookingId) => {
    const agentId = sessionStorage.getItem("Aid");

    try {
      const response = await axios.put(`http://localhost:5000/update-booking/${bookingId}`, { AgentId: agentId });

      const updatedBooking = response.data;

      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking._id === updatedBooking._id ? updatedBooking : booking
        )
      );

      alert("Booking status updated to Completed!");
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("Failed to update the booking");
    }
  };

  const handleAcceptedBooking = async (watchBookingId) => {
    const agentId = sessionStorage.getItem("Aid");

    try {
      const response = await axios.put(`http://localhost:5000/update-WatchBooking/${watchBookingId}`, { AgentId: agentId });

      const updatedWatchBooking = response.data;

      setWatchBooking(prevBookings =>
        prevBookings.map(WatchBooking =>
          WatchBooking._id === updatedWatchBooking._id ? updatedWatchBooking : WatchBooking
        )
      );

      alert("Booking status updated to Completed!");
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("Failed to update the booking");
    }
  };

  const handleAcceptedSpareBooking = async (SpareBookingId) => {
    const agentId = sessionStorage.getItem("Aid");

    try {
      const response = await axios.put(`http://localhost:5000/update-SpareBooking/${SpareBookingId}`, { AgentId: agentId });

      const updatedSpareBooking = response.data;

      setSpareBooking(prevBookings =>
        prevBookings.map(SpareBooking =>
          SpareBooking._id === updatedSpareBooking._id ? updatedSpareBooking : SpareBooking
        )
      );

      alert("Booking status updated to Completed!");
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("Failed to update the booking");
    }
  };

  if (loading) return <Container sx={{ textAlign: "center", mt: 5 }}><CircularProgress /></Container>;
  if (error) return <Container sx={{ mt: 5 }}><Alert severity="error">{error}</Alert></Container>;

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center", fontFamily: 'fantasy' }}>
        BOOKINGS <BookOnlineIcon />
      </Typography>

      <Grid container spacing={3} justifyContent="center" direction="row" wrap="wrap">

        {/* Confirmed Bookings Section */}
        <Grid item xs={12} sm={4}>
          {bookings.length === 0 ? (
            <Alert severity="info">No confirmed bookings found.</Alert>
          ) : (
            <StyledCard>
              
              <CardContent>
                {bookings.map((booking) => (
                  <Box key={booking._id} sx={{ mb: 2 }}>
                    <CardHeader
                      title={booking.ProductId?.name}
                      subheader={`Quantity: ${booking.quantity}`}
                    />
                    <Typography variant="body1" sx={{ fontFamily: 'fantasy' }}>
                      <img src={booking.ProductId?.profileImage} alt="Product" style={{ maxWidth: '100%' }} />
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'fantasy' }}>
                      User: {booking.UserId?.name}
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'fantasy' }}>
                      Email: {booking.UserId?.email}
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'fantasy' }}>
                      Contact: {booking.UserId?.contact}
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'fantasy' }} color="textSecondary">
                      Total Price: {booking.totalPrice}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                      <Chip label={booking.status} color={statusColors[booking.status] || "default"} />
                      <Button 
                        variant="contained"
                        sx={{ fontFamily: 'fantasy' }}
                        onClick={() => handleAcceptBooking(booking._id)}
                      >
                        ACCEPT <CheckCircleOutlineIcon />
                      </Button>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </StyledCard>
          )}
        </Grid>

       
        <Grid item xs={12} sm={4}>
          {watchBookings.length === 0 ? (
            <Alert severity="info">No confirmed watch bookings found.</Alert>
          ) : (
            <>
             
              <StyledCard>
                <CardContent>
                  {watchBookings.map((watchBooking) => (
                    <Box key={watchBooking._id} sx={{}}>
                      <CardHeader
                        title={watchBooking.ProductId?.name}
                        subheader={`Quantity: ${watchBooking.quantity}`}
                      />
                      <Typography variant="body1" sx={{ fontFamily: 'fantasy' }}>
                        <img src={watchBooking.watchId?.profileImage} alt="Product" style={{ maxWidth: '100%' }} />
                      </Typography>
                      <Typography variant="body1" sx={{ fontFamily: 'fantasy' }}>
                        User: {watchBooking.UserId?.name}
                      </Typography>
                      <Typography variant="body1" sx={{ fontFamily: 'fantasy' }}>
                        Email: {watchBooking.UserId?.email}
                      </Typography>
                      <Typography variant="body1" sx={{ fontFamily: 'fantasy' }}>
                        Contact: {watchBooking.UserId?.contact}
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'fantasy' }} color="textSecondary">
                        Total Price: {watchBooking.totalPrice}
                      </Typography>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                        <Chip label={watchBooking.status} color={statusColors[watchBooking.status] || "default"} />
                        <Button 
                          variant="contained"
                          sx={{ fontFamily: 'fantasy' }}
                          onClick={() => handleAcceptedBooking(watchBooking._id)}
                        >
                          ACCEPT <CheckCircleOutlineIcon />
                        </Button>
                      </Box>
                    </Box>
                  ))}
                </CardContent>
              </StyledCard>
            </>
          )}
        </Grid>


        <Grid item xs={12} sm={4}>
          {SpareBookings.length === 0 ? (
            <Alert severity="info">No confirmed spare part bookings found.</Alert>
          ) : (
            <StyledCard>
              <CardContent>
                {SpareBookings.map((spareBooking) => (
                  <Box key={spareBooking._id} sx={{ mb: 2 }}>
                    <CardHeader
                     
                      subheader={`Quantity: ${spareBooking.quantity}`}
                    />
                    <Typography variant="body1" sx={{ fontFamily: 'fantasy' }}>
                      <img src={spareBooking.SpareId?.profileImage} alt="Product" style={{ maxWidth: '100%' }} />
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'fantasy' }}>
                      <strong>User:</strong> {spareBooking.UserId?.name}
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'fantasy' }}>
                      <strong>Email:</strong> {spareBooking.UserId?.email}
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'fantasy' }}>
                      <strong>Contact:</strong> {spareBooking.UserId?.contact}
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'fantasy' }} color="textSecondary">
                      Total Price: {spareBooking.totalPrice}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                      <Chip label={spareBooking.status} color={statusColors[spareBooking.status] || "default"} />
                      <Button 
                        variant="contained"
                        sx={{ fontFamily: 'fantasy' }}
                        onClick={() => handleAcceptedSpareBooking(spareBooking._id)}
                      >
                        ACCEPT <CheckCircleOutlineIcon />
                      </Button>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </StyledCard>
          )}
        </Grid>

      </Grid>
    </Container>
  );
};

export default ViewBooking;
