import React from 'react'
import {Route, Routes} from "react-router-dom"
import HomePage from '../Pages/HomePage'
import AboutPage from '../Pages/AboutPage'
import LoginPage from '../Pages/LoginPage'
import SignupPage from '../Pages/SignupPage'
import AdminPage from '../Pages/AdminPage'
import PrivateRoute from './PrivateRoute'
import ProductsPage from '../Pages/ProductsPage'
const Allroutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/about' element={<AboutPage/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/singnup' element={<SignupPage/>}></Route>
      <Route path='/product' element={<PrivateRoute><ProductsPage/></PrivateRoute>}></Route>
      <Route path='/admin' element={<PrivateRoute><AdminPage/></PrivateRoute>}></Route>
    </Routes>
  )
}

export default Allroutes
