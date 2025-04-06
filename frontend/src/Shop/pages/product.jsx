import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Grid, Typography, Box, FormControl, InputLabel, MenuItem, Select, Checkbox, ListItemText } from '@mui/material';

const Product = () => {

  const [model, setModel] = useState('');
  const [company, setCompany] = useState('');
  const [price, setPrice] = useState('');
  const [offer, setOffer] = useState('');
  const [discount, setDiscount] = useState('');
  const [photo, setPhoto] = useState(null);
  const [proof, setProof] = useState(null);
  const [message, setMessage] = useState('');
  const [waranty,setWaranty]  = useState('');
  const [watchRows, setWatchRows] = useState([]);
  const [userRows, setUserRows] = useState([]);
  const [selectedWatch, setSelectedWatch] = useState('');
  const [stock, setStock] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [colorRows, setColorRows] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);



  useEffect(() => {
    fetchCategory();
    fetchUserCategory();
    fetchColor();
  }, []);

  // Fetch categories from the backend
  const fetchCategory = () => {
    axios
      .get('http://localhost:5000/CategoryPost')
      .then((res) => {
        console.log('Category Data:', res.data);
        if (res.data && res.data.watch) {
          setWatchRows(res.data.watch); // Set the watch rows in state
        }
      })
      .catch((err) => {
        console.error('Error fetching category:', err);
      });
  };

  const handleColorChange = (event) => {
    const { value } = event.target;
    setSelectedColors(value);
    if (value.length === 0) {
      setMessage("At least one color must be selected.");
    } else {
      setMessage(''); // Clear the message if colors are selected
    }
  };

  const fetchColor = () => {
    axios
      .get('http://localhost:5000/ColorPost')
      .then((res) => {
        console.log('Category Data:', res.data);
        if (res.data && res.data.color) {
          setColorRows(res.data.color); // Set the color rows in state
        }
      })
      .catch((err) => {
        console.error('Error fetching category:', err);
      });
  };

  const fetchUserCategory = () => {
    axios
      .get('http://localhost:5000/UserCategoryPost')
      .then((res) => {
        console.log('Category Data:', res.data);
        if (res.data && res.data.user) {
          setUserRows(res.data.user); // Set the user rows in state
        }
      })
      .catch((err) => {
        console.error('Error fetching category:', err);
      });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('model', model);
    formDataToSend.append('company', company);
    formDataToSend.append('price', price);
    formDataToSend.append('offer', offer);
    formDataToSend.append('stock', stock);
    formDataToSend.append('waranty',waranty);
    formDataToSend.append('discount', discount);
    formDataToSend.append('productDesc',productDesc);
    formDataToSend.append('modelNum', model);
    formDataToSend.append('watch_Category', selectedWatch);
    formDataToSend.append('user_Category', selectedUser);
    formDataToSend.append("shopId", sessionStorage.getItem("Sid"));

    selectedColors.forEach(color => {
      formDataToSend.append('color', color); // append each color individually
    });

    if (photo) formDataToSend.append('photo', photo);
    if (proof) formDataToSend.append('proof', proof);

    try {
      const response = await axios.post('http://localhost:5000/watch', formDataToSend);
      setMessage('Registration successful!');
      console.log('Registration successful:', response.data);
    } catch (error) {
      setMessage('Error registering. Please try again.');
      console.error('Error registering:', error);
    }
  };

  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, ml: 49 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: 2, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
              <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: 'fantasy' }}>
                SECOND HAND WATCH REGISTRATION
              </Typography>
              {message && (
                <Box sx={{ marginBottom: 2 }}>
                  <Typography variant="body1" color="success.main">{message}</Typography>
                </Box>
              )}
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Model Name"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Model Company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="offer"
                      value={offer}
                      onChange={(e) => setOffer(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="discount"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="waranty"
                      value={waranty}
                      onChange={(e) => setWaranty(e.target.value)}
                      required
                    />
                  </Grid>



                  {/* Color Selector */}
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth sx={{ width: 260 }}>
                      <InputLabel id="color-select-label">Color</InputLabel>
                      <Select
                        labelId="color-select-label"
                        id="color-select"
                        multiple
                        value={selectedColors}
                        label="Color"
                        onChange={handleColorChange}
                        renderValue={(selected) => selected.join(", ")}
                      >
                        {colorRows.map((row, index) => (
                          <MenuItem key={index} value={row.color}>
                            <Checkbox checked={selectedColors.indexOf(row.color) > -1} />
                            <ListItemText primary={row.color} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Watch Category Select */}
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth sx={{ width: 260 }}>
                      <InputLabel id="watch-select-label">Watch Category</InputLabel>
                      <Select
                        labelId="watch-select-label"
                        value={selectedWatch}
                        onChange={(e) => setSelectedWatch(e.target.value)}
                        label="Watch Category"
                      >
                        {watchRows.map((row, index) => (
                          <MenuItem key={index} value={row.watch_Category}>
                            {row.watch_Category}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* User Category Select */}
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth sx={{ width: 260 }}>
                      <InputLabel id="user-category-label">User Category</InputLabel>
                      <Select
                        labelId="user-category-label"
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        label="User Category"
                      >
                        {userRows.map((row, index) => (
                          <MenuItem key={index} value={row.user_Category}>
                            {row.user_Category}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Stock */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Stock"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      required
                    />
                  </Grid>

                  {/* Image Upload */}
                  <Grid item xs={12} md={6}>
                    <input
                      type="file"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      required
                      accept="image/*"
                      style={{ width: '100%' }}
                    />
                  </Grid>

                  {/* Proof Upload */}
                  <Grid item xs={12} md={6}>
                    <input
                      type="file"
                      onChange={(e) => setProof(e.target.files[0])}
                      required
                      accept="image/*"
                      style={{ width: '100%' }}
                    />
                  </Grid>
                      <Grid item xs={12} md={6}>
                                      <TextField
                                        label="Description"
                                        value={productDesc}
                                        onChange={(e) => setProductDesc(e.target.value)}
                                        required sx={{width:530}}
                                        multiline // This makes it a textarea
                                        rows={4} // You can adjust the number of rows based on how tall you want the textarea
                                      />
                                    </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Product;
