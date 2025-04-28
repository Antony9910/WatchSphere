import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Styles from "../navbar/navbar.module.css";

import { Box, IconButton, InputBase, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import MessageIcon from "@mui/icons-material/Message";
import axios from "axios";
import img from './images/W.jpg';

const Navbar = () => {
  const [profileImage, setProfile] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAgent();
  }, []);

  const fetchAgent = () => {
    const id = sessionStorage.getItem("Aid");
    axios.get(`http://localhost:5000/AgentRegById/${id}`).then((res) => {
      const Agent = res.data.agent;
      setProfile(Agent.profileImage);
      setName(Agent.name);
    }).catch((err) => {
      console.error(err);
    });
  };

  const handleLogout = () => {
    sessionStorage.removeItem("Aid"); 
    sessionStorage.clear(); 

    // Navigate to the login page and prevent going back to the previous page
    navigate('/login');  // 'replace: true' ensures the page is not added to the history
  };

  return (
    <div className={Styles.navbar}>
      <div className={Styles.leftSection}>
        <Box sx={{ marginLeft: 10 }}>
          <img src={img} width={80} height={70} alt="Image" style={{ borderRadius: 50 }} />
        </Box>
        <div className={Styles.logo}>
          <span><h3>WATCH-SPHERE</h3></span>
        </div>
      </div>

      <Box sx={{ flexGrow: 1, display: "flex", marginLeft: 69 }}>
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
              ":hover": { transform: "scale(1.05)", boxShadow: 6 }, color: 'orange'
            }}
          >
            <h3>
              <Link to={'/agent'} style={{ color: 'orange', textDecoration: 'none' }}><HomeIcon />Home</Link>
            </h3>
          </Box>

          <Box
            sx={{
              marginLeft: 2,
              ":hover": { transform: "scale(1.05)", boxShadow: 6 }, color: 'orange',
            }}
          >
            <h3>
              <Link to={'/*'} style={{ color: 'orange', textDecoration: 'none' }}><LogoutIcon />Logout</Link>
            </h3>
          </Box>

          <Box
            sx={{
              marginLeft: 2,
              ":hover": { transform: "scale(1.05)", boxShadow: 6 }, color: 'white',
            }}
          >
            <h3>
              <MessageIcon />
            </h3>
          </Box>

          <Box
            sx={{
              marginLeft: 2,
              ":hover": { transform: "scale(1.05)", boxShadow: 6 }, color: 'white',
            }}
          >
            <Avatar alt="Remy Sharp" src={profileImage} />
            <Box sx={{ fontFamily: 'fantasy' }}></Box>
          </Box>
        </div>
      </Box>

      {/* <Box
        sx={{
          marginLeft: 2,
          ":hover": { transform: "scale(1.05)", boxShadow: 6 },
        }}
      >
        <IconButton onClick={handleLogout} style={{ color: 'orange' }}>
          <LogoutIcon />
        </IconButton>
      </Box> */}
    </div>
  );
};

export default Navbar;
