import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Box} from '@mui/material';
import { Link } from 'react-router-dom';
import img from './images/watch.jpg'
import img2 from './images/profile.png'
import img3 from './images/Book.jpg'
import img4 from './images/Watch2.jpeg'
import img5 from './images/image1.jpg'
import img6 from './images/watch1.jpg'
import img7 from './images/watch.jpg'
import img8 from './images/solution.jpg'
import img9  from './images/image.avif'
import Slider from "react-slick";
import AddIcon from '@mui/icons-material/Add';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import axios  from 'axios';




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
const [name,setName] = useState('');
const [profileImage,setProfileImage]=useState('')

useEffect(() => {
  fetchSeller();
}, []);

const fetchSeller = () => {
  const id = sessionStorage.getItem("sid");
  axios.get(`http://localhost:5000/sellerReg/${id}`).then((res) => {
    const Seller = res.data.seller;
    // Set each individual field with data
    setName(Seller.name);
    setProfileImage(Seller.profileImage);
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
        </Slider>
        <Card sx={{ width: 470,height:150,marginTop:5,fontFamily:'fantasy',marginLeft:60,backgroundColor:'orange',":hover":{transform:"scale(1.05)",boxShadow:6}}}>
      <CardMedia
        sx={{ height: 40 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy',marginTop:-2,marginLeft:13,}}>
          WELCOME TO SELLER PAGE <Box sx={{color:'green',marginLeft:12}}>{name} <Avatar alt="Remy Sharp" src={profileImage} sx={{marginLeft:1}} /></Box>
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
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'cursive'}}>
        Edit Profile
        </Typography>
        <Typography sx={{fontFamily:'fantasy'}}>
          Edit Details of Seller 
        </Typography>
      
      </CardContent>
      <CardActions>
      <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white'}}><Link  to={'Profile/'} style={{color:'white',textDecoration:'none'}}><EditIcon></EditIcon>Edit</Link></Button>
     
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
        <Typography sx={{fontFamily:'fantasy'}}>
        Add Watch Details
        </Typography>
      
      </CardContent>
      <CardActions>
        <Button size="small"  sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white',height:33}}><Link  to={'Product/'} style={{color:'white',textDecoration:'none'}}><AddIcon></AddIcon>Add</Link></Button>
        <Button size="small"  sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white',height:33}}><Link  to={'category/'} style={{color:'white',textDecoration:'none'}}><AddIcon></AddIcon>WATCH</Link></Button>
        <Button size="small"  sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white',height:33}}><Link  to={'UserCategory/'} style={{color:'white',textDecoration:'none'}}><AddIcon></AddIcon>User </Link></Button>
        <Button size="small"  sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white',height:33}}><Link  to={'Color/'} style={{color:'white',textDecoration:'none'}}><AddIcon></AddIcon>Color</Link></Button>
        <Button size="small"  sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white',height:33}}><Link  to={'view/'} style={{color:'white',textDecoration:'none'}}><EditIcon></EditIcon>View</Link></Button>
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
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy'}}>
        View Booking<VisibilityIcon></VisibilityIcon>
        </Typography>
        <Typography sx={{fontFamily:'fantasy'}}>
       View Booking Details of the Customer
        </Typography>
      
      </CardContent>
      <CardActions>
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white'}}><VisibilityIcon></VisibilityIcon><Link to={'/seller/book'} style={{color:'white',textDecoration:'none'}}>View</Link></Button>
        {/* <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white'}}><VisibilityIcon></VisibilityIcon>Generate Bill</Button> */}
           <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white',fontFamily:'fantasy'}}><VisibilityIcon></VisibilityIcon><Link  to={'report/'} style={{color:'white',textDecoration:'none',fontFamily:'fantasy'}}>Sales Report</Link></Button>
      
      </CardActions>
    </Card>

      </Box>
      
    

    </Box>
    <Box sx={{display:'flex',marginBottom:2}}>
      <Box>
      <Card sx={{ width: 400,marginTop:5,marginLeft:5,":hover":{transform:"scale(1.05)",boxShadow:6}}}>
      <CardMedia
        sx={{ height: 115 }}
        image={img4}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy'}}>
        View Complaint
        </Typography>
        <Typography sx={{fontFamily:'fantasy'}}>
          View Complaint from Customer
        </Typography>
      
      </CardContent>
      <CardActions>
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white',fontFamily:'fantasy'}}><VisibilityIcon></VisibilityIcon><Link to={'/seller/Complaint'} style={{textDecoration:'none',color:'white'}}>View</Link></Button>
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white',fontFamily:'fantasy'}}><VisibilityIcon></VisibilityIcon><Link to={'/seller/ComplaintReport'}style={{textDecoration:'none',color:'white'}}>Generate Report</Link></Button>
      
      
      </CardActions>
    </Card>

      </Box>
      <Box>
      <Card sx={{ width: 400,marginTop:5,marginLeft:10,":hover":{transform:"scale(1.05)",boxShadow:6}}}>
      <CardMedia
        sx={{ height: 115 }}
        image={img8}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy'}}>
        Generate Solution
        </Typography>
        <Typography sx={{fontFamily:'fantasy'}}>
          Generate Solutions to Customers
        </Typography>
      
      </CardContent>
      <CardActions>
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white',fontFamily:'fantasy'}}><VisibilityIcon></VisibilityIcon><Link to={'/seller/solutions'} style={{textDecoration:'none',color:'white'}}>View</Link></Button>
      
      </CardActions>
    </Card>

      </Box>
      <Box>
      <Card sx={{ width: 400,marginTop:5,marginLeft:10,":hover":{transform:"scale(1.05)",boxShadow:6}}}>
      <CardMedia
        sx={{ height: 117 }}
        image={img8}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy'}}>
        View Feedback
        </Typography>
        <Typography sx={{fontFamily:'fantasy'}}>
          View Feedback from the Customer
        </Typography>
      
      </CardContent>
      <CardActions>
        <Button size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue',color:'white',fontFamily:'fantasy'}}><VisibilityIcon></VisibilityIcon><Link to={'/seller/Feedback'} style={{textDecoration:'none',color:'white'}}>View</Link></Button>
      
      </CardActions>
    </Card>
    

      </Box>
      </Box> 
     
    
    </Box>
     </Box>
  )
}

export default FrontPage