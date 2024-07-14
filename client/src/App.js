import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy'
import Pagenotfound from './pages/Pagenotfound';
import Signin from './pages/auth/Signin';
import Login from './pages/auth/Login';
import PrivateRoute from './components/layout/Routes/Private';
import Forgotpass from './pages/auth/Forgotpass';
import AdmineRoute from './components/layout/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateProduct from './pages/Admin/CreateProduct';
import CreateCategory from './pages/Admin/CreateCategory';
import Adminuser from './pages/Admin/Adminuser';
import UserDashboard from './pages/user/UserDashboard';
import Order from './pages/user/Order';
import Profile from './pages/user/Profile';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import SearchProd from './pages/SearchProd';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import ProductCategory from './pages/ProductCategory';
import AdminOrders from './pages/Admin/AdminOrders';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path='/search' element={<SearchProd/>}/>
        <Route path='/product-category/:slug' element={<ProductCategory/>}/>
        <Route path='/product/:slug' element={<ProductDetails/>}/>
        <Route path='/signup' element={<Signin/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/dashboard' element={<PrivateRoute/>}>
          <Route path='user' element={<UserDashboard/>}/>
          <Route path='user/orders' element={<Order/>}/>
          <Route path='user/profile' element={<Profile/>}/>
        </Route>
        <Route path='/dashboard' element={<AdmineRoute/>}>
          <Route path="admin" element={<AdminDashboard/>} />
          <Route path="admin/create-category" element={<CreateCategory/>} />
          <Route path="admin/create-product" element={<CreateProduct/>} />
          <Route path="admin/product/:slug" element={<UpdateProduct/>} />
          <Route path="admin/products" element={<Products/>} />
          <Route path="admin/admin-user" element={<Adminuser/>} />
          <Route path="admin/orders" element={<AdminOrders/>} />
        </Route>
        <Route path='/forgotpassword' element={<Forgotpass/>}/>
        <Route path='/about' element={<About />}/>
        <Route path='/Contact' element={<Contact />}/>
        <Route path='/policy' element={<Policy />}/>
        <Route path='*' element={<Pagenotfound />}/>
      </Routes>
    </BrowserRouter>
  );
}




export default App;
