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
    <Route path='View' element={<ViewBooking/>}/>
    <Route path='Complaint' element={<Complaint/>}/>
      <Route path="ComplaintReport" element={<ComplaintReport/>}/>
    </Routes>
    </div>
  )
}

export default ShopRoutes