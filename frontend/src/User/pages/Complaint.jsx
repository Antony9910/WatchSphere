import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import WatchIcon from '@mui/icons-material/Watch';
import {
  Container,
  Grid,
  Paper,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import BookOnlineIcon from "@mui/icons-material/BookOnline";

const Complaint = () => {
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
      <Box sx={{ fontFamily: "fantasy", marginLeft: 50, fontSize: 40 }}>
        PRODUCT-COMPLAINTS <BookOnlineIcon />
      </Box>

      {/* Single Grid container for all complaints */}
      <Grid container spacing={4} mt={2} sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Product Complaints */}
        <Grid item xs={12} sm={4}>
          <Typography sx={{ fontFamily: 'fantasy', marginTop: 4, fontSize: 25 }}color="primary">
            PRODUCT COMPLAINTS <BookOnlineIcon />
          </Typography>
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
                  <Typography variant="h6" sx={{ fontFamily: "fantasy" }}>
                    {booking.ProductId?.productName}
                  </Typography>
                  {/* <Typography variant="body2" color="textSecondary" sx={{ fontFamily: "fantasy" }}>
                    Model: {booking.ProductId?.modelNum}
                  </Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1, fontFamily: "fantasy" }}>
                    Price: ₹{booking.totalPrice}
                  </Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1, fontFamily: "fantasy" }}>
                    Quantity: {booking.quantity}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, fontFamily: "fantasy" }}>
                    Status: {booking.status}
                  </Typography> */}
                  <Button variant="contained">
                    <Link
                      to={`/user/WatchComplaint/${booking._id}`}
                      style={{ textDecoration: "none", color: "white", fontFamily: "fantasy", display: "flex" }}
                    >
                      <AddCommentIcon /> Complaint
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </Paper>
          ))}
        </Grid>

        {/* Watch Complaints */}
        <Grid item xs={12} sm={4}>
          <Typography sx={{ fontFamily: 'fantasy', marginTop: 4, fontSize: 25 }}color="primary">
            WATCH COMPLAINTS <WatchIcon />
          </Typography>
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
                  <Typography variant="h6"sx={{ fontFamily: "fantasy" }}>
                    Model: {watch.watchId?.model}
                  </Typography>
                  {/* <Typography variant="body1" color="primary" sx={{ mt: 1, fontFamily: "fantasy" }}>
                    Price: ₹{watch.watchId?.price}
                  </Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1, fontFamily: "fantasy" }}>
                    Quantity: {watch.quantity}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, fontFamily: "fantasy" }}>
                    Status: {watch.status}
                  </Typography> */}
                  <Button variant="contained">
                    <Link
                      to={`/user/Complaints/${watch._id}`}
                      style={{ textDecoration: "none", color: "white", fontFamily: "fantasy", display: "flex" }}
                    >
                      <AddCommentIcon /> Complaint
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </Paper>
          ))}
        </Grid>

        {/* Shop Complaints */}
        <Grid item xs={12} sm={4}>
          <Typography sx={{ fontFamily: 'fantasy', marginTop: 4, fontSize: 25 }}color="primary">
            SPARE PARTS COMPLAINTS
          </Typography>
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
                  <Typography variant="h6" sx={{fontFamily:'fantasy'}}>
                    {shop.SpareId?.partName}
                  </Typography>
                  {/* <Typography variant="body1" color="primary" sx={{ mt: 1, fontFamily: "fantasy" }}>
                    Price: ₹{shop.SpareId?.price}
                  </Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1, fontFamily: "fantasy" }}>
                    Material: {shop.SpareId?.material}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, fontFamily: "fantasy" }}>
                    Status: {shop.status}
                  </Typography> */}
                  <Button variant="contained">
                    <Link
                      to={`/user/SpareComplaint/${shop._id}`}
                      style={{
                        textDecoration: "none",
                        color: "white",
                        fontFamily: "fantasy",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <AddCommentIcon style={{ marginRight: "8px" }} /> Complaint
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

export default Complaint;
