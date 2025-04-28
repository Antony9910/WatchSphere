import React from 'react'

import img1 from './images/Abin.jpg'
import img2 from './images/image3.jpg';


import img5 from './images/police.jpg';
import img6 from './images/Tommy.jpg';
import img8 from './images/fastrack1.jpg';
import img9 from './images/Titan2.jpg';
import img10 from './images/Akshay.jpg'

import img12 from './images/Bhadra.jpg'
import img13 from './images/Akku.jpg'
import img14 from './images/bijo.jpg'
import img15 from './images/stephin.jpg'
import img16 from './images/Fastrack.jpg'
import img17 from './images/Titan.jpg'
import img18 from './images/watch3.jpg'
import img19 from './images/Titan.jpg'
import img20 from'./images/Titan1.jpg'
import img21 from './images/coach.jpg'
import img22 from './images/sonata.jpg'
import img23 from './images/insta.jpg'
import img24 from './images/child.jpg'
import Apple from './video/Apple.mp4'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

import { Box, Button, Rating } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import rolexVideo from "./video/rolex.mp4";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Footer from '../../Components/footer/footer';




const Home = () => {
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
  return (
    <div>
        <div> 
     
        <Box sx={{ width: "101%", overflow: "hidden",position:'relative' }}>
            <Slider {...settings}>
              
                <Box>
                    <img src={img16} width="100%" height="500px"  style={{ objectFit: "cover" }} />
                    <Button sx={{ position: "absolute" }}>Button</Button>
                </Box>
                <Box sx={{ position: "relative" }}>
                    <img src={img17} width="100%" height="500px"  style={{ objectFit: "cover" }} />
                    <Button variant="contained" sx={{left:670,bottom:50,position:'absolute',fontfamily:'fantasy'}}>Book Now</Button>
                </Box>
                <Box sx={{ position: "relative" }}>
                    <video width="100%" height="500px" controls style={{ objectFit: "cover" }}>
                        <source src={Apple} type="video/mp4" />
                       
                    </video>
                </Box> 
                <Box sx={{ position: "relative" }}>
                    <img src={img18} width="100%" height="500px"  style={{ objectFit: "cover" }} />
                </Box>

                 <Box sx={{ position: "relative" }}>
                    <video width="100%" height="500px" controls style={{ objectFit: "cover" }}>
                        <source src={rolexVideo} type="video/mp4" />
                       
                    </video>
                </Box> 
            </Slider>
        </Box>
   
    

  
    
    <Box sx={{fontSize:30,marginTop:10,justifyContent:'center',display:'flex',flexDirection:'',fontFamily:'fantasy',":hover":{transform:"scale(1.05)",boxShadow:6}}}>OUR SERVICES</Box>
<Box sx={{display:'flex',flexDirection:'row'}}>
  
    <Card sx={{ maxWidth: 345,marginTop:20,marginLeft:10,":hover":{transform:"scale(1.05)",boxShadow:6,backgroundColor:'grey'}}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={img19}
      />
      <CardContent>
      <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy'}}>
          ANALOG WATCHES
        </Typography>
        <Typography variant="body2" sx={{fontFamily:'fantasy'}}>
        Analog watches are timepieces that display time using a traditional dial with hour and minute hands, as opposed to digital watches, which show time with numerical displays. 
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
    <Card sx={{ maxWidth: 345,marginTop:20,marginLeft:10,":hover":{transform:"scale(1.05)",boxShadow:6,backgroundColor:'grey'}}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={img20}
      />
      <CardContent>
      <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy'}}>
        DIGITAL WATCHES
        </Typography>
        <Typography variant="body2" sx={{ fontFamily:'fantasy' }}>
        Digital watches are a popular category of timepieces that display the time through a digital interface, typically using an LCD or LED screen, rather than the traditional analog dial. Here’s an overview of digital watches, including types, features, and popular brands
        </Typography>
      </CardContent>
     
    </Card>
    <Card sx={{ maxWidth: 345,marginTop:20,marginLeft:10,":hover":{transform:"scale(1.05)",boxShadow:6,backgroundColor:'grey'}}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={img2}
      />
      <CardContent>
      <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy'}}>
          SMART WATCHES
        </Typography>
        <Typography variant="body2" sx={{ fontFamily:'fantasy' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      
    </Card>
    
    
    
    </Box>
<Box sx={{display:'flex',flexDirection:'row'}}>
    <Card sx={{ maxWidth: 345,marginTop:20,marginLeft:40,":hover":{transform:"scale(1.05)",boxShadow:6,backgroundColor:'grey'}}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={img2}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy'}}>
          SECOND USER WATCHES
        </Typography>
        <Typography variant="body2" sx={{ fontFamily:'fantasy' }}>
        Looking for a high-quality timepiece at an affordable price? Our Second User Watches collection offers pre-loved luxury and classic watches that are both stylish and functional.
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
    <Card sx={{ maxWidth: 345,marginTop:20,marginLeft:10,":hover":{transform:"scale(1.05)",boxShadow:6,backgroundColor:'grey'}}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={img2}
      />
      <CardContent>
      <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy'}}>
      SPARE PARTS
        </Typography>
        <Typography variant="body2" sx={{ fontFamily:'fantasy' }}>
        Looking for spare parts to fix or upgrade your watch? Our collection of watch spare parts offers high-quality components that help you maintain, repair, and customize your timepieces.
        </Typography>
      </CardContent>
     
    </Card>
    
    
    </Box>
    <Box sx={{fontSize:30,marginTop:10,justifyContent:'center',display:'flex',position:'relative',fontFamily:'fantasy',marginLeft:10,":hover":{transform:"scale(1.05)",boxShadow:6}}}>SHOP BY BRANDS </Box>

    <Box sx={{marginTop:10,display:'flex'}}>
      
   
<Box sx={{marginLeft:10,":hover":{transform:"scale(1.05)",boxShadow:6,}}}>
<img src={img9}width={220} marginLeft={50}></img>

</Box>
<Box sx={{marginLeft:20,":hover":{transform:"scale(1.05)",boxShadow:6,}}}>
<img src={img8}width={220} marginLeft={50}></img>

</Box>
<Box sx={{marginLeft:20,":hover":{transform:"scale(1.05)",boxShadow:6,}}}>
<img src={img6}width={220} marginLeft={50}></img>

</Box>
<Box sx={{marginLeft:20,":hover":{transform:"scale(1.05)",boxShadow:6,}}}>
<img src={img5}width={220} marginLeft={50}></img>

</Box>

</Box>
<Box sx={{marginTop:10,display:'flex'}}>
      
   
      <Box sx={{marginLeft:10,":hover":{transform:"scale(1.05)",boxShadow:6,}}}>
      <img src={img21}width={220} marginLeft={50}></img>
      
      </Box>
      <Box sx={{marginLeft:20,":hover":{transform:"scale(1.05)",boxShadow:6,}}}>
      <img src={img22}width={220} marginLeft={50}></img>
      
      </Box>
      <Box sx={{marginLeft:20,":hover":{transform:"scale(1.05)",boxShadow:6,}}}>
      <img src={img24}width={220} marginLeft={50}></img>
      
      </Box>
      <Box sx={{marginLeft:20,":hover":{transform:"scale(1.05)",boxShadow:6,}}}>
      <img src={img5}width={220} marginLeft={50}></img>
      
      </Box>
</Box>
      
        

<Box sx={{fontSize:30,marginTop:10,justifyContent:'center',display:'flex',flexDirection:'',fontFamily:'fantasy',marginLeft:10,":hover":{transform:"scale(1.05)",boxShadow:6}}}>HAPPY CUSTOMERS<EmojiEmotionsIcon></EmojiEmotionsIcon></Box>
<Box sx={{marginRight:88,marginTop:10,borderRadius:50,display:'flex'}}>
<Box sx={{marginLeft:20,":hover":{transform:"scale(1.05)",boxShadow:6,}}}>
<img src={img10}width={200} marginLeft={50}></img>
<Rating name="half-rating" defaultValue={2.5} precision={0.5} />
<Box sx={{fontFamily:'fantasy'}}>Akshay</Box>

 <Box sx={{fontFamily:'fantasy'}}>Watches brought are good</Box> 
</Box>
<Box sx={{marginLeft:20,":hover":{transform:"scale(1.05)",boxShadow:6,}}}>
<img src={img1}width={200} marginLeft={50}></img>

<Box><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Box> 
<Box  sx={{fontFamily:'fantasy'}}>Abin</Box>
 <Box sx={{fontFamily:'fantasy'}}>Overall Its good</Box> 
</Box>
<Box sx={{marginLeft:20 ,":hover":{transform:"scale(1.05)",boxShadow:6,}}}>
<img src={img12}width={200} height={300} marginLeft={50}></img>

<Box><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Box> 
<Box  sx={{fontFamily:'fantasy'}}>Bhadra</Box>
 <Box sx={{fontFamily:'fantasy'}}>The products are actually good</Box> 
</Box>
<Box sx={{marginLeft:20 ,":hover":{transform:"scale(1.05)",boxShadow:6,}}}>
<img src={img13}width={200} height={300} marginLeft={50}></img>

<Box><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Box> 
<Box  sx={{fontFamily:'fantasy'}}>R-Akshay</Box>

 <Box sx={{fontFamily:'fantasy'}}>All products are good</Box> 
</Box>

</Box>
<Box sx={{marginRight:88,marginTop:10,borderRadius:50,display:'flex'}}>
<Box sx={{marginLeft:20,":hover":{transform:"scale(1.05)",boxShadow:6,}}}>
<img src={img14}width={200} height={300} marginLeft={50}></img>
<Box><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Box>
<Box  sx={{fontFamily:'fantasy'}}>Bijo</Box>
 <Box sx={{fontFamily:'fantasy'}}>Really Amazing</Box> 
</Box>
<Box sx={{marginLeft:20,":hover":{transform:"scale(1.05)",boxShadow:6,}}}>
<img src={img15}width={200}height={300} marginLeft={50}></img>
<Box><Rating name="half-rating" defaultValue={2.5} precision={0.5} /></Box>
<Box sx={{fontFamily:'fantasy'}}>Aparna</Box>
 <Box sx={{fontFamily:'fantasy'}}>Really Amazing Products </Box> 
</Box>
</Box>
</div>
<Footer/>

    </div>
  )
}

export default Home