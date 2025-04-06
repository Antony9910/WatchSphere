import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box} from '@mui/material';
import { Link } from 'react-router-dom';
import img from './images/watch1.jpg'
import img2 from './images/profile.png'
import img3 from './images/Delivery.avif'
import img4 from './images/Watch2.jpeg'
import img5 from './images/image1.jpg'
import img6 from './images/titan.jpg'
import img7 from './images/image.jpg'
import img8 from './images/solution.jpg'
import img9  from './images/watch1.jpg'
import img10 from './images/Track.jpg'
import img13 from './images/feedback.png'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ShopIcon from '@mui/icons-material/Shop';
import StoreIcon from '@mui/icons-material/Store';
import PlaceIcon from '@mui/icons-material/Place';
import axios from 'axios';



const UserPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000, 
    arrows: true
};
 const [name, setName] = useState('');
 
 useEffect(() => {
  fetchUser();
}, []);

const fetchUser = () => {
  const id = sessionStorage.getItem('uid');
  axios.get(`http://localhost:5000/userReg/${id}`).then((res) => {
    const user = res.data.user;
    // Set each individual field with data
    setName(user.name);
  
  }).catch((err) => {
    console.error(err);
  });
};
  return (
   
    <Box>
    <Box sx={{ width: "101%", overflow: "hidden",position:'relative' }}>
    <Slider {...settings}>
      
        <Box>
            <img src={img6} width="100%" height="500px"  style={{objectFit: "cover" , backgroundRepeat:"no-repeat" }} />
          
          
        </Box>
        <Box>
            <img src={img9} width="100%" height="500px"  style={{ objectFit: "cover" ,backgroundRepeat:"no-repeat" }} />
          
          
        </Box>
        <Box>
            <img src={img7} width="100%" height="500px"  style={{ objectFit: "cover" ,backgroundRepeat:"no-repeat" }} />
          
          
        </Box>
        </Slider>
        <Card sx={{ width: 430,height:100,marginTop:5,fontFamily:'fantasy',marginLeft:60,backgroundColor:'orange',":hover":{transform:"scale(1.05)",boxShadow:6}}}>
      <CardMedia
        sx={{ height: 40 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy',marginTop:-4,marginLeft:9,width:'100%'}}>
          WELCOME TO WATCHSPHERE <Box sx={{color:'green',marginLeft:5}}>{name}</Box>
        </Typography>
        
      </CardContent>
     
    </Card>
    {/* <Box sx={{  backgroundImage: `url(${img})`,height:1400,marginTop:30,width:'101%'}}> */}
      
    <Box sx={{display:'flex',marginTop:-0}}>
      <Box>
      <Card sx={{ width: 400,marginTop:5,marginLeft:5,":hover":{transform:"scale(1.05)",boxShadow:6}}}>
      <CardMedia
        sx={{ height: 140 }}
        image={img2}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy'}}>
        Edit Profile
        </Typography>
        <Typography sx={{fontFamily:'cursive'}}>
           Edit Details of User
        </Typography>
      
      </CardContent>
      <CardActions>
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white',fontFamily:'cursive'}}><Link  to={'Profile/'} style={{color:'white',textDecoration:'none'}}><EditIcon></EditIcon>Edit</Link></Button>
      
      </CardActions>
    </Card>

      </Box>
      <Box sx={{marginLeft:10}}> 
      <Card sx={{ width: 400,marginTop:5,":hover":{transform:"scale(1.05)",boxShadow:6}}}>
      <CardMedia
        sx={{ height: 140 }}
        image={img6}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy'}}>
        Buy Product
        </Typography>
        <Typography sx={{fontFamily:'cursive'}}>
        Customer can Buy product 
        </Typography>
      
      </CardContent>
      <CardActions>
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white',height:33,fontFamily:'cursive'}}><Link  to={'Product/'} style={{color:'white',textDecoration:'none'}}><ShopIcon></ShopIcon>Seller</Link></Button>
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white',height:33,fontFamily:'cursive'}}><Link  to={'shop/'} style={{color:'white',textDecoration:'none'}}><StoreIcon></StoreIcon>Shop</Link></Button>
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white',height:33,fontFamily:'cursive'}}><Link  to={'orders/'} style={{color:'white',textDecoration:'none'}}><StoreIcon></StoreIcon>view</Link></Button>
      </CardActions>
    </Card>

      </Box>
      <Box>
      <Card sx={{ width: 400,marginTop:5,marginLeft:5,":hover":{transform:"scale(1.05)",boxShadow:6}}}>
      <CardMedia
        sx={{ height: 125 }}
        image={img3}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy'}}>
        View Messages
        </Typography>
        <Typography sx={{fontFamily:'cursive'}}>
        View Messages from Agent
        </Typography>
      
      </CardContent>
      <CardActions>
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white',fontFamily:'cursive'}}><Link to={'/user/message'} style={{textDecoration:'none',color:'white'}}><VisibilityIcon></VisibilityIcon>View</Link></Button>
      
      </CardActions>
    </Card>

      </Box>
      {/* <Box>
      <Card sx={{ width: 400,marginTop:5,marginLeft:5,":hover":{transform:"scale(1.05)",boxShadow:6}}}>
      <CardMedia
        sx={{ height: 140 }}
        image={img4}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy'}}>
        Generate Complaint
        </Typography>
        <Typography>
         Customer can Add Complaint
        </Typography>
      
      </CardContent>
      <CardActions>
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white'}}><AddIcon></AddIcon>Add</Button>
       
      
      
      </CardActions>
    </Card>

      </Box> */}
      {/* <Box sx={{marginLeft:10}}> 
      <Card sx={{ width: 400,marginTop:5,":hover":{transform:"scale(1.05)",boxShadow:6}}}>
      <CardMedia
        sx={{ height: 140 }}
        image={img3}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy'}}>
        View Booking
        </Typography>
        <Typography>
       View Booking Details of the Customer
        </Typography>
      
      </CardContent>
      <CardActions>
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white'}}><VisibilityIcon></VisibilityIcon>View</Button>
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white'}}><VisibilityIcon></VisibilityIcon>Generate Bill</Button>
      
      
      </CardActions>
    </Card>

      </Box> */}
      
    

    </Box>
    <Box sx={{display:'flex',marginBottom:2}}> 
      {/* <Box>
      <Card sx={{ width: 400,marginTop:5,marginLeft:5,":hover":{transform:"scale(1.05)",boxShadow:6}}}>
      <CardMedia
        sx={{ height: 140 }}
        image={img10}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy'}}>
        Track Product
        </Typography>
        <Typography sx={{fontFamily:'cursive'}}>
         Customer can Track Product
        </Typography>
      
      </CardContent>
      <CardActions>
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white'}}><PlaceIcon></PlaceIcon>Track</Button>
       
      
      
      </CardActions>
    </Card>

      </Box> */}
      {/* <Box sx={{marginLeft:10}}> 
      <Card sx={{ width: 400,marginTop:5,":hover":{transform:"scale(1.05)",boxShadow:6}}}>
      <CardMedia
        sx={{ height: 140 }}
        image={img3}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy'}}>
        View Booking
        </Typography>
        <Typography>
       View Booking Details of the Customer
        </Typography>
      
      </CardContent>
      <CardActions>
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white'}}><VisibilityIcon></VisibilityIcon>View</Button>
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white'}}><VisibilityIcon></VisibilityIcon>Generate Bill</Button>
      
      
      </CardActions>
    </Card>

      </Box> */}

      <Box>
      <Card sx={{ width: 400,marginTop:5,marginLeft:5,":hover":{transform:"scale(1.05)",boxShadow:6}}}>
      <CardMedia
        sx={{ height: 125 }}
        image={img4}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy'}}>
        Generate Complaint
        </Typography>
        <Typography sx={{fontFamily:'cursive'}}>
          Customer Can generate Complaint
        </Typography>
      
      </CardContent>
      <CardActions>
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white',fontFamily:'cursive'}}><AddIcon></AddIcon><Link to={'/user/complaint'} style={{textDecoration:'none',color:'white'}}>Add</Link></Button>
       
      
      
      </CardActions>
    </Card>

      </Box>
      {/* <Box>
      <Card sx={{ width: 400,marginTop:5,marginLeft:10,":hover":{transform:"scale(1.05)",boxShadow:6}}}>
      <CardMedia
        sx={{ height: 125 }}
        image={img5}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy',":hover":{transform:"scale(1.05)",boxShadow:6}}}>
        Generate Complaint Report
        </Typography>
        <Typography>
          Generate a Report based on watch based on watch Complaints
        </Typography>
      
      </CardContent>
      <CardActions>
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white'}}><VisibilityIcon></VisibilityIcon>View</Button>
      
      </CardActions>
    </Card>

      </Box> */}
      <Box>
      <Card sx={{ width: 400,marginTop:5,marginLeft:10,":hover":{transform:"scale(1.05)",boxShadow:6}}}>
      <CardMedia
        sx={{ height: 125 }}
        image={img8}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy'}}>
        View Solution
        </Typography>
        <Typography sx={{fontFamily:'cursive'}}>
        View Solution from users
        </Typography>
      
      </CardContent>
      <CardActions>
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white',fontFamily:'cursive'}}><VisibilityIcon></VisibilityIcon>View</Button>
      
      </CardActions>
    </Card>

      </Box>
      <Box>
      <Card sx={{ width: 400,marginTop:5,marginLeft:5,":hover":{transform:"scale(1.05)",boxShadow:6}}}>
      <CardMedia
        sx={{ height: 120 }}
        image={img13}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy'}}>
        Generate Feedback
        </Typography>
        <Typography sx={{fontFamily:'cursive'}}>
         Customer can Generate Feedback
        </Typography>
      
      </CardContent>
      <CardActions>
      <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white',fontFamily:'cursive'}}><Link  to={'Feedback/'} style={{color:'white',textDecoration:'none'}}><AddIcon></AddIcon>Add</Link></Button>
       
      
      
      </CardActions>
    </Card>

      </Box>
      
      </Box> 
     
    
    </Box>
    {/* <Box sx={{display:'flex',marginBottom:2}}> 
      <Box>
      <Card sx={{ width: 400,marginTop:5,marginLeft:5,":hover":{transform:"scale(1.05)",boxShadow:6}}}>
      <CardMedia
        sx={{ height: 140 }}
        image={img13}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy'}}>
        Generate Feedback
        </Typography>
        <Typography sx={{fontFamily:'cursive'}}>
         Customer can Generate Feedback
        </Typography>
      
      </CardContent>
      <CardActions>
      <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white',fontFamily:'cursive'}}><Link  to={'Feedback/'} style={{color:'white',textDecoration:'none'}}><AddIcon></AddIcon>Add</Link></Button>
       
      
      
      </CardActions>
    </Card>

      </Box>
      </Box> */}

     </Box>
  )
}

export default UserPage