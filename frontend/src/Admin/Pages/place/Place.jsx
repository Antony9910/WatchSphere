import React, { useEffect, useState } from "react";
import Styles from "./place.module.css";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TableBody,
  Select,
  MenuItem,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Card, CardContent, Typography } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import NativeSelect from "@mui/material/NativeSelect";
import EditIcon from "@mui/icons-material/Edit";

import axios from "axios";
const Place = () => {
  const [Place, setPlace] = useState("");
  const [PlaceRows, setPlaceRows] = useState([]);
  const [districtRows, setDistrictRows] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [placeEditId, setPlaceEditId] = useState(null);

  useEffect(() => {
    fetchPlace();
  }, []);
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

  const fetchPlace = () => {
    axios
      .get("http://localhost:5000/PlacePost")
      .then((res) => {
        console.log(res.data.place);
        setPlaceRows(res.data.place);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Update
  const handleUpdate = (id) => {
    axios
      .get(`http://localhost:5000/PlaceById/${id}`)
      .then((res) => {
        const result = res.data.place;
        setPlaceEditId(result._id);
        setPlace(result.placeName);
        fetchPlace();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //Delete
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/PlaceDelete/${id}`)
      .then((res) => {
        console.log(res.data.message);
        alert(res.data.message);
        fetchPlace();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  //POST

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hi");

    const data = {
      placeName: Place,
      districtId: selectedDistrict,
    };
    if (placeEditId == null) {
      axios
        .post("http://localhost:5000/PlacePost", data)
        .then((res) => {
          setPlace("");
          setSelectedDistrict("");
          alert(res.data.message);
          fetchPlace();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      axios
        .put(`http://localhost:5000/Place/${placeEditId}`, data)
        .then((res) => {
          setPlace("");
          setSelectedDistrict("");
          alert(res.data.message);
          fetchPlace();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  return (
    <h2
      style={{
        textAlign: "center",
        color: "blue",
        fontSize: "40px",
        fontFamily: "fantasy",
      }}
    >
      <Person2Icon></Person2Icon>Add-PLACE
      <Box sx={{ marginTop: 2 }}>
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
            id="fullWidth"
            focused
            value={Place}
            placeholder="Enter place"
            onChange={(e) => setPlace(e.target.value)}
            sx={{ width: "20%" }}
          />
          <Box>
            <FormControl fullWidth sx={{width:300}}>
              <InputLabel id="demo-simple-select-label">District</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedDistrict}
                label="District"
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                {districtRows &&
                  districtRows.map((row,index) => (
                    <MenuItem key={index} value={row._id}>{row.districtName}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ marginTop: 0 }}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </Stack>
      </Box>
      <Card
        sx={{ maxWidth: 1000, margin: "0 auto", padding: 2, marginTop: -0 ,backgroundColor:'grey'}}
      >
        <CardContent></CardContent>

        <TableContainer component={Paper}>
          <Table
            sx={{ maxWidth: "100%", margin: "0 auto" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontFamily: "fantasy" }}>SL.NO</TableCell>
                <TableCell sx={{ fontFamily: "fantasy" }}>place</TableCell>
                <TableCell sx={{ fontFamily: "fantasy" }}>District</TableCell>
                <TableCell sx={{ fontFamily: "fantasy" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            
              {PlaceRows &&
                PlaceRows.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.placeName}</TableCell>
                    <TableCell>{row.districtId.districtName }</TableCell>

                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(row._id)}
                        sx={{ marginRight: 1 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <EditIcon
                        variant="contained"
                        color="info"
                        sx={{ marginTop: 2 }}
                        onClick={() => handleUpdate(row._id)}
                      ></EditIcon>
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

export default Place;
