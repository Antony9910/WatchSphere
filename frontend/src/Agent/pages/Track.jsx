import React from 'react'
import { Box, Button, FormControl, InputAdornment, InputLabel,MenuItem,Select, TextField} from '@mui/material'
import AddLocationIcon from '@mui/icons-material/AddLocation';
import SendIcon from '@mui/icons-material/Send';

const Track = () => {
  return (
    <Box>
    <Box sx={{fontFamily:'cursive',fontSize:30,marginLeft:70}}>TRACK PRODUCTS<AddLocationIcon></AddLocationIcon></Box>
    
    <Box sx={{marginLeft:70,marginTop:2}}>
    <TextField label="Location" color="secondary" placeholder='Enter Current Location' sx={{width:300}} focused  InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AddLocationIcon />
          </InputAdornment>
        ),
      }}/>
    </Box>
    <Box sx={{marginLeft:77,marginTop:2,fontFamily:'cursive'}}>
        <Button variant='contained' sx={{fontFamily:'cursive'}}><SendIcon></SendIcon>Send</Button>
    </Box>
    </Box>
  )
}

export default Track