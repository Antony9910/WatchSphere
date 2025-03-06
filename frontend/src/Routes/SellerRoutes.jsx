import React from 'react'
import { Routes,Route} from 'react-router-dom'
import Front from '../Seller/pages/Front'

import EditProfile from '../Seller/pages/EditProfile'
import EditImage from '../Seller/pages/EditImage'

const SellerRoutes = () => {
  return (
    <div>
    <Routes>
    <Route path='/' element={<Front />} />
    <Route path='Profile' element={<EditProfile/>}/>
    <Route path='Pro' element={<EditImage/>}/>
    

    </Routes>
    </div>
  )
}

export default SellerRoutes