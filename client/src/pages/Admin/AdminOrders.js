import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu';
import { RiMenu2Fill } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import axios from 'axios';
import moment from 'moment';
import { useAuth } from '../../context/auth';
import { Select } from 'antd';
const { Option } = Select; // Destructure Option directly from Select
 // Assuming you have a CSS file for admin orders

const AdminOrders = () => {
    const [auth, setAuth] = useAuth();
    const [status, setStatus] = useState(["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [orders, setOrders] = useState([]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const getAllOrders = async () => {
        try {
            const { data } = await axios.get("https://valiant-sore-tennis.glitch.me/api/v1/auth/all-orders");
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
        if (auth?.user) getAllOrders();
    }, [auth?.user]);

    const handleChangeStatus = async (orderId, value) => {
        try {
            const { data } = await axios.put(`https://valiant-sore-tennis.glitch.me/api/v1/auth/order-status/${orderId}`, { status: value });
            getAllOrders();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };
    

    return (
        <Layout title={"Admin Orders"}>
            <div className="admin-dashboard-container">
                <button className={`pgbut menu-toggle-button-${menuOpen ? 'open' : 'close'}`} onClick={toggleMenu}>
                    {menuOpen ? <MdOutlineClose className='menu-icon' /> : <RiMenu2Fill className='menu-icon' />}
                </button>
                <div className={`admin-menu ${menuOpen ? 'open' : ''}`}>
                    <AdminMenu />
                </div>
                <div className="admin-orders">
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
                                            <td>
                                                <Select size='large' onChange={(value) => handleChangeStatus(o._id, value)} defaultValue={o?.status}>
                                                    {status.map((s, i) => (
                                                        <Option key={i} value={s}>
                                                            {s}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </td>
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
        </Layout>
    );
};

export default AdminOrders;
