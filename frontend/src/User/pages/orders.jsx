import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Grid, Paper, Card, CardMedia, CardContent, Typography, Button, Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import WatchIcon from '@mui/icons-material/Watch';
const Orders = () => {
  const [bookings, setBookings] = useState([]);
  const [watchBooking, setWatchBooking] = useState([]);
  const [spareBooking, setSpareBooking] = useState([]);
  const [status, setStatus] = useState("Confirmed");  // Added state for status filter
  const userId = sessionStorage.getItem("uid");  

  useEffect(() => {
    if (userId) {
      fetchBookings(userId, status);
      fetchWatchBooking(userId, status);
      fetchSpareBooking(userId, status);
    }
  }, [userId, status]);  // Fetch based on userId and status change

  const fetchBookings = (userId, status) => {
    axios
      .get(`http://localhost:5000/booking/${userId}?status=${status}`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  };

  const fetchWatchBooking = (userId, status) => {
    axios
      .get(`http://localhost:5000/WatchBooking/${userId}?status=${status}`)
      .then((res) => setWatchBooking(res.data))
      .catch((err) => console.error("Error fetching watch bookings:", err));
  };

  const fetchSpareBooking = (userId, status) => {
    axios
      .get(`http://localhost:5000/shopBookings/${userId}?status=${status}`)
      .then((res) => setSpareBooking(res.data))
      .catch((err) => console.error("Error fetching spare bookings:", err));
  };

  // Handle status change
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ fontFamily: 'fantasy', marginLeft: 50, fontSize: 40 }}>YOUR-ORDERS<BookOnlineIcon></BookOnlineIcon></Box>
      
      {/* Status filter dropdown */}
      <FormControl sx={{ minWidth: 120, mt: 2 }}>
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          value={status}
          onChange={handleStatusChange}
          label="Status"
        >
          <MenuItem value="Confirmed">Confirmed</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{display:'flex'}}>
      <Grid container spacing={4} mt={1}>
        {bookings.map((booking) => (
          <Grid item xs={12} sm={6} md={9} key={booking._id}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Card>
                <CardMedia
                  component="img"
                  image={booking.ProductId?.profileImage || "fallbackImage.jpg"}
                  alt={booking.ProductId?.productName || "Product Image"}
                  sx={{ height: 200, objectFit: "contain" }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontFamily: 'fantasy' }}>{booking.ProductId?.productName}</Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'fantasy' }}>Model-Num: {booking.ProductId?.modelNum}</Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1, fontFamily: 'fantasy' }}>Price: ₹{booking.totalPrice}</Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1, fontFamily: 'fantasy' }}>Quantity: {booking.quantity}</Typography>
                
                  <Button variant="contained"><Link to={`/user/Bill/${booking._id}`} style={{ textDecoration: 'none', color: 'white', fontFamily: 'fantasy' }}><DownloadIcon />DOWNLOAD BILL</Link></Button>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid> 

     
      <Grid container spacing={4} mt={1}>
        {watchBooking.map((watchBooking) => (
          <Grid item xs={12} sm={6} md={9} key={watchBooking._id}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Card>
                <CardMedia
                  component="img"
                  image={watchBooking.watchId?.profileImage || "fallbackImage.jpg"}
                  alt={watchBooking.watchId?.model || "Product Image"}
                  sx={{ height: 200, objectFit: "contain" }}
                />
                <CardContent>
                <Typography variant="h6" sx={{ fontFamily: 'fantasy' }}>{watchBooking.watchId?.model}</Typography>
                <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'fantasy' }}>Model-Num: {watchBooking.watchId?.modelNum}</Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1, fontFamily: 'fantasy' }}>Price: ₹{watchBooking.totalPrice}</Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1, fontFamily: 'fantasy' }}>Quantity: {watchBooking.quantity}</Typography>
                  {/* <Typography variant="body2" sx={{ mt: 1, fontFamily: 'fantasy' }}>ShopName:{watchBooking.watchId?.shopId?.shop}</Typography> */}
                  <Button variant="contained"><Link to={`/user/watchBill/${watchBooking._id}`} style={{ textDecoration: 'none', color: 'white', fontFamily: 'fantasy' }}><DownloadIcon /> DOWNLOAD BILL</Link></Button>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4} mt={2}>
        {spareBooking.map((spareBooking) => (
          <Grid item xs={12} sm={6} md={9} key={spareBooking._id}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Card>
                <CardMedia
                  component="img"
                  image={spareBooking.SpareId?.profileImage || "fallbackImage.jpg"}
                  alt={spareBooking.SpareId?.partName || "Product Image"}
                  sx={{ height: 200, objectFit: "contain" }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontFamily: 'fantasy' }}>{spareBooking.SpareId?.partName}</Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'fantasy' }}>PartNumber:{spareBooking.SpareId?.partNumber}</Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1, fontFamily: 'fantasy' }}>Price: ₹{spareBooking.totalPrice}</Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1, fontFamily: 'fantasy' }}>Quantity: {spareBooking.quantity}</Typography>
                  {/* <Typography variant="body2" sx={{ mt: 1, fontFamily: 'fantasy' }}>ShopName:{spareBooking.SpareId?.shopId?.shop}</Typography> */}
                  <Button variant="contained"><Link to={`/user/ShopsBill/${spareBooking._id}`} style={{ textDecoration: 'none', color: 'white', fontFamily: 'fantasy' }}><DownloadIcon /> DOWNLOAD BILL</Link></Button>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>
      </Box>
    </Container>
   
  );
};

export default Orders;
