import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  Grid,
  Button,
  CardActions,
  Avatar,
} from "@mui/material";
import axios from "axios"; 
const Complaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sellerId = sessionStorage.getItem("sid");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/WatchComplaint/${sellerId}`
        );
        
     
        if (response.status === 200) {
          setComplaints(response.data.complaints); 
        } else {
          setError(response.data.message || "Failed to fetch complaints.");
        }
      } catch (error) {
        setError("Error fetching complaints.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [sellerId]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: "2rem" }}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          color="primary"
          sx={{ fontFamily: "fantasy" }}
        >
          COMPLAINTS FROM CUSTOMER
        </Typography>

        {error && (
          <Typography color="error" variant="h6" align="center">
            {error}
          </Typography>
        )}

        <Grid container spacing={3}>
          {complaints.length > 0 ? (
            complaints.map((complaint) => (
              <Grid item xs={12} sm={6} md={4} key={complaint._id}>
                <Card
                  sx={{
                    borderRadius: "10px",
                    marginBottom: "1.5rem",
                    backgroundColor: "#f5f5f5",
                    boxShadow: 3,
                  }}
                >
                  <CardContent>
                    <Divider sx={{ marginY: "1rem" }} />

                    <Typography variant="h6" color="primary">
                      User:
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                      {complaint.userDetails
                        ? complaint.userDetails.name
                        : "N/A"}
                    </Typography>

                    <Typography variant="body1" color="textSecondary" paragraph>
                      <Avatar
                        alt="User Profile"
                        src={complaint.userDetails?.profileImage}
                      />
                    </Typography>
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ fontWeight: "bold" }}
                    >
                      Complaint Message:
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                      {complaint.complaintMessage}
                    </Typography>

                    <Divider sx={{ marginY: "1rem" }} />

                    <Typography variant="h6" color="primary">
                      Product:
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                      {complaint.productDetails.productName} | Model:{" "}
                      {complaint.productDetails.modelNum}
                    </Typography>

                    <Divider sx={{ marginY: "1rem" }} />
                  </CardContent>

                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor:
                          complaint.status === "Pending" ? "red" : "green",
                        "&:hover": {
                          backgroundColor:
                            complaint.status === "Pending"
                              ? "#d32f2f"
                              : "#388e3c",
                        },
                      }}
                    >
                      {complaint.status}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" align="center" color="textSecondary">
              No complaints found for this shop
            </Typography>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default Complaint;
