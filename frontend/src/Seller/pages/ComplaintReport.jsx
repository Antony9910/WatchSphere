import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, CircularProgress, Grid, Card, CardContent, Divider, Paper } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // For charting

const ComplaintReport = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sellerId = sessionStorage.getItem('sid');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch(`http://localhost:5000/WatchComplaint/${sellerId}`);
        const data = await response.json();

        if (response.ok) {
          setComplaints(data.complaints);
        } else {
          setError(data.message || 'Failed to fetch complaints.');
        }
      } catch (error) {
        setError('Error fetching complaints.');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [sellerId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // Calculate complaint statistics (e.g., resolved, pending)
  const complaintStats = complaints.reduce(
    (stats, complaint) => {
      if (complaint.status === 'Resolved') stats.resolved++;
      if (complaint.status === 'Pending') stats.pending++;
      return stats;
    },
    { resolved: 0, pending: 0 }
  );

  // Chart data for pie chart
  const chartData = [
    { name: 'Resolved', value: complaintStats.resolved },
    { name: 'Pending', value: complaintStats.pending }
  ];

  // Pie chart colors
  const COLORS = ['#4caf50', '#f44336'];

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Complaint Report for Seller
        </Typography>

        {error && <Typography color="error" variant="h6" align="center">{error}</Typography>}

        {/* Complaint Statistics */}
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#fff', boxShadow: 3, padding: '1rem' }}>
              <CardContent>
                <Typography variant="h5" color="primary" gutterBottom>
                  Complaints Overview
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Total Complaints:</strong> {complaints.length}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Resolved:</strong> {complaintStats.resolved}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Pending:</strong> {complaintStats.pending}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Pie Chart to display complaint statuses */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#fff', boxShadow: 3, padding: '1rem' }}>
              <CardContent>
                <Typography variant="h5" color="primary" gutterBottom>
                  Complaint Status Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Detailed Complaints (Concise Version) */}
        <Typography variant="h5" color="primary" sx={{ marginTop: '2rem' }} gutterBottom>
          Complaints Summary
        </Typography>

        <Grid container spacing={3}>
          {complaints.length > 0 ? (
            complaints.map((complaint) => (
              <Grid item xs={12} sm={6} md={4} key={complaint._id}>
                <Card sx={{ borderRadius: '10px', marginBottom: '1.5rem', backgroundColor: '#fff', boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                      <strong>User:</strong> {complaint.userDetails ? complaint.userDetails.name : 'N/A'}
                    </Typography>

                    <Typography variant="body1" color="textSecondary" paragraph>
                      <strong>Product:</strong> {complaint.productDetails.productName} | Model: {complaint.productDetails.modelNum}
                    </Typography>

                    <Typography variant="body1" color="textSecondary" paragraph>
                      <strong>Complaint:</strong> {complaint.complaintMessage}
                    </Typography>

                    <Typography variant="body1" color="textSecondary" paragraph>
                      <strong>Status:</strong> {complaint.status}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" align="center" color="textSecondary">
              No complaints found for this seller.
            </Typography>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default ComplaintReport;
