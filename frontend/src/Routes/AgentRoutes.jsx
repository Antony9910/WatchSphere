import React from 'react'
import { Routes,Route} from 'react-router-dom'

import AgentPage from '../Agent/pages/AdminPage'
import EditImage from '../Agent/pages/EditImage'
import EditProfile from '../Agent/pages/EditProfile'
import ViewBooking from '../Agent/pages/ViewBooking'
import Track from '../Agent/pages/Track'
// import Product from '../Seller/pages/product'

const AgentRoutes = () => {
  return (
    <div>
    <Routes>
    <Route path='/' element={< AgentPage/>} />

    <Route path='Profile' element={<EditProfile/>}/>
    <Route path='Pro' element={<EditImage/>}/>
    <Route path='View' element={<ViewBooking/>}/>
    <Route path='Track' element={<Track/>}/>

    </Routes>
    </div>
  )
}

export default AgentRoutes