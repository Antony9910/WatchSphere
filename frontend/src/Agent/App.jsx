import React from 'react'
import Navbar from './Component/navbar/navbar'

import Footer from '../Guest/Components/footer/footer'
import AgentRoutes from '../Routes/AgentRoutes'

const Agent = () => {
  return (
    <div>
      <Navbar/>
    <AgentRoutes/>
      <Footer/>
    </div>
  )
}

export default Agent