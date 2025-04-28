import React, { useState, useEffect } from "react";
import WatchIcon from '@mui/icons-material/Watch';
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

const Complaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [SparesComplaint, setSpareComplaint] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const shopId = sessionStorage.getItem("Sid");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/WatchesComplaint/${shopId}`
        );
        const data = await response.json();
        console.log("Fetched complaints:", data); // Debugging

        if (response.ok) {
          setComplaints(data.WatchComplaints); // ✅ Fix: Match API response key
        } else {
          setError(data.message || "Failed to fetch complaints.");
        }
      } catch (error) {
        setError("Error fetching complaints.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
    const fetchSpareComplaints = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/SparesComplaint/${shopId}`
        );
        const data = await response.json();
        console.log("Fetched complaints:", data); // Debugging

        if (response.ok) {
          setSpareComplaint(data.SpareComplaints); // ✅ Fix: Match API response key
        } else {
          setError(data.message || "Failed to fetch complaints.");
        }
      } catch (error) {
        setError("Error fetching complaints.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpareComplaints();
  }, [shopId]);

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
           
          </Typography>
        )}
    <Typography sx={{fontFamily:'fantasy',fontSize:20}}>SECOND-HAND WATCH COMPLAINTS</Typography>
        <Grid container spacing={3} mt={2}>
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
                    <Box display="flex" alignItems="center">
                      <Avatar
                        alt={complaint.userDetails.name}
                        src={complaint.userDetails.profileImage}
                        sx={{ width: 50, height: 50, marginRight: "10px" }}
                      />
                      <Box>
                        <Typography variant="h6" color="primary">
                          User:
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                          {complaint.userDetails.name}
                        </Typography>
                      </Box>
                    </Box>{" "}
                    <Divider sx={{ marginY: "1rem" }} />
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
                    <Avatar
                      src={complaint.watchesDetails.profileImage}
                      sx={{ width: 50, height: 50, marginRight: "10px" }}
                    />
                    <Typography variant="h6" color="primary">
                      Product:
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                      {complaint.watchesDetails.model} |{" "}
                      {complaint.watchesDetails.company}
                    </Typography>
                    <Divider sx={{ marginY: "1rem" }} />
                    {/* <Typography variant="h6" color="primary">
                      Status:
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                      {complaint.status}
                    </Typography> */}
                  </CardContent>

                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button variant="contained" color="primary" size="small"sx={{
                        backgroundColor:
                          complaint.status === "Pending" ? "red" : "green",
                        "&:hover": {
                          backgroundColor:
                          complaint.status === "Pending"
                              ? "#d32f2f"
                              : "#388e3c",
                        },fontFamily:'fantasy'
                      }}>
                      {complaint.status}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" align="center" color="textSecondary">
              
            </Typography>
          )}
        </Grid>
      </Box>
      <Box sx={{ padding: "2rem" }}>

        {error && (
          <Typography color="error" variant="h6" align="center">
           
          </Typography>
        )}
        <Typography sx={{fontFamily:'fantasy',fontSize:20}}>SPARE-PARTS COMPLAINT</Typography>
        <Grid container spacing={3} mt={3}>
          {SparesComplaint.length > 0 ? (
            SparesComplaint.map((SpareComplaint) => (
              <Grid item xs={12} sm={6} md={4} key={SpareComplaint._id}>
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

                    <Box display="flex" alignItems="center">
                      <Avatar
                        alt={SpareComplaint.userDetails.name}
                        src={SpareComplaint.userDetails.profileImage}
                        sx={{ width: 50, height: 50, marginRight: "10px" }}
                      />
                      <Box>
                        <Typography variant="h6" color="primary">
                          User:
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                          {SpareComplaint.userDetails.name}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider sx={{ marginY: "1rem" }} />
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ fontWeight: "bold", fontFamily: "cursive" }}
                    >
                      Complaint Message:
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                      {SpareComplaint.complaintMessage}
                    </Typography>

                    <Divider sx={{ marginY: "1rem" }} />
                    <Avatar
                      src={SpareComplaint.sparesDetails.profileImage}
                      sx={{ width: 50, height: 50, marginRight: "10px" }}
                    />
                    <Typography variant="h6" color="primary">
                      Product:
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                      {SpareComplaint.sparesDetails.part} |{" "}
                      {SpareComplaint.sparesDetails.partName}
                    </Typography>

                    <Divider sx={{ marginY: "1rem" }} />

                    {/* <Typography variant="h6" color="primary">
                      Status:
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                      {SpareComplaint.status}
                    </Typography> */}
                  </CardContent>

                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button variant="contained" color="primary" size="small" sx={{
                        backgroundColor:
                          SpareComplaint.status === "Pending" ? "red" : "green",
                        "&:hover": {
                          backgroundColor:
                          SpareComplaint.status === "Pending"
                              ? "#d32f2f"
                              : "#388e3c",
                        },fontFamily:'fantasy'
                      }}>
                    {SpareComplaint.status}
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
