import React from 'react'
import { Routes,Route} from 'react-router-dom'

import UserPage from '../User/pages/FrontPage'
import EditProfile from '../User/pages/EditProfile'
import EditImage from '../User/pages/EditImage'
import ProductList from '../User/pages/products'
import ProductDetails from '../User/pages/productDetails'
import Cart from '../User/pages/cart'
import CartPage from '../User/pages/CartPage'
import Payment from '../User/pages/Payment'
import ShopProduct from '../User/pages/ShopProduct'
import ShopDetails from '../User/pages/ShopDetails'
import ShopCart from '../User/pages/shopCart'
import WatchDetails from '../User/pages/WatchDetail'
import WatchCart from '../User/pages/WatchCart'
import Orders from '../User/pages/orders'
import ShopPayment from '../User/pages/shopPayment'
import WatchPayment from '../User/pages/watchPayment'
import Feedback from '../User/pages/Feedback'
import Bill from '../User/pages/Bill'
import WatchBill from '../User/pages/WatchBill'
import ShopsBill from '../User/pages/ShopsBill'
import Message from '../User/pages/Message'
import Complaint from '../User/pages/Complaint'
import WatchComplaint from '../User/pages/WatchComplaint'
import Complaints from '../User/pages/Complaints'
import SpareComplaint from '../User/pages/SpareComplaint'
import WatchFeedBack from '../User/pages/WatchFeedBack'



const UserRoutes = () => {
  return (
    <div>
    <Routes>
    <Route path='/' element={<UserPage />} />
    <Route path='Profile' element={<EditProfile/>}/>
     <Route path='Pro' element={<EditImage/>}/>
     <Route path='Product' element={<ProductList/>}/>
     <Route path="/product/:productId" element={<ProductDetails />} />
     <Route path="/cart/:productId" element={<Cart/>} />
     <Route path="cartPage" element={<CartPage/>} />
     <Route path="orders" element={<Orders/>}/>
     <Route path="shop" element={<ShopProduct/>}/>
     <Route path="/spare/:spareId" element={<ShopDetails />} />
     <Route path="/watch/:watchId" element={<WatchDetails />} />
     <Route path="/shopCart/:spareId" element={<ShopCart/>} />
     <Route path="/watchCart/:watchId" element={<WatchCart/>} />
     <Route path="Feedback" element={<Feedback/>}/>
     <Route path="/payment/:bookingId" element={<Payment />} />
     <Route path="/ShopPayment/:ShopBookingId" element={<ShopPayment/>} />
     <Route path="/WatchPayment/:WatchBookingId" element={<WatchPayment/>} />
     <Route path="/Bill/:bookingId" element={<Bill/>} />
     <Route path="/watchBill/:WatchBookingId" element={<WatchBill/>} />
     <Route path="/ShopsBill/:ShopBookingId" element={<ShopsBill/>} />
     <Route path="message" element={<Message/>}/>
     <Route path="complaint" element={<Complaint/>}/>
     <Route path="/WatchFeedback/:bookingId" element={<WatchFeedBack/>} />
     <Route path="/WatchComplaint/:bookingId" element={<WatchComplaint/>} />
     <Route path="/Complaints/:WatchBookingId" element={<Complaints/>} />
     <Route path="/SpareComplaint/:ShopBookingId" element={<SpareComplaint/>} />
   
    </Routes>
    </div>
  )
}

export default UserRoutes