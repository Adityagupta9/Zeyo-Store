import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate,useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../context/auth';
import '../../../src/style/login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [auth,setAuth] = useAuth();

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://valiant-sore-tennis.glitch.me/api/v1/auth/login", { email, password });
            if (res.data.success) {
                setTimeout(()=>{
                    toast.success("Login Successfully")
                    },700)
                setAuth({
                    ...auth,
                    user:res.data.user,
                    token:res.data.token
                })
                navigate(location.state ||'/');
                localStorage.setItem('auth',JSON.stringify(res.data))
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong");
            }
        }
    };

    return (
        <Layout>
        <div className="login-page">
            <form action="" id='login-form' onSubmit={handleSubmit}>
                <div className="login-logo">Zeyo Store</div>
                <h4>Login</h4>
                <input type="email" name='email' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email' required />
                <div className="password-container">
                    <input id='inp-pass' type={showPassword ? "text" : "password"} name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                    <span className='show-icon' onClick={togglePasswordVisibility}>{showPassword ? <VscEye /> : <VscEyeClosed />}</span>
                </div>
                <button type='submit'>Login</button>
                <p>New user? <span><NavLink to="/signup">Create Account</NavLink></span></p>
                <p><span><NavLink to="/forgotpassword">Forgot Password</NavLink></span></p>
            </form>
            </div>
        </Layout>
    );
};

export default Login;
