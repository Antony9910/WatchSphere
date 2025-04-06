import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Container, Typography, CardMedia, CardContent, Button, Grid, Paper, Box, Card } from "@mui/material";

const WatchDetails = () => {
  const { watchId } = useParams();
  const [watch, setWatch] = useState(null);
  const [selectedColor, setSelectedColor] = useState(""); // State to track selected color

  // Fetch spare product details from API
  useEffect(() => {
    fetchWatch();
  }, []);

  const fetchWatch = () => {
    axios
      .get(`http://localhost:5000/watch/${watchId}`)
      .then((res) => {
        console.log(res.data); // Log the response data
        setWatch(res.data);
      })
      .catch((err) => console.error("Error fetching product:", err));
  };

  // Handle color selection
  const handleColorSelect = (color) => {
    setSelectedColor(color); // Update the selected color state
  };

  // If spare data is not yet loaded, display a loading message
  if (!watch) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h5">Loading product details...</Typography>
      </Container>
    );
  }

  // Check if the product is out of stock
  const isOutOfStock = Number(watch.stock) <= 0;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={4}>
          {/* Product Image Section */}
          <Grid item xs={12} md={5} sx={{ display: "flex", justifyContent: "center" }}>
            <CardMedia
              component="img"
              image={watch.profileImage || "https://via.placeholder.com/300"}
              alt={watch.model}
              sx={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
            />
          </Grid>

          {/* Product Details Section */}
          <Grid item xs={12} md={7}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold">{watch.company}</Typography>
              <Typography variant="h5" color="primary" sx={{ mt: 1 }}>₹{watch.price}</Typography>
              <Typography variant="body1" sx={{ mt: 1, fontFamily: "fantasy" }}>Category: {watch.watch_Category}</Typography>
              <Typography variant="body1" sx={{ mt: 1, fontFamily: "fantasy" }}>Stock: {watch.stock}</Typography>
              <Typography variant="body1">Selected Color: {selectedColor || "None"}</Typography>

              <Grid container spacing={2} sx={{ mt: 3 }}>
                {/* Add to Cart Button */}
                <Grid item>
                  {watch.stock > 0 ? (
                    <Link to={`/user/watchCart/${watchId}`} style={{ textDecoration: "none" }}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="large"
                        sx={{ backgroundColor: "orange", color: "white" }}
                      >
                        Add to Cart
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="large"
                      sx={{ backgroundColor: "orange", color: "white" }}
                      disabled
                    >
                      Out of Stock
                    </Button>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Paper>

      {/* Product Description */}
      <Card sx={{ maxWidth: 345, marginTop: 2 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            WATCH DESCRIPTION
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {watch.productDesc}
          </Typography>
        </CardContent>
      </Card>

      {/* Color Options Section */}
      <Box sx={{ display: "flex", mt: 2 }}>
        {Array.isArray(watch.color) && watch.color.length > 0 ? (
          watch.color.map((color, index) => (
            <Card
              sx={{ maxWidth: 345, marginTop: 2, marginLeft: index > 0 ? 2 : 0 }}
              key={color}
              onClick={() => handleColorSelect(color)} // Set color on click
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  AVAILABLE COLOUR
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  <img
                    src={watch.profileImage}
                    width={100}
                    alt={color}
                    style={{ objectFit: "cover", borderRadius: "5px" }}
                  />
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {color}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            No colors available
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default WatchDetails;
