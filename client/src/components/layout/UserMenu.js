import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../../src/style/usermenu.css';

const UserMenu = () => {
  return (
    <div id="user-menu">
      <ul>
        <li className="user-menu-list">
          <NavLink to="/dashboard/user/orders" className={({ isActive }) => (isActive ? 'active' : '')}>
            Orders
          </NavLink>
        </li>
        <li className="user-menu-list">
          <NavLink to="/dashboard/user/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
            Profile
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
