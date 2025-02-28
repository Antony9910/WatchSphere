import React from 'react'
import Navbar from './Component/navbar/navbar'

import Footer from '../Guest/Components/footer/footer'
import UserRoutes from '../Routes/UserRoutes'

const User = () => {
  return (
    <div>
      <Navbar/>
    <UserRoutes/>
      <Footer/>
    </div>
  )
}

export default User