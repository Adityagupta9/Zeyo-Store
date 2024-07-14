import React from 'react';
import { NavLink } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import '../../src/style/pagenotfound.css';

const Pagenotfound = () => {
  return (
    <Layout title={"Invalid page"}>
      <div className="pagenotfound-container">
        <h1 className="pagenotfound-title">404 - Page Not Found</h1>
        <p className="pagenotfound-message">Sorry, the page you are looking for does not exist.</p>
        <NavLink to="/" className="pagenotfound-link">Go to Homepage</NavLink>
      </div>
    </Layout>
  );
}

export default Pagenotfound;
