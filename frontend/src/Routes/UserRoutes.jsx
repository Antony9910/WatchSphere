import React from 'react'
import { Routes,Route} from 'react-router-dom'
import Products from '../Shop/pages/products'
import UserPage from '../User/pages/FrontPage'

const ShopRoutes = () => {
  return (
    <div>
    <Routes>
    <Route path='/' element={<UserPage />} />
   

    </Routes>
    </div>
  )
}

export default ShopRoutes