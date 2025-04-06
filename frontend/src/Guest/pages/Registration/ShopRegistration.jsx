import React, { useEffect, useState } from 'react';
import axios from 'axios';
import img from './images/image1.jpg'
import { TextField, Button, Container, Grid, Typography, Box, FormControl, InputLabel, MenuItem, Select, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
const ShopRegistration = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const [password,setPassword]=useState('');
  const [confirmPassword,setConfirmPassword]=useState('');
 const [shop,setShop]=useState('');
  const [contact, setContact] = useState('');
   const[state,setState]=useState('');
  const [proof, setProof] = useState(null); 
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');
 const [districtRows, setDistrictRows] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [PlaceRows, setPlaceRows] = useState([]);

 useEffect(() => {
    fetchDistrict();
    fetchPlace();
  }, []);
  const fetchPlace = () => {
    axios
      .get("http://localhost:5000/PlacePost")
      .then((res) => {
        console.log(res.data.place);
        setPlaceRows(res.data.place);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const fetchDistrict = () => {
    axios
      .get("http://localhost:5000/DistrictPost")
      .then((res) => {
        console.log(res.data.district);
        setDistrictRows(res.data.district);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const handlePlaceChange = (e) => {
    setSelectedPlace(e.target.value);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();  

    const formDataToSend = new FormData();
    formDataToSend.append('name', name);
    formDataToSend.append('email', email);
    formDataToSend.append('address', address);
    formDataToSend.append('shop', shop);
    formDataToSend.append('contact', contact);
    formDataToSend.append('state', state);
    formDataToSend.append("district", selectedDistrict);
    formDataToSend.append("place", selectedPlace);
    formDataToSend.append('password',password);
    // formDataToSend.append('date',setDate)
    formDataToSend.append('confirmPassword',confirmPassword)
    
    if (proof) formDataToSend.append('proof', proof);
    if (photo) formDataToSend.append('photo', photo);
 
    try {
      const response = await axios.post('http://localhost:5000/shopReg', formDataToSend);
      setMessage('Registration successful!');
      console.log('Registration successful:', response.data);
      navigate("/login");
        
    } catch (error) {
      setMessage('Error registering. Please try again.');
      console.error('Error registering:', error);
    }
  };

  return (
    <Box
            sx={{
              backgroundImage: `url(${img})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              height: '1000px',
              width: '110%',
              marginTop:-0
            }}
          >
            
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 ,ml:49}}>
      <Grid container spacing={4}>
       
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 2, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{fontFamily:'fantasy'}}>
             SHOP-REGISTRATION
            </Typography>
            {message && (
              <Box sx={{ marginBottom: 2 }}>
                <Typography variant="body1" color="success.main">{message}</Typography>
              </Box>
            )}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Left Column */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="shopname"
                    value={shop}
                    onChange={(e) => setShop(e.target.value)}
                    required
                  />
                </Grid>
                
                

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <EmailIcon />
                                          </InputAdornment>
                                        ),
                                      }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </Grid>
                  <Grid item xs={12} md={6}>
                                  <TextField
                                    fullWidth
                                    label="Contact"
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    pattern="[0-9]{10}"
                                    required
                                    placeholder="Enter 10-digit contact number"
                                  />
                                </Grid>
                                  <Grid item xs={12} md={6}>
                                                  <TextField
                                                    fullWidth
                                                    label="State"
                                                    value={state}
                                                    onChange={(e) => setState(e.target.value)}
                                                    
                                                    required
                                                    placeholder="Enter state"
                                                  />
                                                </Grid>
                                                
                                                
                  <Grid item xs={12} md={6}>
                                                  <FormControl fullWidth sx={{width:260}}>
                                                <InputLabel id="demo-simple-select-label">District</InputLabel>
                                                <Select
                                                  labelId="demo-simple-select-label"
                                                  id="demo-simple-select"
                                                  value={selectedDistrict}
                                                  label="District"
                                                  onChange={handleDistrictChange}
                                                >
                                                  {districtRows &&
                                                    districtRows.map((row,index) => (
                                                      <MenuItem key={index} value={row.districtName}>{row.districtName}</MenuItem>
                                                    ))}
                                                </Select>
                                              </FormControl>
                                                  </Grid>
                                                  
                                                  
        
                                              <Grid item xs={12} md={6}>
                                                            <FormControl fullWidth sx={{width:260}}>
                                                          <InputLabel id="demo-simple-select-label">Place</InputLabel>
                                                          <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={selectedPlace}
                                                            label="Place"
                                                            onChange={handlePlaceChange}
                                                          >
                                                            {PlaceRows &&
                                                              PlaceRows.map((row,index) => (
                                                                <MenuItem key={index} value={row.placeName}>{row.placeName}</MenuItem>
                                                              ))}
                                                          </Select>
                                                        </FormControl>
                                                            </Grid>

                {/* <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    pattern="[0-9]{10}"
                    required
                    placeholder="Enter 10-digit contact number"
                  />
                </Grid> */}
                {/* <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    
                    required
                    placeholder="Enter state"
                  />
                </Grid> */}
                

                {/* <Grid item xs={12} md={6}>
                  <input
                    type="file"
                    onChange={(e) => setProof(e.target.files[0])}
                    required
                    accept="image/*"
                    style={{ width: '100%' }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <input
                    type="file"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    required
                    accept="image/*"
                    style={{ width: '100%' }}
                  />
                </Grid> */}

                {/* <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{width:260}}>
              <InputLabel id="demo-simple-select-label">District</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedDistrict}
                label="District"
                onChange={handleDistrictChange}
              >
                {districtRows &&
                  districtRows.map((row,index) => (
                    <MenuItem key={index} value={row._id}>{row.districtName}</MenuItem>
                  ))}
              </Select>
            </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{width:260}}>
              <InputLabel id="demo-simple-select-label">Place</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedPlace}
                label="Place"
                onChange={handlePlaceChange}
              >
                {PlaceRows &&
                  PlaceRows.map((row,index) => (
                    <MenuItem key={index} value={row._id}>{row.placeName}</MenuItem>
                  ))}
              </Select>
            </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="pin-code"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    pattern="[0-6]{10}"
                    required
                    placeholder="Enter pin-code"
                  />
                </Grid> */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                   
                    required
                    
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PasswordIcon/>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="ConfirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  
                    required
                    placeholder="Enter Confirm Password"
                  />
                </Grid>
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
                  <input
                    type="file"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    required
                    accept="image/*"
                    style={{ width: '100%' }}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    
                    sx={{ mt: 2,ml:25,fontFamily:'fantasy' }}
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

export default ShopRegistration;
