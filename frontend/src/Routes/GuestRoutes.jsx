import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from '../Guest/Pages/Home/Home'

import About from '../Guest/pages/About/About'
import Registration from '../Guest/pages/Registration/Registration'
import Login from '../Guest/pages/login/login'



const GuestRoutes = () => {
  return (
    <Routes>
 {/* <Route path='admin/home' element={<Admin/>} /> */}
    
  
  
    <Route path='/*' element={<Home/>} />
    <Route path='login' element={<Login/>}/>
    <Route path='about' element={<About/>}/>
    <Route path='register' element={<Registration/>}/>


</Routes>
  )
}

export default GuestRoutes