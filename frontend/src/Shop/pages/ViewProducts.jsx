import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Typography, Card, CardMedia, CardContent, Button, Grid, Paper } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const ViewProducts = () => {
  const [spare, setSpare] = useState([]);
  const [watch,setWatch] = useState([]);
  const shopId=sessionStorage.getItem("Sid");

  useEffect(() => {
    fetchSpare();
    fetchWatch();
  }, []);

  const fetchSpare = () => {
    axios
      .get(`http://localhost:5000/spare1/${shopId}`) 
      .then((res) => setSpare(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  };
  const fetchWatch = () => {
    axios
      .get('http://localhost:5000/Watch') 
      .then((res) => setWatch(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  };
  const handleDelete = (id) => {
      axios
        .delete(`http://localhost:5000/spare/${id}`)
        .then((res) => {
          console.log(res.data.message);
          alert(res.data.message);
          fetchSpare();
        })
        .catch((err) => {
          console.error(err);
        });
    };
    const handleDelete1 = (id) => {
      axios
        .delete(`http://localhost:5000/watch/${id}`)
        .then((res) => {
          console.log(res.data.message);
          alert(res.data.message);
          fetchWatch();
        })
        .catch((err) => {
          console.error(err);
        });
    };
    
  

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
      <Typography variant="h6" color="primary" sx={{fontFamily:'fantasy',marginLeft:60,marginBottom:6,fontSize:40}}>VIEW-PRODUCTS</Typography>
        {spare.map((spare) => (
          <Grid item xs={12} sm={6} mt={4}key={spare._id}>
            <Paper elevation={3} sx={{ p: 3}}>
              <Card>
                <CardMedia
                  component="img"
                  image={spare.profileImage} // Fallback image
                  alt={spare.partName}
                  sx={{ height: 200, objectFit: "contain" }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">{spare.partName}</Typography>
                  <Typography variant="body2" color="textSecondary">Model: {spare.part}</Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1 }}>Price:₹{spare.price}</Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1 }}>Stock:{spare.stock}</Typography>
                  
                  <Typography variant="body2" sx={{ mt: 1, fontFamily: "fantasy" }}>Category: {spare.watchCategory}</Typography>
                
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item>
                   
                        <Button variant="outlined" color="secondary" sx={{ backgroundColor: "orange", color: "white" }}>
                          <Link to={`/shop/edit/${spare._id}`} style={{textDecoration:'none',color:'white'}}> Edit</Link> 
                         
                        </Button> 
                         <Button variant="outlined" color="secondary" sx={{ backgroundColor: "orange", color: "white" }}onClick={() => handleDelete(spare._id)}>
                         DELETE
                         
                        </Button> 
                     
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={4}>
        {watch.map((watch) => (
          <Grid item xs={12} sm={6} md={4} key={watch._id}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Card>
                <CardMedia
                  component="img"
                  image={watch.profileImage} // Fallback image
                  alt={watch.model}
                  sx={{ height: 200, objectFit: "contain" }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">{spare.partName}</Typography>
                  <Typography variant="body2" color="textSecondary">Model: {watch.model}</Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1 }}>Price:₹{watch.price}</Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 1 }}>Stock:{watch.stock}</Typography>
                  
                  <Typography variant="body2" sx={{ mt: 1, fontFamily: "fantasy" }}>Category: {watch.watch_Category}</Typography>
                
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item>
                   
                        <Button variant="outlined" color="secondary" sx={{ backgroundColor: "blue", color: "white",fontFamily:'fantasy' }}>
                          <Link to={`/shop/edit/${spare._id}`} style={{textDecoration:'none',color:'white',display:'flex'}}> Edit<EditIcon></EditIcon></Link> 
                         
                        </Button> 
                         <Button variant="outlined" color="secondary" sx={{ backgroundColor: "red", color: "white",marginLeft:2,fontFamily:'fantasy' }}onClick={() => handleDelete1(watch._id)}>
                         DELETE<DeleteIcon></DeleteIcon>
                         
                        </Button> 
                     
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ViewProducts;
