import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Grid, Typography, Box, FormControl, InputLabel, MenuItem, Select, Checkbox, ListItemText } from '@mui/material';

const SpareProduct = () => {
  const [partName, setPartName] = useState('');
  const [part, setPart] = useState('');
  const [price, setPrice] = useState('');
  const [material, setMaterial] = useState('');
  const [compatibility,setCompatibility] = useState('');
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');
  const [watchCategory,setWatchCategory] =useState('');
  const [stock,setStock] = useState('');
  const [colorRows, setColorRows] = useState([]);
   const [productDesc,setProductDesc]=useState("");
  const [selectedColors, setSelectedColors] = useState([]);



  useEffect(() => {
  
    fetchColor();
  }, []);

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
  const handleColorChange = (event) => {
    const { value } = event.target;
    setSelectedColors(value);
    if (!selectedColors) {
      setMessage("User category is required.");
      return;
    } // This should already be an array as the select is multiple
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('partName', partName);
    formDataToSend.append('part', part);
    formDataToSend.append('price', price);
    formDataToSend.append('stock', stock);
    formDataToSend.append('material', material);
    formDataToSend.append('productDesc',productDesc);
    formDataToSend.append('compatibility', compatibility);
    formDataToSend.append('watchCategory',watchCategory );
    formDataToSend.append("shopId", sessionStorage.getItem("Sid"));

    selectedColors.forEach(color => {
      formDataToSend.append('color', color); // append each color individually
    });

    if (photo) formDataToSend.append('photo', photo);

    try {
      const response = await axios.post('http://localhost:5000/spare', formDataToSend);
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
              SPARE PARTS REGISTRATION
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
                      label="Part Name"
                      value={partName}
                      onChange={(e) => setPartName(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Part Number"
                      value={part}
                      onChange={(e) => setPart(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Material"
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="compatibility"
                      value={compatibility}
                      onChange={(e) => setCompatibility(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="watch"
                      value={watchCategory}
                      onChange={(e) => setWatchCategory(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="stock"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      required
                    />
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
                                        renderValue={(selected) => selected.join(", ")} // Display selected colors
                                      >
                                        {colorRows.map((row, index) => (
                                          <MenuItem key={index} value={row.color}>
                                            <Checkbox
                                              checked={selectedColors.indexOf(row._color) > -1}
                                            />
                                            <ListItemText primary={row.color} />
                                          </MenuItem>
                                        ))}
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
                  <Grid item xs={12} md={12}>
  <TextField
    label="Description"
    value={productDesc}
    onChange={(e) => setProductDesc(e.target.value)}
    required
    sx={{ width: '100%' }} // This ensures it spans the full width of the container
    multiline
    rows={4} // Number of rows to display
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

export default SpareProduct;
