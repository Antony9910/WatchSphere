import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, CardMedia, CardContent, Grid, Paper, Box, Card, Button, TextField } from "@mui/material";

const Cart = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(""); // State to track selected color
  const [quantity, setQuantity] = useState(1); // State to track quantity
  const [totalPrice, setTotalPrice] = useState(0); // State to track total price
  const [bookingDate, setBookingDate] = useState(""); // State to track the booking date
  const [status, setStatus] = useState("pending"); // State to track booking status
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    if (product) {
      setTotalPrice(product.price * quantity);
    }
  }, [quantity, product]);

  const fetchProduct = () => {
    axios
      .get(`http://localhost:5000/product/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleBookingDateChange = (event) => {
    setBookingDate(event.target.value);
  };

  const handleAddToCart = async () => {
    const userId = sessionStorage.getItem('uid'); // Get user ID from session storage
  
    if (!userId) {
      alert("User not logged in");
      return;
    }
  
    if (!selectedColor) {
      alert("Please select a color.");
      return;
    }
  
    if (!product || !product._id) {
      alert("Product not found");
      return;
    }
  
    if (!bookingDate) {
      alert("Please select a booking date.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/booking", {
        UserId: userId, // Use 'UserId' instead of 'userId'
        ProductId: product._id, // Use 'ProductId' instead of 'productId'
        quantity: quantity, // Keep 'quantity' as is (it matches backend)
        status: "pending", // Use 'status' field
      });
      
  
      console.log(response); // Log the response for debugging
      alert("Booking created successfully!");
       navigate("/user/cartPage"); // Optional: Uncomment to navigate after success
    } catch (error) {
      console.error("Error creating booking:", error.response ? error.response.data : error);
      alert("Failed to create booking. Please try again.");
    }
    try {
      const response = await axios.post("http://localhost:5000/cart", {
          UserId: userId, // User's ID
          ProductId: product._id, // Product ID
          quantity: quantity, // Quantity of the product to add to the cart
      });
  
      console.log(response); 
      alert("Product added to the cart successfully!");
  
      // Optional: Navigate to the cart page after success
      navigate("/user/cart");
  } catch (error) {
      console.error("Error adding to cart:", error.response ? error.response.data : error);
      alert("Failed to add to cart. Please try again.");
  }
  
  };
  
  
  if (!product) {
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
              image={product.profileImage || "https://via.placeholder.com/300"}
              alt={product.productName}
              sx={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold">{product.productName}</Typography>
              <Typography variant="h6" color="textSecondary">Model: {product.modelNum}</Typography>
              <Typography variant="h5" color="primary" sx={{ mt: 1 }}>₹{product.price}</Typography>
              <Typography variant="body1" sx={{ mt: 1, fontFamily: "fantasy" }}>Category: {product.watch_Category}</Typography>
              <Typography variant="body1">For: {product.user_Category}</Typography>
              <Typography variant="body1">Selected Color: {selectedColor || "None"}</Typography>

              {/* Quantity Input */}
              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, e.target.value))}
                InputProps={{ inputProps: { min: 1 } }}
                sx={{ mt: 2 }}
              />

              {/* Booking Date Input */}
              <TextField
                label="Booking Date"
                type="date"
                value={bookingDate}
                onChange={handleBookingDateChange}
                InputProps={{
                  inputProps: { min: new Date().toISOString().split("T")[0] }
                }}
                sx={{ mt: 2 }}
              />

              {/* Display Total Price */}
              <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                Total Price: ₹{totalPrice}
              </Typography>

              <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid item>
                  <Button variant="contained" color="primary" size="large" onClick={handleAddToCart}>
                    Book Now
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Paper>

      <Card sx={{ maxWidth: 345, marginTop: 2 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            PRODUCT DESCRIPTION
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {product.productDesc}
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', mt: 2 }}>
        {product.color.map((color, index) => (
          <Card
            sx={{ maxWidth: 345, marginTop: 2, marginLeft: index > 0 ? 2 : 0 }}
            key={color}
            onClick={() => handleColorSelect(color)} // Set color on click
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                AVAILABLE COLOUR
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                <img
                  src={product.profileImage}
                  width={100}
                  alt={color}
                  style={{ objectFit: 'cover', borderRadius: '5px' }}
                />
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {color}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Cart;
