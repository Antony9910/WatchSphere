import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Card, CardContent, Typography, CardActions, Button, Box, CircularProgress, Grid } from '@mui/material';

const ViewSolutions = () => {
  const [complaints, setComplaints] = useState([]);
  const [WatchComplaints, setWatchComplaints] = useState([]);
  const [SpareComplaints, setSpareComplaints] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = sessionStorage.getItem('uid');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/complaints/replies/${userId}`);
        console.log("Fetched Complaints:", response.data.complaints);
        setComplaints(response.data.complaints);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching complaints');
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();

    const fetchWatchComplaints = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/WatchComplaints/Replied/${userId}`);
        console.log("Fetched Watch Complaints:", response.data.WatchComplaints);
        setWatchComplaints(response.data.WatchComplaints);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching complaints');
      } finally {
        setLoading(false);
      }
    };
    fetchWatchComplaints();

    const fetchSpareComplaints = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/SpareComplaints/Replies/${userId}`);
        console.log("Fetched Spare Complaints:", response.data.SpareComplaints);
        setSpareComplaints(response.data.SpareComplaints);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching complaints');
      } finally {
        setLoading(false);
      }
    };
    fetchSpareComplaints();
  }, [userId]);

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><CircularProgress /></Box>;
  }

  if (error) {
    return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><Typography variant="h6" color="error">Error: {error}</Typography></Box>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom align="center" color='primary' sx={{ fontFamily: 'fantasy' }}>
        SOLUTION FOR COMPLAINTS
      </Typography>

      {/* Combine all complaints into one grid */}
      <Grid container spacing={3}>
        {/* Complaints Section */}
        {complaints.map((complaint) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={complaint._id}>
            <Card sx={{
              height: '100%',
              boxShadow: 3,
              borderRadius: 2,
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 6,
              }
            }}>
              <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                  BookingId:
                </Typography>
                <Typography variant="body1" paragraph>
                  {complaint.bookingId}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  Complaint:
                </Typography>
                <Typography variant="body1" paragraph>
                  {complaint.complaintMessage}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  Seller:
                </Typography>
                <Typography variant="body1" paragraph>
                  {complaint.sellerId?.name}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  Reply:
                </Typography>
                <Typography variant="body1" paragraph>
                  {complaint.Reply && complaint.Reply !== 'NULL' ? complaint.Reply : 'No reply yet'}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Created At: {new Date(complaint.createdAt).toLocaleString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" sx={{backgroundColor:'green',fontFamily:'fantasy'}}>
                  {complaint.status}<CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}

        {/* Watch Complaints Section */}
        {WatchComplaints.map((watchComplaint) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={watchComplaint._id}>
            <Card sx={{
              height: '100%',
              boxShadow: 3,
              borderRadius: 2,
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 6,
              }
            }}>
              <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                  WatchBookingId:
                </Typography>
                <Typography variant="body1" paragraph>
                  {watchComplaint.WatchBookingId}
                </Typography>
                
                <Typography variant="h6" color="primary" gutterBottom>
                  Complaint:
                </Typography>
                <Typography variant="body1" paragraph>
                  {watchComplaint.complaintMessage}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  ShopName:
                </Typography>
                <Typography variant="body1" paragraph>
                  {watchComplaint.ShopId?.shop}
                </Typography>
               
                <Typography variant="h6" color="primary" gutterBottom>
                  Reply:
                </Typography>
                <Typography variant="body1" paragraph>
                  {watchComplaint.Reply && watchComplaint.Reply !== 'NULL' ? watchComplaint.Reply : 'No reply yet'}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Created At: {new Date(watchComplaint.createdAt).toLocaleString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained"sx={{backgroundColor:'green',fontFamily:'fantasy'}}>
                  {watchComplaint.status}<CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}

        {/* Spare Complaints Section */}
        {SpareComplaints.map((spareComplaint) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={spareComplaint._id}>
            <Card sx={{
              height: '100%',
              boxShadow: 3,
              borderRadius: 2,
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 6,
              }
            }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  SpareBookingId:
                </Typography>
                <Typography variant="body1" paragraph>
                  {spareComplaint.ShopBookingId}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  ShopName:
                </Typography>
                <Typography variant="body1" paragraph>
                  {spareComplaint.ShopId?.shop}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  Complaint:
                </Typography>
                <Typography variant="body1" paragraph>
                  {spareComplaint.complaintMessage}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  Reply:
                </Typography>
                <Typography variant="body1" paragraph>
                  {spareComplaint.Reply && spareComplaint.Reply !== 'NULL' ? spareComplaint.Reply : 'No reply yet'}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Created At: {new Date(spareComplaint.createdAt).toLocaleString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" sx={{backgroundColor:'green',fontFamily:'fantasy'}}>
                  {spareComplaint.status}<CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ViewSolutions;
