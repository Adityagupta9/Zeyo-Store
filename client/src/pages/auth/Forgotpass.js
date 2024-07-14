import React,{useState} from 'react'
import toast from 'react-hot-toast'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import '../../../src/style/forgotpass.css'
const Forgotpass = () => {
    const [email,setEmail]=useState("")
    const [newPassword,setNewPassword] = useState("")
    const [cnewPassword,setCnewPassword] = useState("")
    const [answer,setAnswer] = useState("");
    const [showPassword,setShowPassword] = useState(false)
    const navigate = useNavigate();

    const togglePasswordVisibility=()=>{
        setShowPassword(!showPassword)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== cnewPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post("https://valiant-sore-tennis.glitch.me/api/v1/auth/forgot-password", { email, answer, newPassword });

            if (res && res.data.success) {
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong");
            }
        }
    }
  return (
    <Layout title={"Forgot Password"}>
        <form className='forgot-form' onSubmit={handleSubmit} action="">
            <div className="forgot-logo">Zeyo Store</div>
            <h4>Reset Password</h4>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' required/>
            <div className="password-container">
            <input id='inp-pass' type={showPassword ? "text" : "password"} value={newPassword}  onChange={(e)=>setNewPassword(e.target.value)} placeholder='New password' required/>
            <span id="show-icon" onClick={togglePasswordVisibility}>{showPassword ?<VscEye/> : <VscEyeClosed/> }</span>
            </div>
            
            <input type="password" value={cnewPassword} onChange={(e)=>setCnewPassword(e.target.value)} placeholder='Confirm new password' required/>
            <input type="text" value={answer} onChange={(e)=>setAnswer(e.target.value)}  placeholder="Enter your birth city" required />
            <button type="submit">Reset Password</button>
        </form>
    </Layout>
  )
}

export default Forgotpass
