import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ShopProduct = () => {
  const [spare, setSpare] = useState([]);
  const [watch,setWatch]=useState([]);

  useEffect(() => {
    fetchSpare();
    fetchWatch();
  }, []);

  const fetchSpare = () => {
    axios.get('http://localhost:5000/spare')
      .then(res => {
        setSpare(res.data);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
      });
  };
  const fetchWatch = () => {
    axios.get('http://localhost:5000/Watch')
      .then(res => {
        setWatch(res.data);
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
        {spare.length > 0 ? (
          spare.map((spare) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={spare._id}>
              <Card sx={{ maxWidth: 400, p: 2, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="200"
                  src={spare.profileImage}
                
                  alt={spare.partName}
                />
                <CardContent>
                  <Typography variant="h6">{spare.partName}</Typography>
      
                  {/* <Typography variant="h6">{product.sellerId.name}</Typography> */}

                  <Typography variant="body2" color="textSecondary">
                    Model: {spare.part}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{color:'green'}}>
                    ₹{spare.price}
                  </Typography>
                
        
                  <Typography variant="body2">Category: {spare.watchCategory}</Typography>
                  <Typography variant="h6">ShopName: {spare.shopId.shop}</Typography>
               
                  <Typography variant="body2">Colors: {spare.color.join(', ')}</Typography>
                </CardContent>
                <CardActions>
                <Link to={`/user/spare/${spare._id}`} style={{ textDecoration: 'none' }}>

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
      <Grid container spacing={3}>
        {watch.length > 0 ? (
          watch.map((watch) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={watch._id}>
              <Card sx={{ maxWidth: 400, p: 2, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="200"
                  src={watch.profileImage}
                
                  alt={watch.model}
                />
                <CardContent>
                  <Typography variant="h6">{watch.company}</Typography>
      
                  {/* <Typography variant="h6">{product.sellerId.name}</Typography> */}

                  <Typography variant="body2" color="textSecondary">
                    Model: {watch.watch_category}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{color:'green'}}>
                    ₹{spare.price}
                  </Typography>
                
        
                  <Typography variant="body2">Category: {watch.watch_Category}</Typography>
                   <Typography variant="h6">ShopName: {watch.shopId.shop}</Typography> 
               
                  <Typography variant="body2">Colors: {watch.color.join(', ')}</Typography>
                </CardContent>
                <CardActions>
                <Link to={`/user/watch/${watch._id}`} style={{ textDecoration: 'none' }}>

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

export default ShopProduct;
