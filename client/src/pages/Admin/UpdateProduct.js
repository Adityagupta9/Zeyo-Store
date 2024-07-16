import React, { useState, useEffect } from 'react';
import AdminMenu from '../../components/layout/AdminMenu';
import { RiMenu2Fill } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import Layout from '../../components/layout/Layout';
import '../../style/createproduct.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Select } from 'antd';

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);
  const [bestSale, setBestSale] = useState(false);
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const { data } = await axios.get(`https://valiant-sore-tennis.glitch.me/api/v1/product/get-product/${params.slug}`);
        if (data?.product) {
          setName(data.product.name);
          setDescription(data.product.description);
          setPrice(data.product.price);
          setQuantity(data.product.quantity);
          setCategory(data.product.category._id); // Assuming category is an object with _id
          setShipping(data.product.shipping);
          setBestSale(data.product.bestSale);
          setId(data.product._id);
        } else {
          toast.error("Product not found");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error while getting single product");
      }
    };
    getSingleProduct();
  }, [params.slug]);

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get("https://valiant-sore-tennis.glitch.me/api/v1/category/all-category");
        if (data?.success) {
          setCategories(data.categoryList);
        } else {
          toast.error("Error while fetching all categories");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };
    getAllCategory();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      if (photo) {
        productData.append("photo", photo);
      }
      productData.append("category", category);
      productData.append("shipping", shipping ? "true" : "false");
      productData.append("bestSale", bestSale ? "true" : "false");

      console.log("productData:", {
        name,
        description,
        price,
        quantity,
        category,
        shipping,
        bestSale,
      });

      const { data } = await axios.put(
        `https://valiant-sore-tennis.glitch.me/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`https://valiant-sore-tennis.glitch.me/api/v1/product/delete-product/${id}`);
      if (data?.success) {
        toast.success("Product Deleted Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Error while deleting product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting the product");
    }
  };

  return (
    <Layout title={"Update Product"}>
      <div className="admin-dashboard-container">
        <button className={`pgbut menu-toggle-button-${menuOpen ? 'open' : 'close'}`} onClick={toggleMenu}>
          {menuOpen ? <MdOutlineClose className='menu-icon' /> : <RiMenu2Fill className='menu-icon' />}
        </button>
        <div className={`admin-menu ${menuOpen ? 'open' : ''}`}>
          <AdminMenu />
        </div>
        <h4>Update Product</h4>
        <form onSubmit={handleUpdate}>
          <div className="create-Product">
            <div className="select-category">
              <Select
                border={false}
                placeholder="Select Category"
                size='large'
                showSearch
                onChange={(value) => setCategory(value)}
                value={category}
              >
                {categories?.map(c => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="up-photo">
              <label className='photo-inp'>
                {photo ? photo.name : "Upload Product Photo"}
                <input type="file" name="photo" accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
              </label>
            </div>
            <div className="photo-prev">
              {photo ? (
                <div className="photo-container">
                  <img src={URL.createObjectURL(photo)} alt="" />
                </div>
              ) : (
                <div className="photo-container">
                  <img src={`https://valiant-sore-tennis.glitch.me/api/v1/product/product-photo/${id}`} alt="" />
                </div>
              )}
            </div>
            <div className="inp-details">
              <input type="text" placeholder='Product Name' value={name} onChange={(e) => setName(e.target.value)} required />
              <textarea type="text" placeholder="Product Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
              <input type="number" placeholder='Product Price ₹' value={price} onChange={(e) => setPrice(e.target.value)} required />
              <input type="number" placeholder='Product Quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
            </div>
            <Select
              border={false}
              placeholder="Shipping"
              size='large'
              onChange={(value) => setShipping(value === "Yes")}
              value={shipping ? "Yes" : "No"}
            >
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>

            <Select
              border={false}
              placeholder="Best Sale"
              size='large'
              onChange={(value) => setBestSale(value === "Yes")}
              value={bestSale ? "Yes" : "No"}
            >
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
            <button type='submit' className='create-product-btn'>Update Product</button>
            <button type='button' onClick={handleDelete} className='create-product-btn'>Delete Product</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
