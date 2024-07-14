import { useEffect, useState } from "react"
import { useAuth } from "../../../context/auth"
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../../../pages/Spinner";
const AdmineRoute = ()=>{
    const[ok,setOk] =  useState(false)
    const[auth,setAuth] = useAuth()
    useEffect(()=>{
        const AuthCheck = async ()=>{
            try {
                const res = await axios.get("http://localhost:8080/api/v1/auth/admin-auth");
                if(res.data.ok){
                    setOk(true)
                }
                else{
                    setOk(false)
                }
            } catch (error) {
                console.log(error)
                setOk(false);
            }
            
        }
        if(auth?.token){
            AuthCheck()
        }
    },[auth?.token])

    return ok ? <Outlet/> : <Spinner path="/" rediMessage="Unautherized user"/>;
}

export default AdmineRoute