import React from 'react'
import { Routes,Route} from 'react-router-dom'
import Front from '../Seller/pages/Front'
import FrontPage from '../Shop/pages/FrontPage'
import EditProfile from '../Shop/pages/EditProfile'
import EditImage from '../Shop/pages/EditImage'
import Product from '../Shop/pages/product'

import SpareProduct from '../Shop/pages/UserCategory'
import ViewProducts from '../Shop/pages/ViewProducts'
import EditProduct from '../Shop/pages/EditProduct'
import ViewBooking from '../Shop/pages/ViewBooking'
import Complaint from '../Shop/pages/Complaint'
import ComplaintReport from '../Shop/pages/ComplaintReport'
import FeedBack from '../Shop/pages/FeedBack'
import Solution from '../Shop/pages/Solution'
import ProductSolution from '../Shop/pages/ProductSolution'
import WatchSolution from '../Shop/pages/WatchSolution'
import WatchEditImage from '../Shop/pages/WatchEditImage'
import EditWatch from '../Shop/pages/EditWatch'
import EditSecond from '../Shop/pages/EditSecond'
import SalesReport from '../Shop/pages/SalesReport'

const ShopRoutes = () => {
  return (
    <div>
    <Routes>
    <Route path='/' element={<FrontPage />} />
    <Route path='Profile' element={<EditProfile/>}/>
    <Route path='Pro' element={<EditImage/>}/>
    <Route path='Product' element={<Product/>}/>
    <Route path='category' element={<SpareProduct/>}/>
    <Route path='Views' element={<ViewProducts/>}/>
    <Route path='/edit/:spareId' element={<EditProduct/>}/> 
    <Route path='/edits/:watchId' element={<EditWatch/>}/> 
    <Route path='/watchImage/:spareId' element={<WatchEditImage/>}/> 
    <Route path='/SecondImage/:watchId' element={<EditSecond/>}/> 
    <Route path='View' element={<ViewBooking/>}/>
    <Route path='Complaint' element={<Complaint/>}/>
    <Route path='Solution' element={<Solution/>}/>
    <Route path="ComplaintReport" element={<ComplaintReport/>}/>
    <Route path="FeedBack" element={<FeedBack/>}/>
    <Route path="Report" element={<SalesReport/>}/>
    <Route path="/ProductSolution/:SpareComplaintId" element={<ProductSolution/>} />
    <Route path="/WatchSolution/:ComplaintId" element={<WatchSolution/>} />
    </Routes>
    </div>
  )
}

export default ShopRoutes