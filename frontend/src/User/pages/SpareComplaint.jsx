import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box, CircularProgress, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
const SpareComplaint = () => {
  const { ShopBookingId } = useParams();  
  const [complaintMessage, setComplaintMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const userId=sessionStorage.getItem('uid')
  const ShopId = sessionStorage.getItem("Sid") || null;
  const handleComplaintSubmit = async (e) => {
    e.preventDefault();

    if (!complaintMessage) {
      setError("Please enter your complaint.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/SubmitComplaints/${ShopBookingId}`, { // Include bookingId in the URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          complaintMessage,userId,ShopId 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Your complaint has been submitted successfully.");
        setComplaintMessage("");
        setError(null);
      } else {
        setError(data.message || "Error submitting complaint.");
      }
    } catch (error) {
      setError("Error submitting complaint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: "2rem", borderRadius: 2, backgroundColor: "#f5f5f5",marginTop:5 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h4" gutterBottom color="primary" sx={{ fontFamily: "fantasy" }}>
             COMPLAINT
          </Typography>

          {loading && <CircularProgress sx={{ marginBottom: "1rem" }} />}

          {successMessage && (
            <Typography color="primary" variant="body1" sx={{ marginBottom: "1rem" }}>
              {successMessage}
            </Typography>
          )}

          {error && (
            <Typography color="error" variant="body1" sx={{ marginBottom: "1rem" }}>
              {error}
            </Typography>
          )}

          <TextField
            label="Write your Complaint here"
            multiline
            rows={4}
            fullWidth
            value={complaintMessage}
            onChange={(e) => setComplaintMessage(e.target.value)}
            margin="normal"
            required
            variant="outlined"
            sx={{
              backgroundColor: "#fff",
              borderRadius: 1,
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleComplaintSubmit}
            sx={{
              marginTop: "1rem",
              padding: "0.75rem",
              fontFamily: "fantasy",
              textTransform: "none",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                backgroundColor: "#0077b6",
              },
            }}
          >
            <AddIcon></AddIcon>{loading ? "Submitting..." : "SUBMIT"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SpareComplaint;
