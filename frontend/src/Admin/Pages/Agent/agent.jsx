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

const AgentList = () => {
  const [agentRows, setAgentRows] = useState([]);

  useEffect(() => {
    fetchAgent();
  }, []);

  const fetchAgent = () => {
    axios
      .get("http://localhost:5000/agentReg")
      .then((res) => {
        console.log(res.data.agent);
        setAgentRows(res.data.agent);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/agentReg/${id}`)
      .then((res) => {
        console.log(res.data.message);
        alert(res.data.message);
        fetchAgent();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleApprove = (id) => {
    axios
      .post(`http://localhost:5000/agentRegs/${id}`)
      .then((res) => {
        console.log(res.data.message);
        alert(res.data.message);
        fetchAgent();
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
        <Person2Icon sx={{ fontSize: 40 }} /> SELLER_LIST
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
            {agentRows.map((agent, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">
                  <img
                    src={agent.profileImage}
                    alt="Profile"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </TableCell>
                <TableCell align="center" sx={{fontFamily:'cursive'}}>{agent.name}</TableCell>
                <TableCell align="center"sx={{fontFamily:'cursive'}}>{agent.email}</TableCell>
                <TableCell align="center"sx={{fontFamily:'cursive'}}>{agent.address}</TableCell>
                <TableCell align="center">
                  <Link
                    to={agent.profileImage}
                    target="_blank"
                    style={{ textDecoration: "none",fontFamily:'cursive' }}
                  >
                    {agent.name} PROOF
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => handleApprove(agent._id)}
                    sx={{ marginRight: 2,fontFamily:'cursive' }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleDelete(agent._id)}sx={{fontFamily:'cursive'}}
                  >
                    Reject
                  </Button>
                </TableCell>
                <TableCell align="center">
    {agent.isApproved ? (
    <Typography color="green" sx={{fontFamily:'cursive'}}>Approved</Typography>
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

export default AgentList;
