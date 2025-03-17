import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Typography, Card, CardMedia, CardContent, Button, Grid, Paper } from "@mui/material";

const ViewProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get('http://localhost:5000/product') 
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  };
  

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Card>
                <CardMedia
                  component="img"
                  image={product.profileImage} // Fallback image
                  alt={product.productName}
                  sx={{ height: 200, objectFit: "contain" }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">{product.productName}</Typography>
                  <Typography variant="body2" color="textSecondary">Model: {product.modelNum}</Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1 }}>₹{product.price}</Typography>
                  
                  <Typography variant="body1" color="primary" sx={{ mt: 1 }}>₹{product.discount}</Typography>
             
                  <Typography variant="body2" sx={{ mt: 1, fontFamily: "fantasy" }}>Category: {product.watch_Category}</Typography>
                  <Typography variant="body2">For: {product.user_Category}</Typography>
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item>
                   
                        <Button variant="outlined" color="secondary" sx={{ backgroundColor: "orange", color: "white" }}>
                         <Link to={`/seller/edit/${product._id}`}> Edit</Link>
                        </Button>
                     
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

export default ViewProduct;
