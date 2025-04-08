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
import img3 from './images/Book.jpg'
import img4 from './images/Watch2.jpeg'
import img5 from './images/image1.jpg'
import img6 from './images/titan.jpg'
import img7 from './images/shop.jpg'
import img8 from './images/solution.jpg'
import img9  from './images/watch1.jpg'
import img10 from './images/complaint1.png'
import img11 from './images/feedback.png'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';



const FrontPage = () => {
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
const [name,setName] = useState('')
useEffect(() => {
    fetchShop();
  }, []);
  
  const fetchShop = () => {
    const id = sessionStorage.getItem("Sid");
    axios.get(`http://localhost:5000/shopRegById/${id}`).then((res) => {
      const Shop = res.data.shop;
      // Set each individual field with data
      setName(Shop.name);
    }).catch((err) => {
      console.error(err);
    });
  };
  return (
    <Box>
    <Box sx={{ width: "101%", overflow: "hidden",position:'relative' }}>
    <Slider {...settings}>
      
        <Box>
            <img src={img7} width="100%" height="500px"  style={{objectFit: "cover" , backgroundRepeat:"no-repeat" }} />
          
          
        </Box>
        <Box>
            <img src={img9} width="100%" height="500px"  style={{ objectFit: "cover" ,backgroundRepeat:"no-repeat" }} />
          
          
        </Box>
        </Slider>
        <Card sx={{ width: 430,height:100,marginTop:5,fontFamily:'fantasy',marginLeft:60,backgroundColor:'orange',":hover":{transform:"scale(1.05)",boxShadow:6}}}>
      <CardMedia
        sx={{ height: 40 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy',marginTop:-2,marginLeft:9,}}>
          WELCOME TO SELLER PAGE  {name}
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
          Edit Details of Shop
        </Typography>
      
      </CardContent>
      <CardActions>
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white'}}><EditIcon></EditIcon><Link to={'/shop/profile'} style={{textDecoration:'none',color:'white',fontFamily:'cursive'}}>Edit</Link></Button>
      
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
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy'}}>
        Add Product
        </Typography>
        <Typography sx={{fontFamily:'cursive'}}>
        Add Watch Details and spare parts details
        </Typography>
      
      </CardContent>
      <CardActions>
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white',height:33}}><Link  to={'Product/'} style={{color:'white',textDecoration:'none',fontFamily:'cursive'}}><AddIcon></AddIcon> Second Hand</Link></Button>
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white',height:33}}><Link  to={'Category/'} style={{color:'white',textDecoration:'none',fontFamily:'cursive'}}><AddIcon></AddIcon> Spare parts</Link></Button>
    
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white',height:33}}><Link  to={'views/'} style={{color:'white',textDecoration:'none',fontFamily:'cursive'}}><VisibilityIcon></VisibilityIcon>view </Link></Button>
        
      </CardActions>
    </Card>

      </Box>
      <Box sx={{marginLeft:10}}> 
      <Card sx={{ width: 400,marginTop:5,":hover":{transform:"scale(1.05)",boxShadow:6}}}>
      <CardMedia
        sx={{ height: 140 }}
        image={img3}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'cursive'}}>
        View Booking
        </Typography>
        <Typography sx={{fontFamily:'cursive'}}>
       View Booking Details of the Customer
        </Typography>
      
      </CardContent>
      <CardActions>
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white',fontFamily:'cursive'}}><VisibilityIcon></VisibilityIcon><Link  to={'view/'} style={{color:'white',textDecoration:'none',fontFamily:'cursive'}}>view </Link></Button>
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white',fontFamily:'cursive'}}><VisibilityIcon></VisibilityIcon>Generate Bill</Button>
      
      
      </CardActions>
    </Card>

      </Box>
      
    

    </Box>
    <Box sx={{display:'flex',marginBottom:2}}>
      <Box>
      <Card sx={{ width: 400,marginTop:5,marginLeft:5,":hover":{transform:"scale(1.05)",boxShadow:6}}}>
      <CardMedia
        sx={{ height: 140 }}
        image={img10}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'cursive'}}>
        View Complaint
        </Typography>
        <Typography sx={{fontFamily:'cursive'}}>
          View Complaint from Customer
        </Typography>
      
      </CardContent>
      <CardActions>
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white',fontFamily:'cursive'}}><VisibilityIcon></VisibilityIcon><Link to={'/shop/Complaint'} style={{textDecoration:'none',color:'white'}}>View</Link></Button>
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white',fontFamily:'cursive'}}><VisibilityIcon></VisibilityIcon><Link to={'/shop/ComplaintReport'} style={{textDecoration:'none',color:'white'}}>Generate Complaint Report</Link></Button>
      
      
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
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'cursive'}}>
        Generate Solution
        </Typography>
        <Typography sx={{fontFamily:'cursive'}}>
          Generate Solution based on Complaints from Customer
        </Typography>
      
      </CardContent>
      <CardActions>
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white',fontFamily:'cursive'}}><AddIcon></AddIcon>Add</Button>
      
      </CardActions>
    </Card>

      </Box>
      <Box>
      <Card sx={{ width: 400,marginTop:5,marginLeft:10,":hover":{transform:"scale(1.05)",boxShadow:6}}}>
      <CardMedia
        sx={{ height: 125 }}
        image={img11}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'cursive'}}>
        View Feedback
        </Typography>
        <Typography sx={{fontFamily:'cursive'}}>
          Generate Solution based on Complaints from Customer
        </Typography>
      
      </CardContent>
      <CardActions>
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white',fontFamily:'cursive'}}><VisibilityIcon></VisibilityIcon><Link to={'/shop/FeedBack'} style={{textDecoration:'none',color:'white'}}>View</Link></Button>
      
      </CardActions>
    </Card>

      </Box>
      </Box> 
     
    
    </Box>
     </Box>
  )
}

export default FrontPage