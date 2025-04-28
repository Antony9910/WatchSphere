import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Report = () => {
  const [bookings, setBookings] = useState([]);
  const [topProduct, setTopProduct] = useState(null);
  const sellerId = sessionStorage.getItem("sid");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/bookings/${sellerId}`);
        setBookings(response.data);
        findTopProduct(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, [sellerId]);

  // Totals
  const totalSales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const totalQuantity = bookings.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalBookings = bookings.length;

  // Status Count
  const statusCounts = bookings.reduce((acc, curr) => {
    const status = curr.status.toLowerCase();
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  // Product-wise Sales
  const productSalesMap = {};
  bookings.forEach((b) => {
    const name = b.productDetails.productName;
    productSalesMap[name] = (productSalesMap[name] || 0) + b.totalPrice;
  });

  // Find top product
  const findTopProduct = (bookings) => {
    const productSales = {};

    bookings.forEach((b) => {
      const name = b.productDetails.productName;
      productSales[name] = (productSales[name] || 0) + b.totalPrice;
    });

    let top = { name: "", sales: 0 };
    for (const name in productSales) {
      if (productSales[name] > top.sales) {
        top = { name, sales: productSales[name] };
      }
    }
    setTopProduct(top);
  };

  // Chart Data
  const pieData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Booking Status",
        data: Object.values(statusCounts),
        backgroundColor: ["#1976d2", "#2e7d32", "#ed6c02", "#d32f2f"],
      },
    ],
  };

  const productNames = Object.keys(productSalesMap);
  const productSales = Object.values(productSalesMap);

  const barData = {
    labels: productNames,
    datasets: [
      {
        label: "Sales (₹)",
        data: productSales,
        backgroundColor: "#42a5f5",
      },
    ],
  };

  return (
    <Box sx={{ maxWidth: "1100px", margin: "auto", padding: "20px" }}>
      <Typography variant="h4" sx={{ fontFamily: "fantasy", textAlign: "center" }} gutterBottom>
        📊 Sales Report
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Card><CardContent>
            <Typography variant="subtitle1">Total Bookings</Typography>
            <Typography variant="h6">{totalBookings}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card><CardContent>
            <Typography variant="subtitle1">Total Quantity Sold</Typography>
            <Typography variant="h6">{totalQuantity}</Typography>
          </CardContent></Card>
        </Grid>
        {/* <Grid item xs={12} sm={4}>
          <Card><CardContent>
            <Typography variant="subtitle1">Total Sales</Typography>
            <Typography variant="h6">₹{totalSales.toFixed(2)}</Typography>
          </CardContent></Card>
        </Grid> */}

        {topProduct && (
          <Grid item xs={12}>
            <Card sx={{ backgroundColor: "#e3f2fd" }}>
              <CardContent>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  🏆 Top-Selling Product: <strong>{topProduct.name}</strong>
                </Typography>
                
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      <Box mt={5}>
        <Typography variant="h5" sx={{ fontFamily: "fantasy", mb: 2, textAlign: "center" }}>
          📈 Visual Overview
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card><CardContent>
              <Typography variant="subtitle1" gutterBottom>Booking Status</Typography>
              <Pie data={pieData} />
            </CardContent></Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card><CardContent>
              <Typography variant="subtitle1" gutterBottom>Product-wise Sales</Typography>
              <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </CardContent></Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Report;
