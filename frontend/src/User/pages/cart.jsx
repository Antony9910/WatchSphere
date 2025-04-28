import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Container, Typography, CardMedia, CardContent, Grid, Paper, Box, Card, Button, TextField } from "@mui/material";

const Cart = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(""); // Track selected color
  const [quantity, setQuantity] = useState(1); // Track quantity
  const [totalPrice, setTotalPrice] = useState(0); // Track total price

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    if (product) {
      setTotalPrice(product.discount * quantity);
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

  const handleQuantityChange = (e) => {
    const newQuantity = Math.max(1, Math.min(e.target.value, product?.stock || 1)); // Limit quantity to stock
    setQuantity(newQuantity);
  };

  const handleAddToCart = async () => {
    const userId = sessionStorage.getItem("uid");
    const agentId=sessionStorage.getItem("Aid")|| null; 
   
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

    try {
      
      const bookingResponse = await axios.post("http://localhost:5000/booking", {
        UserId: userId,
        ProductId: product._id,
        quantity: quantity,
        AgentId:agentId,
        totalPrice: totalPrice,
        status: "Pending"
      });

      const BookingId = bookingResponse.data._id;

    
      const cartResponse = await axios.post("http://localhost:5000/cart", {
        UserId: userId,
        ProductId: product._id,
        BookingId: BookingId,
        quantity: quantity,
        totalPrice: totalPrice,
      });

      console.log("Cart updated successfully:", cartResponse);
      alert("Product added to the cart successfully!");

      navigate("/user/cartPage");
    } catch (error) {
      console.error("Error adding to cart or creating booking:", error.response ? error.response.data : error);
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
              <Typography variant="h5" color="primary" sx={{ mt: 1 }}>₹{product.discount}</Typography>
              <Typography variant="h5" color="primary" sx={{ mt: 1 }}>Stock: {product.stock}</Typography>
              <Typography variant="body1" sx={{ mt: 1, fontFamily: "fantasy" }}>Category: {product.watch_Category}</Typography>
              <Typography variant="body1">For: {product.user_Category}</Typography>
              <Typography variant="body1">Selected Color: {selectedColor || "None"}</Typography>

              {/* Quantity Input */}
              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                InputProps={{ inputProps: { min: 1, max: product.stock } }}
                sx={{ mt: 2 }}
              />

              <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                Total Price: ₹{totalPrice}
              </Typography>

              <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid item>
                  <Button variant="contained" sx={{ backgroundColor: 'orange', color: 'white' }} size="large" onClick={handleAddToCart}>
                    <AddShoppingCartIcon></AddShoppingCartIcon>ADD TO CART
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Paper>

      {/* Available Colors */}
      <Box sx={{ display: 'flex', mt: 2 }}>
        {product.color.map((color, index) => (
          <Card
            sx={{ maxWidth: 345, marginTop: 2, marginLeft: index > 0 ? 2 : 0, cursor: "pointer", border: selectedColor === color ? "2px solid blue" : "none" }}
            key={color}
            onClick={() => handleColorSelect(color)}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                AVAILABLE COLOR
              </Typography>
              <img
                src={product.profileImage}
                width={100}
                alt={color}
                style={{ objectFit: 'cover', borderRadius: '5px' }}
              />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>{color}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Cart; 