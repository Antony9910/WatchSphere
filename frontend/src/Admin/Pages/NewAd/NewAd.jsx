import React from 'react'
import Styles from './NewAd.module.css';
import { Box, Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import GroupIcon from '@mui/icons-material/Group';
import AddIcon from '@mui/icons-material/Add';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
const rows = [
        ('Frozen yoghurt', 159, 6.0, 24, 4.0),
  ('Ice cream sandwich', 237, 9.0, 37, 4.3),
  ('Eclair', 262, 16.0, 24, 6.0),
  ('Cupcake', 305, 3.7, 67, 4.3),
  ('Gingerbread', 356, 16.0, 49, 3.9),
];

const NewAd = () => {
  return (
    <div>
      
    <Box sx={{fontFamily:'fantasy'}}><AddLocationIcon></AddLocationIcon> NEW ADMIN</Box>
    
    <div className={Styles.container}>
      <TextField label="new-admin" color="secondary" placeholder="Enter new admin name" focused />
      <Button variant="contained" endIcon={<SendIcon />}>
      Send
    </Button>
    </div>
    <div>
    <h2 style={{ textAlign: 'center', color: 'blue', fontSize: '40px',fontFamily:'fantasy',marginRight:90 }}><AdminPanelSettingsIcon></AdminPanelSettingsIcon>Admin-List
    {/* <TableContainer>
      <Table sx={{ maxWidth: 650 ,height:50,alignItems:'center',marginLeft:80,marginTop:10,backgroundColor:'skyblue',color:'white'}} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Admin-Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              
              <TableCell >{row.carbs}</TableCell>
              <TableCell ><AddIcon></AddIcon><Button variant="contained" color="success">
  Add
</Button></TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}
    </h2>
    </div>
  </div>
  )
}

export default NewAd