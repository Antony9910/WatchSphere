import { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Box,
  Paper,
} from "@mui/material";
import {
  Watch,
  Person,
  Email,
  CalendarToday,
  CheckCircle,
  HourglassEmpty,
  Cancel,
  Person2,
  AttachMoney,
} from "@mui/icons-material";
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';

// Registering chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const SalesReport = () => {
  const [bookings, setBookings] = useState([]);
  const [spareBooking, setSpareBooking] = useState([]);
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

    const fetchSpareBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/SpareBooking/${shopId}`
        );
        setSpareBooking(response.data.SpareBooking);
      } catch (err) {
        setError("Failed to fetch spare bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchSpareBookings();
  }, [shopId]);

  if (loading)
    return (
      <Box className="flex justify-center mt-10">
        <CircularProgress />
      </Box>
    );
  if (error) return <Alert severity="error">{error}</Alert>;

  // Function to calculate the total sales and quantity
  const calculateSalesData = (bookingsData) => {
    let totalSales = 0;
    let totalQuantity = 0;

    bookingsData.forEach((booking) => {
      totalSales += parseFloat(booking.totalPrice || 0);
      totalQuantity += parseInt(booking.quantity || 0);
    });

    return { totalSales, totalQuantity };
  };

  
  const { totalSales: totalWatchSales, totalQuantity: totalWatchQuantity } =
    calculateSalesData(bookings);
  const { totalSales: totalSpareSales, totalQuantity: totalSpareQuantity } =
    calculateSalesData(spareBooking);

  const totalSales = totalWatchSales + totalSpareSales;
  const totalQuantity = totalWatchQuantity + totalSpareQuantity;

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

  // Chart Data for Bar and Pie charts
  const barChartData = {
    labels: ['Watches', 'Spare Parts'],
    datasets: [
      {
        label: 'Sales',
        data: [totalWatchSales, totalSpareSales],
        backgroundColor: ['#ff8c00', '#36a2eb'],
        borderColor: ['#ff8c00', '#36a2eb'],
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ['Watches', 'Spare Parts'],
    datasets: [
      {
        data: [totalWatchSales, totalSpareSales],
        backgroundColor: ['#ff8c00', '#36a2eb'],
        borderColor: ['#ff8c00', '#36a2eb'],
        borderWidth: 1,
      },
    ],
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
        SALES-REPORT <Person2 />
      </Typography>

      {/* Sales Report Section */}
      <Paper sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h6" sx={{ fontFamily: "fantasy" }}>
          SALES-REPORT
        </Typography>
        <Box mt={2}>
          <Typography variant="body1" sx={{ fontFamily: "fantasy" }}>
           Total Watch Sales: ₹{totalWatchSales.toFixed(2)}
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: "fantasy" }}>
            Total Spare Parts Sales:₹{totalSpareSales.toFixed(2)}
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: "fantasy" }}>
            Total Sales: ₹{totalSales.toFixed(2)}
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: "fantasy" }}>
            Total Product Sold:{totalQuantity}
          </Typography>
        </Box>

        {/* Grid to display Bar and Pie charts side by side */}
        <Grid container spacing={4} justifyContent="center" mt={4}>
          <Grid item xs={12} sm={6} md={6}>
            <Bar data={barChartData} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Pie data={pieChartData} width={300} height={300} />
          </Grid>
        </Grid>
      </Paper>

      
      
    </Box>
  );
};

export default SalesReport;
