import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CardActions, Button, Box, CircularProgress, Grid } from '@mui/material';

const ViewSolutions = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = sessionStorage.getItem('uid');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/complaints/replies/${userId}`);
        setComplaints(response.data.complaints);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching complaints');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [userId]);

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><CircularProgress /></Box>;
  }

  if (error) {
    return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><Typography variant="h6" color="error">Error: {error}</Typography></Box>;
  }

  if (complaints.length === 0) {
    return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><Typography variant="h6">No complaints with replies found.</Typography></Box>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom align="center" color='primary' sx={{fontFamily:'fantasy'}}>SOLUTION FOR COMPLAINTS</Typography>
      
      {/* Grid Layout for Cards */}
      <Grid container spacing={3}>
        {complaints.map((complaint) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={complaint._id}> {/* Adjust size for different screen sizes */}
            <Card 
              sx={{ 
                height: '100%', 
                boxShadow: 3, 
                borderRadius: 2, 
                transition: 'transform 0.3s, box-shadow 0.3s', 
                '&:hover': {
                  transform: 'scale(1.05)', // Slightly enlarge the card
                  boxShadow: 6, // Increase shadow on hover
                }
              }}
            >
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  Complaint:
                </Typography>
                <Typography variant="body1" paragraph>
                  {complaint.complaintMessage}
                </Typography>

           

                <Typography variant="h6" color="primary" gutterBottom>
                  Reply:
                </Typography>
                <Typography variant="body1" paragraph>
                  {complaint.Reply !== 'NULL' ? complaint.Reply : 'No reply yet'}
                </Typography>

                <Typography variant="caption" color="textSecondary">
                  Created At: {new Date(complaint.createdAt).toLocaleString()}
                </Typography>
              </CardContent>

              <CardActions>
                <Button size="small"  variant="contained">
                {complaint.status}
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
