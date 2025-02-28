import React from 'react'
import { Routes,Route} from 'react-router-dom'
import Front from '../Seller/pages/Front'
import Product from '../Seller/pages/product'

const SellerRoutes = () => {
  return (
    <div>
    <Routes>
    <Route path='/' element={<Front />} />
    <Route path='Product' element={<Product/>}/>

    </Routes>
    </div>
  )
}

export default SellerRoutes