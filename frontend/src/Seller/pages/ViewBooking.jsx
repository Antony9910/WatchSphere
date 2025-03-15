import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, CircularProgress, Button, Box } from "@mui/material";
import axios from "axios";

const ViewBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios
      .get('http://localhost:5000/prebook')
      .then((res) => {
        setBookings(res.data.bookings);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching bookings:', err);
        setLoading(false);
      });
  };

  return (
    <Box sx={{ padding: "40px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h3" color="primary" align="center" gutterBottom>
        Your Pre-Booked Watches
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      ) : (
        <>
          {Array.isArray(bookings) && bookings.length === 0 ? (
            <Typography variant="h6" color="textSecondary" align="center">
              No pre-booked watches found.
            </Typography>
          ) : (
            <Box 
              sx={{ 
                display: "flex", 
                flexWrap: "wrap", 
                justifyContent: "center", 
                gap: 4 
              }}
            >
              {bookings.map((booking) => (
                <Box 
                  key={booking._id} 
                  sx={{ 
                    width: { xs: "100%", sm: "48%", md: "30%" }, 
                    maxWidth: 400, 
                    borderRadius: 2, 
                    boxShadow: 3 
                  }}
                >
                  <Card sx={{ width: "100%" }}>
                    <CardContent>
                      <Typography variant="h6" color="primary" gutterBottom>
                        Product Name: {booking.ProductId ? booking.ProductId.productName : "Unknown Product"}
                      </Typography>
                      <Typography variant="body1" color="textSecondary" paragraph>
                        <strong>Seller:</strong> {booking.SellerId ? booking.SellerId.name : "Unknown Seller"}
                      </Typography>
                      <Typography variant="body1" color="textSecondary" paragraph>
  <strong>Price:</strong> {booking.ProductId ? booking.ProductId.price : "Unknown Seller"}
</Typography>
<Typography variant="body1" color="textSecondary" paragraph>
  <strong>img:</strong> 
  <img src={booking.SellerId ? booking.SellerId.profileImage : "default-image-path.jpg"} alt="Seller Image" width={20} />
</Typography>

                      

                   
                      {/* <Typography variant="body1" color="textSecondary" paragraph>
                        <strong>User:</strong> {booking.UserId ? booking.UserId.name : "Unknown Seller"}
                      </Typography> */}
                      <Box display="flex" justifyContent="space-between">
                        <Button variant="outlined" color="primary" size="small" sx={{fontFamily:'fantasy',backgroundColor:'blue'  }}>
                        ACCEPT
                        </Button>
                        <Button variant="contained" color="secondary" size="small">
                          Cancel Booking
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default ViewBooking;
