import React,{useEffect, useState} from 'react';
import AdminMenu from '../../components/layout/AdminMenu';
import { RiMenu2Fill } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import Layout from '../../components/layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import '../../style/createcategory.css';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {Modal} from 'antd'
import CategoryForm from '../../components/layout/Form/CategoryForm';
const CreateCategory = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [categories,setCategories] = useState([]);
  const [name,setName] = useState("");
  const [visible,setVisible] = useState(false)
  const [selected,setSelected] = useState(null)
  const [ updatedName,setUpdatedName] = useState("")
  const handelSubmit = async(e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post("https://valiant-sore-tennis.glitch.me/api/v1/category/create-category",{name,}) 
      if(data?.success){
        setName("");
        getAllCategory();
        toast.success(`${name} created successfully`)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

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
//update category
const handelUpdateCat =async(e)=>{
  e.preventDefault();
  try {
    const {data} = await axios.put(`https://valiant-sore-tennis.glitch.me/api/v1/category/update-category/${selected._id}`,{name:updatedName})
    if(data.success){
      toast.success(`${updatedName} is updated` )
      setSelected(null)
      setUpdatedName("")
      getAllCategory();
      setVisible(false)
    }
  } catch (error) {
    console.log(error)
    toast.error("Something went wrong in error")
  }
}
//update category
const handelDeleteCat =async(pid)=>{
  try {
    const {data} = await axios.delete(`https://valiant-sore-tennis.glitch.me/api/v1/category/delete-category/${pid}`)
    if(data.success){
      toast.success(`Category is deleted` )
      getAllCategory();
    }
  } catch (error) {
    console.log(error)
    toast.error("Something went wrong in error")
  }
}

  return (
    <Layout title={"Create Category"}>
     <div className="admin-dashboard-container">
        <button className={`pgbut menu-toggle-button-${menuOpen ? 'open' : 'close'}`} onClick={toggleMenu}>
          {menuOpen ? <MdOutlineClose className='menu-icon' /> : <RiMenu2Fill className='menu-icon' />}
        </button>
        <div className={`admin-menu ${menuOpen ? 'open' : ''}`}>
          <AdminMenu />
        </div>

        
        <div className="category-table">
          <h4>Create Category</h4>
        <CategoryForm handelSubmit={handelSubmit} value={name} setValue={setName}/>
          <table>
            <thead>
            <tr>
              <th>Category Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            </thead>
            <tbody>
              {categories && categories.map(c=>(
                <tr key={c._id}>
                  <td >{c.name}</td>
                  <td><button className='action-btn' onClick={()=>{setVisible(true);setUpdatedName(c.name);setSelected(c)}}><FaEdit/></button></td>
                  <td><button className='action-btn' onClick={()=>{handelDeleteCat(c._id)}}><MdDelete/></button></td>
                </tr>
              ))}
              </tbody>
          </table>
          <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
            <CategoryForm value={updatedName} setValue={setUpdatedName} handelSubmit={handelUpdateCat} />
          </Modal>
        </div>
        </div>
    </Layout>
  )
}

export default CreateCategory
