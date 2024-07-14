import React, { useState } from 'react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import '../../../src/style/signin.css';
import Layout from '../../components/layout/Layout';
import { NavLink } from 'react-router-dom';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';

const Signin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [address, setAddress] = useState("");
  const [answer,setAnswer] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post("https://valiant-sore-tennis.glitch.me/api/v1/auth/register", { name, email, phone, dob, password, address,answer });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  }

  return (
    <Layout title={"Zeyo-Signin"}>
      <form action="" className='signin-form' onSubmit={handleSubmit}>
        <div className="signup-logo">Zeyo Store</div>
        <h4>Sign Up</h4>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' required />
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
        <div className="phone-inp">
          <PhoneInput 
            country={'in'}
            value={phone}
            onChange={setPhone}
            placeholder='Phone no'
            inputProps={{
              name: 'phone',
              required: true,
            }}
          />
        </div>
        <InputMask 
        name='dob'
          mask="99-99-9999" 
          value={dob} 
          onChange={(e) => setDob(e.target.value)} 
          placeholder='DD-MM-YYYY (Date of birth)' 
          className="dob-input" 
          required
        />
        <div className="password-container">
          <input id='pass' type={showPassword ? "text" : "password"} name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
          <span id='show-icon' onClick={togglePasswordVisibility}>{showPassword ? <VscEye /> : <VscEyeClosed />}</span>
        </div>
        <input type="password" name="cpassword" value={cpassword} onChange={(e) => setCPassword(e.target.value)} placeholder='Confirm Password' required />
        <textarea id='signin-address' type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' required />
        <input type="text" name="answer" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder='Enter your birth city (Recovery)' required />
        <button type='submit'>Sign Up</button>
        <p className='signin-terms'>Already have an account? <span><NavLink to="/login">Login</NavLink></span></p>
        <p className='signin-terms'>By signing up you agree to our <span><NavLink to="/policy">Privacy Policy</NavLink></span></p>
      </form>
    </Layout>
  )
}

export default Signin;