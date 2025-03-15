import React from 'react'
import { Routes,Route} from 'react-router-dom'

import UserPage from '../User/pages/FrontPage'
import EditProfile from '../User/pages/EditProfile'
import EditImage from '../User/pages/EditImage'
import ProductList from '../User/pages/products'
import ProductDetails from '../User/pages/productDetails'
import Cart from '../User/pages/cart'


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


    </Routes>
    </div>
  )
}

export default UserRoutes