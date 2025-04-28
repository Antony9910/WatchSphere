import React, { useEffect, useState } from "react";
import axios from "axios";
import UpgradeIcon from '@mui/icons-material/Upgrade';
import EditIcon from '@mui/icons-material/Edit';
import ColorLensIcon from '@mui/icons-material/ColorLens';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useParams } from "react-router-dom";
import { Container, TextField, Button, Typography, Grid, Paper, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from "@mui/material";

const EditWatch = () => {
  const { watchId } = useParams();
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [company, setCompany] = useState("");
  const [watchCategory, setWatchCategory] = useState("");
  const [stock, setStock] = useState("");
  const [watchEditId, setWatchEditId] = useState(null);
  const [colorRows, setColorRows] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    fetchWatch();
    fetchColor();
  }, [watchId]);

  const fetchColor = () => {
    axios
      .get('http://localhost:5000/ColorPost')
      .then((res) => {
        console.log('Category Data:', res.data);
        if (res.data && res.data.color) {
          setColorRows(res.data.color); // Set the color rows in state
        }
      })
      .catch((err) => {
        console.error('Error fetching category:', err);
      });
  };

  const handleColorChange = (event) => {
    const { value } = event.target;
    setSelectedColors(value); // Set selected colors as an array
  };

  const fetchWatch = () => {
    axios
      .get(`http://localhost:5000/watch/${watchId}`)
      .then((res) => {
        const watch = res.data;
        setModel(watch.model);
        setPrice(watch.price);
        setStock(watch.stock);
        setCompany(watch.company);
        setProductDesc(watch.productDesc);
        setWatchCategory(watch.watchCategory);
        setWatchEditId(watchId);
        setColor(watch.color);
        setSelectedColors(watch.color || []); // Assuming spare data has a color array
      })
      .catch((err) => console.error("Error fetching product:", err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "model") {
      setModel(value);
    } else if (name === "price") {
      setPrice(value);
    } else if (name === "company") {
      setCompany(value);
    } else if (name === "stock") {
      setStock(value);
    } else if (name === "productDesc") {
      setProductDesc(value);
    } else if (name === "watchCategory") {
      setWatchCategory(value);
    } else if (name === "color") {
      setColor(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      model: model,
      price: price,
      company: company,
      stock: stock,
      watchCategory: watchCategory,
      productDesc: productDesc,
      color: selectedColors, // Send selected colors array
    };

    if (watchEditId !== null) {
      axios
        .put(`http://localhost:5000/watch/${watchId}`, data)
        .then((res) => {
          console.log("Product updated", res.data);
          alert("Product updated successfully!");
        })
        .catch((err) => console.error("Error updating product:", err));
    } else {
      axios
        .post("http://localhost:5000/watch", data)
        .then((res) => {
          alert(res.data.message);
          fetchWatch();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4"sx={{fontFamily:'fantasy'}}>
          EDIT-PRODUCT DETAILS<EditIcon></EditIcon>
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Model"
                variant="outlined"
                value={model}
                onChange={handleChange}
                name="model"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Watch Price"
                variant="outlined"
                value={price}
                onChange={handleChange}
                name="price"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Product Material"
                variant="outlined"
                value={company}
                onChange={handleChange}
                name="company"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Watch Stock"
                variant="outlined"
                value={stock}
                onChange={handleChange}
                name="stock"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ width: 260 }}>
                
                <InputLabel id="color-select-label">Color</InputLabel>
                <Select
                  labelId="color-select-label"
                  id="color-select"
                  multiple
                  value={selectedColors}
                  label="Color"
                  onChange={handleColorChange}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {colorRows.map((row, index) => (
                    <MenuItem key={index} value={row.color}>
                      <Checkbox checked={selectedColors.indexOf(row.color) > -1} />
                      <ListItemText primary={row.color} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={productDesc}
                onChange={(e) => setProductDesc(e.target.value)}
                required
                sx={{ width: 530 }}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit"sx={{fontFamily:'fantasy'}}>
                Update<UpgradeIcon></UpgradeIcon>
              </Button>
              <Button variant="contained" color="primary" type="submit"sx={{fontFamily:'fantasy',marginLeft:2}}>
                            <ArrowBackIcon></ArrowBackIcon> <Link to={'/shop/views'} style={{textDecoration:'none',color:'white'}}>Back To Product Views</Link>
                            </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EditWatch;
