import React from 'react'
import GuestRoutes from './Routes/GuestRoutes'
import AdminRoutes from './Routes/AdminRoutes'
import SellerRoutes from './Routes/SellerRoutes'
import ShopRoutes from './Routes/ShopRoutes'


const App = () => {
  return (
    <div>
      <GuestRoutes/>
      <AdminRoutes/>
      <SellerRoutes/>
      <ShopRoutes/>
    
    </div>
  )
}

export default App