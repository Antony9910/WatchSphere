import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Typography, Box, Avatar } from "@mui/material";
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import EmailIcon from '@mui/icons-material/Email';

const Message = () => {
  const [bookings, setBookings] = useState([]);
  const [WatchBooking, setWatchBooking] = useState([]);
  const [SpareBooking, setSpareBooking] = useState([]);
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
      {/* Header */}
      <Box sx={{ fontSize: 32, display: 'flex', alignItems: 'center', gap: 1, marginLeft: 30, fontFamily: 'fantasy', color: '#333' }}>
        DELIVERY-MESSAGES <BookOnlineIcon />
      </Box>

      {/* All Bookings in Same Row */}
      <Grid container spacing={3} mt={4} direction="row" justifyContent="flex-start" alignItems="flex-start" wrap="nowrap">
        
       
        <Grid item xs={12} sm={4}>
          {bookings.map((booking) => (
            <Box key={booking._id} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 3, mb: 2, backgroundColor: '#fafafa', boxShadow: 3, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)', boxShadow: 6 } }}>
              <Typography variant="h6" sx={{ fontFamily: 'fantasy' }}>
                {booking.ProductId?.productName}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <img src={booking.ProductId?.profileImage} width={50} alt="Product" style={{ borderRadius: '50%', marginRight: 10 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Price: ₹{booking.totalPrice}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#7f8c8d', mt: 1 }}>
                Status: {booking.status}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, color: '#2980b9' }}>
                {booking.status === 'Confirmed'
                  ? `Your order is confirmed! We'll notify you once it's dispatched.(Booking ID: ${booking._id})`
                  : booking.status === 'Completed'
                  ? `Your order with (Booking ID: ${booking._id}) is delivered Successfully! Thank you for your purchase.`
                  : "Status pending. We will update you shortly."}
              </Typography>

             
              {booking.AgentId && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    Delivery Agent: {booking.AgentId?.name || "Not Assigned"}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <EmailIcon sx={{ color: '#3498db', marginRight: 1 }} />
                    <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                      Email: {booking.AgentId?.email || "Not Available"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                      Phone: {booking.AgentId?.ContactPhone || "Not Available"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Avatar src={booking.AgentId?.profileImage} sx={{ marginRight: 2, width: 40, height: 40, border: '2px solid #3498db' }} />
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>PROFILE IMAGE</Typography>
                  </Box>
                </Box>
              )}
            </Box>
          ))}
        </Grid>

        {/* Watch Bookings Section */}
        <Grid item xs={12} sm={4}>
          {WatchBooking.map((watchBooking) => (
            <Box key={watchBooking._id} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 3, mb: 2, backgroundColor: '#fafafa', boxShadow: 3, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)', boxShadow: 6 } }}>
              <Typography variant="h6" sx={{ fontFamily: 'fantasy',color: '#2c3e50' }}>
                {watchBooking.watchId?.model}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <img src={watchBooking.watchId?.profileImage} width={50} alt="Product" style={{ borderRadius: '50%', marginRight: 10 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Price: ₹{watchBooking.totalPrice}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#7f8c8d', mt: 1 }}>
                Status: {watchBooking.status}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, color: '#2980b9' }}>
                {watchBooking.status === 'Confirmed'
                  ? `Your order is confirmed! We'll notify you once it's dispatched.(Booking ID: ${watchBooking._id})`
                  : watchBooking.status === 'Completed'
                  ? `Your order with (Booking ID: ${watchBooking._id}) is delivered Successfully! Thank you for your purchase.`
                  : "Status pending. We will update you shortly."}
              </Typography>
              {watchBooking.AgentId && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    Delivery Agent: {watchBooking.AgentId?.name || "Not Assigned"}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <EmailIcon sx={{ color: '#3498db', marginRight: 1 }} />
                    <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                      Email: {watchBooking.AgentId?.email || "Not Available"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                      Phone: {watchBooking.AgentId?.ContactPhone || "Not Available"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Avatar src={watchBooking.AgentId?.profileImage} sx={{ marginRight: 2, width: 40, height: 40, border: '2px solid #3498db' }} />
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>PROFILE IMAGE</Typography>
                  </Box>
                </Box>
              )}
            </Box>
          ))}
        </Grid>

        {/* Spare Bookings Section */}
        <Grid item xs={12} sm={4}>
          {SpareBooking.map((spareBooking) => (
            <Box key={spareBooking._id} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 3, mb: 2, backgroundColor: '#fafafa', boxShadow: 3, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)', boxShadow: 6 } }}>
              <Typography variant="h6" sx={{ fontFamily: 'fantasy', color: '#2c3e50' }}>
                {spareBooking.SpareId?.partName}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <img src={spareBooking.SpareId?.profileImage} width={50} alt="Product" style={{ borderRadius: '50%', marginRight: 10 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Price: ₹{spareBooking.totalPrice}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#7f8c8d', mt: 1 }}>
                Status: {spareBooking.status}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, color: '#2980b9' }}>
                {spareBooking.status === 'Confirmed'
                  ? `Your order is confirmed! We'll notify you once it's dispatched.(Booking ID: ${spareBooking._id})`
                  : spareBooking.status === 'Completed'
                  ? `Your order with (Booking ID: ${spareBooking._id}) is delivered Successfully! Thank you for your purchase.`
                  : "Status pending. We will update you shortly."}
              </Typography>
              {spareBooking.AgentId && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    Delivery Agent: {spareBooking.AgentId?.name || "Not Assigned"}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <EmailIcon sx={{ color: '#3498db', marginRight: 1 }} />
                    <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                      Email: {spareBooking.AgentId?.email || "Not Available"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                      Phone: {spareBooking.AgentId?.ContactPhone || "Not Available"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Avatar src={spareBooking.AgentId?.profileImage} sx={{ marginRight: 2, width: 40, height: 40, border: '2px solid #3498db' }} />
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>PROFILE IMAGE</Typography>
                  </Box>
                </Box>
              )}
              
            </Box>
          ))}
        </Grid>

      </Grid>
    </Container>
  );
};

export default Message;
