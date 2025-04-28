import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WatchIcon from '@mui/icons-material/Watch';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Box,
  Divider,
  Input,
} from '@mui/material';
import { Link } from 'react-router-dom';

const ShopProduct = () => {
  const [spare, setSpare] = useState([]);
  const [watch, setWatch] = useState([]);
  const [filteredSpare, setFilteredSpare] = useState([]);
  const [filteredWatch, setFilteredWatch] = useState([]);

  // Filter state
  const [watchCategories, setWatchCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Selected filters
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    fetchSpare();
    fetchWatch();
    fetchFilterData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [spare, watch, selectedCategories, selectedColors, minPrice, maxPrice]);

  const fetchSpare = () => {
    axios
      .get('http://localhost:5000/spare')
      .then((res) => {
        setSpare(res.data);
      })
      .catch((err) => {
        console.error('Error fetching spare products:', err);
      });
  };

  const fetchWatch = () => {
    axios
      .get('http://localhost:5000/Watch')
      .then((res) => {
        setWatch(res.data);
      })
      .catch((err) => {
        console.error('Error fetching watch products:', err);
      });
  };

  const fetchFilterData = async () => {
    try {
      const [categoryRes, colorRes] = await Promise.all([
        axios.get('http://localhost:5000/CategoryPost'),
        axios.get('http://localhost:5000/ColorPost'),
      ]);

      setWatchCategories(categoryRes.data?.watch || []);
      setColors(colorRes.data?.color || []);
    } catch (error) {
      console.error('Error fetching filter data:', error);
    }
  };

  const handleCheckboxChange = (value, selected, setSelected) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const applyFilters = () => {
    let filteredSpareProducts = [...spare];
    let filteredWatchProducts = [...watch];

    // Category Filter
    if (selectedCategories.length > 0) {
      filteredSpareProducts = filteredSpareProducts.filter((spare) =>
        selectedCategories.includes(spare.watchCategory)
      );
      filteredWatchProducts = filteredWatchProducts.filter((product) =>
        selectedCategories.includes(product.watchCategory)
      );
    }

    // Color Filter
    if (selectedColors.length > 0) {
      filteredSpareProducts = filteredSpareProducts.filter((spare) =>
      spare.color?.some((color) => selectedColors.includes(color))
      );
      filteredWatchProducts = filteredWatchProducts.filter((product) =>
        product.color?.some((color) => selectedColors.includes(color))
      );
    }

    // Price Filter
    if (minPrice !== '') {
      filteredSpareProducts = filteredSpareProducts.filter(
        (product) => product.discount >= parseFloat(minPrice)
      );
      filteredWatchProducts = filteredWatchProducts.filter(
        (product) => product.discount >= parseFloat(minPrice)
      );
    }

    if (maxPrice !== '') {
      filteredSpareProducts = filteredSpareProducts.filter(
        (product) => product.discount <= parseFloat(maxPrice)
      );
      filteredWatchProducts = filteredWatchProducts.filter(
        (product) => product.discount <= parseFloat(maxPrice)
      );
    }

    setFilteredSpare(filteredSpareProducts);
    setFilteredWatch(filteredWatchProducts);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: 'fantasy' }}>
        PRODUCT-LIST
      </Typography>
     
      <Grid container spacing={3}>
        {/* Sidebar Filters */}
        <Grid item xs={12} md={3}>
          <Box sx={{ border: '1px solid #ddd', borderRadius: 2, p: 2 }}>
            <Typography variant="h6">Filters</Typography>
            <Divider sx={{ my: 2 }} />

            {/* Watch Categories */}
            <Typography variant="subtitle1">Watch Category</Typography>
            <FormGroup>
              {watchCategories.map((category, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={selectedCategories.includes(category.watchCategory)}
                      onChange={() =>
                        handleCheckboxChange(category.watchCategory, selectedCategories, setSelectedCategories)
                      }
                    />
                  }
                  label={category.watchCategory}
                />
              ))}
            </FormGroup>

            {/* Colors */}
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Colors
            </Typography>
            <FormGroup>
              {colors.map((color, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={selectedColors.includes(color.color)}
                      onChange={() =>
                        handleCheckboxChange(color.color, selectedColors, setSelectedColors)
                      }
                    />
                  }
                  label={color.color}
                />
              ))}
            </FormGroup>

            {/* Price Range */}
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Price Range (₹)
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 1 }}>
              <Input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                sx={{ width: '100%' }}
              />
              <Input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                sx={{ width: '100%' }}
              />
            </Box>
          </Box>
        </Grid>

        {/* Product Cards */}
      
        <Grid item xs={12} md={9} sx={{display:'flex'}}>
       
          <Grid container spacing={3}>
            {filteredSpare.length > 0 ? (
              filteredSpare.map((spare) => (
                <Grid item xs={12} sm={6}key={spare._id}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia component="img" height="200" src={spare.profileImage} alt={spare.partName} />
                    <CardContent>
                      <Typography variant="h6">{spare.partName}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Model: {spare.model}
                      </Typography>
                      <Typography variant="h6" sx={{ color: 'green' }}>
                      <s>₹{spare.price}</s> ₹{spare.discount}
                      </Typography>
                      <Typography variant="body2">Category: {spare.watchCategory}</Typography>
                      <Typography variant="h6">ShopName: {spare.shopId.shop}</Typography>
                      <Typography variant="body2">Colors: {spare.color.join(', ')}</Typography>
                      <Typography variant="body2">Stock: {spare.stock}</Typography>
                      <Typography variant="body2" color="primary">
                                              {spare.offer}% offer
                                            </Typography>
                    </CardContent>
                    <CardActions>
                      <Link to={`/user/spare/${spare._id}`} style={{ textDecoration: 'none',pointerEvents:spare.stock == 0 ? 'none' : 'auto' }}>
                        <Button size="small" variant="contained" color="primary"sx={{fontFamily:'fantasy'}}disabled={spare.stock == 0}>
                         <VisibilityIcon></VisibilityIcon> View Details
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="h6" align="center" sx={{ width: '100%' }}>
                No spare products available.
              </Typography>
            )}
          </Grid>

          <Grid container spacing={3}>
            
            {filteredWatch.length > 0 ? (
              filteredWatch.map((watch) => (
                <Grid item xs={12} sm={6}  key={watch._id}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia component="img" height="200" src={watch.profileImage} alt={watch.model} />
                    <CardContent>
                      <Typography variant="h6">{watch.company}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Model: {watch.model}
                      </Typography>
                      <Typography variant="h6" sx={{ color: 'green' }}>
                      <s>₹{watch.price}</s> ₹{watch.discount}
                      </Typography>
                      <Typography variant="body2">Category: {watch.watch_Category}</Typography>
                      {/* <Typography variant="body2">UserCategory: {watch.user_Category}</Typography> */}
                      <Typography variant="h6">ShopName: {watch.shopId.shop}</Typography>
                      <Typography variant="body2">Colors: {watch.color.join(', ')}</Typography>
                      <Typography variant="body2">Stock: {watch.stock}</Typography>
                      <Typography variant="body2" color="primary">
                                              {watch.offer}% offer
                                            </Typography>
                    </CardContent>
                    <CardActions>
                      <Link to={`/user/watch/${watch._id}`} style={{ textDecoration: 'none',pointerEvents:watch.stock == 0 ? 'none' : 'auto' }}>
                        <Button size="small" variant="contained" color="primary"sx={{fontFamily:'fantasy'}}disabled={watch.stock == 0}  >
                          <VisibilityIcon></VisibilityIcon>View Details
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="h6" align="center" sx={{ width: '100%' }}>
                No watch products available.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ShopProduct;
