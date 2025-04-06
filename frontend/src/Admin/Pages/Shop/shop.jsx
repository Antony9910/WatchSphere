import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { Button, Box, Typography, Container } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import StoreIcon from '@mui/icons-material/Store';

const ShopList = () => {
  const [shopRows, setShopRows] = useState([]);

  useEffect(() => {
    fetchShop();
  }, []);

  const fetchShop = () => {
    axios
      .get("http://localhost:5000/shopReg")
      .then((res) => {
        console.log(res.data.shop);
        setShopRows(res.data.shop);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/shopReg/${id}`)
      .then((res) => {
        console.log(res.data.message);
        alert(res.data.message);
        fetchShop();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleApprove = (id) => {
    axios
      .post(`http://localhost:5000/shopReg/${id}`)
      .then((res) => {
        console.log(res.data.message);
        alert(res.data.message);
        fetchShop();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Box sx={{ marginLeft: 10 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontFamily: "fantasy", color: "blue" }}
      >
        <StoreIcon sx={{ fontSize: 40 }} /> SHOP-LIST
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ width: "80%", marginLeft: 25 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell sx={{ fontFamily: "cursive" }} align="center">
                Profile-Pic
              </TableCell>
              <TableCell sx={{ fontFamily: "cursive" }} align="center">
                Name
              </TableCell>
              <TableCell sx={{ fontFamily: "cursive" }} align="center">
                Shop-Name
              </TableCell>
              <TableCell sx={{ fontFamily: "cursive" }} align="center">
                Email
              </TableCell>
              <TableCell sx={{ fontFamily: "cursive" }} align="center">
                Address
              </TableCell>
              <TableCell sx={{ fontFamily: "cursive" }} align="center">
                Proof
              </TableCell>
              <TableCell sx={{ fontFamily: "cursive" }} align="center">
                Action
              </TableCell>
              <TableCell sx={{ fontFamily: "cursive" }} align="center">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shopRows.map((shop, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">
                  <img
                    src={shop.profileImage}
                    alt="Profile"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </TableCell>
                <TableCell align="center" sx={{fontFamily:'cursive'}}>{shop.name}</TableCell>
                <TableCell align="center"sx={{fontFamily:'cursive'}}>{shop.shop}</TableCell>
                <TableCell align="center"sx={{fontFamily:'cursive'}}>{shop.email}</TableCell>
                <TableCell align="center"sx={{fontFamily:'cursive'}}>{shop.address}</TableCell>
                <TableCell align="center">
                  <Link
                    to={shop.profileImage}
                    target="_blank"
                    style={{ textDecoration: "none",fontFamily:'cursive' }}
                  >
                    {shop.name} PROOF
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => handleApprove(shop._id)}
                    sx={{ marginRight: 2,fontFamily:'cursive' }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleDelete(shop._id)}sx={{fontFamily:'cursive'}}
                  >
                    Reject
                  </Button>
                </TableCell>
                <TableCell align="center">
    {shop.isApproved ? (
    <Typography color="green">Approved</Typography>
  ) : (
    <Typography color="orange">Pending</Typography>
  )}
</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ShopList;
