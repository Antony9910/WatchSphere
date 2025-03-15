import React from 'react'
import { Routes,Route} from 'react-router-dom'
import Front from '../Seller/pages/Front'

import EditProfile from '../Seller/pages/EditProfile'
import EditImage from '../Seller/pages/EditImage'
import BasicCard from '../Seller/pages/product'
import Category from '../Seller/pages/Category'
import OutlinedCard from '../Seller/pages/Category'
import UserCategory from '../Seller/pages/UserCategory'
import Color from '../Seller/pages/Color'
import Variant from '../Seller/pages/Variant'
import ViewBooking from '../Seller/pages/ViewBooking'
import ViewProduct from '../Seller/pages/ViewProduct'
import EditProduct from '../Seller/pages/EditProduct'

const SellerRoutes = () => {
  return (
    <div>
    <Routes>
    <Route path='/' element={<Front />} />
    <Route path='Profile' element={<EditProfile/>}/>
    <Route path='Pro' element={<EditImage/>}/>
    <Route path='Product' element={<BasicCard/>}/>
    <Route path='Category' element={< OutlinedCard/>}/>
    <Route path='Color' element={<Color/>}/>
    <Route path='variant' element={<Variant/>}/>
    <Route path='book' element={<ViewBooking/>}/>
    <Route path='view' element={<ViewProduct/>}/>
     <Route path='edit' element={<EditProduct/>}/> 
  

    </Routes>
    </div>
  )
}

export default SellerRoutes