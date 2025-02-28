import React from 'react'
import { Routes,Route} from 'react-router-dom'

import AgentPage from '../Agent/pages/AdminPage'
// import Product from '../Seller/pages/product'

const AgentRoutes = () => {
  return (
    <div>
    <Routes>
    <Route path='/' element={< AgentPage/>} />
    {/* <Route path='Product' element={<Product/>}/> */}

    </Routes>
    </div>
  )
}

export default AgentRoutes