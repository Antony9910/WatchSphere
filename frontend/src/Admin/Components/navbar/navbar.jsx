import React from "react";
import Styles from "../navbar/navbar.module.css";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import img from './images/W.jpg';
import SearchIcon from "@mui/icons-material/Search";
import { Link } from 'react-router-dom';
import { InputBase, IconButton, Box, Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';

const Navbar = () => {
  return (
    <div className={Styles.navbar}>
      <div className={Styles.leftSection}>
      <Box sx={{marginLeft:20,marginTop:1}}>
  <img src={img}  width={80} height={70}alt="Image" style={{borderRadius:50}} />
</Box>
        <div className={Styles.logo}>
          <span><h3>WATCH-SPHERE</h3></span>
        </div>
      </div>
     
      <Box sx={{ flexGrow: 1, display: "flex", marginLeft:50 }}>
        <div className={Styles.searchBar}>
          <InputBase
            sx={{
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "20px",
              padding: "5px 15px",
              width: "300px",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.3)",
              },
            }}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton sx={{ padding: "10px" }} aria-label="search">
            <SearchIcon style={{ color: "white" }} />
          </IconButton>
          <Box
            sx={{
              marginLeft: 2,
              ":hover": { transform: "scale(1.05)", boxShadow: 6 },color:'orange'
            }}
          >
            <h3>  <Link to={"/*"}style={{color:'orange',textDecoration:'none'}}><HomeIcon></HomeIcon>Home</Link></h3>
          </Box>
          <Box
            sx={{
              marginLeft: 2,
              ":hover": { transform: "scale(1.05)", boxShadow: 6,color:'orange' },
            }}
          >
              <h3><Link to={"/about"} style={{ color: 'orange',textDecoration:'none' }}><InfoIcon></InfoIcon>About</Link></h3>
          </Box>
          {/* <Box
            sx={{
              marginLeft: 2,
              ":hover": { transform: "scale(1.05)", boxShadow: 6 },
            }}
          >
            <h3>Contact</h3>
          </Box> */}
          {/* <Box
            sx={{
              marginLeft: 2,
              ":hover": { transform: "scale(1.05)", boxShadow: 6 },color:'orange'
            }}
          >
            <h3><Link to={"/Register"} style={{color:'orange',textDecoration:'none'}}>Registration</Link></h3>
          </Box> */}
          <Box
            sx={{
              marginLeft: 2,
              ":hover": { transform: "scale(1.05)", boxShadow: 6 },color:'orange',
            }}
          >
             <h3>
              {/* <Link to={"/login"} style={{color:'orange',textDecoration:'none',marginRight:8}}>Login</Link> */}
              <LogoutIcon></LogoutIcon><Link to={'/*'}>Logout</Link>
            </h3> 
          </Box>
        </div>
      </Box>

      {/* Icons Section */}
      <div className={Styles.rightSection}>
        {/* <Stack direction="row" spacing={2}>
          <Avatar className={Styles.avatar} />
          
        </Stack> */}

        <div className={Styles.iconButtons}>
          <NotificationsIcon className={Styles.icon} />
          <MessageIcon className={Styles.icon} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
