import React from 'react'

import { Box } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import img10 from './images/Antony.jpg'
import img11 from './images/Roshny.jpg'
import img12 from './images/Akshay.jpg'
import img13 from './images/Abin.jpg'
import img14 from './images/Stephin.jpg'
import img15 from './images/Rakku.jpg'
import img16 from './images/bijo.jpg'
import img17 from './images/1.png'
import img18 from './images/3.png'
import img19 from './images/4.png'
import Footer from '../../Components/footer/footer';
import Navbar from '../../Components/navbar/Navbar';



const About = () => {
  return (
    <div>
       
        <Box sx={{marginTop:5,fontSize:40,fontFamily:'fantasy',marginLeft:80,":hover":{transform:"scale(1.05)",boxShadow:30}}}>About-us</Box>
        <Box sx={{fontSize:20,marginBottom:2,fontStyle:'italic'}}><p>
        In this vibrant and dynamic marketplace, we bring together an extensive collection of watch brands and models from across the globe, creating a single, unified platform for watch enthusiasts of all kinds. Whether you're on the hunt for a classic analog timepiece, a cutting-edge digital watch, or the latest in smartwatch technology, our platform has something for every style, preference, and need. Sellers can easily list their watches with detailed information, including photos and specifications, while buyers can filter through the listings to find the perfect match with ease. This seamless experience not only enhances the shopping journey but also encourages the discovery of unique, rare, or new-to-market timepieces, making it a go-to destination for watch lovers worldwide.</p></Box>
        <Box sx={{fontSize:20,fontStyle:'italic'}}>Mr. Antony Augustine, the visionary Chairman of Watchsphere, founded the company on January 1, 2023, with a passion for watches and a commitment to delivering a seamless and user-friendly experience for customers. Through his relentless hard work, dedication, and strategic leadership, he has successfully developed an intuitive online platform that caters to the diverse needs of watch enthusiasts. Over the past two years, Watchsphere has grown significantly, and as of 2025, the company has achieved an impressive turnover of Rs 20,000, marking a major milestone in its journey.</Box>
        <Box sx={{marginTop:5,marginLeft:79,fontSize:40,fontFamily:'fantasy',":hover":{transform:"scale(1.05)",boxShadow:30}}}>FOUNDER</Box>
        <Box sx={{marginLeft:73,marginTop:5,display:'flex'}}>
        <Card sx={{ maxWidth: 305,marginRight:15 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="320"
          image={img10}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy'}}>
           Mr Antony Augustine
          </Typography>
          <Typography gutterBottom variant="h6" component="div" sx={{fontFamily:'fantasy'}}>
            Founder,CEO WatchSphere
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 305,marginLeft:10}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="320"
        
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:'fantasy'}}>
           ?
          </Typography>
          <Typography gutterBottom variant="h6" component="div" sx={{fontFamily:'fantasy'}}>
           
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    
        
        </Box>
        <Box sx={{marginTop:10,marginLeft:75,fontFamily:'fantasy',fontSize:40,":hover":{transform:"scale(1.05)",boxShadow:30}}}>TEAM-MEMBERS</Box>
        <Box sx={{marginRight:88,marginTop:10,borderRadius:50,display:'flex'}}>
<Box sx={{marginLeft:20,":hover":{transform:"scale(1.05)",boxShadow:6,}}}>
<img src={img11}width={200} marginLeft={50}></img>
<Box sx={{fontFamily:'fantasy'}}>Mrs Roshny Binu</Box>
  </Box>
<Box sx={{marginLeft:20,":hover":{transform:"scale(1.05)",boxShadow:6,}}}>
<img src={img12}width={200} marginLeft={50}></img>
<Box sx={{fontFamily:'fantasy'}}>Mr Akshay Sathyan</Box>
  </Box>
  <Box sx={{marginLeft:20,":hover":{transform:"scale(1.05)",boxShadow:6,}}}>
<img src={img13}width={200} marginLeft={50}></img>
<Box sx={{fontFamily:'fantasy'}}>Mr Abin Mathew</Box>
  </Box>
  <Box sx={{marginLeft:20,":hover":{transform:"scale(1.05)",boxShadow:6,}}}>
<img src={img14}width={200} marginLeft={50}></img>
<Box sx={{fontFamily:'fantasy'}}>Mr Stephin</Box>
  </Box>
  
  </Box>
  <Box sx={{marginRight:88,marginTop:10,borderRadius:50,display:'flex'}}>
<Box sx={{marginLeft:20,":hover":{transform:"scale(1.05)",boxShadow:6,}}}>
<img src={img15}width={200} marginLeft={50}></img>
<Box sx={{fontFamily:'fantasy'}}> Mr R Akshay</Box>
  </Box>
<Box sx={{marginLeft:20,":hover":{transform:"scale(1.05)",boxShadow:6,}}}>
<img src={img16}width={200} marginLeft={50}></img>
<Box sx={{fontFamily:'fantasy'}}>Mr Bio p Joy</Box>
  </Box>

  
  </Box>
  <Box sx={{marginTop:10,fontFamily:'fantasy',marginLeft:85,fontSize:40,":hover":{transform:"scale(1.05)",boxShadow:30}}}>Our vision</Box>
  <Box sx={{marginRight:88,marginTop:10,borderRadius:50,display:'flex'}}>
<Box sx={{marginLeft:20,":hover":{transform:"scale(1.05)",boxShadow:6,}}}>
<img src={img17}width={200} marginLeft={50}></img>
<Box sx={{fontFamily:'fantasy',marginLeft:5}}>User centric Design</Box>
  </Box>
  <Box sx={{marginLeft:20,":hover":{transform:"scale(1.05)",boxShadow:6,}}}>
<img src={img18}width={200} marginLeft={50}></img>
<Box sx={{fontFamily:'fantasy',marginLeft:5}}>Product Discovery</Box>
  </Box>
  <Box sx={{marginLeft:20,":hover":{transform:"scale(1.05)",boxShadow:6,}}}>
<img src={img19}width={200} marginLeft={50}></img>
<Box sx={{fontFamily:'fantasy',marginLeft:3,}}>Customer Engagement</Box>
  </Box>
  <Box sx={{marginLeft:20,":hover":{transform:"scale(1.05)",boxShadow:6,}}}>
<img src={img19}width={200} marginLeft={50}></img>
<Box sx={{fontFamily:'fantasy',marginLeft:3,}}>Customer Engagement</Box>
  </Box>
  
  </Box>

    <Footer/>
    </div>
  )
}

export default About