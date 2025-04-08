import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import FeedbackIcon from '@mui/icons-material/Feedback';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Container,
  Snackbar,
  Alert
} from '@mui/material';

const SpareFeedBack = () => {
  const { WatchBookingId } = useParams();
  const [FeedBackMessage, setFeedBackMessage] = useState('');
  const [Rating, setRating] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleFeedBackMessageChange = (e) => {
    setFeedBackMessage(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!FeedBackMessage || !Rating) {
      setError("Both Feedback Message and Rating are required.");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/watchFeedbacks/${WatchBookingId}`, {
        FeedbackMessage: FeedBackMessage,
        Rating: Rating,
      });

      if (response.status === 201) {
        setSuccessMessage("Feedback submitted successfully!");
        setError('');
        setFeedBackMessage('');
        setRating('');
        setSnackbarMessage('Feedback submitted successfully!');
        setOpenSnackbar(true);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{fontFamily:'fantasy',marginLeft:20}}>
      Customer Feedback<FeedbackIcon></FeedbackIcon>
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          id="FeedBackMessage"
          label="Write Your Feedback Message"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={FeedBackMessage}
          onChange={handleFeedBackMessageChange}
          sx={{ mb: 2 }}
          required
        />

        <FormControl fullWidth sx={{ mb: 2 }} required>
          <InputLabel>Rating</InputLabel>
          <Select
            id="Rating"
            value={Rating}
            onChange={handleRatingChange}
            label="Rating"
          >
            <MenuItem value="">
              <em>Select Rating</em>
            </MenuItem>
            <MenuItem value="1">1 - Poor</MenuItem>
            <MenuItem value="2">2 - Fair</MenuItem>
            <MenuItem value="3">3 - Good</MenuItem>
            <MenuItem value="4">4 - Very Good</MenuItem>
            <MenuItem value="5">5 - Excellent</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          minWidth
          sx={{ mt: 2,width:150,marginLeft:20 }}
        >
          <AddIcon></AddIcon>Submit 
        </Button>
      </form>

      {/* Snackbar for success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SpareFeedBack;
