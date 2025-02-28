import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Person2Icon from '@mui/icons-material/Person2';
import DeleteIcon from '@mui/icons-material/Delete';


import {
  Box,
  Card,
  CardContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import Paper from "@mui/material/Paper";

const District = () => {
  const [district, setDistrict] = useState("");
  const [districtRows, setDistrictRows] = useState([]);
  const [districtEditId, setDistrictEditId] = useState(null);

  useEffect(() => {
    fetchDistrict();
  }, []);

  const fetchDistrict = () => {
    axios
      .get("http://localhost:5000/DistrictPost")
      .then((res) => {
        console.log(res.data.district);
        setDistrictRows(res.data.district);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Update
  const handleUpdate = (id) => {
    axios
      .get(`http://localhost:5000/DistrictById/${id}`)
      .then((res) => {
        const result = res.data.district;
        setDistrictEditId(result._id);
        setDistrict(result.districtName);
        fetchDistrict();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Delete
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/DistrictDelete/${id}`)
      .then((res) => {
        console.log(res.data.message);
        alert(res.data.message);
        fetchDistrict(); // Refresh list after delete
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hi");

    const data = {
      districtName: district,
    };
    if (districtEditId == null) {
      axios
        .post("http://localhost:5000/DistrictPost", data)
        .then((res) => {
          setDistrict("");
          alert(res.data.message);
          fetchDistrict();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      axios
        .put(`http://localhost:5000/District/${districtEditId}`, data)
        .then((res) => {
          setDistrict("");
          alert(res.data.message);
          fetchDistrict();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
<h1>Add</h1>
  return (
    <h2 style={{ textAlign: 'center', color: 'blue', fontSize: '40px',fontFamily:'fantasy'}}><Person2Icon></Person2Icon>Add-District
    <Box>
    <CardContent>
        <Stack
          spacing={2}
          direction="row"
          component={"form"}
          onSubmit={handleSubmit}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <TextField
            fullWidth
            label="Enter name"
            id="fullWidth"  focused 
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            sx={{ width: "10%" }}
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </CardContent>
    </Box>
    <Card sx={{ maxWidth: 1000, margin: "0 auto", padding: 2,marginTop:-0,backgroundColor:'grey'}}>
      

      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: "100%", margin: "0 auto" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{fontFamily:'fantasy'}}>SL.NO</TableCell>
              <TableCell sx={{fontFamily:'fantasy'}}>District</TableCell>
              <TableCell sx={{fontFamily:'fantasy'}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {districtRows &&
              districtRows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.districtName}</TableCell>
                  <TableCell>
                    <IconButton
                    aria-label="delete"
                      onClick={() => handleDelete(row._id)}
                      sx={{ marginRight: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Button
                      variant="contained"
                      color="info"
                      onClick={() => handleUpdate(row._id)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}                                           
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
    </h2>
  );
};

export default District;
