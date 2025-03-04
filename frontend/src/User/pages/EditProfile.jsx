import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TableBody from '@mui/material/TableBody';

const EditProfile=()=>{

  const {userRows,SetUserRows}=useState([]);
  useEffect(()=>{

    fetchUser();
  },[])

  const fetchUser=()=>{

    axios.get(`http://localhost:5000/userReg/${id}`).then((res)=>{

      console.log(res.data.user);
      SetUserRows(res.data.user);
    })
    .catch((err)=>
    {
      console.error(err)
    })
  }
  


  return (
   
      <Box sx={{marginBottom:10}}>
          <Card sx={{ width: 275,marginTop:10,marginLeft:30 }}>
      <CardContent>
      <TableBody>
              {userRows.map((user) => (
                <TableRow >
                   <TableCell>aaa</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{user.address}</TableCell>
                  <TableCell align="right">{user.contact}</TableCell>
                  <TableCell align="right">{user.state}</TableCell>
                  {/* <TableCell align="right">{user.district}</TableCell>
                  <TableCell align="right">{user.place}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
       

      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </Box>

  )
}

export default EditProfile