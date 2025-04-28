import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { saveAs } from 'file-saver';

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

  const complaintStats = complaints.reduce(
    (stats, complaint) => {
      if (complaint.status === 'Resolved') stats.resolved++;
      if (complaint.status === 'Pending') stats.pending++;
      return stats;
    },
    { resolved: 0, pending: 0 }
  );

  const productComplaintCounts = complaints.reduce((acc, complaint) => {
    const productName = complaint.productDetails.productName;
    if (!acc[productName]) {
      acc[productName] = { count: 0, details: [] };
    }
    acc[productName].count++;
    acc[productName].details.push(complaint);
    return acc;
  }, {});

  const chartData = [
    { name: 'Resolved', value: complaintStats.resolved },
    { name: 'Pending', value: complaintStats.pending }
  ];

  const COLORS = ['#4caf50', '#f44336'];

  const generateReport = () => {
    const csvRows = [];
    csvRows.push('Product,User,Complaint Status,Complaint Message,Reply');

    complaints.forEach((complaint) => {
      const userName = complaint.userDetails ? complaint.userDetails.name : 'N/A';
      const productName = complaint.productDetails.productName;
      const complaintMessage = complaint.complaintMessage;
      const status = complaint.status;
      const Reply = complaint.Reply || 'No reply yet';
      csvRows.push(`${productName},${userName},${status},${complaintMessage},${Reply}`);
    });

    const csvData = csvRows.join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'complaint_report.csv');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
        <Typography variant="h4" gutterBottom align="center" color="primary" sx={{fontFamily:'fantasy'}}>
          COMPLAINT REPORT FOR SELLER
        </Typography>

        {error && <Typography color="error" variant="h6" align="center">{error}</Typography>}

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ backgroundColor: '#fff', boxShadow: 3, padding: '1rem' }}>
              <CardContent>
                <Typography variant="h5" color="primary" gutterBottom sx={{fontFamily:'fantasy'}}>
                  Complaints Overview & Status Distribution
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
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
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1" color="textSecondary">
                      <strong>Total Complaints:</strong> {complaints.length}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      <strong>Resolved:</strong> {complaintStats.resolved}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      <strong>Pending:</strong> {complaintStats.pending}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" color="primary" sx={{ marginTop: '2rem',fontFamily:'fantasy' }} gutterBottom>
              PRODUCT-WISE COMPLAINTS
            </Typography>
            {Object.keys(productComplaintCounts).map((productName) => (
              <Card key={productName} sx={{ marginBottom: '1rem', backgroundColor: '#fff', boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" color="primary">
                    <strong>{productName}</strong> - {productComplaintCounts[productName].count} Complaints
                  </Typography>

                  {/* Table headings */}
                  <Box sx={{ marginTop: 2 }}>
                    <Grid container sx={{ fontWeight: 'bold', borderBottom: '1px solid #ccc', paddingY: 1 }}>
                      <Grid item xs={1}>SL. NO</Grid>
                      <Grid item xs={3}>USER</Grid>
                      <Grid item xs={2}>STATUS</Grid>
                      <Grid item xs={4}>MESSAGE</Grid>
                      <Grid item xs={2}>REPLY</Grid>
                    </Grid>

                    {productComplaintCounts[productName].details.map((complaint, index) => (
                      <Grid container key={complaint._id} sx={{ borderBottom: '1px solid #eee', paddingY: 1, alignItems: 'center' }}>
                        <Grid item xs={1}>
                          {index + 1}
                        </Grid>
                        <Grid item xs={3} display="flex" alignItems="center">
                          <Avatar
                            alt={complaint.userDetails?.name || "User"}
                            src={complaint.userDetails?.profileImage}
                            sx={{ width: 30, height: 30, marginRight: 1 }}
                          />
                          {complaint.userDetails ? complaint.userDetails.name : 'N/A'}
                        </Grid>
                        <Grid item xs={2}>
                          {complaint.status}
                        </Grid>
                        <Grid item xs={4}>
                          {complaint.complaintMessage}
                        </Grid>
                        <Grid item xs={2} sx={{ color: complaint.Reply ? '#000' : '#999', fontStyle: complaint.Reply ? 'normal' : 'italic' }}>
                          {complaint.Reply || 'No reply yet'}
                        </Grid>
                      </Grid>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
          <Button variant="contained" color="primary" onClick={generateReport}>
            Download Report (CSV)
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ComplaintReport;
