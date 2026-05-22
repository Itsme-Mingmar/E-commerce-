import React, { useEffect } from 'react';
import {
  Provider,
  useDispatch,
  useSelector
} from "react-redux";

import store from "./redux/store";

import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

import { Toaster } from 'sonner';

import { fetchCart } from './redux/slices/cartSlice';
import { checkAuth } from './redux/slices/authSlice';

import UserLayout from './components/Layout/UserLayout';
import AdminLayout from './components/Admin/AdminLayout';

import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Collections from './pages/Collections';
import Checkout from './pages/CheckOut';
import Order from './pages/Order';

import AdminHomePage from './components/Admin/AdminHomePage';
import UserManagement from './components/Admin/UserManagement';
import ProductManagement from './components/Admin/ProductManagement';
import EditProductPage from './components/Admin/EditProductPage';
import OrdersManagement from './components/Admin/OrdersManagement';


// App content INSIDE Provider
function AppContent() {

  const dispatch = useDispatch();

  const { user } = useSelector(
    (state) => state.auth
  );

  // check token validity on app load
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);


  // fetch cart if user logged in
  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    }
  }, [dispatch, user]);


  return (
    <BrowserRouter>

      <Toaster position='top-right' />

      <Routes>

        <Route path='/' element={<UserLayout />}>

          <Route index element={<Home />} />

          <Route
            path='login'
            element={<Login />}
          />

          <Route
            path='register'
            element={<Register />}
          />

          <Route
            path='profile'
            element={<Profile />}
          />

          <Route
            path='checkout'
            element={<Checkout />}
          />

          <Route
            path='order/:id'
            element={<Order />}
          />

          <Route
            path='collections/:collection'
            element={<Collections />}
          />

          <Route
            path='product/:id'
            element={<ProductDetails />}
          />

        </Route>


        <Route
          path='/admin'
          element={<AdminLayout />}
        >

          <Route
            index
            element={<AdminHomePage />}
          />

          <Route
            path='user'
            element={<UserManagement />}
          />

          <Route
            path='product'
            element={<ProductManagement />}
          />

          <Route
            path='orders'
            element={<OrdersManagement />}
          />

          <Route
            path='product/edit/:id'
            element={<EditProductPage />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}


// Provider wrapper
function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;