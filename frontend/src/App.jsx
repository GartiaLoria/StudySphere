import React from 'react'
import Signup from './Pages/SignUp'
import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Home from './Pages/Home'

const App = () => {
  return (
    // <div className='p-4 h-screen flex items-center justify-center md:text-base text-[0.55rem]'>
    <div>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/signup' element = {<Signup/>} />
        {/* <Route path='/' element={authUser ? <Home /> : <Navigate to="/login"/>}/>
        <Route path='/login' element={authUser ? <Navigate to="/"/> : <Login />}/>
        <Route path='/signup' element={authUser ? <Navigate to="/"/> : <Signup />}/> */}
      </Routes>
      <ToastContainer />

    </div>
  )
}

export default App
