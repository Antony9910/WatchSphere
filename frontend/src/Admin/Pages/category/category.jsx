import React from 'react'
import Styles from './category.module.css';
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddLocationIcon from '@mui/icons-material/AddLocation';


const Category = () => {
  return (
    <div>
      
    <h1 className={Styles.heading}><AddLocationIcon></AddLocationIcon> DISTRICT</h1>
    
    <div className={Styles.container}>
      <TextField label="District" color="secondary" focused />
      <Button variant="contained" endIcon={<SendIcon />}>
      Send
    </Button>
    </div>
  </div>
  )
}

export default Category