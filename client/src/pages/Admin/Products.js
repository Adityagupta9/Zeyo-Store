import React,{useState,useEffect} from 'react';
import AdminMenu from '../../components/layout/AdminMenu';
import { RiMenu2Fill } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import Layout from '../../components/layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../style/adminproduct.css'
const Products = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [products,setProducts] = useState([])

    const getAllProducts = async()=>{
        try {
            const {data} = await axios.get("https://valiant-sore-tennis.glitch.me/api/v1/product/get-product")
            setProducts(data?.products)
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong while fetching product")
        }
    }
    useEffect(()=>{
        getAllProducts()
    },[])
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
          <div className="product-cards-container">
            {products?.map((p)=>(
                <Link to={`/dashboard/admin/product/${p.slug}`}>
                <div className="product-card" key={p._id}>
                {p.bestSale && (
                    <p className='prod-bestSale'>Best Sale</p>
                  )}
                  <div className="img-box">
                  <img src={`https://valiant-sore-tennis.glitch.me/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                  </div>
                <div className="product-details">
                    <p className='prod-name'>{p.name}</p>
                    <p className='prod-desc'>{p.description.substring(0,40)}</p>
                    <p className='prod-price'>₹ {p.price}</p>
                    
                    <div className="left-shipp">
                    <p className='prod-quantity'>Only {p.quantity} left</p>
                    {p.shipping && (
                    <p className='prod-shipping'>Free Shipping</p>
                    )}
                    </div>
                    
                    
                </div>
            </div>
            </Link>
            ))}
            
          </div>
          </div>
      </Layout>
    )
  }

export default Products 
