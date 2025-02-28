import React from 'react'

import Sidebar from './Components/sidebar/sidebar'
import AdminRoutes from '../Routes/AdminRoutes'
import Navbar from './Components/navbar/navbar'




const Admin = () => {
  return (
    <div>
   <Navbar/>

   <AdminRoutes />
   
   <Sidebar/>
   </div>
  )
}

export default Admin