import React, { useEffect, useState } from "react";
import StoreIcon from '@mui/icons-material/Store';
import WatchIcon from '@mui/icons-material/Watch';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShopIcon from '@mui/icons-material/Shop';
import axios from "axios";
import {
  Container, Typography, Grid, Paper, Card,
  CardContent, Button, Dialog, DialogActions,
  DialogContent, DialogTitle
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shopCartItems, setShopCartItems] = useState([]);
  const [watchCartItems, setWatchCartItems] = useState([]); // State for watch cart items
  const [totalPrice, setTotalPrice] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const userId = sessionStorage.getItem('uid');
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchCartItems(userId);
      fetchShopCartItems(userId);
      fetchWatchCartItems(userId); // Fetch watch cart items
    } else {
      alert("Please log in to view your cart.");
    }
  }, [userId]);

  useEffect(() => {
    calculateTotalPrice(cartItems.concat(shopCartItems, watchCartItems)); // Calculate total for all carts
  }, [cartItems, shopCartItems, watchCartItems]);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
    setTotalPrice(total);
  };

  const fetchCartItems = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/cart/${userId}`);
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      alert("Failed to fetch cart items.");
    }
  };

  const fetchShopCartItems = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/ShopCart/${userId}`);
      setShopCartItems(response.data);
    } catch (error) {
      console.error("Error fetching shop cart items:", error);
      alert("Failed to fetch shop cart items.");
    }
  };

  const fetchWatchCartItems = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/WatchCart/${userId}`); // Fetch watch cart items
      setWatchCartItems(response.data);
    } catch (error) {
      console.error("Error fetching watch cart items:", error);
      alert("Failed to fetch watch cart items.");
    }
  };

  const handleBuyClick = (item) => {
    setSelectedItem(item); // Set item for confirmation dialog
    setOpenDialog(true);   // Open dialog for confirmation
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  const handleConfirmPurchase = async () => {
    if (!selectedItem || !selectedItem._id) return;

    let bookingId = null;
    let WatchBookingId = null;
    let ShopBookingId = null;
    let itemTotalPrice = selectedItem.totalPrice; // Add totalPrice here

    // Determine the booking ID based on the item type
    if (selectedItem.ProductId) {
      bookingId = selectedItem.BookingId; // Cart item
      navigate(`/user/payment/${bookingId}`, { state: { totalPrice: itemTotalPrice } });
    } else if (selectedItem.SpareId) {
      ShopBookingId = selectedItem. ShopBookingId; 
      navigate(`/user/ShopPayment/${ShopBookingId}`, { state: { totalPrice: itemTotalPrice } });
    } else if (selectedItem.watchId) {
      WatchBookingId = selectedItem.WatchBookingId; 
      navigate(`/user/WatchPayment/${ WatchBookingId}`, { state: { totalPrice: itemTotalPrice } });
    }

  

    setOpenDialog(false); // Close dialog
    setSelectedItem(null); // Clear selected item
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3,fontFamily:'fantasy',marginLeft:50 }}>Your Shopping Cart<ShoppingCartIcon></ShoppingCartIcon></Typography>

        {/* Cart Items Section */}
        <Typography variant="h5" sx={{ mb: 2,fontFamily:'fantasy' }}>Cart Items<WatchIcon></WatchIcon></Typography>
        <Grid container spacing={4}>
          {cartItems.length === 0 ? (
            <Typography variant="h6" sx={{ textAlign: "center", width: "100%" }}>
              Your cart is empty.
            </Typography>
          ) : (
            cartItems.map(item => (
              <Grid item xs={12} md={4} key={item._id}>
                <Card sx={{ p: 2 }}>
                  <CardContent>
                    <Typography variant="h5">
                      <img src={item.ProductId?.profileImage} width={100} alt="product" />
                    </Typography>
                    {/* <Typography variant="h6" color="primary">₹{item.ProductId?.price}</Typography> */}
                    <Typography variant="h6">Quantity: {item.quantity}</Typography>
                    <Typography variant="h6">Total Price: ₹{item.totalPrice}</Typography>
                    <Typography variant="h6">ProductName:{item.ProductId?.productName}</Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleBuyClick(item)}
                      sx={{ marginTop: 2 }}
                    >
                      BUY<ShopIcon></ShopIcon>
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>

        {/* Shop Cart Items Section */}
        <Typography variant="h5" sx={{ mt: 4, mb: 2,fontFamily:'fantasy' }}>Shop Cart Items<StoreIcon></StoreIcon></Typography>
        <Grid container spacing={4}>
          {shopCartItems.length === 0 ? (
            <Typography variant="h6" sx={{ textAlign: "center", width: "100%" }}>
              Your shop cart is empty.
            </Typography>
          ) : (
            shopCartItems.map(item => (
              <Grid item xs={12} md={4} key={item._id}>
                <Card sx={{ p: 2 }}>
                  <CardContent>
                    <Typography variant="h5">
                      <img src={item.SpareId?.profileImage} width={100} alt="spare part" />
                    </Typography>
                    {/* <Typography variant="h6" color="primary">₹{item.SpareId?.price}</Typography> */}
                    <Typography variant="h6">Quantity: {item.quantity}</Typography>
                    <Typography variant="h6">Total Price: ₹{item.totalPrice}</Typography>
                    <Typography variant="h6">Partname:{item.SpareId?.partName}</Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleBuyClick(item)}
                      sx={{ marginTop: 2 }}
                    >
                      BUY<ShopIcon></ShopIcon>
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>

        {/* Watch Cart Items Section */}
        <Typography variant="h5" sx={{ mt: 4, mb: 2,fontFamily:'fantasy' }}>Watch Cart Items<WatchIcon></WatchIcon></Typography>
        <Grid container spacing={4}>
          {watchCartItems.length === 0 ? (
            <Typography variant="h6" sx={{ textAlign: "center", width: "100%" }}>
              Your watch cart is empty.
            </Typography>
          ) : (
            watchCartItems.map(item => (
              <Grid item xs={12} md={4} key={item._id}>
                <Card sx={{ p: 2 }}>
                  <CardContent>
                    <Typography variant="h6">
                      <img src={item.watchId?.profileImage} width={100} alt="watch" />
                    </Typography>
                    <Typography variant="h6">ModelName:{item.watchId?.model}</Typography>
                    <Typography variant="h6">Quantity: {item.quantity}</Typography>
                    <Typography variant="h6">Total Price: ₹{item.totalPrice}</Typography>
                
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleBuyClick(item)}
                      sx={{ marginTop: 2 }}
                    >
                      BUY<ShopIcon></ShopIcon>
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>

        {/* Total Price */}
        {(cartItems.length > 0 || shopCartItems.length > 0 || watchCartItems.length > 0) && (
          <Typography variant="h5" sx={{ mt: 3, textAlign: "right" }}>
            Total Price: ₹{totalPrice}
          </Typography>
        )}
      </Paper>

      {/* Purchase Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{marginLeft:12,fontFamily:'fantasy'}}>Confirm Purchase<CheckCircleIcon></CheckCircleIcon></DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to buy the following item?</Typography>
          {selectedItem && (
            <div style={{ textAlign: 'center', marginTop: 10 }}>
              <img src={selectedItem.ProductId?.profileImage || selectedItem.SpareId?.profileImage || selectedItem.watchId?.profileImage} width={70} alt="product" />
              <Typography variant="h6">Product Name: {selectedItem.ProductId?.productName || selectedItem.SpareId?.partName || selectedItem.watchId?.model}</Typography>
              <Typography variant="h6" sx={{marginRight:4}}>Product Price: ₹{selectedItem.totalPrice}</Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button color="secondary" variant="contained" onClick={handleConfirmPurchase}><CheckCircleIcon></CheckCircleIcon>Confirm</Button>
          <Button onClick={handleCloseDialog} variant="contained" color="primary"><CancelIcon></CancelIcon>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CartPage;
