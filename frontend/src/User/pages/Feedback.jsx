import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Grid, Paper, Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import AddCommentIcon from '@mui/icons-material/AddComment';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

const Feedback = () => {
  const [bookings, setBookings] = useState([]);
  const [watchBooking,setWatchBooking]= useState([]);
  const [ShopBooking,setShopBooking]= useState([]);
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
    const status = "confirmed"; 

   
    axios
      .get(`http://localhost:5000/WatchBooking/${userId}?status=${status}`)
      .then((res) => setWatchBooking(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  };
  const fetchShopBooking = (userId) => {
    const status = "Confirmed"; 

   
    axios
      .get(`http://localhost:5000/shopBookings/${userId}?status=${status}`)
      .then((res) => setShopBooking(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  };


  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{fontFamily:'fantasy',marginLeft:50,fontSize:40}}>PRODUCT-FEEDBACK<BookOnlineIcon></BookOnlineIcon></Box>
      <Grid container spacing={4}mt={2}>
        {bookings.map((booking) => (
          <Grid item xs={12} sm={6} md={4} key={booking._id}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Card>
                <CardMedia
                  component="img"
                  image={booking.ProductId?.profileImage || "fallbackImage.jpg"} 
                  alt={booking.ProductId?.productName || "Product Image"}  
                  sx={{ height: 200, objectFit: "contain" }}
                />
                <CardContent>
                  <Typography variant="h6"  sx={{fontFamily: 'fantasy'}}>{booking.ProductId?.productName}</Typography>
                  <Typography variant="body2" color="textSecondary"sx={{fontFamily: 'fantasy'}}>Model: {booking.ProductId?.modelNum}</Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1,fontFamily:'fantasy' }}>Price: ₹{booking.totalPrice}</Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1,fontFamily:'fantasy' }}>Quantity: {booking.quantity}</Typography>
                  <Typography variant="body2" sx={{ mt: 1,fontFamily:'fantasy' }}>Status: {booking.status}</Typography>
                   <Button variant="contained"><Link to={`/user/WatchFeedback/${booking._id}`} style={{textDecoration:'none',color:'white',fontFamily:'fantasy',display:'flex'}}><AddCommentIcon></AddCommentIcon>FeedBack</Link></Button>
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item>
                   
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={4} mt={2}>
        {watchBooking.map((watchBooking) => (
          <Grid item xs={12} sm={6} md={4} key={watchBooking._id}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Card>
                <CardMedia
                  component="img"
                  image={watchBooking.watchId?.profileImage || "fallbackImage.jpg"}  
                  alt={watchBooking.watchId?.model || "Product Image"} 
                  sx={{ height: 200, objectFit: "contain" }}
                />
                <CardContent>
                  {/* <Typography variant="h6" sx={{fontFamily:'fantasy'}}>MODELNAME:{watchBooking.watchId?.model}</Typography> */}
                  <Typography variant="body2" color="textSecondary" sx={{fontFamily: 'fantasy'}}>Model: {watchBooking.watchId?.model}</Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1,fontFamily:'fantasy' }}>Price: ₹{watchBooking.watchId?.price}</Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1,fontFamily:'fantasy' }}>Quantity: {watchBooking.quantity}</Typography>
                  <Typography variant="body2" sx={{ mt: 1, fontFamily: "fantasy" }}>Status: {watchBooking.status}</Typography>
                  <Button variant="contained"><Link to={`/user/SpareFeedBack/${watchBooking._id}`} style={{textDecoration:'none',color:'white',fontFamily:'fantasy',display:'flex'}}><AddCommentIcon></AddCommentIcon>FeedBack</Link></Button>
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item>
                     
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        ))}
        
      </Grid>
      <Grid container spacing={4} mt={2}>
        {ShopBooking.map((ShopBooking) => (
          <Grid item xs={12} sm={6} md={4} key={ShopBooking._id}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Card>
                <CardMedia
                  component="img"
                  image={ShopBooking.SpareId?.profileImage || "fallbackImage.jpg"}  
                  alt={ShopBooking.SpareId?.partName || "Product Image"} 
                  sx={{ height: 200, objectFit: "contain" }}
                />
                <CardContent>
                  {/* <Typography variant="h6" sx={{fontFamily:'fantasy'}}>MODELNAME:{watchBooking.watchId?.model}</Typography> */}
                  <Typography variant="body2" color="textSecondary">PartName: {ShopBooking.SpareId?.partName}</Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1,fontFamily:'fantasy' }}>Price: ₹{ShopBooking.SpareId?.price}</Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1,fontFamily:'fantasy' }}>Material: {ShopBooking.SpareId?.material}</Typography>
                  <Typography variant="body2" sx={{ mt: 1, fontFamily: "fantasy" }}>Status: {ShopBooking.status}</Typography>
                  <Button variant="contained"><Link to={`/user/WatchesFeedback/${ShopBooking._id}`} style={{textDecoration:'none',color:'white',fontFamily:'fantasy',display:'flex'}}><AddCommentIcon></AddCommentIcon>FeedBack</Link></Button>
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item>
                   
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        ))}
        
      </Grid>
    </Container>
  );
};

export default Feedback;
