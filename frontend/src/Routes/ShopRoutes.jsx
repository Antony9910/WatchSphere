import React from 'react'
import { Routes,Route} from 'react-router-dom'
import Front from '../Seller/pages/Front'
import FrontPage from '../Shop/pages/FrontPage'
import Products from '../Shop/pages/products'
import EditProfile from '../Shop/pages/EditProfile'
import EditImage from '../Shop/pages/EditImage'

const ShopRoutes = () => {
  return (
    <div>
    <Routes>
    <Route path='/' element={<FrontPage />} />
    <Route path='Profile' element={<EditProfile/>}/>
    <Route path='Pro' element={<EditImage/>}/>
    </Routes>
    </div>
  )
}

export default ShopRoutes