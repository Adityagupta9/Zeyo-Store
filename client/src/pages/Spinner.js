import React,{useState,useEffect} from 'react';
import BarLoader from 'react-spinners/BarLoader';
import { useNavigate,useLocation } from 'react-router-dom';
import '../../src/style/spinner.css';

const Spinner = ({path="/login",rediMessage="Please Login"}) => {
    const navigate = useNavigate()
    const location = useLocation();

    const [count,setCount] = useState(4)
    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((preValue)=>--preValue)
        },1000)
        count === 0 && navigate(`${path}`,{
            state : location.pathname
        })
        return ()=> clearInterval(interval)
    },[count,navigate,location,path])
  return (
    <div className="spinner-container">
      <BarLoader className="dash-spinner" color={"#00074c"} size={500} width={400} />
    </div>
  );
};

export default Spinner;
