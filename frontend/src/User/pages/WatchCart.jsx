import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, CardMedia, CardContent, Grid, Paper, Box, Card, Button, TextField } from "@mui/material";

const WatchCart = () => {
  const { watchId } = useParams();
  const [watch, setWatch] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWatch();
  }, []);

  useEffect(() => {
    if (watch) {
      // Recalculate the total price based on quantity and unit price
      const price = watch.discount * quantity; // Watch price * quantity
      setTotalPrice(price);  // Update the total price state
    }
  }, [quantity, watch]);

  const fetchWatch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/watch/${watchId}`);
      setWatch(res.data);
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  };

  const handleColorSelect = (color) => setSelectedColor(color);
  const handleQuantityChange = (e) => {
    const newQuantity = Math.max(1, Math.min(e.target.value, watch?.stock || 1));
    setQuantity(newQuantity);
  };

  const handleAddToCart = async () => {
    const userId = sessionStorage.getItem("uid");
    const agentId = sessionStorage.getItem("Aid") || null;
    if (!userId) return alert("User not logged in");
    if (!selectedColor) return alert("Please select a color.");
    if (!watch) return alert("Product not found");

    try {
      const WatchBookingResponse = await axios.post("http://localhost:5000/watchBooking", {
        UserId: userId,
        watchId: watchId,
        quantity,
        AgentId: agentId,
        totalPrice,
        status: "Pending",
      });

      const WatchBookingId = WatchBookingResponse.data._id;

      await axios.post("http://localhost:5000/watchCart", {
        UserId: userId,
        watchId: watchId,
        WatchBookingId,
        quantity,
        totalPrice,
        selectedColor,
      });

      alert("Product added to the cart successfully!");
      navigate("/user/cartPage");
    } catch (error) {
      console.error("Error adding to cart or creating booking:", error);
      alert("Failed to complete the request. Please try again.");
    }
  };

  if (!watch) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h5">Loading product details...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5} sx={{ display: "flex", justifyContent: "center" }}>
            <CardMedia
              component="img"
              image={watch.profileImage || "https://via.placeholder.com/300"}
              alt={watch.model}
              sx={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold">{watch.model}</Typography>
              <Typography variant="h6" color="textSecondary">Model: {watch.model}</Typography>
              <Typography variant="h5" color="primary" sx={{ mt: 1 }}>₹{watch.discount}</Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>Stock: {watch.stock}</Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>Category: {watch.watchCategory}</Typography>
              <Typography variant="body1">Selected Color: {selectedColor || "None"}</Typography>
              <TextField label="Quantity" type="number" value={quantity} onChange={handleQuantityChange} sx={{ mt: 2 }} />
              <Typography variant="h6" color="primary" sx={{ mt: 2 }}>Total Price: ₹{totalPrice}</Typography>
              <Button variant="contained" sx={{ mt: 3, backgroundColor: 'orange', color: 'white' }} size="large" onClick={handleAddToCart}>
                ADD TO CART
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ display: 'flex', mt: 2 }}>
        {watch.color.map((color, index) => (
          <Card key={color} sx={{ maxWidth: 150, margin: 1, cursor: "pointer", border: selectedColor === color ? "2px solid blue" : "none" }} onClick={() => handleColorSelect(color)}>
            <CardContent>
              <Typography variant="h6">{color}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default WatchCart;
