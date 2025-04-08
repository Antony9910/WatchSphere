import { Box } from '@mui/material'
import React from 'react'
import img1 from './images/insta.jpg';
import img2 from './images/facebook.jpg';
import img3 from './images/twitter.png';

import img4 from './images/visa.png';

const Footer = () => {
  return (
    <Box sx={{backgroundColor:'black',height:'34vh',display:'flex',marginTop:2,width:'130%',position:'relative'}}>
    <Box sx={{color:'white',marginLeft:20}}>
      <Box sx={{fontFamily:'fantasy',marginTop:2,marginLeft:10}}>CONATCT US</Box>
      <Box sx={{marginLeft:10,marginTop:3}}>100-100-100</Box>
      <Box sx={{marginLeft:10,marginTop:3}}>customercare@gmail.com</Box>
      <Box sx={{marginLeft:10,marginTop:3}}>Help & Contact</Box>
      <Box sx={{marginLeft:10,marginTop:3,color:'orange',fontFamily:'fantasy'}}>@CopyRight-WatchSphere</Box>
      </Box>
      <Box></Box>
      <Box sx={{color:'white',marginLeft:20}}>
      <Box sx={{fontFamily:'fantasy',marginTop:2,marginLeft:10}}>FOLLOW US ON</Box>
      <Box sx={{display:'flex'}}>
      <Box sx={{marginLeft:10,marginTop:3}}><img src={img1} width={40}height={40}></img></Box>
      <Box sx={{marginLeft:5,marginTop:3}}><img src={img2} width={40}height={40}></img></Box>
      <Box sx={{marginLeft:5,marginTop:3}}><img src={img3} width={40}height={40}></img></Box>
      </Box>
      
      </Box>
      <Box sx={{color:'white',marginLeft:30,}}>
      <Box sx={{fontFamily:'fantasy',marginTop:2,marginLeft:10}}>WE ACCEPT</Box>
      <Box sx={{display:'flex'}}>
      <Box sx={{marginLeft:10,marginTop:3}}><img src={img4} width={40}height={40}></img></Box>
      <Box sx={{marginLeft:5,marginTop:3}}><img src={img2} width={40}height={40}></img></Box>
      <Box sx={{marginLeft:5,marginTop:3}}><img src={img3} width={40}height={40}></img></Box>
      </Box>
      
      </Box>
    </Box>

      
  )
}

export default Footer