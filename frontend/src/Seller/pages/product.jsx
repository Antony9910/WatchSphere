import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Grid, Typography, Box, FormControl, InputLabel, MenuItem, Select, Checkbox, ListItemText } from '@mui/material';

const Product = () => {
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const[offer,setOffer]= useState('');
  const[discount,setDiscount] =useState('');
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');
  const [watchRows, setWatchRows] = useState([]);
  const [userRows, setUserRows] = useState([]);
  const [selectedWatch, setSelectedWatch] = useState('');
  const [selectedUser,setSelectedUser] =useState('');
  const[colorRows,setColorRows]=useState([]);
  const [selectedColors,setSelectedColors]=useState([]);
//  const[sellerId,setSellerId]=useState('');
   


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
  const fetchColor = () => {
    axios
      .get('http://localhost:5000/ColorPost')
      .then((res) => {
        console.log('Category Data:', res.data);
        if (res.data && res.data.color) {
          setColorRows(res.data.color); // Set the watch rows in state
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
          setUserRows(res.data.user); // Set the watch rows in state
        } 
      })
      .catch((err) => {
        console.error('Error fetching category:', err);
      });
  };

  // Handle change of the selected watch category
  const handleWatchChange = (e) => {
    setSelectedWatch(e.target.value);
    console.log('Selected Watch:', e.target.value);  
  };
  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
    console.log('User:', e.target.value); 
    if (!selectedUser) {
      setMessage('User category is required.');
      return;
    } 
  };
  const handleColorChange = (event) => {
    const { value } = event.target;
    setSelectedColors(value); 
    if (!selectedColors) {
      setMessage('User category is required.');
      return;
    } // This should already be an array as the select is multiple
    
  };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const formDataToSend = new FormData();
    formDataToSend.append('productName', name);
    formDataToSend.append('price', price);
    formDataToSend.append('offer',offer);
    formDataToSend.append('discount',discount);
    formDataToSend.append('modelNum', model);
    formDataToSend.append('watch_Category', selectedWatch);
    formDataToSend.append('user_Category',selectedUser)
    formDataToSend.append('sellerId',sessionStorage.getItem('sid'))
    console.log(sessionStorage.getItem('sid'))
    
    selectedColors.forEach(color => {
      formDataToSend.append('color', color); // append each color individually
    });
  

    if (photo) formDataToSend.append('photo', photo);
    
    try {
      const response = await axios.post('http://localhost:5000/product', formDataToSend);
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
                PRODUCT REGISTRATION
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
                      label="ProductName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="ModelNum"
                    
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
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
                      label="Discount Price"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      required
                    />
                  </Grid>

                  
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth sx={{ width: 260 }}>
                      <InputLabel id="demo-simple-select-label">Watch</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedWatch}
                        label="Watch"
                        onChange={handleWatchChange}
                      >
                        {watchRows.length > 0 ? (
                          watchRows.map((row, index) => (
                            <MenuItem key={index} value={row.watch_Category}>
                              {row.watch_Category} {/* Display the category */}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value="" disabled>No categories available</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ width: 260 }}>
  <InputLabel id="color-select-label">Color</InputLabel>
  <Select
    labelId="color-select-label"
    id="color-select"
    multiple
    value={selectedColors}
    label="color"              
    onChange={handleColorChange}
    renderValue={(selected) => selected.join(', ')} // Display selected colors
  >
    {colorRows.map((row, index) => (
      <MenuItem key={index} value={row.color}>
        <Checkbox checked={selectedColors.indexOf(row._color) > -1} />
        <ListItemText primary={row.color} />
      </MenuItem>
    ))}
  </Select>
</FormControl>

                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth sx={{ width: 260 }}>
                      <InputLabel id="demo-simple-select-label">User</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedUser}
                        label="user_category"
                        onChange={handleUserChange}
                      >
                        {userRows.length > 0 ? (
                          userRows.map((row, index) => (
                            <MenuItem key={index} value={row.user_Category}>
                              {row.user_Category} 
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value="" disabled>No categories available</MenuItem>
                        )}
                      </Select>
                    </FormControl>
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

                  {/* Submit Button */}
                  <Grid item xs={12} md={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2, ml: 25, fontFamily: 'fantasy' }}
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
