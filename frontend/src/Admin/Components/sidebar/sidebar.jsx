import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography, Avatar, Stack } from '@mui/material';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import Person2Icon from '@mui/icons-material/Person2';
import ShopIcon from '@mui/icons-material/Shop';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios';
import CopyrightIcon from '@mui/icons-material/Copyright';

const Sidebar = () => {
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = () => {
    const id = sessionStorage.getItem('aid');
    axios.get(`http://localhost:5000/adminName/${id}`)
      .then((res) => {
        const admin = res.data.admin;
        setAdminName(admin.adminName);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 200,
          boxSizing: 'border-box',
          backgroundColor: '#2e3b4e',
          color: 'white',
          paddingTop: 2,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ padding: 2, textAlign: 'center' }}>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Avatar alt="Admin" src="/static/images/avatar/1.jpg" sx={{ width: 56, height: 56 }} />
        </Stack>
        <Typography variant="h6" sx={{ color: 'white', marginTop: 1 }}>
          {adminName}
        </Typography>
      </Box>

      <List>
        {[
          { text: 'Home', icon: <HomeIcon sx={{ color: 'white' }} />, to: '/admin' },
          { text: 'District', icon: <AddLocationIcon sx={{ color: 'white' }} />, to: '/admin/district' },
          { text: 'Place', icon: <AddLocationIcon sx={{ color: 'white' }} />, to: '/admin/place' },
          { text: 'Agent List', icon: <Person2Icon sx={{ color: 'white' }} />, to: '/admin/Agent' },
          { text: 'User List', icon: <Person2Icon sx={{ color: 'white' }} />, to: '/admin/Customer' },
          { text: 'Seller List', icon: <Person2Icon sx={{ color: 'white' }} />, to: '/admin/seller' },
          { text: 'Shop List', icon: <ShopIcon sx={{ color: 'white' }} />, to: '/admin/Shop' },
        
        ].map((item) => (
          <ListItem
            button
            component={Link}
            to={item.to}
            key={item.text}
            sx={{
              '&:hover': {
                backgroundColor: 'orange'
              },
              '&.Mui-selected': {
                backgroundColor: '#777', // Change color when selected
              },
            }}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                color: 'white',
                '&.MuiListItemText-root:hover': {
                  color: 'white', // Ensures text remains white on hover
                }
              }}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ marginLeft: 2, display: 'flex', alignItems: 'center', marginTop: 20 }}>
  <CopyrightIcon sx={{ color: 'white' }} />
  <Box sx={{ marginLeft: 1,color:'white',fontSize:19 }}> 
    WatchSphere
  </Box>
  </Box>
    </Drawer>
  );
};

export default Sidebar;
