import React, { useEffect, useState } from "react";
import WatchIcon from '@mui/icons-material/Watch';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from "axios";
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader, 
  Chip, 
  CircularProgress, 
  Alert, Box,
  Button
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled Card for better visuals
const StyledCard = styled(Card)({
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  transition: "0.3s",
  "&:hover": {
    transform: "scale(1.02)",
  },
});

const statusColors = {
  Pending: "warning",
  confirmed: "success",
  Cancelled: "error",
  Completed: "primary",
  Confirmed: "success"
};

const ViewBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [watchBookings, setWatchBooking] = useState([]);
  const [SpareBookings, setSpareBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const AgentId = sessionStorage.getItem("Aid"); // Get the logged-in agent's ID

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Delivered-bookings/${AgentId}`);

        setBookings(response.data);
      } catch (err) {
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();

    // const fetchWatchBookings = async () => {
    //   try {
    //     const response = await axios.get(`http://localhost:5000/WatchConfirmed-bookings?agentId/${AgentId}`);
    //     setWatchBooking(response.data);
    //   } catch (err) {
    //     setError("Failed to fetch bookings");
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchWatchBookings();

    // const fetchSpareBookings = async () => {
    //   try {
    //     const response = await axios.get(`http://localhost:5000/ShopConfirmed-bookings?AgentId/${AgentId}`);
    //     setSpareBooking(response.data);
    //   } catch (err) {
    //     setError("Failed to fetch bookings");
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchSpareBookings();
  }, [AgentId]);

//   const handleAcceptBooking = async (bookingId) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/update-booking/${bookingId}`, { AgentId: AgentId });

//       const updatedBooking = response.data;
//       setBookings(prevBookings =>
//         prevBookings.map(booking =>
//           booking._id === updatedBooking._id ? updatedBooking : booking
//         )
//       );

//       alert("Booking status updated to Completed!");
//     } catch (error) {
//       console.error("Error updating booking:", error);
//       alert("Failed to update the booking");
//     }
//   };

//   const handleAcceptedBooking = async (watchBookingId) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/update-WatchBooking/${watchBookingId}`, { AgentId: agentId });

//       const updatedWatchBooking = response.data;
//       setWatchBooking(prevBookings =>
//         prevBookings.map(WatchBooking =>
//           WatchBooking._id === updatedWatchBooking._id ? updatedWatchBooking : WatchBooking
//         )
//       );

//       alert("Booking status updated to Completed!");
//     } catch (error) {
//       console.error("Error updating booking:", error);
//       alert("Failed to update the booking");
//     }
//   };

//   const handleAcceptedSpareBooking = async (SpareBookingId) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/update-SpareBooking/${SpareBookingId}`, { AgentId: agentId });

//       const updatedSpareBooking = response.data;
//       setSpareBooking(prevBookings =>
//         prevBookings.map(SpareBooking =>
//           SpareBooking._id === updatedSpareBooking._id ? updatedSpareBooking : SpareBooking
//         )
//       );

//       alert("Booking status updated to Completed!");
//     } catch (error) {
//       console.error("Error updating booking:", error);
//       alert("Failed to update the booking");
//     }
//   };

  if (loading) return <Container sx={{ textAlign: "center", mt: 5 }}><CircularProgress /></Container>;
  if (error) return <Container sx={{ mt: 5 }}><Alert severity="error">{error}</Alert></Container>;

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center", fontFamily: 'fantasy' }}>
        DELIVERED-PRODUCTS
      </Typography>

      {bookings.length === 0 ? (
        <Alert severity="info">No confirmed bookings found.</Alert>
      ) : (
        <Grid container spacing={3}>
          {bookings.map((booking) => (
            <Grid item xs={12} sm={6} md={4} key={booking._id}>
              <StyledCard>
                <CardHeader 
                  title={booking.ProductId?.name}
                  subheader={`Quantity: ${booking.quantity}`}
                />
                <CardContent>
                  <Typography variant="body1" sx={{ fontFamily: 'fantasy' }}>
                    <img src={booking.ProductId?.profileImage} alt="Product" />
                  </Typography>
                  <Typography variant="h6" sx={{ fontFamily: 'inherit' }}>
                    User:{booking.UserId?.name}
                  </Typography>
                  <Typography variant="h6" sx={{ fontFamily: 'inherit' }}>
                    Email:{booking.UserId?.email}
                  </Typography>
                  <Typography variant="h6" sx={{ fontFamily: 'inherit' }}>
                   Contact:{booking.UserId?.contact}
                  </Typography>
                  <Typography variant="h" sx={{ fontFamily: 'inherit' }} color="textSecondary">
                    Total Price:{booking.totalPrice}
                  </Typography>
                  <Box>
                  <Chip 
                    label={booking.status} 
                    color={statusColors[booking.status] || "Completed"} 
                    sx={{ mt: 5 }} 
                  />
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}

      {watchBookings.length === 0 ? (
        <Alert severity="info">No confirmed bookings found.</Alert>
      ) : (
        <Grid container spacing={3}>
          {watchBookings.map((watchBooking) => (
            <Grid item xs={12} sm={6} md={4} key={watchBooking._id}>
              <StyledCard>
                <CardHeader 
                  title={watchBooking.ProductId?.name}
                  subheader={`Quantity: ${watchBooking.quantity}`}
                />
                <CardContent>
                  <Typography variant="body1" sx={{ fontFamily: 'cursive' }}>
                    <img src={watchBooking.watchId?.profileImage} width={20} alt="Product" />
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'cursive' }}>
                    <strong>User:</strong> {watchBooking.UserId?.name}
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'cursive' }}>
                    <strong>Email:</strong> {watchBooking.UserId?.email}
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'cursive' }}>
                    <strong>Contact:</strong> {watchBooking.UserId?.contact}
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'cursive' }} color="textSecondary">
                    <strong>Total Price:</strong> {watchBooking.totalPrice}
                  </Typography>
                  <Chip 
                    label={watchBooking.status} 
                    color={statusColors[watchBooking.status] || "confirmed"} 
                    sx={{ mt: 2 }} 
                  />
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}

      {SpareBookings.length === 0 ? (
        <Alert severity="info">No confirmed bookings found.</Alert>
      ) : (
        <Grid container spacing={3}>
          {SpareBookings.map((spareBooking) => (
            <Grid item xs={12} sm={6} md={4} key={spareBooking._id}>
              <StyledCard>
                <CardHeader 
                  title={spareBooking.SpareId?.partName}
                  subheader={`Quantity: ${spareBooking.quantity}`}
                />
                <CardContent>
                  <Typography variant="body1" sx={{ fontFamily: 'cursive' }}>
                    <img src={spareBooking.SpareId?.profileImage} width={20} alt="Product" />
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'cursive' }}>
                    <strong>User:</strong> {spareBooking.UserId?.name}
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'cursive' }}>
                    <strong>Email:</strong> {spareBooking.UserId?.email}
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'cursive' }}>
                    <strong>Contact:</strong> {spareBooking.UserId?.contact}
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'cursive' }} color="textSecondary">
                    <strong>Total Price:</strong> {spareBooking.totalPrice}
                  </Typography>
                  <Box sx={{ display: 'flex' }}>
                    <Chip 
                      label={spareBooking.status} 
                      color={statusColors[spareBooking.status] || "Completed"} 
                      sx={{ mt: 2 }} 
                    />
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ViewBooking;
