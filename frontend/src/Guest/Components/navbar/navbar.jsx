import React, { useState } from "react";
import Styles from "../navbar/navbar.module.css";
import Avatar from "@mui/material/Avatar";
import img from './images/W.jpg';
import SearchIcon from "@mui/icons-material/Search";
import { Link } from 'react-router-dom';
import { InputBase, IconButton, Box, Menu, MenuItem, Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  
  // Handles the click event to open the dropdown menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Closes the dropdown menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={Styles.navbar}>
      <div className={Styles.leftSection}>
        <Box sx={{ marginRight: 2 }}> 
          <img src={img} width={80} height={70} alt="Image" style={{ borderRadius: 50 }} />
        </Box>

        <div className={Styles.logo}>
          <span><h3>WATCHSPHERE</h3></span>
        </div>
      </div>

      <Box sx={{ flexGrow: 1, display: "flex", marginLeft: 75 }}>
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
          
          {/* Home Link */}
          <Box sx={{ marginLeft: 2, ":hover": { transform: "scale(1.05)", boxShadow: 6 }, color: 'orange' }}>
            <h3><Link to={"/*"} style={{ color: 'orange', textDecoration: 'none' }}><HomeIcon />Home</Link></h3>
          </Box>

          {/* About Link */}
          <Box sx={{ marginLeft: 2, ":hover": { transform: "scale(1.05)", boxShadow: 6, color: 'orange' } }}>
            <h3><Link to={"/about"} style={{ color: 'orange', textDecoration: 'none' }}><InfoIcon />About</Link></h3>
          </Box>

          {/* Registration Dropdown */}
          <Box sx={{ marginLeft: 2 }}>
            <Button
              onClick={handleClick}
              sx={{
                color: 'orange',
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
                ":hover": { transform: "scale(1.05)", boxShadow: 6, },
              }}
            >
              <AppRegistrationIcon sx={{ marginRight: 1 }} />
              Registration
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link to="/Register" style={{ color: 'orange', textDecoration: 'none',fontFamily:'fantasy',   ":hover": { transform: "scale(1.05)", boxShadow: 6,color:'orange'}}}>
                  User Registration
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/SellerRegister" style={{ color: 'orange', textDecoration: 'none' ,fontFamily:'fantasy'}}>
                  Seller Registration
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/AgentRegister" style={{ color: 'orange', textDecoration: 'none',fontFamily:'fantasy' }}>
                  Shop Registration
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/AgentRegister" style={{ color: 'orange', textDecoration: 'none',fontFamily:'fantasy' }}>
                 Agent Registration
                </Link>
              </MenuItem>
            </Menu>
          </Box>

          {/* Login Link */}
          <Box sx={{ marginLeft: 2, ":hover": { transform: "scale(1.05)", boxShadow: 6}, color: 'orange' }}>
            <h3><Link to={"/login"} style={{ color: 'orange', textDecoration: 'none', marginRight: 8 }}><LoginIcon />Login</Link></h3>
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default Navbar;
