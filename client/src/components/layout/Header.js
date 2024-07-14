import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../style/header.css';
import { CgShoppingBag } from "react-icons/cg";
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useCart } from '../../context/cart';
import useCategory from '../../hooks/useCategory';
import { FaOpencart } from "react-icons/fa";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navVisible, setNavVisible] = useState(true);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    });
    setTimeout(() => {
      toast.success("Logout Successful");
    }, 500);
    localStorage.removeItem('auth');
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setTimeout(() => {
      setDropdownOpen(false);
    }, 3000);
  };

  const toggleCategoryDropdown = () => {
    setCategoryDropdownOpen(!categoryDropdownOpen);
  };

  const getFirstName = (fullName) => {
    return fullName.split(' ')[0];
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      setNavVisible(false);
    } else {
      setNavVisible(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <nav className={`nav-bar ${navVisible ? '' : 'hidden'}`}>
        <p className='store-logo'><CgShoppingBag className='logo' />Zeyo Store</p>
        <ul className="nav-list">
          <li><NavLink to="/" className={({ isActive }) => (isActive ? "nav-text active" : "nav-text")}>Home</NavLink></li>
          <li className="dropdown">
            <span onClick={toggleCategoryDropdown} className="nav-text">Category
              <span className='drop-icon'>{categoryDropdownOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}</span>
            </span>
            {categoryDropdownOpen && (
              <div className="dropdown-menu">
                {categories && categories.length > 0 ? (
                  categories.map((category) => (
                    <NavLink key={category._id}  to={`/product-category/${category.slug}`} className="dropdown-item">{category.name}</NavLink>
                  ))
                ) : (
                  <div className="dropdown-item">No categories available</div>
                )}
              </div>
            )}
          </li>
          {!auth.user ? (
            <>
              <li><NavLink to="/signup" className={({ isActive }) => (isActive ? "nav-text active" : "nav-text")}>SignUp</NavLink></li>
              <li><NavLink to="/login" className={({ isActive }) => (isActive ? "nav-text active" : "nav-text")}>Login</NavLink></li>
            </>
          ) : (
            <>
              <li className="dropdown">
                <span onClick={toggleDropdown} className="nav-text user-name">{getFirstName(auth.user.name)}<span className='drop-icon'>{dropdownOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}</span></span>
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item">Dashboard</NavLink>
                    <span onClick={handleLogout} className="dropdown-item" id='dropdown-item-logout'>Logout</span>
                  </div>
                )}
              </li>
            </>
          )}
          <li><NavLink to="/cart" id="header-cart" className={({ isActive }) => (isActive ? "nav-text active" : "nav-text")}><FaOpencart/> Cart <span>{cart.length}</span></NavLink></li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
