import React, { useEffect, useState } from "react";
import Styles from "../navbar/navbar.module.css";
import Avatar from "@mui/material/Avatar";
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
    fetchShop();
  }, []);
  
  const fetchShop = () => {
    const id = sessionStorage.getItem("Sid");
    axios.get(`http://localhost:5000/shopRegById/${id}`).then((res) => {
      const Shop = res.data.shop;
      // Set each individual field with data
      setProfile(Shop.profileImage);
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
            <h3>  <Link to={'/shop'}style={{color:'orange',textDecoration:'none'}}><HomeIcon></HomeIcon>Home</Link></h3>
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
              {/* <Link to={"/login"} style={{color:'orange',textDecoration:'none',marginRight:8}}>Logout</Link> */}
              <LogoutIcon></LogoutIcon><Link to={"/*"} style={{textDecoration:'none',color:'orange'}}>Logout</Link>
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
              <Avatar alt="Remy Sharp" src={profileImage} />
            </h3> 
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
