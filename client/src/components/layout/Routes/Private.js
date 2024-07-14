import { useEffect,useState} from "react"
import { useAuth } from "../../../context/auth"
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner2 from "../../../pages/Spinner";


const PrivateRoute = ()=>{
    const [ok,setOk] = useState(false);
    const [auth]= useAuth();
    useEffect(()=>{
        const AuthCheck = async ()=>{
            const res = await axios.get("https://valiant-sore-tennis.glitch.me/api/v1/auth/user-auth");
            if(res.data.ok){
                setOk(true)
            }
            else{
                setOk(false);
            }
        }
    if(auth?.token){
        AuthCheck();
    }
    },[auth?.token])

    return ok? <Outlet/> : <Spinner2/>;
}
export default PrivateRoute
