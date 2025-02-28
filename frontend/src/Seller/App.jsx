import React from 'react'
import Navbar from './Component/navbar/navbar'
import SellerRoutes from '../Routes/SellerRoutes'
import Footer from '../Guest/Components/footer/footer'

const Seller = () => {
  return (
    <div>
      <Navbar/>
      <SellerRoutes/>
      <Footer/>
    </div>
  )
}

export default Seller