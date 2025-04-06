import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Container, Typography, CardMedia, CardContent, CardActions, Button, Grid, Paper, Box, Card } from "@mui/material";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(""); // State to track selected color

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = () => {
    axios
      .get(`http://localhost:5000/product/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  };

  const handlePreBook = async () => {
    try {
      const response = await axios.post("http://localhost:5000/prebook", {
        productId: product._id,
        sellerId: product.sellerId,
      });

      alert(response.data.message);
    } catch (error) {
      console.error("Pre-booking failed:", error);
      alert("Failed to pre-book. Please try again.");
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color); // Update the selected color state
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
              <Grid container spacing={2} sx={{ mt: 3 }}>
                {/* <Grid item>
                  <Button variant="contained" color="primary" size="large" onClick={handlePreBook}>BUY Now</Button>
                </Grid> */}
                <Grid item>
                 
                  <Link to={`/user/cart/${product._id}`} style={{ textDecoration: "none" }}>
                    <Button variant="outlined" color="secondary" size="large" sx={{ backgroundColor: "orange", color: "white" }}>
                      Add to Cart
                    </Button>
                  </Link>
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

export default ProductDetails;