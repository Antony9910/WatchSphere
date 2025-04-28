import React, { useEffect, useState } from "react";
import Styles from "../navbar/navbar.module.css";
import Avatar from "@mui/material/Avatar";
import img from './images/W.jpg';
import SearchIcon from "@mui/icons-material/Search";
import { Link } from 'react-router-dom';
import { InputBase, IconButton, Box } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import axios from "axios"; // Make sure axios is imported

const Navbar = () => {
  

  return (
    <div className={Styles.navbar}>
      <div className={Styles.leftSection}>
        <Box sx={{ marginLeft: 21, marginTop: 1 }}>
          <img src={img} width={80} height={70} alt="Logo" style={{ borderRadius: 50 }} />
        </Box>
        <div className={Styles.logo}>
          <span><h3>WATCH-SPHERE</h3></span>
        </div>
      </div>

      <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", marginLeft: 50 }}>
        <div className={Styles.searchBar} style={{ display: "flex", alignItems: "center" }}>
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

          {/* Navigation Links */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, marginLeft: 20 }}>
            {/* Home */}
            <Box
              sx={{
                ":hover": { transform: "scale(1.05)", boxShadow: 6 },
                color: 'orange',
              }}
            >
              <h3>
                <Link to={"/admin"} style={{ color: 'orange', textDecoration: 'none' }}>
                  <HomeIcon /> Home
                </Link>
              </h3>
            </Box>

            {/* Logout with Avatar and Admin Name */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                ":hover": { transform: "scale(1.05)", boxShadow: 6 },
                color: 'orange',
              }}
            >
              <h3 style={{ margin: 0 }}>
                <LogoutIcon />
                <Link to={"/*"} style={{ textDecoration: 'none', color: 'orange', marginRight:-30 }}>
                  Logout
                </Link>
              </h3>
            
        
            </Box>
            
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default Navbar;
