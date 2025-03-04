import React from 'react'
import { Route, Routes } from 'react-router-dom'



import About from '../Guest/pages/About/About'
import Registration from '../Guest/pages/Registration/Registration'
import Login from '../Guest/pages/login/login'
import SellerRegistration from '../Guest/pages/Registration/SellerRegistration'
import Home from '../Guest/pages/Home/Home'



const GuestRoutes = () => {
  return (
    <Routes>
 {/* <Route path='admin/home' element={<Admin/>} /> */}
    
  
  
    <Route path='/*' element={<Home/>} />
    <Route path='login' element={<Login/>}/>
    <Route path='about' element={<About/>}/>
    <Route path='register' element={<Registration/>}/>
    <Route path='SellerRegister' element={<SellerRegistration/>}/>


</Routes>
  )
}

export default GuestRoutes