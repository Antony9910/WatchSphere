import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Box, Typography, Container } from '@mui/material';
import Person2Icon from '@mui/icons-material/Person2';
import Styles from './Customer.module.css';

const UserList = () => {
  const [userRows, setUserRows] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    axios
      .get("http://localhost:5000/userReg")
      .then((res) => {
        console.log(res.data.user);
        setUserRows(res.data.user);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
<Box sx={{marginLeft:10}}>
      <Box sx={{ padding: 1, borderRadius: 2, }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: 'fantasy' }}>
          <Person2Icon sx={{ fontSize: 40 }} /> Customer List
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ width:"50%", color: 'white',marginLeft:25 }} >
            <TableHead>
              <TableRow>
              <TableCell align="right" className={Styles.TableCell}></TableCell>
             
                <TableCell sx={{fontFamily:'fantasy'}}>Name</TableCell>
                <TableCell align="right" sx={{fontFamily:'fantasy'}}>Email</TableCell>
                <TableCell align="right"sx={{fontFamily:'fantasy'}} >Address</TableCell>
                <TableCell align="right"sx={{fontFamily:'fantasy'}}>Contact</TableCell>
                <TableCell align="right" sx={{fontFamily:'fantasy'}}>State</TableCell>
                <TableCell align="right" sx={{fontFamily:'fantasy'}}>District</TableCell>
                <TableCell align="right"sx={{fontFamily:'fantasy'}} >Place</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userRows.map((user, index) => (
                <TableRow key={index}>
                   <TableCell>{index+1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{user.address}</TableCell>
                  <TableCell align="right">{user.contact}</TableCell>
                  <TableCell align="right">{user.state}</TableCell>
                  <TableCell align="right">{user.district}</TableCell>
                  <TableCell align="right">{user.place}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      </Box>
  );
};

export default UserList;
