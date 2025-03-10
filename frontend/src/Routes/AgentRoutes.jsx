import React from 'react'
import { Routes,Route} from 'react-router-dom'

import AgentPage from '../Agent/pages/AdminPage'
import EditImage from '../Agent/pages/EditImage'
import EditProfile from '../Agent/pages/EditProfile'
// import Product from '../Seller/pages/product'

const AgentRoutes = () => {
  return (
    <div>
    <Routes>
    <Route path='/' element={< AgentPage/>} />
    {/* <Route path='Product' element={<Product/>}/> */}
    <Route path='Profile' element={<EditProfile/>}/>
    <Route path='Pro' element={<EditImage/>}/>

    </Routes>
    </div>
  )
}

export default AgentRoutes