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
        <Route path="/" element={<Home/>} />
        <Route path="/userlogin" element={<UserLogin/>} />
        <Route path="/usersignup" element={<UserSignup/>} />
        <Route path="/captainlogin" element={<Captainlogin/>} />
        <Route path="/captainsignup" element={<CaptainSignup/>} />
      </Routes>
    </>
  );
}

export default App
