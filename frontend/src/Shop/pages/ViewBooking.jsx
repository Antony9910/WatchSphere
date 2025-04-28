import { useEffect, useState } from "react";
import axios from "axios";
import WatchIcon from '@mui/icons-material/Watch';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Box,
} from "@mui/material";
import {
  CalendarToday,
  Person,
  Watch,
  Email,
  AttachMoney,
  CheckCircle,
  HourglassEmpty,
  Cancel,
  Person2,
} from "@mui/icons-material";

const ViewBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [SpareBooking, setSpareBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const shopId = sessionStorage.getItem("Sid");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/ViewBookings/${shopId}`
        );
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
        const response = await axios.get(
          `http://localhost:5000/SpareBooking/${shopId}`
        );
        setSpareBooking(response.data.SpareBooking);
      } catch (err) {
        setError("Failed to fetch SpareBooking");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [shopId]);

  if (loading)
    return (
      <Box className="flex justify-center mt-10">
        <CircularProgress />
      </Box>
    );
  if (error) return <Alert severity="error">{error}</Alert>;

  const getStatusChip = (status) => {
    const statusColors = {
      Confirmed: { color: "success", icon: <CheckCircle /> },
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
    <Box
      sx={{
        background: "linear-gradient(to right, #ece9e6, #ffffff)",
        minHeight: "100vh",
        p: 4,
      }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        mb={3}
        sx={{ color: "#333", fontFamily: "fantasy" }}
      >
        CUSTOMER-BOOKINGS <Person2 />
      </Typography>

      {bookings.length === 0 && SpareBooking.length === 0 ? (
        <Typography variant="h6" textAlign="center">
          No bookings found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {/* Display Watch Bookings */}
          <Grid item xs={12} sm={6} md={6}>
            {bookings.length > 0 && (
              <Typography variant="h6" mb={2} sx={{ fontFamily: "fantasy" }}>
                SECOND HAND WATCH BOOKINGS<WatchIcon></WatchIcon>
              </Typography>
            )}
            {bookings.map((booking) => (
              <Card
                sx={{
                  borderRadius: "16px",
                  boxShadow: 4,
                  marginTop:2,
                  backdropFilter: "blur(10px)",
                  background: "rgba(255, 255, 255, 0.7)",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.03)" },
                }}
                key={booking._id}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      fontFamily: "fantasy",
                    }}
                  >
                    <Watch fontSize="small" /> {booking.watchDetails.model}
                  </Typography>
                  {/* <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontFamily: "fantasy" }}
                  >
                    {booking.watchDetails.company}
                  </Typography> */}
                  <Box mt={2}>
                    <Typography
                      variant="body2"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontFamily: "fantasy",
                      }}
                    >
                      <Person fontSize="small" /> {booking.userDetails.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Email fontSize="small" /> {booking.userDetails.email}
                    </Typography>
                    {/* <Typography
                      variant="body2"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontFamily: "fantasy",
                      }}
                    >
                      <Person fontSize="small" />Agent: {booking.agentDetails.name}
                    </Typography> */}
                  </Box>

                  <Box mt={2}>
                    <Typography variant="body2">
                      <strong>Quantity:</strong> {booking.quantity}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <strong>Total Price:</strong> {booking.totalPrice}
                    </Typography>
                  </Box>

                  <Box mt={2}>{getStatusChip(booking.status)} </Box>

                  <Typography
                    variant="body2"
                    mt={2}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <CalendarToday fontSize="small" />{" "}
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>

          {/* Display Spare Bookings */}
          <Grid item xs={12} sm={6} md={6}>
            {SpareBooking.length > 0 && (
              <Typography variant="h6" mb={2} sx={{ fontFamily: "fantasy" }}>
                SPARE PARTS BOOKING<WatchIcon></WatchIcon>
              </Typography>
            )}
            {SpareBooking.map((SpareBooking) => (
              <Card
                sx={{
                  borderRadius: "16px",
                  boxShadow: 4,
                  marginTop:2,
                  backdropFilter: "blur(10px)",
                  background: "rgba(255, 255, 255, 0.7)",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.03)" },
                }}
                key={SpareBooking._id}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      fontFamily: "fantasy",
                    }}
                  >
                    <Watch fontSize="small" />{" "}
                    {SpareBooking.spareDetails.partName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontFamily: "fantasy" }}
                  >
                    {SpareBooking.spareDetails.company}
                  </Typography>
                  <Box mt={2}>
                    <Typography
                      variant="body2"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontFamily: "fantasy",
                      }}
                    >
                      <Person fontSize="small" />{" "}
                      {SpareBooking.userDetails.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Email fontSize="small" />{" "}
                      {SpareBooking.userDetails.email}
                    </Typography>
                    {/* <Typography
                      variant="body2"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontFamily: "fantasy",
                      }}
                    >
                      <Person fontSize="small" />{" "}
                      {SpareBooking.agentDetails.name}
                    </Typography> */}
                  </Box>

                  <Box mt={2}>
                    <Typography variant="body2">
                      <strong>Quantity:</strong> {SpareBooking.quantity}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <strong>Total Price:</strong> {SpareBooking.totalPrice}
                    </Typography>
                  </Box>

                  <Box mt={2}>{getStatusChip(SpareBooking.status)} </Box>

                  <Typography
                    variant="body2"
                    mt={2}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <CalendarToday fontSize="small" />{" "}
                    {new Date(SpareBooking.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ViewBooking;
