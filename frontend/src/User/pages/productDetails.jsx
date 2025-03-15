import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Container, Typography, CardMedia, CardContent, Button, Grid, Paper } from "@mui/material";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

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
        userId:product.userId,
      });

      alert(response.data.message); 
    } catch (error) {
      console.error("Pre-booking failed:", error);
      alert("Failed to pre-book. Please try again.");
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
              image={product.profileImage || "https://via.placeholder.com/300"} // Fallback image
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
              <Typography variant="body1">Colors: {product.color.join(", ")}</Typography>
              <Typography variant="body2">Seller ID: {product.sellerId}</Typography> {/* Assuming sellerId is populated with data */}

              <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid item>
                  <Button variant="contained" color="primary" size="large">Buy Now</Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" size="large" onClick={handlePreBook}>Book Now</Button>
                </Grid>
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
    </Container>
  );
};

export default ProductDetails;
