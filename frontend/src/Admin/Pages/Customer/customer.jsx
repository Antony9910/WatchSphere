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
    <Box sx={{ marginLeft: 10 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: 'fantasy', color: 'blue' }}>
        <Person2Icon sx={{ fontSize: 40 }} /> Customer List
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ width: "80%", marginLeft: 25 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center" className={Styles.TableCell}></TableCell>
              <TableCell align="center" sx={{ fontFamily: 'fantasy' }}>Image</TableCell>
              <TableCell align="center" sx={{ fontFamily: 'fantasy' }}>Name</TableCell>
              <TableCell align="center" sx={{ fontFamily: 'fantasy' }}>Email</TableCell>
              <TableCell align="center" sx={{ fontFamily: 'fantasy' }}>Address</TableCell>
              <TableCell align="center" sx={{ fontFamily: 'fantasy' }}>Contact</TableCell>
              <TableCell align="center" sx={{ fontFamily: 'fantasy' }}>State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userRows.map((user, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%' }}
                  />
                </TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.address}</TableCell>
                <TableCell align="center">{user.contact}</TableCell>
                <TableCell align="center">{user.state}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserList;
