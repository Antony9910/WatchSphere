import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, Typography, Paper, Card, CardContent, 
  Table, TableBody, TableCell, TableContainer, TableRow,
  Chip, CircularProgress, Alert
} from '@mui/material';
import axios from 'axios';
import PaymentIcon from '@mui/icons-material/Payment';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ReceiptIcon from '@mui/icons-material/Receipt';

const PaymentDetails = () => {
  const { paymentId } = useParams();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/payments/${paymentId}`);
        setPayment(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [paymentId]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusChip = (status) => {
    let color;
    switch (status) {
      case 'completed':
        color = 'success';
        break;
      case 'failed':
        color = 'error';
        break;
      default:
        color = 'warning';
    }
    return <Chip label={status.toUpperCase()} color={color} />;
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!payment) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography>Payment not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <PaymentIcon color="primary" sx={{ mr: 1 }} />
            Payment Details
          </Typography>

          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Transaction ID</TableCell>
                  <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                    <ReceiptIcon sx={{ mr: 1, color: 'action.active' }} />
                    {payment.transactionId}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell>{getStatusChip(payment.status)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Payment Date</TableCell>
                  <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarTodayIcon sx={{ mr: 1, color: 'action.active' }} />
                    {formatDate(payment.paymentDate)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Payment Method</TableCell>
                  <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                    <CreditCardIcon sx={{ mr: 1, color: 'action.active' }} />
                    {payment.cardLastFour ? `**** **** **** ${payment.cardLastFour}` : 'N/A'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                  <TableCell>₹{payment.amount.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Payment Type</TableCell>
                  <TableCell>
                    {payment.type === 'product' ? 'Product Purchase' : 'Spare Part Purchase'}
                  </TableCell>
                </TableRow>
                {payment.productId && (
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Product</TableCell>
                    <TableCell>
                      {payment.productId.productName || 'Product details not available'}
                    </TableCell>
                  </TableRow>
                )}
                {payment.spareId && (
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Spare Part</TableCell>
                    <TableCell>
                      {payment.spareId.partName || 'Spare part details not available'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PaymentDetails;