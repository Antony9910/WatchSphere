import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Avatar, Grid, TableBody, TableCell, TableRow } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useParams } from 'react-router-dom';

const EditProductImage = () => {

    const{productId}=useParams();
  const [profileImage, setProfileImage] = useState('');
  const [agentEditId, setProductEditId] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);


  const fetchProduct = () => {
   
    axios.get(`http://localhost:5000/ProductProfileById/${productId}`).then((res) => {
      const product = res.data.product;
      setProfileImage(product.profileImage);
      setProductEditId(product._id); 
    }).catch((err) => {
      console.error('Error fetching product profile:', err);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   

   
    const formDataToSend = new FormData();
    formDataToSend.append('photo', photo);

    axios.post(`http://localhost:5000/ProductUploadById/${productId}`, formDataToSend)
      .then((res) => {
        
        const newProfileImage = res.data.data.profileImage;

      
        return axios.put(`http://localhost:5000/ProductsProfileById/${productId}`, { profileImage: newProfileImage });
      })
      .then((res) => {
        alert(res.data.message); 
        fetchProduct(); 
      })
      .catch((err) => {
        console.error('Error updating profile:', err);
      });
  };

  return (
    <Box sx={{ marginBottom: 10 }}>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Card sx={{ marginTop: 7, marginLeft: 5, marginRight: 5 }}>
          <Grid container spacing={3}>
          
            <Grid item xs={12} sm={6}>
              <Box sx={{ fontSize: 40, fontFamily: 'fantasy', marginLeft: 5 }}>
                EDIT PROFILE
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 3 }}>
                <Avatar alt="Profile" src={profileImage} sx={{ width: 150, height: 150 }} />
                <TableBody>
                  <TableRow>
                    {/* <TableCell><strong>photo:</strong></TableCell>
                    <TableCell>
                      <img src={profileImage} width={100} alt="Profile" />
                    </TableCell> */}
                  </TableRow>
                </TableBody>
              </Box>
            </Grid>

            {/* Right Side: Editable Form */}
            <Grid item xs={12} sm={6}>
              <CardContent>
                <TableBody>
                  <TableRow>
                    <TableCell>Profile Pic</TableCell>
                    <TableCell>
                      <input
                        type="file"
                        onChange={(e) => setPhoto(e.target.files[0])} 
                        required
                        accept="image/*"
                        style={{ width: '100%' }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </CardContent>
              <CardActions>
                <Button variant="contained" sx={{ fontFamily: 'fantasy' }} type="submit">
                  <EditIcon /> Save Changes
                </Button>
                {/* <Button variant="contained" sx={{ fontFamily: 'fantasy' }} type="submit">
                <Link to={'/agent/profile'} style={{textDecoration:'none',color:'white'}}>Profile</Link></Button> */}
              
              </CardActions>
            </Grid>
          </Grid>
        </Card>
      </form>
    </Box>
  );
};

export default EditProductImage ;
