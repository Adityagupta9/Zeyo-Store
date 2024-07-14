import React,{useState,useEffect} from 'react';
import { RiMenu2Fill } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import Layout from '../../components/layout/Layout';
import UserMenu from '../../components/layout/UserMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import { useAuth } from '../../context/auth';
import '../../style/editprofile.css'
const Profile = () => {
    const [auth,setAuth] = useAuth()
    const [menuOpen, setMenuOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    
  };
  useEffect(()=>{
    const {email,name,address,phone} = auth?.user;
    setName(name)
    setEmail(email)
    setAddress(address)
    setPhone(phone)
  },[auth?.user])
  const handelUpdate = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put("https://valiant-sore-tennis.glitch.me/api/v1/auth/update-user", { name, email, phone, address });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updateUser });
        let ls = localStorage.getItem("auth")
        ls = JSON.parse(ls)
        ls.user = data.updateUser
        localStorage.setItem("auth",JSON.stringify(ls))
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  }
  return (
    <Layout title={"Profile"}>
      <div className="user-dashboard-container">
        <button className={`pgbut menu-toggle-button-${menuOpen ? 'open' : 'close'}`} onClick={toggleMenu}>
          {menuOpen ? <MdOutlineClose className='menu-icon' /> : <RiMenu2Fill className='menu-icon' />}
        </button>
        <div className={`user-menu ${menuOpen ? 'open' : ''}`}>
          <UserMenu />
        </div>
        <div className="update-form-profile">
        <form action="" className='signin-form' onSubmit={handelUpdate}>
        <div className="signup-logo">Zeyo Store</div>
        <h4>Update Profile</h4>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name'  />
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'  disabled />
        <div className="phone-inp">
          <PhoneInput 
            country={'in'}
            value={phone}
            onChange={setPhone}
            placeholder='Phone no'
            inputProps={{
              name: 'phone',
            }}
          />
        </div>
       
        <textarea id='signin-address' type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address'  />
        <button type='submit'>Update User</button>
        </form>
        </div>
        </div>
        
    </Layout>
  )
}

export default Profile
