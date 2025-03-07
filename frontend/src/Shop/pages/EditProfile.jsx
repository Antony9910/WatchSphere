import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Grid, TableBody, TableCell, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [shop,setShop] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword,setConfirmPassword]= useState('');
  const [shopEditId, setShopEditId] = useState(null);
  const [profileImage,setProfileImage]=useState('')

  useEffect(() => {
    fetchShop();
  }, []);

  const fetchShop = () => {
    const id = sessionStorage.getItem('aid');
    axios.get(`http://localhost:5000/ShopRegById/${id}`).then((res) => {
      const shop = res.data.shop;
      setName(shop.name);
      setShop(shop.shop);
      setEmail(shop.email);
      setAddress(shop.address);
      setPassword(shop.password)
      setProfileImage(shop.profileImage)
      setConfirmPassword(shop.confirmPassword)
      setShopEditId(shop._id); 
    }).catch((err) => {
      console.error(err);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = sessionStorage.getItem('aid');

    const data = {
      name: name,
      shop:shop,
      email: email,
      address: address,
      password:password,
      confirmPassword:confirmPassword
    }
    if (shopEditId !== null) {
      axios
        .put(`http://localhost:5000/ShopRegById/${id}`,data)
        .then((res) => {
          alert(res.data.message);
          fetchShop(); 
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      // If sellerEditId is null, create a new seller
      axios
        .post("http://localhost:5000/shopReg", data)
        .then((res) => {
          alert(res.data.message);
          fetchShop(); // Refresh the seller info
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <Box sx={{ marginBottom: 10 }}>
      <form onSubmit={handleSubmit}>
        <Card sx={{ marginTop: 7, marginLeft: 5, marginRight: 5 }}>
          <Grid container spacing={3}>
            {/* Left Side: Profile Information */}
            <Grid item xs={12} sm={6}>
              <Box sx={{ fontSize: 40, fontFamily: 'fantasy', marginLeft: 5,display:'flex' }}>
                EDIT PROFILE <Box sx={{marginLeft:10,marginTop:10,borderRadius:"10%"}}><img src={profileImage} width={100}></img></Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 3 }}>
                <TableBody>
                  
                  <TableRow>
                    <TableCell sx={{fontFamily:'fantasy'}}>Name:</TableCell>
                    <TableCell>{name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{fontFamily:'fantasy'}}>SHopName:</TableCell>
                    <TableCell>{shop}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{fontFamily:'fantasy'}}>Email:</TableCell>
                    <TableCell>{email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{fontFamily:'fantasy'}}>Address:</TableCell>
                    <TableCell>{address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{fontFamily:'fantasy'}}>Password</TableCell>
                    <TableCell>{password}</TableCell>
                  </TableRow>
                
                </TableBody>
              </Box>
            </Grid>

            {/* Right Side: Editable Form */}
            <Grid item xs={12} sm={6}>
              <CardContent>
                <TableBody>
                  <TableRow>
                    <TableCell  sx={{fontFamily:'fantasy'}}>Name</TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell  sx={{fontFamily:'fantasy'}}>Shop-Name</TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={shop}
                        onChange={(e) => setShop(e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Address</TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Password</TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Confirm Password</TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  sx={{ fontFamily: 'fantasy' }}
                  type="submit"
                >
                  <EditIcon /> Save Changes
                </Button>
                <Button variant="contained" sx={{fontFamily:'fantasy',textDecoration:'none'}} type='submit'>
                <Link to={'/shop/pro'} style={{textDecoration:'none',color:'white'}}>Edit Pic</Link></Button>
              </CardActions>
            </Grid>
          </Grid>
        </Card>
      </form>
    </Box>
  );
};

export default EditProfile;
