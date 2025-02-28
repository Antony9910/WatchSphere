import React from 'react'
import { Routes,Route} from 'react-router-dom'
import Front from '../Seller/pages/Front'
import FrontPage from '../Shop/pages/FrontPage'
import Products from '../Shop/pages/products'

const ShopRoutes = () => {
  return (
    <div>
    <Routes>
    <Route path='/' element={<FrontPage />} />
    <Route path='Product' element={<Products/>}/>

    </Routes>
    </div>
  )
}

export default ShopRoutes