import React, { useEffect, useState } from "react";
import Styles from "../navbar/navbar.module.css";

import Stack from "@mui/material/Stack";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import img from './images/W.jpg';
import SearchIcon from "@mui/icons-material/Search";
import { Link } from 'react-router-dom';
import { InputBase, IconButton, Box, Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Avatar from "@mui/material/Avatar";
import axios from "axios";
const UserAvatar = () => {
  const [anchorEl, setAnchorEl] = useState(null);  // state to manage the dropdown
  const navigate = useNavigate();  // navigate for redirection after sign out (optional)

  // Open menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); // set the element for dropdown
  };

  // Close menu
  const handleMenuClose = () => {
    setAnchorEl(null); // Close the dropdown
  };
}
const Navbar = () => {
   const [profileImage, setProfile] = useState('');
  
    useEffect(() => {
      fetchAgent();
    }, []);
    
    const fetchAgent = () => {
      const id = sessionStorage.getItem("aid");
      axios.get(`http://localhost:5000/AgentRegById/${id}`).then((res) => {
        const Agent = res.data.agent;
        // Set each individual field with data
        setProfile(Agent.profileImage);
      }).catch((err) => {
        console.error(err);
      });
    };
  return (
    <div className={Styles.navbar}>
      <div className={Styles.leftSection}>
      <Box sx={{marginLeft:10}}>
  <img src={img}  width={80} height={70}alt="Image" style={{borderRadius:50}} />
</Box>
        <div className={Styles.logo}>
          <span><h3>WATCH-SPHERE</h3></span>
        </div>
      </div>
     
      <Box sx={{ flexGrow: 1, display: "flex", marginLeft:69 }}>
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
            <h3>  <Link to={'/agent'}style={{color:'orange',textDecoration:'none'}}><HomeIcon></HomeIcon>Home</Link></h3>
          </Box>
          {/* <Box
            sx={{
              marginLeft: 2,
              ":hover": { transform: "scale(1.05)", boxShadow: 6,color:'orange' },
            }}
          >
              <h3><Link to={"/about"} style={{ color: 'orange',textDecoration:'none' }}><InfoIcon></InfoIcon>About</Link></h3>
          </Box> */}
          {/* <Box
            sx={{
              marginLeft: 2,
              ":hover": { transform: "scale(1.05)", boxShadow: 6 },
            }}
          >
            <h3>Contact</h3>
          </Box> */}
          <Box
            sx={{
              marginLeft: 2,
              ":hover": { transform: "scale(1.05)", boxShadow: 6 },color:'orange'
            }}
          >
            <AddShoppingCartIcon></AddShoppingCartIcon>Cart
            {/* <h3><Link to={"/Register"} style={{color:'orange',textDecoration:'none'}}>Registration</Link></h3> */}
          </Box>
          <Box
            sx={{
              marginLeft: 2,
              ":hover": { transform: "scale(1.05)", boxShadow: 6 },color:'orange',
            }}
          >
             <h3>
              {/* <Link to={"/login"} style={{color:'orange',textDecoration:'none',marginRight:8}}>Logout</Link> */}
              <Link to={'/*'} style={{color:'orange',textDecoration:'none'}}><LogoutIcon></LogoutIcon>Logout</Link>
            </h3> 
          </Box>
          <Box
            sx={{
              marginLeft: 2,
              ":hover": { transform: "scale(1.05)", boxShadow: 6 },color:'white',
            }}
          >
             <h3>
              {/* <Link to={"/login"} style={{color:'orange',textDecoration:'none',marginRight:8}}>Logout</Link> */}
              <MessageIcon></MessageIcon>
            </h3> 
          </Box>
          <Box
                      sx={{
                        marginLeft: 2,
                        ":hover": { transform: "scale(1.05)", boxShadow: 6 },color:'white',
                      }}
                    >
                         <Avatar alt="Remy Sharp" src={profileImage} />
                        
           
          
                       
                    </Box>
        </div>
      </Box>

      {/* Icons Section */}
      {/* <div className={Styles.rightSection}>
        <Stack direction="row" spacing={2}>
          <Avatar className={Styles.avatar} />
          
        </Stack>

        <div className={Styles.iconButtons}>
          <NotificationsIcon className={Styles.icon} />
          <MessageIcon className={Styles.icon} />
        </div>
      </div> */}
    </div>
  );
};

export default Navbar;
