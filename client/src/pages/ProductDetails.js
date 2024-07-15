import Layout from '../components/layout/Layout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/productdetails.css'
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
import Spinner2 from './Spinner2';
import { FaOpencart } from "react-icons/fa";
const ProductDetails = () => {
  const [cart,setCart] = useCart();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [similarprod,setSimilarProd] = useState([])
  const navigate = useNavigate()
  const fetchProductDetails = async () => {
    try {
      const { data } = await axios.get(`https://valiant-sore-tennis.glitch.me/api/v1/product/get-product/${params?.slug}`);
      setProduct(data?.product);
      fetchSimilarProduct(data?.product._id,data?.product?.category._id)
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSimilarProduct = async (pid,cid)=>{
    try {
      const {data} = await axios.get(`https://valiant-sore-tennis.glitch.me/api/v1/product/similar-product/${pid}/${cid}`)
      setSimilarProd(data?.product)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (params?.slug) {
      fetchProductDetails();
    }
  }, [params?.slug]);

  return (
    <Layout>
      <div className="product-details-page">
      <h4>Product Details</h4>
      {product && product._id ? (
      <div className="product-details-card">
        <div className="prod-pic-container">
          <div className="product-pic">
            <img
              src={`https://valiant-sore-tennis.glitch.me/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
            />
          </div>
          <div className="purchase-button">
            <button onClick={()=>{setCart([...cart,product]);localStorage.setItem("cart",JSON.stringify([...cart,product])) ;setTimeout(()=>{toast.success("Item added sucessfully")},500) ;navigate("/cart") }} id='buy-now'>Buy Now</button>
            <button   onClick={()=>{setCart([...cart,product]);localStorage.setItem("cart",JSON.stringify([...cart,product])) ;setTimeout(()=>{toast.success("Item added sucessfully")},500) }} id='add-cart'><FaOpencart/> Add to Cart</button>
          </div>
        </div>
        <div className="product-info">
          <p className="detail-name">{product?.name}</p>
          <p className="detail-description">{product.description}</p>
          <p className="detail-category">{product?.category?.name}</p>
          <p className="detail-price">₹ {product?.price}</p>
          <p className="detail-quantity">Only {product?.quantity} left</p>
        </div>
      </div>
       ) : (
        <p><Spinner2/></p>
      )}
      <div className="similar-product-page">
        <h4>SimilarProduct</h4>
        <p>{similarprod?.length<1?'No similar Product':`${similarprod?.length} similar product`}</p>
      <div className="similar-product">
        {similarprod.map((s)=>(
          <div onClick={()=>navigate(`/product/${s.slug}`)} className="product-card" key={s._id}>
            {s.bestSale && (
                    <p className='prod-bestSale'>Best Sale</p>
                  )}
                  <div className="img-box">
                  <img src={`https://valiant-sore-tennis.glitch.me/api/v1/product/product-photo/${s._id}`} alt={s.name} />
                  </div>
                <div className="product-details">
                    <p className='prod-name'>{s.name}</p>
                    <p className='prod-desc'>{s.description}</p>
                    <p className='prod-price'>₹ {s.price}</p>
                    <div className="left-shipp">
                    <p className='prod-quantity'>Only {s.quantity} left</p>
                    {s.shipping && (
                    <p className='prod-shipping'>Free Shipping</p>
                    )}
                    </div>
                    
                </div>
          </div>
        ))}
      </div>
      </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
