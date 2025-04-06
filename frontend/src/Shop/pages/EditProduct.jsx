import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, TextField, Button, Typography, Grid, Paper, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from "@mui/material";

const EditProduct = () => {
  const { spareId } = useParams();
  const [partName, setPartName] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [material, setMaterial] = useState("");
  const [watchCategory, setWatchCategory] = useState("");
  const [stock, setStock] = useState("");
  const [spareEditId, setSpareEditId] = useState(null);
  const [colorRows, setColorRows] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    fetchSpare();
    fetchColor();
  }, [spareId]);

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

  const fetchSpare = () => {
    axios
      .get(`http://localhost:5000/spare/${spareId}`)
      .then((res) => {
        const spare = res.data;
        setPartName(spare.partName);
        setPrice(spare.price);
        setStock(spare.stock);
        setMaterial(spare.material);
        setProductDesc(spare.productDesc);
        setWatchCategory(spare.watchCategory);
        setSpareEditId(spareId);
        setColor(spare.color);
        setSelectedColors(spare.color || []); // Assuming spare data has a color array
      })
      .catch((err) => console.error("Error fetching product:", err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "partName") {
      setPartName(value);
    } else if (name === "price") {
      setPrice(value);
    } else if (name === "material") {
      setMaterial(value);
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
      partName: partName,
      price: price,
      material: material,
      stock: stock,
      watchCategory: watchCategory,
      productDesc: productDesc,
      color: selectedColors, // Send selected colors array
    };

    if (spareEditId !== null) {
      axios
        .put(`http://localhost:5000/spare/${spareId}`, data)
        .then((res) => {
          console.log("Product updated", res.data);
          alert("Product updated successfully!");
        })
        .catch((err) => console.error("Error updating product:", err));
    } else {
      axios
        .post("http://localhost:5000/spare", data)
        .then((res) => {
          alert(res.data.message);
          fetchSpare();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Edit Product
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Part Name"
                variant="outlined"
                value={partName}
                onChange={handleChange}
                name="partName"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Spare Price"
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
                value={material}
                onChange={handleChange}
                name="material"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Spare Stock"
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
              <Button variant="contained" color="primary" type="submit">
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EditProduct;
