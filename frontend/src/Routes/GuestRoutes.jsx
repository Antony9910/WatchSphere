import React from 'react'
import { Route, Routes } from 'react-router-dom'



import About from '../Guest/pages/About/About'
import Registration from '../Guest/pages/Registration/Registration'
import Login from '../Guest/pages/login/login'
import SellerRegistration from '../Guest/pages/Registration/SellerRegistration'
import Home from '../Guest/pages/Home/Home'
import ShopRegistration from '../Guest/pages/Registration/ShopRegistration'
import AgentRegistration from '../Guest/pages/Registration/AgentRegistration'



const GuestRoutes = () => {
  return (
    <Routes>
 {/* <Route path='admin/home' element={<Admin/>} /> */}
    
  
  
    <Route path='/*' element={<Home/>} />
    <Route path='login' element={<Login/>}/>
    <Route path='about' element={<About/>}/>
    <Route path='register' element={<Registration/>}/>
    <Route path='SellerRegister' element={<SellerRegistration/>}/>
    <Route path='ShopRegister' element={<ShopRegistration/>}/>
    <Route path='AgentRegister' element={<AgentRegistration/>}/>


</Routes>
  )
}

export default GuestRoutes