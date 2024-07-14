import React,{useState,useEffect} from 'react';
import AdminMenu from '../../components/layout/AdminMenu';
import { RiMenu2Fill } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import Layout from '../../components/layout/Layout';
import '../../style/createproduct.css'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import {Select} from 'antd';
const {Option} = Select;

const CreateProduct = () => {
  const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false);

    const [name,setName] = useState();
    const [photo,setPhoto] = useState()
    const [description,setDescription] = useState();
    const [price,setPrice] = useState();
    const [category,setCategory] = useState();
    const [quantity,SetQuantity] = useState();
    const [shipping,setShipping] = useState();
    const [bestSale,setBestSale] = useState();
    const [categories,setCategories] = useState([])

    const getAllCategory = async()=>{
      try {
        const {data} = await axios.get("https://valiant-sore-tennis.glitch.me/api/v1/category/all-category")
      if(data?.success){
        setCategories(data?.categoryList)
      }
      else{
        toast.error("Error while fetching all categories")
      }
      } catch (error) {
        console.log(error)
        toast.error("Something went wrong")
      }
    }
    useEffect(()=>{
      getAllCategory()
    },[])

    const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      productData.append("bestSale", bestSale);
      const { data } = axios.post(
        "https://valiant-sore-tennis.glitch.me/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products")
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <Layout title={"Create Product"}>
      <div className="admin-dashboard-container">
        <button className={`pgbut menu-toggle-button-${menuOpen ? 'open' : 'close'}`} onClick={toggleMenu}>
          {menuOpen ? <MdOutlineClose className='menu-icon' /> : <RiMenu2Fill className='menu-icon' />}
        </button>
        <div className={`admin-menu ${menuOpen ? 'open' : ''}`}>
          <AdminMenu />
        </div>
        <h4>Create Product</h4>
        <form onSubmit={handleCreate} action="">
        <div className="create-Product">
          <div className="select-category">
          <Select border={false} placeholder="Select Category" size='large' showSearch onChange={(value)=>{setCategory(value)}} >
            {categories?.map(c=>(
              <Option key={c._id} value={c.id} >
                {c.name}
              </Option>
            ))}
          </Select>
          </div>
          <div className="up-photo">
            <label className='photo-inp'>
              {photo? photo.name:"Upload Product Photo"}
              <input type="file" name="photo" accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden required/>
            </label>
          </div>
          <div className="photo-prev">
            {photo && (
              <div className="photo-container">
                <img src={URL.createObjectURL(photo)}  alt="" />
              </div>
            )}
          </div>
          <div className="inp-details">
            <input type="text" placeholder='Product Name' value={name} onChange={(e)=>setName(e.target.value)} required/>
            <textarea type="text" placeholder="Product Description" value={description} onChange={(e)=>setDescription(e.target.value)} required />
            <input type="number" placeholder='Product  Price ₹' value={price} onChange={(e)=>setPrice(e.target.value)} required/>
            <input type="number" placeholder='Product Quantity' value={quantity} onChange={(e)=>SetQuantity(e.target.value)} required/>
          </div>
          <Select  className='select-shipping' border={false} placeholder="Shipping" size='large'  onChange={(value)=>{setShipping(value)}} >
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
          </Select>
          <Select border={false} placeholder="Best Sale" size='large'  onChange={(value)=>{setBestSale(value)}} >
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
          </Select>
          <button type='submit' className='create-product-btn'>Create Product</button>
        </div>
        </form>
        </div>
    </Layout>
  )
}

export default CreateProduct
