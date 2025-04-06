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

const SellerList = () => {
  const [sellerRows, setSellerRows] = useState([]);

  useEffect(() => {
    fetchSeller();
  }, []);

  const fetchSeller = () => {
    axios
      .get("http://localhost:5000/sellerReg")
      .then((res) => {
        console.log(res.data.seller);
        setSellerRows(res.data.seller);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/sellerReg/${id}`)
      .then((res) => {
        console.log(res.data.message);
        alert(res.data.message);
        fetchSeller();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleApprove = (id) => {
    axios
      .post(`http://localhost:5000/SellerReg/${id}`)
      .then((res) => {
        console.log(res.data.message);
        alert(res.data.message);
        fetchSeller();
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
        <Person2Icon sx={{ fontSize: 40,fontFamily:'fantasy' }} /> SELLER_LIST
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
            {sellerRows.map((seller, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">
                  <img
                    src={seller.profileImage}
                    alt="Profile"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </TableCell>
                <TableCell align="center" sx={{fontFamily:'cursive'}}>{seller.name}</TableCell>
                <TableCell align="center"sx={{fontFamily:'cursive'}}>{seller.email}</TableCell>
                <TableCell align="center"sx={{fontFamily:'cursive'}}>{seller.address}</TableCell>
                <TableCell align="center">
                  <Link
                    to={seller.profileImage}
                    target="_blank"
                    style={{ textDecoration: "none",fontFamily:'cursive' }}
                  >
                    {seller.name} PROOF
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => handleApprove(seller._id)}
                    sx={{ marginRight: 2,fontFamily:'cursive' }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleDelete(seller._id)} sx={{fontFamily:'cursive'}}
                  >
                    Reject
                  </Button>
                </TableCell>
                <TableCell align="center">
    {seller.isApproved ? (
    <Typography color="green"sx={{fontFamily:'cursive'}}>Approved</Typography>
  ) : (
    <Typography color="orange"sx={{fontFamily:'cursive'}}>Pending</Typography>
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

export default SellerList;
