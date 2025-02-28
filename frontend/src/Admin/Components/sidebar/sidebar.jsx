import React from 'react';
import { Link } from 'react-router-dom';
import Styles from '../sidebar/sidebar.module.css';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import Person2Icon from '@mui/icons-material/Person2';
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone';
import ShopIcon from '@mui/icons-material/Shop';
import { Box } from '@mui/material';

const Sidebar = () => {
  return (
    <div className={Styles.sidebar}>
      <div className={Styles.avatarContainer}>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={Styles.avatar} />
        </Stack>
      </div>

      <div className={Styles.links}>
        
        <Link to={'/admin/district'} className={Styles.linkItem}>
          <AddLocationIcon className={Styles.icon} /> <Box sx={{fontFamily:'fantasy'}}>District</Box>
        </Link>
        <Link to={'/admin/place'} className={Styles.linkItem}>
          <AddLocationIcon className={Styles.icon} /><Box sx={{fontFamily:'fantasy'}}>Place</Box> 
        </Link>
        {/* <Link to={'/admin/category'} className={Styles.linkItem}>
          <Person2Icon className={Styles.icon} /> Category
        </Link> */}
        <Link to={'/admin/seller'} className={Styles.linkItem}>
          <Person2Icon className={Styles.icon} /> Seller-List
        </Link>
        <Link to={'/admin/Shop'} className={Styles.linkItem}>
          <ShopIcon className={Styles.icon} /> Shop-List
        </Link>
        <Link to={'/admin/Customer'} className={Styles.linkItem}>
          <Person2Icon className={Styles.icon} /> Customer-List
        </Link>
        <Link to={'/admin/Agent'} className={Styles.linkItem}>
          <Person2Icon className={Styles.icon} /> Agent-List
        </Link>
        {/* <Link to={'/admin/subcategory'} className={Styles.linkItem}>
          <Person2Icon className={Styles.icon} /> Sub-category
        </Link> */}
        <Link to={'/admin/brand'} className={Styles.linkItem}>
          <Person2Icon className={Styles.icon} /> Brand
        </Link>
        <Link to={'/admin/newAd'} className={Styles.linkItem}>
          <AdminPanelSettingsTwoToneIcon className={Styles.icon} /> NewAd
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
