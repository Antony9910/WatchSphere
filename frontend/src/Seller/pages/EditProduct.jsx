import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Grid, Paper } from "@mui/material";

const EditProduct = () => {
  const { productId } = useParams();

  
  const [product, setProduct] = useState({
    productName: '',
    modelNum: '',
    price: '',
    watch_Category: '',
    user_Category: '',
    profileImage: '',
  });

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = () => {
    axios
      .get(`http://localhost:5000/product/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
    product,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/product/${productId}`, product)
      .then((res) => {
        console.log("Product updated", res.data);
    
      })
      .catch((err) => console.error("Error updating product:", err));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" fontWeight="bold">Edit Product</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Product Name"
                variant="outlined"
                value={product.productName}
                onChange={handleChange}
                name="productName"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Model Number"
                variant="outlined"
                value={product.modelNum}
                onChange={handleChange}
                name="modelNum"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Price"
                variant="outlined"
                type="number"
                value={product.price}
                onChange={handleChange}
                name="price"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Category"
                variant="outlined"
                value={product.watch_Category}
                onChange={handleChange}
                name="watch_Category"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="User Category"
                variant="outlined"
                value={product.user_Category}
                onChange={handleChange}
                name="user_Category"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Profile Image URL"
                variant="outlined"
                value={product.profileImage}
                onChange={handleChange}
                name="profileImage"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Update Product
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EditProduct;
