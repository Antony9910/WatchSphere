import React from 'react'
import { Routes,Route} from 'react-router-dom'

import UserPage from '../User/pages/FrontPage'
import EditProfile from '../User/pages/EditProfile'

const UserRoutes = () => {
  return (
    <div>
    <Routes>
    <Route path='/' element={<UserPage />} />
    <Route path='Profile' element={<EditProfile/>}/>

    </Routes>
    </div>
  )
}

export default UserRoutes