import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import UserMenu from '../../components/layout/UserMenu';
import '../../style/userdashboard.css';
import { RiMenu2Fill } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import { useAuth } from '../../context/auth';

const UserDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [auth] = useAuth();
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };
  
  return (
    <Layout title={"User Dashboard"}>
      <div className="user-dashboard-container">
        <button className={`pgbut menu-toggle-button-${menuOpen ? 'open' : 'close'}`} onClick={toggleMenu}>
          {menuOpen ? <MdOutlineClose className='menu-icon' /> : <RiMenu2Fill className='menu-icon' />}
        </button>
        <div className={`user-menu ${menuOpen ? 'open' : ''}`}>
          <UserMenu />
        </div>
        <div className="user-content">
          <div className="user-card">
            <h2>User Details</h2>
            <ul>
              <li className="user-details">User Name <span>{auth?.user?.name}</span></li>
              <li className="user-details">Email ID <span>{auth?.user?.email}</span></li>
              <li className="user-details">Phone Number <span>{auth?.user?.phone}</span></li>
              <li className="user-details">Date of Birth <span>{formatDate(auth?.user?.dob)}</span></li>
              <li className="user-details">Address <span>{auth?.user?.address}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
