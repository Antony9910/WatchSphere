import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box} from '@mui/material';
import { Link } from 'react-router-dom';
import img from './images/Order.png'
import img2 from './images/profile.png'
import img3 from './images/Delivery.jpg'
import img4 from './images/Watch2.jpeg'
import img5 from './images/image1.jpg'
import img6 from './images/titan.jpg'
import img7 from './images/image.jpg'
import img8 from './images/solution.jpg'
import img9  from './images/watch1.jpg'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ShopIcon from '@mui/icons-material/Shop';
import StoreIcon from '@mui/icons-material/Store';
import axios from 'axios';



const  AgentPage = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 1000, 
//     arrows: true
// };
    useEffect(() => {
      fetchAgent();
    }, []);
    const [name,setName] = useState('');
    const fetchAgent = () => {
      const id = sessionStorage.getItem("Aid");
      axios.get(`http://localhost:5000/AgentRegById/${id}`).then((res) => {
        const Agent = res.data.agent;
        // Set each individual field with data
        setName(Agent.name);
      }).catch((err) => {
        console.error(err);
      });
    };
  return (
    
    <Box>
    <Box sx={{ width: "101%", overflow: "hidden",position:'relative' }}>
    {/* <Slider {...settings}> */}
      
        <Box>
            <img src={img3} width="100%" height="500px"  style={{objectFit: "cover" , backgroundRepeat:"no-repeat" }} />
          
          
        </Box>
        {/* <Box>
            <img src={img} width="100%" height="500px"  style={{ objectFit: "cover" ,backgroundRepeat:"no-repeat" }} />
          
          
        </Box>
        <Box>
            <img src={img7} width="100%" height="500px"  style={{ objectFit: "cover" ,backgroundRepeat:"no-repeat" }} />
          
          
        </Box> */}
        {/* </Slider> */}
        <Card sx={{ width: 430,height:100,marginTop:5,fontFamily:'fantasy',marginLeft:60,backgroundColor:'orange',":hover":{transform:"scale(1.05)",boxShadow:6}}}>
      <CardMedia
        sx={{ height: 40 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy',marginTop:-2,marginLeft:9,}}>
          <Typography sx={{fontFamily:'cursive',fontSize:25,marginBottom:15}}>WELCOME  {name}</Typography>
        </Typography>
        
      </CardContent>
     
    </Card>
    {/* <Box sx={{  backgroundImage: `url(${img})`,height:1400,marginTop:30,width:'101%'}}> */}
      
    <Box sx={{display:'flex',marginTop:-0}}>
      <Box>
      <Card sx={{ width: 400,marginTop:5,marginLeft:5,":hover":{transform:"scale(1.05)",boxShadow:6},marginBottom:2}}>
      <CardMedia
        sx={{ height: 140 }}
        image={img2}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'cursive'}}>
        Edit Profile
        </Typography>
        <Typography sx={{fontFamily:'cursive'}}>
          Edit Details of Delivery Agent 
        </Typography>
      
      </CardContent>
      <CardActions>
        <Button size="small" sx={{fontFamily:'cursive',backgroundColor:'blue',color:'white'}}><EditIcon></EditIcon><Link to ={'/agent/Profile'} style={{textDecoration:'none',color:'white'}}>Edit</Link></Button>
        {/* <Button size="small" sx={{fontFamily:'cursive',backgroundColor:'blue',color:'white'}}><EditIcon></EditIcon><Link to ={'/agent/View'} style={{textDecoration:'none',color:'white'}}>View</Link></Button> */}
      </CardActions>
    </Card>

      </Box>
      <Box sx={{marginLeft:10}}> 
      <Card sx={{ width: 400,marginTop:5,":hover":{transform:"scale(1.05)",boxShadow:6}}}>
      <CardMedia
        sx={{ height: 140 }}
        image={img}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'cursive'}}>
        View Bookings From Customer
        </Typography>
        <Typography sx={{fontFamily:'cursive'}}>
          Delivery Agent add Tracking Details
        </Typography>
      
      </CardContent>
      <CardActions>
      <Button size="small" sx={{fontFamily:'cursive',backgroundColor:'blue',color:'white'}}><EditIcon></EditIcon><Link to ={'/agent/View'} style={{textDecoration:'none',color:'white'}}>View</Link></Button>
      <Button size="small" sx={{fontFamily:'cursive',backgroundColor:'blue',color:'white'}}><EditIcon></EditIcon><Link to ={'/agent/Delivery'} style={{textDecoration:'none',color:'white'}}>View</Link></Button>
      </CardActions>
    </Card>

      </Box>
      <Box>
      <Card sx={{ width: 400,marginTop:5,marginLeft:5,":hover":{transform:"scale(1.05)",boxShadow:6}}}>
      <CardMedia
        sx={{ height: 140 }}
        image={img3}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'cursive'}}>
        Generate Delivery Message
        </Typography>
        <Typography sx={{fontFamily:'cursive'}}>
         Send Delivery message to Customers
        </Typography>
      
      </CardContent>
      <CardActions>
        <Button size="small" sx={{fontFamily:'cursive',backgroundColor:'blue',color:'white'}}><AddIcon></AddIcon>Add</Button>
       
      
      
      </CardActions>
    </Card>

      </Box>
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
    
     
    
    </Box>
     </Box>
  )
}

export default AgentPage