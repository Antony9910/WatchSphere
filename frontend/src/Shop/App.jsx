import React from 'react'
import Navbar from './Component/navbar/navbar'

import Footer from '../Guest/Components/footer/footer'
import ShopRoutes from '../Routes/ShopRoutes'

const Shop = () => {
  return (
    <div>
      <Navbar/>
      <ShopRoutes/>
      <Footer/>
    </div>
  )
}

export default Shop