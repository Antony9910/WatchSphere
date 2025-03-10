import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import AddIcon from '@mui/icons-material/Add';



const card = (
  <React.Fragment>
   
    <CardContent>
    <TextField label="Product" color="secondary" focused placeholder='Enter product category' />
    
    </CardContent>
    <CardContent>
    <TextField label="User" color="secondary" focused placeholder='Enter user cateegory' />
    
    </CardContent>
    <CardActions>
    <Button variant="contained" sx={{marginLeft:10,fontFamily:'fantasy'}}><AddIcon></AddIcon>ADD</Button>
    </CardActions>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box sx={{marginTop:2}}>
    <Box sx={{fontFamily:'fantasy',fontSize:40,marginTop:5,marginLeft:70}}><CategoryIcon></CategoryIcon>Add-Category</Box>
    <Box sx={{ width:275,marginTop:5,marginLeft:70}}>
        
      <Card variant="outlined">{card}</Card>
    </Box>
   </Box>
  );
}
