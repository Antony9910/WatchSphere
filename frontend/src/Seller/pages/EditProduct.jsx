import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, TextField, Button, Typography, Grid, Paper } from "@mui/material";

const EditProduct = () => {
  const { productId } = useParams();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [offer, setOffer] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState("");
  const [productEditId, setProductEditId] = useState(null);

  const navigate = useNavigate();  // Hook for programmatic navigation

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = () => {
    axios
      .get(`http://localhost:5000/product/${productId}`)
      .then((res) => {
        const product = res.data;
        setProductName(product.productName);
        setPrice(product.price);
        setOffer(product.offer);
        setStock(product.stock);
        setDiscount(product.discount);
        setProductDesc(product.productDesc);
        setProductEditId(productId);
      })
      .catch((err) => console.error("Error fetching product:", err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "productName") {
      setProductName(value);
    } else if (name === "price") {
      setPrice(value);
    } else if (name === "offer") {
      setOffer(value);
    } else if (name === "stock") {
      setStock(value);
    } else if (name === "productDesc") {
      setProductDesc(value);
    } else if (name === "discount") {
      setDiscount(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      productName: productName,
      price: price,
      offer: offer,
      stock: stock,
      productDesc: productDesc,
    };

    if (productEditId !== null) {
      axios
        .put(`http://localhost:5000/product/${productId}`, data)
        .then((res) => {
          alert("Product updated successfully");
        })
        .catch((err) => console.error("Error updating product:", err));
    } else {
      axios
        .post("http://localhost:5000/product", data)
        .then((res) => {
          alert(res.data.message);
          fetchProduct();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  // Prevent form submission when clicking "Update Image"
  const handleUpdateImageClick = (e) => {
    e.preventDefault();  // Prevent form submission
    navigate(`/seller/edit/${productId}`);  // Navigate to the update image page
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ fontFamily: 'fantasy' }}>
          EDIT DETAILS
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Product Name"
                variant="outlined"
                value={productName}
                onChange={handleChange}
                name="productName"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Product Price"
                variant="outlined"
                value={price}
                onChange={handleChange}
                name="price"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Product Offer"
                variant="outlined"
                value={offer}
                onChange={handleChange}
                name="offer"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Product Stock"
                variant="outlined"
                value={stock}
                onChange={handleChange}
                name="stock"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Description"
                value={productDesc}
                onChange={(e) => setProductDesc(e.target.value)}
                required
                sx={{ width: 530 }}
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Update Product
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ fontFamily: 'fantasy', marginLeft: 2 }}
                onClick={handleUpdateImageClick} // Call function to navigate
              >
                Update Image
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EditProduct;
