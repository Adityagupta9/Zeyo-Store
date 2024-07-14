import React, { useEffect, useState } from 'react';
import { RiMenu2Fill } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import Layout from '../../components/layout/Layout';
import UserMenu from '../../components/layout/UserMenu';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment';
import '../../style/orderspage.css';

const Order = () => {
  const [auth, setAuth] = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const getOrders = async () => {
    try {
      const { data } = await axios.get("https://valiant-sore-tennis.glitch.me/api/v1/auth/orders");
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
        console.error('Received data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Order"}>
      <div className="orderspage">
        <div className="user-dashboard-container">
          <button className={`pgbut menu-toggle-button-${menuOpen ? 'open' : 'close'}`} onClick={toggleMenu}>
            {menuOpen ? <MdOutlineClose className='menu-icon' /> : <RiMenu2Fill className='menu-icon' />}
          </button>
          <div className={`user-menu ${menuOpen ? 'open' : ''}`}>
            <UserMenu />
          </div>
          
          <div className="order-container">
            <h4>All orders</h4>
            {Array.isArray(orders) && orders.length > 0 ? (
              orders.map((o, i) => (
                <div className="order-card" key={o._id}>
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Status</th>
                        <th>Buyer</th>
                        <th>Date</th>
                        <th>Payment</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="cart-items">
                    {o.products?.map((p, j) => (
                      <div className="cart-item-card" key={j}>
                        <div className="cart-item-img">
                          <img
                            src={`https://valiant-sore-tennis.glitch.me/api/v1/product/product-photo/${p._id}`}
                            alt={p.name}
                          />
                        </div>
                        <div className="cart-item-details">
                          <p className="cart-item-name">{p.name}</p>
                          <p className="cart-item-description">
                            {p.description.substring(0, 150)}
                          </p>
                          <p className="cart-item-price">₹{p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No orders found</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
