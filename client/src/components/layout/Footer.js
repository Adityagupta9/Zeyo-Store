import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/footer.css';

const Footer = () => {
  return (
    <div id='footer'>
      <p>All rights reserved &copy; 2024 Aditya</p>
      <div className="about">
        <Link className='footer-link' to="/About">About</Link>
        <Link className='footer-link' to="/Contact">Contact</Link>
        <Link className='footer-link' to="/Policy">Policy</Link>
      </div>
    </div>
  );
}

export default Footer;
