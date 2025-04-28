import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TextField, Button, Typography, Snackbar, CircularProgress, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const ProductSolution = () => {
  const { ComplaintId } = useParams();
  const [Reply, setReply] = useState('');
  const [status, setStatus] = useState('Resolved'); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleInputChange = (e) => {
    setReply(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Reply || !Reply.trim()) {
      setError('Solution message is required and cannot be empty.');
      return;
    }

    setLoading(true);
    setError(null);
    setSnackbarMessage('');

    
    const sellerId = sessionStorage.getItem('sid');
    if (!sellerId) {
      setError('Seller ID is not found. Please login again.');
      return;
    }
    console.log('Complaint ID:', ComplaintId);
    console.log('Seller ID:', sellerId);
    console.log('Reply:', Reply.trim());
    console.log('Status:', status);
    try {
      const response = await axios.put(`http://localhost:5000/Reply/${ComplaintId}/${sellerId}`, {
        Reply: Reply.trim(),
        status,
        sellerId
      });
     

      if (response.status === 200) {
        setSuccess(true);
        setReply('');  
        setStatus('Resolved');  
        setSnackbarMessage('Solution submitted successfully!');
        setOpenSnackbar(true);
      }
    } catch (err) {
      console.error('Error submitting solution:', err);
      setError('Something went wrong. Please try again.');
      setSnackbarMessage('Error submitting solution!');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" align="center" color="primary" gutterBottom sx={{ fontFamily: 'fantasy' }}>
        OFFER SOLUTION
      </Typography>

      {success && (
        <Typography variant="body1" color="green" sx={{ marginBottom: 2 }} align="center">
          Solution submitted successfully!
        </Typography>
      )}

      {error && (
        <Typography variant="body1" color="error" sx={{ marginBottom: 2 }} align="center">
          {error}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Solution Message"
          multiline
          rows={4}
          fullWidth
          value={Reply}
          onChange={handleInputChange}
          required
          variant="outlined"
          sx={{ marginBottom: 2 }}
          placeholder="Write your solution for the Complaints"
        />

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            value={status}
            onChange={handleStatusChange}
            label="Status"
            required
          >
            <MenuItem value="Resolved">Resolved</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Escalated">Escalated</MenuItem>
          </Select>
        </FormControl>

        <Box display="flex" justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            sx={{ padding: '10px 20px',fontFamily:'fantasy' }}
          >
            {loading ? <CircularProgress size={24} /> : 'Submit Solution'}<AddIcon></AddIcon>
          </Button>
        </Box>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default ProductSolution;
