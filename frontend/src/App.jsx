import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import Captainlogin from './pages/Captainlogin'
import CaptainSignup from './pages/CaptainSignup'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' component={Home} />
        <Route path='/userlogin' component={UserLogin} />
        <Route path='/usersignup' component={UserSignup} />
        <Route path='/captainlogin' component={Captainlogin} />
        <Route path='/captainsignup' component={CaptainSignup} />
        
 </Routes>
    </>
  )
}

export default App
