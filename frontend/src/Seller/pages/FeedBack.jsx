import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, CircularProgress, Card, CardContent, Divider, Grid, Button, CardActions, Avatar } from '@mui/material';
import { Rating } from '@mui/material';  // Import Rating component
import FeedbackIcon from '@mui/icons-material/Feedback';

const FeedBack = () => {
  const [FeedBack, setFeedBack] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sellerId = sessionStorage.getItem('sid');

  useEffect(() => {
    const fetchFeedBack = async () => {
      try {
        const response = await fetch(`http://localhost:5000/ProductFeedBack/${sellerId}`);
        const data = await response.json();

        if (response.ok) {
            setFeedBack(data.ProductFeedBack);
        } else {
          setError(data.message || 'Failed to fetch FeedBack.');
        }
      } catch (error) {
        setError('Error fetching FeedBack.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedBack();
  }, [sellerId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontFamily: 'fantasy' }}>
          CUSTOMER-FEEDBACK<FeedbackIcon></FeedbackIcon>
        </Typography>

        {error && <Typography color="error" variant="h6" align="center">{error}</Typography>}

        <Grid container spacing={3}>
          {FeedBack.length > 0 ? (
            FeedBack.map((feedback) => (
              <Grid item xs={12} sm={6} md={4} key={feedback._id}>
                <Card sx={{ borderRadius: '10px', marginBottom: '1.5rem', backgroundColor: '#f5f5f5', boxShadow: 3 }}>
                  <CardContent>
                    <Divider sx={{ marginY: '1rem' }} />

                    <Typography variant="h6" color="primary">
                      User:
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                      {feedback.userDetails ? feedback.userDetails.name : 'N/A'}
                    </Typography>

                    <Typography variant="body1" color="textSecondary" paragraph>
                      <Avatar alt={feedback.userDetails ? feedback.userDetails.name : 'User'} src={feedback.userDetails ? feedback.userDetails.profileImage : ''} />
                    </Typography>

                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', fontFamily: 'cursive' }}>
                      Feedback Message:
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                      {feedback.FeedbackMessage}
                    </Typography>

                    <Divider sx={{ marginY: '1rem' }} />

                    <Typography variant="h6" color="primary">
                      Product:
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                      {feedback.productDetails.productName} | Model: {feedback.productDetails.modelNum}
                    </Typography>

                    <Divider sx={{ marginY: '1rem' }} />

                    <Typography variant="h6" color="primary">
                      Rating
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                      {/* Use Material-UI Rating component to display star rating */}
                      <Rating 
                        name="product-rating" 
                        value={parseFloat(feedback.Rating)} // Ensure the rating is a float or integer
                        readOnly
                        precision={0.5} // Allow half stars if needed
                      />
                    </Typography>
                  </CardContent>
{/* 
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button variant="contained" color="primary" size="small">
                      Respond
                    </Button>
                  </CardActions> */}
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" align="center" color="textSecondary">
              No Feedback found for this seller
            </Typography>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default FeedBack;
