import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, CircularProgress, Paper, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import WatchIcon from '@mui/icons-material/Watch';
import { jsPDF } from 'jspdf'; // Import jsPDF

const Bill = () => {
  const { bookingId } = useParams(); // Extract bookingId from the URL
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (bookingId) {
      axios
        .get(`http://localhost:5000/bookingDetails/${bookingId}`)
        .then((response) => {
          setBookingDetails(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError('Error fetching booking details');
          setLoading(false);
        });
    }
  }, [bookingId]);

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
      doc.text(`Product Name: ${bookingDetails.ProductId?.productName}`, 20, 30);
      doc.text(`Seller Name: ${bookingDetails.ProductId?.sellerId.name}`, 20, 40);
      doc.text(`Model Number: ${bookingDetails.ProductId?.modelNum}`, 20, 40);
      doc.text(`Price: ₹${bookingDetails.totalPrice}`, 20, 50);
      doc.text(`Quantity: ${bookingDetails.quantity}`, 20, 60);
   
      // Add image if it exists
      if (bookingDetails.ProductId?.profileImage) {
        doc.addImage(bookingDetails.ProductId?.profileImage, 'JPEG', 20, 80, 50, 50);
      }
    }
    
    // Save the PDF
    doc.save('bill.pdf');
  };

  return (
    <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
      <Card sx={{ maxWidth: 500, width: '100%' }}>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontFamily: 'fantasy', marginLeft: 14,fontFamily:'fantasy' }}>
            <WatchIcon></WatchIcon>WATCH-BILL
          </Typography>
          {bookingDetails ? (
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Typography variant="h6" sx={{ marginLeft: 12 }}>
                  <img src={bookingDetails.ProductId?.profileImage} alt="Product" />
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" sx={{ marginLeft: 12,fontFamily:'fantasy' }}>
                 Product Name:{bookingDetails.ProductId?.productName}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" sx={{ marginLeft: 12,fontFamily:'fantasy' }}>
                  Seller Name: {bookingDetails.ProductId?.sellerId.name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" sx={{ marginLeft: 12,fontFamily:'fantasy' }}>
                  Model Number: {bookingDetails.ProductId?.modelNum}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" sx={{ marginLeft: 12,fontFamily:'fantasy' }}>
                  Price: ₹{bookingDetails.totalPrice}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" sx={{ marginLeft: 12,fontFamily:'fantasy' }}>
                  Quantity:{bookingDetails.quantity}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" sx={{ marginLeft: 12,fontFamily:'fantasy' }}>
                  Color:{bookingDetails.ProductId.color}
                </Typography>
              </Grid>
              {/* <Grid item>
                <Typography variant="body1" sx={{ marginLeft: 12 }}>
                  <strong>Status:</strong> {bookingDetails.status}
                </Typography>
              </Grid> */}
            </Grid>
          ) : (
            <Typography variant="h6" color="textSecondary">
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

export default Bill;
