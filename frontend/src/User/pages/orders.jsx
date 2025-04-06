import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Grid, Paper, Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

const Orders = () => {
  const [bookings, setBookings] = useState([]);
  const [watchBooking,setWatchBooking]= useState([]);
  const [spareBooking,setSpareBooking]= useState([]);
  const userId = sessionStorage.getItem("uid");  

  useEffect(() => {
    if (userId) {
      fetchBookings(userId);
      fetchWatchBooking(userId);
      fetchSpareBooking(userId);
    }
  }, [userId]);

  const fetchBookings = (userId) => {
    const status = "confirmed"; 

   
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
  const fetchSpareBooking = (userId) => {
    const status = "Confirmed"; 

   
    axios
      .get(`http://localhost:5000/shopBookings/${userId}?status=${status}`)
      .then((res) => setSpareBooking(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  };


  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{fontFamily:'fantasy',marginLeft:50,fontSize:40,fontFamily:'cursive'}}>YOUR BOOKINGS<BookOnlineIcon></BookOnlineIcon></Box>
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
                  <Typography variant="h6" fontWeight="bold" sx={{fontFamily: 'cursive'}}>{booking.ProductId?.productName}</Typography>
                  <Typography variant="body2" color="textSecondary"sx={{fontFamily: 'cursive'}}>Model: {booking.ProductId?.modelNum}</Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1,fontFamily:'cursive' }}>Price: ₹{booking.totalPrice}</Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1,fontFamily:'cursive' }}>Quantity: {booking.quantity}</Typography>
                  <Typography variant="body2" sx={{ mt: 1,fontFamily:'cursive' }}>Status: {booking.status}</Typography>
                   <Button variant="contained"><Link to={`/user/Bill/${booking._id}`} style={{textDecoration:'none',color:'white',fontFamily:'cursive'}}><DownloadIcon></DownloadIcon> Download</Link></Button>
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
                  <Typography variant="body2" color="textSecondary" sx={{fontFamily: 'cursive'}}>Model: {watchBooking.watchId?.model}</Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1,fontFamily:'cursive' }}>Price: ₹{watchBooking.watchId?.price}</Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1,fontFamily:'cursive' }}>Quantity: {watchBooking.quantity}</Typography>
                  <Typography variant="body2" sx={{ mt: 1, fontFamily: "cursive" }}>Status: {watchBooking.status}</Typography>
                  <Button variant="contained"><Link to={`/user/watchBill/${watchBooking._id}`} style={{textDecoration:'none',color:'white',fontFamily:'cursive'}}><DownloadIcon></DownloadIcon> Download</Link></Button>
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
        {spareBooking.map((spareBooking) => (
          <Grid item xs={12} sm={6} md={4} key={spareBooking._id}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Card>
                <CardMedia
                  component="img"
                  image={spareBooking.SpareId?.profileImage || "fallbackImage.jpg"}  
                  alt={spareBooking.SpareId?.partName || "Product Image"} 
                  sx={{ height: 200, objectFit: "contain" }}
                />
                <CardContent>
                  {/* <Typography variant="h6" sx={{fontFamily:'fantasy'}}>MODELNAME:{watchBooking.watchId?.model}</Typography> */}
                  <Typography variant="body2" color="textSecondary">PartName: {spareBooking.SpareId?.partName}</Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1,fontFamily:'cursive' }}>Price: ₹{spareBooking.SpareId?.price}</Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1,fontFamily:'cursive' }}>Material: {spareBooking.SpareId?.material}</Typography>
                  <Typography variant="body2" sx={{ mt: 1, fontFamily: "cursive" }}>Status: {spareBooking.status}</Typography>
                  <Button variant="contained"><Link to={`/user/ShopsBill/${spareBooking._id}`} style={{textDecoration:'none',color:'white',fontFamily:'cursive'}}><DownloadIcon></DownloadIcon> Download</Link></Button>
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

export default Orders;
