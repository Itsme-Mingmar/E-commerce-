import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserLayout from './components/Layout/UserLayout';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element= {<UserLayout/>}>
        <Route path='/' element={<Home/>} />
        <Route path='/product/:id' element={<ProductDetails/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App