import React from 'react'
import { Routes,Route} from 'react-router-dom'

import UserPage from '../User/pages/FrontPage'
import EditProfile from '../User/pages/EditProfile'
import EditImage from '../User/pages/EditImage'


const UserRoutes = () => {
  return (
    <div>
    <Routes>
    <Route path='/' element={<UserPage />} />
    <Route path='Profile' element={<EditProfile/>}/>
     <Route path='Pro' element={<EditImage/>}/>

    </Routes>
    </div>
  )
}

export default UserRoutes