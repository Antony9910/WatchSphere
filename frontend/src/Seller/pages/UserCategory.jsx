import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, TextField } from '@mui/material';
import axios from 'axios';

const UserCategory = () => {


  const [user,setUser] =useState('')
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();  
      const data = { user_Category: user };
      try {
        const response = await axios.post("http://localhost:5000/UserCategory", data);
      
        alert("User category Added Successfully")
        console.log('Category done successful:', response.data);
        
          
      } catch (error) {
       
        console.error('Error adding', error);
      }
    };
 
  
  return (
    <Box sx={{ padding: 3 }}>
     
      <Box sx={{ textAlign: 'center', marginBottom: 5 }}>
        <Typography variant="h3" sx={{ fontFamily: 'fantasy', fontWeight: 'bold', color: '#1976d2' }}>
          USER-CATEGORY
        </Typography>
      </Box>


      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', gap: 3 }}>
        
   
        <Card sx={{ maxWidth: 345, padding: 3, boxShadow: 3, borderRadius: 3 }}>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Typography variant="h6" sx={{ fontFamily: 'fantasy', textAlign: 'center', marginBottom: 2 }}>
              ADD CATEGORY
            </Typography>

            <TextField
              label="User Category"
              color="secondary"
              fullWidth
              focused
              onChange={(e) => setUser(e.target.value)}
              sx={{ marginBottom: 2 }}
              placeholder="Enter User category"
            />
            
      
          </CardContent>
          
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button variant="contained" color="primary" type="submit">ADD</Button>
          </CardActions>
          </form>
        </Card>
        

        {/* Add Color Card */}
        {/* <Card sx={{ maxWidth: 345, padding: 3, boxShadow: 3, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontFamily: 'fantasy', textAlign: 'center', marginBottom: 2 }}>
              ADD COLOR
            </Typography>

            <TextField
              label="Color"
              color="secondary"
              fullWidth
              focused
              sx={{ marginBottom: 2 }}
              placeholder="Enter color"
            />
          </CardContent>
          
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button variant="contained"  color="primary" sx={{ fontFamily: 'fantasy' }}>
              Add
            </Button>
          </CardActions>
          
        </Card>
        */}
      </Box>
    </Box>
  );
}

export default UserCategory;
