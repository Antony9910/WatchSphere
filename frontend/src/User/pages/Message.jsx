import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Typography, Box } from "@mui/material";
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import EmailIcon from '@mui/icons-material/Email';

const Message = () => {
  const [bookings, setBookings] = useState([]);
  const [WatchBooking,setWatchBooking]=useState([]);
  const [SpareBooking,setSpareBooking] = useState([]);
  const userId = sessionStorage.getItem("uid");
  console.log(userId);

  useEffect(() => {
    if (userId) {
      fetchBookings(userId);
      fetchWatchBookings(userId);
      fetchSpareBooking(userId);
    
    }
  }, [userId]);

  const fetchBookings = (userId) => {
    axios
      .get(`http://localhost:5000/booking1/${userId}`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  };
  
  const fetchWatchBookings = (userId) => {
    axios
      .get(`http://localhost:5000/WatchBookings/${userId}`)
      .then((res) => setWatchBooking(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  };

  const fetchSpareBooking = (userId) => {
    axios
      .get(`http://localhost:5000/SpareBookings/${userId}`)
      .then((res) => setSpareBooking(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ fontSize: 32,display: 'flex', alignItems: 'center', gap: 1, marginLeft: 30, fontFamily: 'fantasy' }}>
        DELIVERY-MESSAGES <BookOnlineIcon />
      </Box>

      {/* Display Bookings */}
      <Grid container spacing={3} mt={2}>
        {bookings.map((booking) => (
          <Grid item xs={12} key={booking._id}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2, mb: 2, backgroundColor: '#f9f9f9' }}>
              <Typography variant="h6" sx={{ fontFamily: 'fantasy' }}>
                {booking.ProductId?.productName}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                <img src={booking.ProductId?.profileImage} width={50} alt="Product" />
              </Typography>
              <Typography variant="body1" color="primary" sx={{ mt: 1, fontFamily: 'fantasy' }}>
                Price: ₹{booking.totalPrice}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, fontFamily: 'cursive' }}>
                Status: {booking.status}
              </Typography>

              {/* Conditional Message Based on Status */}
              <Typography variant="body2" sx={{ mt: 1, fontFamily: 'fantasy' }}>
                {booking.status === 'confirmed'
                  ? `Message: Your order is confirmed! We'll notify you once it's dispatched.(Booking ID: ${booking._id})`
                  : booking.status === 'Completed'
                  ? `Message: Your order with (Booking ID: ${booking._id}) is delivered Successfully! Thank you for your purchase.`
                  : "Message: Status pending. We will update you shortly."}
              </Typography>

              {/* Delivery Agent Info */}
              {booking.AgentId && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{fontFamily:'sans-serif'}}>
                    Delivery Agent: {booking.AgentId?.name || "Not Assigned"}
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'flex', fontFamily: 'sans-serif' }}>
                    <EmailIcon /> Email: {booking.AgentId?.email || "Not Available"}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3} mt={2}>
        {WatchBooking.map((watchBooking) => (
          <Grid item xs={12} key={watchBooking._id}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2, mb: 2, backgroundColor: '#f9f9f9' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'cursive' }}>
                {watchBooking.watchId?.model}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                <img src={watchBooking.watchId?.profileImage} width={50} alt="Product" />
              </Typography>
              <Typography variant="body1" color="primary" sx={{ mt: 1, fontFamily: 'cursive' }}>
                Price: ₹{watchBooking.totalPrice}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, fontFamily: 'cursive' }}>
                Status: {watchBooking.status}
              </Typography>

              {/* Conditional Message Based on Status */}
              <Typography variant="body2" sx={{ mt: 1, fontFamily: 'cursive' }}>
                {watchBooking.status === 'confirmed'
                  ? `Message: Your order is confirmed! We'll notify you once it's dispatched.(Booking ID: ${watchBooking._id})`
                  : watchBooking.status === 'Completed'
                  ? `Message: Your order with (Booking ID: ${watchBooking._id}) is delivered Successfully! Thank you for your purchase.`
                  : "Message: Status pending. We will update you shortly."}
              </Typography>

              {/* Delivery Agent Info */}
              {watchBooking.AgentId && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ fontFamily: 'fantasy' }}>
                    Delivery Agent: {watchBooking.AgentId?.name || "Not Assigned"}
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'flex', fontFamily: 'fantasy' }}>
                    <EmailIcon /> Email: {watchBooking.AgentId?.email || "Not Available"}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3} mt={2}>
        {SpareBooking.map((spareBooking) => (
          <Grid item xs={12} key={spareBooking._id}>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2, mb: 2, backgroundColor: '#f9f9f9' }}>
              <Typography variant="h6" sx={{  fontFamily: 'cursive',fontSize:20 }}>
                {spareBooking.SpareId?.partName}
              </Typography>
              <Typography variant="h6" sx={{ }}>
                <img src={spareBooking.SpareId?.profileImage} width={50} alt="Product" />
              </Typography>
              <Typography variant="body1" color="primary" sx={{ mt: 1, fontFamily: 'cursive' }}>
                Price: ₹{spareBooking.totalPrice}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, fontFamily: 'cursive' }}>
                Status: {spareBooking.status}
              </Typography>

              {/* Conditional Message Based on Status */}
              <Typography variant="body2" sx={{ mt: 1, fontFamily: 'cursive' }}>
                {spareBooking.status === 'confirmed'
                  ? `Message: Your order is confirmed! We'll notify you once it's dispatched.(Booking ID: ${spareBooking._id})`
                  : spareBooking.status === 'Completed'
                  ? `Message: Your order with (Booking ID: ${spareBooking._id}) is delivered Successfully! Thank you for your purchase.`
                  : "Message: Status pending. We will update you shortly."}
              </Typography>

              {/* Delivery Agent Info */}
              {spareBookingAgentId && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{  fontFamily: 'cursive' }}>
                    Delivery Agent: {spareBooking.AgentId?.name || "Not Assigned"}
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'flex', fontFamily: 'cursive' }}>
                    <EmailIcon /> Email: {spareBooking.AgentId?.email || "Not Available"}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Message;
