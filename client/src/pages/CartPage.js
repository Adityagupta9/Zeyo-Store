import Layout from '../components/layout/Layout';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/auth';
import { useCart } from '../context/cart';
import { useNavigate } from 'react-router-dom';
import '../style/cartpage.css';
import DropIn from 'braintree-web-drop-in-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaOpencart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const CartPage = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState('');
  const [instance, setInstance] = useState('');
  const [loading, setLoading] = useState(false);

  const removeItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem('cart', JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = () => {
    try {
      let total = 0;
      cart.forEach((item) => {
        total += item.price;
      });
      return total.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR'
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get('https://valiant-sore-tennis.glitch.me/api/v1/product/braintree/token');
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const handelPayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post('https://valiant-sore-tennis.glitch.me/api/v1/product/braintree/payment', {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem('cart');
      setCart([]);
      navigate('/dashboard/user/orders');
      toast.success("Payment completed successfully")
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div id="cart-page">
        <div className="upper-message">
          <h4>Your Cart <FaOpencart/> </h4>
          <p className="cart-user-name">
            {`Hey ${auth?.token ? auth?.user.name : 'User'}`}
          </p>
          <p className="number-prod">
            {`You have ${cart?.length} items in cart ${
              auth?.token ? '' : ' please login to check Out'
            }`}
          </p>
        </div>
        <div className="cart-items">
          {cart?.map((c) => (
            <div className="cart-item-card" key={c._id}>
              <div className="cart-item-img">
                <img
                  src={`https://valiant-sore-tennis.glitch.me/api/v1/product/product-photo/${c._id}`}
                  alt={c.name}
                />
              </div>
              <div className="cart-item-details">
                <p className="cart-item-name">{c.name}</p>
                <p className="cart-item-name">
                  {c.description.substring(0, 150)}
                </p>
                <p className="cart-item-name">₹{c.price}</p>
                <button onClick={() => removeItem(c._id)}><MdDelete/>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-payment">
          <h2>Cart Summary</h2>
          <p>Total Amount = {totalPrice()}</p>
          {auth?.user?.address ? (
            <>
              <div className="cart-user-address">
                <h4>Current address</h4>
                <h5>{auth?.user?.address}</h5>
                <button
                  className="cart-update-address"
                  onClick={() => navigate('/dashboard/user/profile')}
                >
                  Update address
                </button>
              </div>
            </>
          ) : (
            <div className="cart-user-address">
              {auth?.token ? (
                <button className="cart-user-address-update">Update Password</button>
              ) : (
                <button
                  className="cart-user-address-update"
                  onClick={() => navigate('/login', { state: '/cart' })}
                >
                  Please Login to check out
                </button>
              )}
            </div>
          )}
          <div className="cart-braintree">
            {clientToken && (
              <DropIn
                options={{
                  authorization: clientToken,
                  paypal: {
                    flow: 'vault',
                  },
                }}
                onInstance={(instance) => setInstance(instance)}
              />
            )}
            <button
              className="make-payment"
              onClick={handelPayment}
              disabled={!instance || loading || !auth?.user?.address}
            >
              {loading ? 'Processing...' : 'Make Payment'}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
