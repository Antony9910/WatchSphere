import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Grid, Box, Chip } from "@mui/material";

const Book = () => {
   const [bookings, setBookings] = useState([]);
   const sellerId = sessionStorage.getItem("sid");

   useEffect(() => {
      const fetchBookings = async () => {
         try {
            const response = await axios.get(`http://localhost:5000/bookings/${sellerId}`);
            setBookings(response.data);
         } catch (error) {
            console.error("Error fetching bookings:", error);
         }
      };

      fetchBookings();
   }, [sellerId]);


   const getStatusColor = (status) => {
      switch (status.toLowerCase()) {
         case "pending":
            return "warning";
         case "confirmed":
            return "success";
         case "cancelled":
            return "error";
         case "completed":
            return "primary";
         default:
            return "default";
      }
   };

   return (
      <Box sx={{ maxWidth: "1200px", margin: "auto", padding: "20px", textAlign: "center" }}>
         <Typography variant="h4" sx={{fontFamily:'cursive'}} gutterBottom>
            📦 Seller Bookings
         </Typography>

         <Grid container spacing={3} justifyContent="center">
            {bookings.length > 0 ? (
               bookings.map((booking) => (
                  <Grid item xs={12} sm={6} md={4} key={booking._id}>
                     <Card sx={{ boxShadow: 3, borderLeft: `5px solid`, borderColor: getStatusColor(booking.status), transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
                        <CardContent>
                           <Box display="flex" justifyContent="space-between" alignItems="center">
                              
                              <Typography variant="h6" sx={{ fontWeight: "bold",fontFamily:'cursive' }}>
                                 {booking.productDetails.productName}
                              </Typography>
                              <Chip label={booking.status} color={getStatusColor(booking.status)} />
                           </Box>
                           <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                              <img src={booking.productDetails.profileImage} width={50}></img>
                           </Typography>
                           <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                              <strong>Booking ID:</strong> {booking._id}
                           </Typography>
                           <Typography variant="body2">
                              <strong>Price:</strong> ${booking.productDetails.price}
                           </Typography>
                           <Typography variant="body2">
                              <strong>Quantity:</strong> {booking.quantity}
                           </Typography>
                           <Typography variant="body2">
                              <strong>Total Price:</strong> {booking.totalPrice}
                           </Typography>
                           <hr style={{ margin: "10px 0" }} />
                           <Typography variant="body2">
                              <strong>Customer:</strong> {booking.userDetails.name}
                           </Typography>
                           <Typography variant="body2" sx={{fontFamily:'cursive'}}>
                              <strong>Email:</strong> {booking.userDetails.email}
                           </Typography>
                        </CardContent>
                     </Card>
                  </Grid>
               ))
            ) : (
               <Typography variant="h6" color="textSecondary">
                  No bookings found.
               </Typography>
            )}
         </Grid>
      </Box>
   );
};

export default Book;
