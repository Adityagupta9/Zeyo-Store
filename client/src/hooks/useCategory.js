import axios from "axios";
import { useEffect,useState }  from "react";

const useCategory = ()=>{
    const[categories,setCategories] = useState([]);

    const getCategories = async()=>{
        try {
            const {data} = await axios.get("https://valiant-sore-tennis.glitch.me/api/v1/category/all-category");
            setCategories(data?.categoryList)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getCategories();
    },[])
    return categories;
}

export default  useCategory;