import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Grid, Paper, Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import AddCommentIcon from '@mui/icons-material/AddComment';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import WatchIcon from '@mui/icons-material/Watch';

const Feedback = () => {
  const [bookings, setBookings] = useState([]);
  const [watchBooking, setWatchBooking] = useState([]);
  const [ShopBooking, setShopBooking] = useState([]);
  const userId = sessionStorage.getItem("uid");  

  useEffect(() => {
    if (userId) {
      fetchBookings(userId);
      fetchWatchBooking(userId);
      fetchShopBooking(userId);
    }
  }, [userId]);

  const fetchBookings = (userId) => {
    const status = "Completed"; 
    axios
      .get(`http://localhost:5000/booking/${userId}?status=${status}`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  };

  const fetchWatchBooking = (userId) => {
    const status = "Completed"; 
    axios
      .get(`http://localhost:5000/WatchBooking/${userId}?status=${status}`)
      .then((res) => setWatchBooking(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  };

  const fetchShopBooking = (userId) => {
    const status = "Completed"; 
    axios
      .get(`http://localhost:5000/shopBookings/${userId}?status=${status}`)
      .then((res) => setShopBooking(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{fontFamily:'fantasy', marginLeft:50, fontSize:40}}>PRODUCT-FEEDBACK <BookOnlineIcon /></Box>
      
      {/* Single Grid container for all the bookings */}
      <Grid container spacing={4} mt={2}>
        {/* Product Bookings */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" color="primary" sx={{ fontFamily: 'fantasy', mb: 2 }}>WATCH<WatchIcon></WatchIcon></Typography>
          {bookings.map((booking) => (
            <Paper key={booking._id} elevation={3} sx={{ p: 3, mb: 2 }}>
              <Card>
                <CardMedia
                  component="img"
                  image={booking.ProductId?.profileImage || "fallbackImage.jpg"}
                  alt={booking.ProductId?.productName || "Product Image"}
                  sx={{ height: 200, objectFit: "contain" }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontFamily: 'fantasy' }}>{booking.ProductId?.productName}</Typography>
                  {/* <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'fantasy' }}>Model: {booking.ProductId?.modelNum}</Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1, fontFamily:'fantasy' }}>Price: ₹{booking.totalPrice}</Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1, fontFamily:'fantasy' }}>Quantity: {booking.quantity}</Typography>
                  <Typography variant="body2" sx={{ mt: 1, fontFamily: "fantasy" }}>Status: {booking.status}</Typography> */}
                  <Button variant="contained">
                    <Link to={`/user/WatchFeedback/${booking._id}`} style={{ textDecoration: 'none', color: 'white', fontFamily: 'fantasy', display: 'flex' }}>
                      <AddCommentIcon /> Feedback
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </Paper>
          ))}
        </Grid>

        {/* Watch Bookings */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" color="primary" sx={{ fontFamily: 'fantasy', mb: 2 }}>SECOND-HAND WATCH<WatchIcon></WatchIcon></Typography>
          {watchBooking.map((watch) => (
            <Paper key={watch._id} elevation={3} sx={{ p: 3, mb: 2 }}>
              <Card>
                <CardMedia
                  component="img"
                  image={watch.watchId?.profileImage || "fallbackImage.jpg"}
                  alt={watch.watchId?.model || "Product Image"}
                  sx={{ height: 200, objectFit: "contain" }}
                />
                <CardContent>
                <Typography variant="h6" sx={{ fontFamily: 'fantasy' }}>{watch.watchId?.model}</Typography>
                  {/* <Typography variant="body1" color="primary" sx={{ mt: 1, fontFamily:'fantasy' }}>Price: ₹{watch.watchId?.price}</Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1, fontFamily:'fantasy' }}>Quantity: {watch.quantity}</Typography>
                  <Typography variant="body2" sx={{ mt: 1, fontFamily: "fantasy" }}>Status: {watch.status}</Typography> */}
                  <Button variant="contained">
                    <Link to={`/user/SpareFeedBack/${watch._id}`} style={{ textDecoration: 'none', color: 'white', fontFamily: 'fantasy', display: 'flex' }}>
                      <AddCommentIcon /> Feedback
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </Paper>
          ))}
        </Grid>

        {/* Shop Bookings */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" color="primary" sx={{ fontFamily: 'fantasy', mb: 2 }}>SPARE-PART<WatchIcon></WatchIcon></Typography>
          {ShopBooking.map((shop) => (
            <Paper key={shop._id} elevation={3} sx={{ p: 3, mb: 2 }}>
              <Card>
                <CardMedia
                  component="img"
                  image={shop.SpareId?.profileImage || "fallbackImage.jpg"}
                  alt={shop.SpareId?.partName || "Product Image"}
                  sx={{ height: 200, objectFit: "contain" }}
                />
                <CardContent>
                <Typography variant="h6" sx={{ fontFamily: 'fantasy' }}>{shop.SpareId?.partName}</Typography>
                  {/* <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'fantasy' }}>PartNumber:{shop.SpareId?.partNumber}</Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1, fontFamily: 'fantasy' }}>Price: ₹{shop.SpareId?.price}</Typography>
                 
                  <Typography variant="body2" sx={{ mt: 1, fontFamily: "fantasy" }}>Status: {shop.status}</Typography> */}
                  <Button variant="contained">
                    <Link to={`/user/WatchesFeedback/${shop._id}`} style={{ textDecoration: 'none', color: 'white', fontFamily: 'fantasy', display: 'flex' }}>
                      <AddCommentIcon /> Feedback
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </Paper>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Feedback;
