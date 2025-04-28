import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, CircularProgress, Card, CardContent, Divider, Grid, Button, CardActions, Avatar } from '@mui/material';
import { Rating } from '@mui/material';  // Import Rating component
import FeedbackIcon from '@mui/icons-material/Feedback';
import WatchIcon from '@mui/icons-material/Watch';
const FeedBack = () => {
  const [FeedBack, setFeedBack] = useState([]);
  const [watchFeedBack,setWatchFeedBack] =useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const shopId = sessionStorage.getItem('Sid');

  useEffect(() => {
    const fetchFeedBack = async () => {
      try {
        const response = await fetch(`http://localhost:5000/SparesFeedBack/${shopId}`);
        const data = await response.json();

        if (response.ok) {
            setFeedBack(data.spareFeedBack);
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
    const fetchFeedWatchBack = async () => {
      try {
        const response = await fetch(`http://localhost:5000/WatchFeedBack/${shopId}`);
        const data = await response.json();

        if (response.ok) {
          setWatchFeedBack(data.watchFeedBacks);
        } else {
          setError(data.message || 'Failed to fetch FeedBack.');
        }
      } catch (error) {
        setError('Error fetching FeedBack.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedWatchBack();
  }, [shopId]);

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
       <Typography variant="h4" gutterBottom align="center" color='primary' sx={{ fontFamily: 'fantasy' }}>
          CUSTOMER-FEEDBACK<FeedbackIcon></FeedbackIcon>
        </Typography>

        {error && <Typography color="error" variant="h6" align="center"></Typography>}
        <Typography sx={{fontFamily:'fantasy',fontSize:20}}>SECOND-HAND WATCH FEEDBACK<WatchIcon></WatchIcon></Typography>
        <Grid container spacing={3} mt={2}>
          {watchFeedBack.length > 0 ? (
          watchFeedBack.map((feedbacks) => (
              <Grid item xs={12} sm={6} md={4} key={feedbacks._id}>
                <Card sx={{ borderRadius: '10px', marginBottom: '1.5rem', backgroundColor: '#f5f5f5', boxShadow: 3, transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)', // Slightly scale the card on hover
                      boxShadow: 6, // Add a stronger shadow on hover
                    }, }}>
                  <CardContent>
                    <Divider sx={{ marginY: '1rem' }} />

                    <Typography variant="h6" color="primary">
                      User:
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                      {feedbacks.userDetails ? feedbacks.userDetails.name : 'N/A'}
                    </Typography>

                    <Typography variant="body1" color="textSecondary" paragraph>
                      <Avatar alt={feedbacks.userDetails ? feedbacks.userDetails.name : 'User'} src={feedbacks.userDetails ? feedbacks.userDetails.profileImage : ''} />
                    </Typography>

                    <Typography variant="h6" color="primary" sx={{ fontFamily: 'fantasy' }}>
                      Feedback Message:
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                      {feedbacks.FeedbackMessage}
                    </Typography>

                    <Divider sx={{ marginY: '1rem' }} />

                    <Typography variant="h6" color="primary">
                      Product:
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                      {feedbacks.watchDetails.model} | Model: {feedbacks.watchDetails.model}
                    </Typography>

                    <Divider sx={{ marginY: '1rem' }} />

                    <Typography variant="h6" color="primary">
                      Rating
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                      {/* Use Material-UI Rating component to display star rating */}
                      <Rating 
                        name="product-rating" 
                        value={parseFloat(feedbacks.Rating)} // Ensure the rating is a float or integer
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
              No Feedback found for this shop
            </Typography>
          )}
        </Grid>
      </Box>
      <Box sx={{ padding: '2rem' }}>
        

        {error && <Typography color="error" variant="h6" align="center"></Typography>}
      <Typography sx={{fontFamily:'fantasy',fontSize:20}}>SPARE PARTS FEEDBACK<WatchIcon></WatchIcon></Typography>
        <Grid container spacing={3}mt={2}>
          {FeedBack.length > 0 ? (
            FeedBack.map((feedback) => (
              <Grid item xs={12} sm={6} md={4} key={feedback._id}>
                <Card sx={{ borderRadius: '10px', marginBottom: '1.5rem', backgroundColor: '#f5f5f5', boxShadow: 3, transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)', 
                      boxShadow: 6, 
                    }, }}>
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

                    <Typography variant="h6" color="primary" sx={{ fontFamily: 'fantasy' }}>
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
                      {feedback.spareDetails.partName} | Model: {feedback.spareDetails.part}
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
              No Feedback found for this shop
            </Typography>
          )}
        </Grid>
      </Box>
     
    </Container>
  );
};

export default FeedBack;
