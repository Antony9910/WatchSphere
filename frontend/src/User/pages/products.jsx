import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
} from '@mui/material';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Filter data
  const [watchCategories, setWatchCategories] = useState([]);
  const [userCategories, setUserCategories] = useState([]);
  const [colors, setColors] = useState([]);

  // Selected Filters
  const [selectedWatches, setSelectedWatches] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  // Price filter
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchFilterData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, selectedWatches, selectedUsers, selectedColors, minPrice, maxPrice]);

  const fetchProducts = () => {
    axios
      .get('http://localhost:5000/product')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
      });
  };

  const fetchFilterData = async () => {
    try {
      const [watchRes, userRes, colorRes] = await Promise.all([
        axios.get('http://localhost:5000/CategoryPost'),
        axios.get('http://localhost:5000/UserCategoryPost'),
        axios.get('http://localhost:5000/ColorPost'),
      ]);

      setWatchCategories(watchRes.data?.watch || []);
      setUserCategories(userRes.data?.user || []);
      setColors(colorRes.data?.color || []);
    } catch (error) {
      console.error('Error fetching filters:', error);
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
    let filtered = [...products];

    if (selectedWatches.length > 0) {
      filtered = filtered.filter((product) =>
        selectedWatches.includes(product.watch_Category)
      );
    }

    if (selectedUsers.length > 0) {
      filtered = filtered.filter((product) =>
        selectedUsers.includes(product.user_Category)
      );
    }

    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) =>
        product.color?.some((c) => selectedColors.includes(c))
      );
    }

    // Apply price filtering
    if (minPrice !== '') {
      filtered = filtered.filter((product) => product.discount >= parseFloat(minPrice));
    }

    if (maxPrice !== '') {
      filtered = filtered.filter((product) => product.discount <= parseFloat(maxPrice));
    }

    setFilteredProducts(filtered);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Sidebar Filter Panel */}
        <Grid item xs={12} md={3}>
          <Box sx={{ border: '1px solid #ddd', borderRadius: 2, p: 2 }}>
            <Typography variant="h6">Filters</Typography>
            <Divider sx={{ my: 2 }} />

            {/* Watch Categories */}
            <Typography variant="subtitle1">Watch Category</Typography>
            <FormGroup>
              {watchCategories.map((item, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={selectedWatches.includes(item.watch_Category)}
                      onChange={() =>
                        handleCheckboxChange(
                          item.watch_Category,
                          selectedWatches,
                          setSelectedWatches
                        )
                      }
                    />
                  }
                  label={item.watch_Category}
                />
              ))}
            </FormGroup>

            {/* User Categories */}
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              User Category
            </Typography>
            <FormGroup>
              {userCategories.map((item, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={selectedUsers.includes(item.user_Category)}
                      onChange={() =>
                        handleCheckboxChange(
                          item.user_Category,
                          selectedUsers,
                          setSelectedUsers
                        )
                      }
                    />
                  }
                  label={item.user_Category}
                />
              ))}
            </FormGroup>

            {/* Colors */}
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Colors
            </Typography>
            <FormGroup>
              {colors.map((item, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={selectedColors.includes(item.color)}
                      onChange={() =>
                        handleCheckboxChange(
                          item.color,
                          selectedColors,
                          setSelectedColors
                        )
                      }
                    />
                  }
                  label={item.color}
                />
              ))}
            </FormGroup>

            {/* Price Range */}
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Price Range (₹)
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 1 }}>
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                style={{ width: '100%' }}
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                style={{ width: '100%' }}
              />
            </Box>
          </Box>
        </Grid>

        {/* Product Cards */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product._id}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.profileImage}
                      alt={product.productName}
                    />
                    <CardContent>
                      <Typography variant="h6">{product.productName}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Model: {product.modelNum}
                      </Typography>
                      <Typography variant="body2">
                        Category: {product.watch_Category}
                      </Typography>
                      <Typography variant="body2">
                        For: {product.user_Category}
                      </Typography>
                      <Typography variant="body2">
                        Colors: {product.color.join(', ')}
                      </Typography>
                      <Typography variant="h6" sx={{ color: 'green' }}>
                        <s>₹{product.price}</s> ₹{product.discount}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        {product.offer}% offer
                      </Typography>
                      <Typography variant="body2">
                        Stock: {product.stock}
                      </Typography>
                      <Typography variant="body2">
                        Seller: {product.sellerId.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link to={`/user/product/${product._id}`} style={{ textDecoration: 'none',pointerEvents: product.stock == 0 ? 'none' : 'auto' }}>
                        <Button
                          size="small"
                          variant="contained"
                          sx={{ fontFamily: 'fantasy' }}
                          disabled={product.stock == 0} // Disable button if stock is 0
                        >
                          <VisibilityIcon />
                          View Details
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="h6" sx={{ ml: 2 }}>
                No products found.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductList;
