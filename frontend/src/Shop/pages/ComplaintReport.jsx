import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Divider,
  Grid,
  Avatar,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const ComplaintReport = () => {
  const [complaints, setComplaints] = useState([]);
  const [sparesComplaint, setSparesComplaint] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const shopId = sessionStorage.getItem("Sid");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/WatchesComplaint/${shopId}`);
        const data = await response.json();

        if (response.ok) {
          setComplaints(data.WatchComplaints);
        } else {
          setError(data.message || "Failed to fetch complaints.");
        }
      } catch (error) {
        setError("Error fetching complaints.");
      } finally {
        setLoading(false);
      }
    };

    const fetchSparesComplaints = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/SparesComplaint/${shopId}`);
        const data = await response.json();

        if (response.ok) {
          setSparesComplaint(data.SpareComplaints);
        } else {
          setError(data.message || "Failed to fetch spare complaints.");
        }
      } catch (error) {
        setError("Error fetching spare complaints.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
    fetchSparesComplaints();
  }, [shopId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // Pie chart for complaint status distribution
  const statusDistribution = {
    labels: ["Resolved", "Pending", "In Progress"],
    datasets: [
      {
        label: "Complaint Status Distribution",
        data: [
          complaints.filter((c) => c.status === "Resolved").length,
          complaints.filter((c) => c.status === "Pending").length,
          complaints.filter((c) => c.status === "In Progress").length,
        ],
        backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
        hoverOffset: 4,
      },
    ],
  };

  // Bar chart for complaint types (Watches vs. Spares)
  const complaintTypeDistribution = {
    labels: ["Watches", "Spares"],
    datasets: [
      {
        label: "Number of Complaints",
        data: [complaints.length, sparesComplaint.length],
        backgroundColor: ["#2196f3", "#ff5722"],
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  return (
    <Container maxWidth="md"> {/* Reduced maxWidth */}
      <Box sx={{ padding: "1rem" }}>
        <Typography variant="h5" gutterBottom align="center" color="primary">
          Complaint Report for Shop
        </Typography>

        {error && (
          <Typography color="error" variant="body2" align="center">
            {error}
          </Typography>
        )}

      
        <Paper elevation={3} sx={{ padding: "1rem", marginBottom: "1.5rem", maxWidth: "350px", margin: "auto" }}>
          <Typography variant="h6" color="primary" sx={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
            Complaint Status Distribution
          </Typography>
          <Pie data={statusDistribution} options={{ responsive: true, maintainAspectRatio: true, plugins: { legend: { position: "top" } } }} />
        </Paper>

  
        <Paper elevation={3} sx={{ padding: "1rem", marginBottom: "1.5rem", maxWidth: "350px", margin: "auto" }}>
          <Typography variant="h6" color="primary" sx={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
            Complaint Types (Watches vs. Spares)
          </Typography>
          <Bar data={complaintTypeDistribution} options={{ responsive: true, maintainAspectRatio: true, plugins: { legend: { position: "top" } } }} />
        </Paper>

      
        <Grid container spacing={3} mt={2} sx={{ marginBottom: "1.5rem" }}>
          {complaints.length > 0 ? (
            complaints.map((complaint) => (
              <Grid item xs={12} sm={6} md={4} key={complaint._id}>
                <Card sx={{ padding: "1rem", boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
                      User: {complaint.userDetails.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Complaint Message:</strong> {complaint.complaintMessage}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Product:</strong> {complaint.watchesDetails.model} | {complaint.watchesDetails.company}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Status:</strong> {complaint.status}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body2" align="center" color="textSecondary">
              No complaints found for watches.
            </Typography>
          )}
        </Grid>

        {/* Spares Complaints Section */}
        <Grid container spacing={3}>
          {sparesComplaint.length > 0 ? (
            sparesComplaint.map((spareComplaint) => (
              <Grid item xs={12} sm={6} md={4} key={spareComplaint._id}>
                <Card sx={{ padding: "1rem", boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
                      User: {spareComplaint.userDetails.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Complaint Message:</strong> {spareComplaint.complaintMessage}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Product:</strong> {spareComplaint.sparesDetails.part} | {spareComplaint.sparesDetails.partName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Status:</strong> {spareComplaint.status}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body2" align="center" color="textSecondary">
              No complaints found for spares.
            </Typography>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default ComplaintReport;
