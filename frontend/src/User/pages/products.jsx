import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:5000/product')
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
      });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: 'fantasy' }}>
        Product List
      </Typography>
      <Grid container spacing={3}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <Card sx={{ maxWidth: 400, p: 2, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="200"
                  src={product.profileImage}
                
                  alt={product.productName}
                />
                <CardContent>
                  <Typography variant="h6">{product.productName}</Typography>
                  <Typography variant="h6">{product.sellerId.name}</Typography>
                  {/* <Typography variant="h6">{product.sellerId.name}</Typography> */}

                  <Typography variant="body2" color="textSecondary">
                    Model: {product.modelNum}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{color:'green'}}>
                    <s>₹{product.price}</s> ₹{product.discount}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {product.offer}% offer
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ₹{product.discount}
                  </Typography>
                  <Typography variant="body2">Category: {product.watch_Category}</Typography>
                  <Typography variant="body2">For: {product.user_Category}</Typography>
                  <Typography variant="body2">Colors: {product.color.join(', ')}</Typography>
                </CardContent>
                <CardActions>
                <Link to={`/user/product/${product._id}`} style={{ textDecoration: 'none' }}>

                    <Button size="small" variant="contained" color="primary">
                      View Details
                    </Button>
                  </Link>
                  {/* <Button size="small" color="secondary" variant="contained">Buy Now</Button>
                  <Button  color="secondary" variant="outlined">Add  Cart</Button> */}
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center" sx={{ width: '100%' }}>
            No products available
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default ProductList;
