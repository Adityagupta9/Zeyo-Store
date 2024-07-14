import React from 'react'
import Header from './Header';
import Footer from './Footer';
import {Helmet} from "react-helmet";
import  { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
const Layout = ({children,title,description,keywords,author}) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
      </Helmet>
      <Header/>
      <main>
      <Toaster />
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default Layout
