import React, { useEffect, useState } from "react";
import StoreIcon from '@mui/icons-material/Store';
import WatchIcon from '@mui/icons-material/Watch';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShopIcon from '@mui/icons-material/Shop';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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
  const [watchCartItems, setWatchCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const userId = sessionStorage.getItem('uid');
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchCartItems(userId);
      fetchShopCartItems(userId);
      fetchWatchCartItems(userId);
    } else {
      alert("Please log in to view your cart.");
    }
  }, [userId]);

  useEffect(() => {
    calculateTotalPrice(cartItems.concat(shopCartItems, watchCartItems));
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
      const response = await axios.get(`http://localhost:5000/WatchCart/${userId}`);
      setWatchCartItems(response.data);
    } catch (error) {
      console.error("Error fetching watch cart items:", error);
      alert("Failed to fetch watch cart items.");
    }
  };

  const handleBuyClick = (item) => {
    setSelectedItem(item);
    setOpenDialog(true);
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
    let itemTotalPrice = selectedItem.totalPrice;

    if (selectedItem.ProductId) {
      bookingId = selectedItem.BookingId;
      navigate(`/user/payment/${bookingId}`, { state: { totalPrice: itemTotalPrice } });
    } else if (selectedItem.SpareId) {
      ShopBookingId = selectedItem.ShopBookingId;
      navigate(`/user/ShopPayment/${ShopBookingId}`, { state: { totalPrice: itemTotalPrice } });
    } else if (selectedItem.watchId) {
      WatchBookingId = selectedItem.WatchBookingId;
      navigate(`/user/WatchPayment/${WatchBookingId}`, { state: { totalPrice: itemTotalPrice } });
    }

    setOpenDialog(false);
    setSelectedItem(null);
  };

  
  const handleRemoveItem = async (itemId, type) => {
    try {
      if (type === 'cart') {
        await axios.delete(`http://localhost:5000/cart/${itemId}`);
        setCartItems(prev => prev.filter(item => item._id !== itemId));
      } else if (type === 'shop') {
        await axios.delete(`http://localhost:5000/ShopCart/${itemId}`);
        setShopCartItems(prev => prev.filter(item => item._id !== itemId));
      } else if (type === 'watch') {
        await axios.delete(`http://localhost:5000/WatchCart/${itemId}`);
        setWatchCartItems(prev => prev.filter(item => item._id !== itemId));
      }
    } catch (error) {
      console.error("Failed to remove item:", error);
      alert("Failed to remove item from cart.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4}}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3, fontFamily: 'fantasy', marginLeft: 50 }}>
          YOUR SHOPPING CART<ShoppingCartIcon />
        </Typography>

        {/* Cart Items */}
        <Typography variant="h5" sx={{ mb: 2, fontFamily: 'fantasy' }}>CART-ITEMS<WatchIcon /></Typography>
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
                    <Typography variant="h6">Quantity: {item.quantity}</Typography>
                    <Typography variant="h6">Total Price: ₹{item.totalPrice}</Typography>
                    <Typography variant="h6">ProductName: {item.ProductId?.productName}</Typography>
                    <Button variant="contained" color="secondary" onClick={() => handleBuyClick(item)} sx={{ mt: 2,fontFamily:'fantasy' }}>
                      <ShopIcon />BUY
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => handleRemoveItem(item._id, 'cart')} sx={{ mt:2,marginLeft:2,backgroundColor:'red',color:'white',fontFamily:'fantasy' }}>
                     <DeleteOutlineIcon></DeleteOutlineIcon> Remove
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>

        {/* Shop Cart Items */}
        <Typography variant="h5" sx={{ mt: 4, mb: 2, fontFamily: 'fantasy' }}>SHOP CART ITEMS<StoreIcon /></Typography>
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
                    <Typography variant="h6">Quantity: {item.quantity}</Typography>
                    <Typography variant="h6">Total Price: ₹{item.totalPrice}</Typography>
                    <Typography variant="h6">Partname: {item.SpareId?.partName}</Typography>
                    <Button variant="contained"  onClick={() => handleBuyClick(item)} sx={{ mt: 2,backgroundColor:'blue',color:'white',fontFamily:'fantasy' }}>
                     <ShopIcon /> BUY
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => handleRemoveItem(item._id, 'shop')} sx={{ mt: 2,marginLeft:2,backgroundColor:'red',color:'white',fontFamily:'fantasy' }}>
                     <DeleteOutlineIcon></DeleteOutlineIcon> Remove
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>

        {/* Watch Cart Items */}
        <Typography variant="h5" sx={{ mt: 4, mb: 2, fontFamily: 'fantasy' }}>WATCH CART ITEMS<WatchIcon /></Typography>
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
                    <Typography variant="h6">ModelName: {item.watchId?.model}</Typography>
                    <Typography variant="h6">Quantity: {item.quantity}</Typography>
                    <Typography variant="h6">Total Price: ₹{item.totalPrice}</Typography>
                    <Button variant="contained" onClick={() => handleBuyClick(item)} sx={{ mt: 2,fontFamily:'fantasy',backgroundColor:'blue',color:'white',fontFamily:'fantasy' }}>
                     <ShopIcon /> BUY
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => handleRemoveItem(item._id, 'watch')} sx={{ mt:2,marginLeft:2,backgroundColor:'red',color:'white',fontFamily:'fantasy' }}>
                     <DeleteOutlineIcon></DeleteOutlineIcon> Remove
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>

        {/* Total Price */}
        {(cartItems.length > 0 || shopCartItems.length > 0 || watchCartItems.length > 0) && (
          <Typography variant="h5" sx={{ mt: 3, textAlign: "right",fontFamily:'fantasy'}}>
            Total Price: ₹{totalPrice}
          </Typography>
        )}
      </Paper>

      {/* Purchase Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ marginLeft: 10, fontFamily: 'fantasy',marginLeft:12 }}>
          CONFIRM YOUR PURCHASE<CheckCircleIcon />
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1"sx={{marginLeft:4}}>Are you sure you want to buy the following item?</Typography>
          {selectedItem && (
            <div style={{ textAlign: 'center', marginTop: 10 }}>
              <img src={selectedItem.ProductId?.profileImage || selectedItem.SpareId?.profileImage || selectedItem.watchId?.profileImage} width={70} alt="product" />
              <Typography variant="h6">
                Product Name: {selectedItem.ProductId?.productName || selectedItem.SpareId?.partName || selectedItem.watchId?.model}
              </Typography>
              <Typography variant="h6" sx={{ marginLeft:-1,fontFamily:'fantasy' }}>Product Price: ₹{selectedItem.totalPrice}</Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button  variant="contained" onClick={handleConfirmPurchase}sx={{marginRight:30,backgroundColor:'blue',color:'white',fontFamily:'fantasy'}}>
            <CheckCircleIcon /> Confirm
          </Button>
          <Button onClick={handleCloseDialog} variant="contained" sx={{backgroundColor:'red',color:'white',fontFamily:'fantasy'}}>
            <CancelIcon /> Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CartPage;
