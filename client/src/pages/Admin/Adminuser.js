import React,{useState} from 'react';
import AdminMenu from '../../components/layout/AdminMenu';
import { RiMenu2Fill } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import Layout from '../../components/layout/Layout';
import '../../style/adminuser.css'
const Adminuser = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <Layout>
      <div className="admin-dashboard-container">
        <button className={`pgbut menu-toggle-button-${menuOpen ? 'open' : 'close'}`} onClick={toggleMenu}>
          {menuOpen ? <MdOutlineClose className='menu-icon' /> : <RiMenu2Fill className='menu-icon' />}
        </button>
        <div className={`admin-menu ${menuOpen ? 'open' : ''}`}>
          <AdminMenu />
        </div>
        </div>
    </Layout>
  )
}

export default Adminuser
