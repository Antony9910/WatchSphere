import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, CircularProgress, Paper, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import WatchIcon from '@mui/icons-material/Watch';
import { jsPDF } from 'jspdf'; // Import jsPDF

const ShopsBill = () => {
  const { ShopBookingId } = useParams();
  console.log(ShopBookingId);
   // Extract bookingId from the URL
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (ShopBookingId) {
      axios
        .get(`http://localhost:5000/SpareBookingDetail/${ShopBookingId}`)
        .then((response) => {
          setBookingDetails(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError('Error fetching booking details');
          setLoading(false);
        });
    }
  }, [ShopBookingId]);

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Paper>
    );
  }

  const handleDownload = () => {
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(20);
    doc.text('BILL', 20, 20);
    
    if (bookingDetails) {
      doc.setFontSize(12);
      doc.text(`Product Name: ${bookingDetails.SpareId?.partName}`, 20, 30);
      doc.text(`Model Number: ${bookingDetails.SpareId?.material}`, 20, 40);
      doc.text(`Price: ₹${bookingDetails.totalPrice}`, 20, 50);
      doc.text(`Quantity: ${bookingDetails.color}`, 20, 60);
   
      // Add image if it exists
      if (bookingDetails.SpareId?.profileImage) {
        doc.addImage(bookingDetails.SpareId?.profileImage, 'JPEG', 20, 80, 50, 50);
      }
    }
    
    // Save the PDF
    doc.save('bill.pdf');
  };

  return (
    <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
      <Card sx={{ maxWidth: 500, width: '100%' }}>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontFamily: 'cursive', marginLeft: 14 }}>
            <WatchIcon></WatchIcon>WATCH-BILL
          </Typography>
          {bookingDetails ? (
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Typography variant="h6" sx={{ marginLeft: 12 }}>
                  <img src={bookingDetails.SpareId?.profileImage} width={80} alt="Product" />
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" sx={{ marginLeft: 12,fontFamily: 'cursive' }}>
                  Product Name:{bookingDetails.SpareId?.partName}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" sx={{ marginLeft: 12,fontFamily: 'cursive' }}>
                 Shop Name:{bookingDetails.SpareId?.shopId.name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" sx={{ marginLeft: 12,fontFamily: 'cursive' }}>
                  Model Number:{bookingDetails.SpareId?.color}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" sx={{ marginLeft: 12,fontFamily: 'cursive' }}>
                Price: ₹{bookingDetails.totalPrice}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" sx={{ marginLeft: 12,fontFamily: 'cursive' }}>
                 Quantity: {bookingDetails.quantity}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" sx={{ marginLeft: 12,fontFamily: 'cursive' }}>
                 Color:{bookingDetails.SpareId.color}
                </Typography>
              </Grid>
              {/* <Grid item>
                <Typography variant="body1" sx={{ marginLeft: 12 }}>
                  <strong>Status:</strong> {bookingDetails.status}
                </Typography>
              </Grid> */}
            </Grid>
          ) : (
            <Typography variant="body1" color="textSecondary">
              No booking details found.
            </Typography>
          )}
          <Button variant="contained" sx={{ marginLeft: 20, marginTop: 2 }} onClick={handleDownload}>
            <DownloadIcon /> DOWNLOAD
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ShopsBill;
