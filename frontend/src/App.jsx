import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from './components/Layout/UserLayout';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Collections from './pages/Collections';
import Checkout from './pages/CheckOut';
import Order from './pages/Order';
import { Toaster } from 'sonner'
import AdminLayout from './components/Admin/AdminLayout';




function App() {
  return (
    <BrowserRouter>
    <Toaster position='top-right' />
      <Routes>
        <Route path='/' element={<UserLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/order/:id' element={<Order />} />
          <Route path='/collections/:collection' element={<Collections />} />
          <Route path='/product/:id' element={<ProductDetails />} />
        </Route>
        <Route path='/admin' element={<AdminLayout />}>
        {/* admin route */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App