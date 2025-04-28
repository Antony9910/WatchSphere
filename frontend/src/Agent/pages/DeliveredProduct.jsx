import React, { useEffect, useState } from "react";
import WatchIcon from '@mui/icons-material/Watch';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from "axios";
import VerifiedIcon from '@mui/icons-material/Verified';
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
        const response = await axios.get(`http://localhost:5000/DeliveredBookings/${AgentId}`);

        setBookings(response.data);
        console.log(response.data)
      } catch (err) {
        setError("Failed to fetch www bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();

    const fetchWatchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/DeliveredSecondWatch/${AgentId}`);
        setWatchBooking(response.data);
        console.log(response.data)
      } catch (err) {
        setError("Failed to fetch Watch bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchWatchBookings();

    const fetchSpareBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/DeliveredPart/${AgentId}`);
        setSpareBooking(response.data);
      } catch (err) {
        setError("Failed to fetch spare bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchSpareBookings();
  }, [AgentId]);


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
                  <Typography variant="h6" sx={{ fontFamily: 'fantasy' }}>
                    User:{booking.UserId?.name}
                  </Typography>
                  <Typography variant="h6" sx={{ fontFamily: 'fantasy' }}>
                    Email:{booking.UserId?.email}
                  </Typography>
                  <Typography variant="h6" sx={{ fontFamily: 'fantasy' }}>
                   Contact:{booking.UserId?.contact}
                  </Typography>
                  <Typography variant="h" sx={{ fontFamily: 'fantasy' }} color="textSecondary">
                    Total Price:{booking.totalPrice}
                  </Typography>
                  <Box>
                 
                  <Chip 
                    label={booking.status} 
                    color={statusColors[booking.status] || "Completed"} 
                    sx={{ mt: 5 }} icon={<VerifiedIcon />}
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
            <Grid item xs={12} sm={6} md={4} mt={2} key={watchBooking._id}>
              <StyledCard>
                <CardHeader 
                  title={watchBooking.watchId?.model}
                  subheader={`Quantity: ${watchBooking.quantity}`}
                />
                <CardContent>
                  <Typography  sx={{ fontFamily: 'fantasy' }}>
                    <img src={watchBooking.watchId?.profileImage} width={20} alt="Product" />
                  </Typography>
                  <Typography  sx={{ fontFamily: 'fantasy' }}>
                    User:{watchBooking.UserId?.name}
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'fantasy' }}>
                    Email:{watchBooking.UserId?.email}
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'fantasy' }}>
                    Contact: {watchBooking.UserId?.contact}
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'fantasy' }} color="textSecondary">
                    Total Price: {watchBooking.totalPrice}
                  </Typography>
                  <Chip 
                    label={watchBooking.status} 
                    color={statusColors[watchBooking.status] || "Completed"} 
                    sx={{ mt: 2 }} icon={<VerifiedIcon />}
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
                  <Typography  sx={{ fontFamily: 'fantasy' }}>
                    <img src={spareBooking.SpareId?.profileImage} alt="Product" />
                  </Typography>
                  <Typography  sx={{ fontFamily: 'fantasy' }}>
                   User: {spareBooking.UserId?.name}
                  </Typography>
                  <Typography sx={{ fontFamily: 'fantasy' }}>
                    Email:{spareBooking.UserId?.email}
                  </Typography>
                  <Typography  sx={{ fontFamily: 'fantasy' }}>
                    Contact:{spareBooking.UserId?.contact}
                  </Typography>
                  <Typography sx={{ fontFamily: 'fantasy' }} color="textSecondary">
                    Total Price:{spareBooking.totalPrice}
                  </Typography>
                  <Box sx={{ display: 'flex' }}>
                    <Chip 
                      label={spareBooking.status} 
                      color={statusColors[spareBooking.status] || "Completed"} 
                      sx={{ mt: 2 }} icon={<VerifiedIcon />}
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
