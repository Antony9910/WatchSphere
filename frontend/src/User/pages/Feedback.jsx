import React, { useEffect, useState } from 'react';
import { Box, Select, MenuItem, InputLabel, FormControl, TextField } from '@mui/material';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import { Container, Grid, Paper, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import FeedbackIcon from '@mui/icons-material/Feedback';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const Feedback = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const userId = sessionStorage.getItem("uid");

  useEffect(() => {
    if (userId) {
      fetchBookings(userId);
    }
  }, [userId]);

  const fetchBookings = (userId) => {
    const status = "confirmed";

    axios
      .get(`http://localhost:5000/booking/${userId}?status=${status}`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  };

  const handleSelectChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  return (
    <Box sx={{ fontFamily: 'fantasy', fontSize: 20, padding: '20px' }}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ fontFamily: 'fantasy', fontSize: 40, display: 'flex', marginLeft: 60, marginBottom: 4 }}>
          FEEDBACK <FeedbackIcon sx={{ marginLeft: 1 }} />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
              <Box sx={{ marginRight: 2 }}>Product:</Box>
              <FormControl fullWidth>
                <InputLabel id="product-select-label">Select Product</InputLabel>
                <Select
                  labelId="product-select-label"
                  id="product-select"
                  value={selectedProduct}
                  onChange={handleSelectChange}
                  label="Select Product"
                >
                  {bookings.map((booking) => (
                    <MenuItem key={booking._id} value={booking.ProductId?.productName}>
                      {booking.ProductId?.productName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>

          {/* <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
              <Box sx={{ marginRight: 2 }}>Seller:</Box>
              <FormControl fullWidth>
                <InputLabel id="product-select-label">Select Seller</InputLabel>
                <Select
                  labelId="product-select-label"
                  id="product-select"
                  value={selectedProduct}
                  onChange={handleSelectChange}
                  label="Select Seller"
                >
                  {bookings.map((booking) => (
                    <MenuItem key={booking._id} value={booking.ProductId?.productName}>
                      {booking.ProductId?.productName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid> */}

          <Grid item xs={12} md={6}>
               {/* <Box sx={{ marginRight: 9 }}>Feedback:</Box>  */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 7 }}>
              <TextField
                label="Feedback"
                value={""}
                required
                sx={{ width: '190%',marginLeft:10 }}
                multiline
                rows={4}
              />
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button variant="contained" sx={{ marginLeft: 2 }}>
            <AddIcon /> Submit
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Feedback;
