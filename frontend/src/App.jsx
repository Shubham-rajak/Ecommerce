// user 

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PublicRoute from './Routes/PublicRoute';
import Home from './page/Home';
import About from './page/About';
import Product from './page/Product';
import Contact from './page/Contact';
import SingleProduct from './page/SingleProduct';
import Cart from './page/Cart';
import Favorite from './components/Favorite';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Error from './page/Error';
import api from './utility/api';
import ProfileDetail from './page/ProfileDetail';

// dashboard


import AdminRoute from './Routes/AdminRoute';
import Users from './admin/pages/Users';
import Category from './admin/pages/Category';
import Products from './admin/pages/Product';
import Orders from './admin/pages/Orders';
import ForgotPassword from './Auth/ForgotPassword';
import OtpVerification from './Auth/OtpVerification';
import UpdatePassword from './Auth/UpdatePassword';
import CheckOut from './page/CheckOut';
import AdminLogin from './page/AdminLogin';
import Dashboard from './admin/pages/Dashboard';





const App = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<PublicRoute  />}>
          <Route path='/'  element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/product/' element={<Product />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/singleProduct/:productId' element={<SingleProduct />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/favorite' element={<Favorite />} />
          <Route path= '/profileDetail' element={<ProfileDetail/>} />
          <Route path = '/checkout' element={<CheckOut />} />
        </Route>

        <Route path='/admin' element={<AdminRoute/>} >
          <Route path="/admin/dashboard" element={<Dashboard/>} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/categories" element={<Category />} />
          <Route path="/admin/orders" element={<Orders />} />
        </Route>

        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path='/forgot/password' element={<ForgotPassword/>} />
        <Route path='/verification/otp' element={<OtpVerification/>} />
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  )
}

export default App