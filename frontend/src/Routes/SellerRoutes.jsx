import React from 'react'
import { Routes,Route} from 'react-router-dom'
import Front from '../Seller/pages/Front'

import EditProfile from '../Seller/pages/EditProfile'
import EditImage from '../Seller/pages/EditImage'
import BasicCard from '../Seller/pages/product'
import Category from '../Seller/pages/Category'
import OutlinedCard from '../Seller/pages/Category'

const SellerRoutes = () => {
  return (
    <div>
    <Routes>
    <Route path='/' element={<Front />} />
    <Route path='Profile' element={<EditProfile/>}/>
    <Route path='Pro' element={<EditImage/>}/>
    <Route path='Product' element={<BasicCard/>}/>
    <Route path='Category' element={< OutlinedCard/>}/>

    </Routes>
    </div>
  )
}

export default SellerRoutes