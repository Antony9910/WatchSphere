import { useEffect, useState } from "react";
import axios from "axios";
import { 
  Grid, Card, CardContent, Typography, 
  CircularProgress, Alert, Chip, Box 
} from "@mui/material";
import { CalendarToday, Person, Watch, Email, AttachMoney, CheckCircle, HourglassEmpty, Cancel } from "@mui/icons-material";

const ViewBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [SpareBooking,setSpareBooking]=useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const shopId = sessionStorage.getItem("Sid");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/ViewBookings/${shopId}`);
        setBookings(response.data.bookings);
      } catch (err) {
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/SpareBooking/${shopId}`);
        setSpareBooking(response.data.bookings);
      } catch (err) {
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [shopId]);

  if (loading) return <Box className="flex justify-center mt-10"><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  const getStatusChip = (status) => {
    const statusColors = {
      confirmed: { color: "success", icon: <CheckCircle /> },
      Pending: { color: "warning", icon: <HourglassEmpty /> },
      Cancelled: { color: "error", icon: <Cancel /> },
      Completed: { color: "primary", icon: <CheckCircle /> },
    };
    return (
      <Chip
        icon={statusColors[status]?.icon}
        label={status}
        color={statusColors[status]?.color || "default"}
        variant="outlined"
        size="small"
      />
    );
  };

  return (
    <Box sx={{ background: "linear-gradient(to right, #ece9e6, #ffffff)", minHeight: "100vh", p: 4 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3} sx={{ color: "#333",fontFamily:'cursive' }}>
        📅 Watch Bookings
      </Typography>
      
      {bookings.length === 0 ? (
        <Typography variant="h6" textAlign="center">No bookings found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {bookings.map((booking) => (
            <Grid item xs={12} sm={6} md={4} key={booking._id}>
              <Card 
                sx={{ 
                  borderRadius: "16px", 
                  boxShadow: 4, 
                  backdropFilter: "blur(10px)", 
                  background: "rgba(255, 255, 255, 0.7)", 
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.03)" }
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1,fontFamily:'cursive' }}>
                    <Watch fontSize="small" /> {booking.watchDetails.model}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{fontFamily:'cursive'}}>
                    {booking.watchDetails.company}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <img src={booking.watchDetails.profileImage} width={50}></img>
                  </Typography>

                  <Box mt={2}>
                    <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1,fontFamily:'cursive' }}>
                      <Person fontSize="small" /> {booking.userDetails.name}
                    </Typography>
                    <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Email fontSize="small" /> {booking.userDetails.email}
                    </Typography>
                  </Box>

                  <Box mt={2}>
                    <Typography variant="body2">
                      <strong>Quantity:</strong> {booking.quantity}
                    </Typography>
                    <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                     <strong>Total Price:</strong> {booking.totalPrice}
                    </Typography>
                  </Box>

                  <Box mt={2}>{getStatusChip(booking.status)} </Box>

                  <Typography variant="body2" mt={2} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CalendarToday fontSize="small" /> {new Date(booking.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
        {SpareBooking.length === 0 ? (
        <Typography variant="h6" textAlign="center">No bookings found.</Typography>
      ) : (
        <Grid container spacing={3} mt={3}>
          {SpareBooking.map((SpareBooking) => (
            <Grid item xs={12} sm={6} md={4} key={SpareBooking._id}>
              <Card 
                sx={{ 
                  borderRadius: "16px", 
                  boxShadow: 4, 
                  backdropFilter: "blur(10px)", 
                  background: "rgba(255, 255, 255, 0.7)", 
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.03)" }
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1,fontFamily:'cursive' }}>
                    <Watch fontSize="small" /> {SpareBooking.spareDetails.partName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{fontFamily:'cursive'}}>
                    {SpareBooking.spareDetails.company}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <img src={SpareBooking.spareDetails.profileImage} width={50}></img>
                  </Typography>

                  <Box mt={2}>
                    <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1,fontFamily:'cursive' }}>
                      <Person fontSize="small" /> {SpareBooking.userDetails.name}
                    </Typography>
                    <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Email fontSize="small" /> {SpareBooking.userDetails.email}
                    </Typography>
                  </Box>

                  <Box mt={2}>
                    <Typography variant="body2">
                      <strong>Quantity:</strong> {SpareBooking.quantity}
                    </Typography>
                    <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                     <strong>Total Price:</strong> {SpareBooking.totalPrice}
                    </Typography>
                  </Box>

                  <Box mt={2}>{getStatusChip(SpareBooking.status)} </Box>

                  <Typography variant="body2" mt={2} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CalendarToday fontSize="small" /> {new Date(SpareBooking.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ViewBooking;
