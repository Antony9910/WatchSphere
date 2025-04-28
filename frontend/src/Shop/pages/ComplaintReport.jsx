// src/Shop/pages/ComplaintReport.jsx

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  CircularProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ComplaintReport = () => {
  const [allComplaints, setAllComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const shopId = sessionStorage.getItem("Sid");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch(`http://localhost:5000/WatchesComplaint/${shopId}`);
        const res2 = await fetch(`http://localhost:5000/SparesComplaint/${shopId}`);
        const data1 = await res1.json();
        const data2 = await res2.json();

        const merged = [
          ...(data1.WatchComplaints || []),
          ...(data2.SpareComplaints || []),
        ];

        setAllComplaints(merged);
      } catch (error) {
        console.error("Failed to fetch complaint data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shopId]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Complaint Report", 14, 10);
    autoTable(doc, {
      head: [["Sl. No", "Name", "Message", "Reply"]],
      body: allComplaints.map((c, i) => [
        i + 1,
        c.userDetails?.name || "N/A",
        c.complaintMessage,
        c.reply || "Not Replied",
      ]),
    });
    doc.save("complaint_report.pdf");
  };

  const csvData = allComplaints.map((c, i) => ({
    SlNo: i + 1,
    Name: c.userDetails?.name || "N/A",
    Message: c.complaintMessage,
    Reply: c.reply || "Not Replied",
  }));

  const chartData = {
    labels: ["Pending", "Resolved"],
    datasets: [
      {
        label: "Complaints",
        data: [
          allComplaints.filter((c) => c.status === "Pending").length,
          allComplaints.filter((c) => c.status !== "Pending").length,
        ],
        backgroundColor: ["#f44336", "#4caf50"],
      },
    ],
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: "fantasy" }}>
        COMPLAINT REPORT
      </Typography>

      {/* Graph */}
      <Box mb={4}>
        <Bar data={chartData} />
      </Box>

      {/* Table-style Card */}
      <Card sx={{ boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontFamily: "fantasy" }}>
            Complaints List
          </Typography>

          <Table>
            <TableHead sx={{ backgroundColor: "#e0e0e0" }}>
              <TableRow>
                <TableCell><strong>Sl. No</strong></TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Message</strong></TableCell>
                <TableCell><strong>Reply</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allComplaints.map((complaint, index) => (
                <TableRow key={complaint._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{complaint.userDetails?.name || "N/A"}</TableCell>
                  <TableCell>{complaint.complaintMessage}</TableCell>
                  <TableCell>{complaint.Reply || "Not Replied"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Download Buttons */}
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={downloadPDF}>
          Download PDF
        </Button>
        <CSVLink data={csvData} filename="complaint_report.csv" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary">Download CSV</Button>
        </CSVLink>
      </Box>
    </Container>
  );
};

export default ComplaintReport;
