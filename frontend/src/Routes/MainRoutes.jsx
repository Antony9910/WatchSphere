import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Guest from '../Guest/App'
import Admin from '../Admin/App'
import Seller from '../Seller/App'
import Shop from '../Shop/App'
import User from '../User/App'
import Agent from '../Agent/App'




const MainRoutes = () => {
  return (
    <Routes>
 {/* <Route path='admin/home' element={<Admin/>} /> */}
    
  
    <Route path='/*' element={<Guest/>} />
    {/* <Route path='admin' element={<Admin/>}/> */}
      <Route path='admin/*' element={<Admin/>} />
      <Route path='seller/*' element={<Seller/>}/>
      <Route path='shop/*' element={<Shop/>}/>
      <Route path="user/*" element={<User/>}/>
      <Route path='agent/*' element={<Agent/>}></Route>




</Routes>
  )
}

export default MainRoutes