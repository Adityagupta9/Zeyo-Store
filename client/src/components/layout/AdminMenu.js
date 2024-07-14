import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../../src/style/adminmenu.css';

const AdminMenu = () => {
  return (
    <div id="admin-menu">
      <ul>
        <li className="admin-menu-list">
          <NavLink to="/dashboard/admin/create-product" className={({ isActive }) => (isActive ? 'active' : '')}>
            Create Product
          </NavLink>
        </li>
        <li className="admin-menu-list">
          <NavLink to="/dashboard/admin/products" className={({ isActive }) => (isActive ? 'active' : '')}>
             Products
          </NavLink>
        </li>
        <li className="admin-menu-list">
          <NavLink to="/dashboard/admin/orders" className={({ isActive }) => (isActive ? 'active' : '')}>
            Orders 
          </NavLink>
        </li>
        <li className="admin-menu-list">
          <NavLink to="/dashboard/admin/create-category" className={({ isActive }) => (isActive ? 'active' : '')}>
            Create Category
          </NavLink>
        </li>
        
        <li className="admin-menu-list">
          <NavLink to="/dashboard/admin/admin-user" className={({ isActive }) => (isActive ? 'active' : '')}>
            Users
          </NavLink>
        </li>
        
      </ul>
    </div>
  );
};

export default AdminMenu;
