import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../style/home.css';
import Layout from '../components/layout/Layout';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import Prices from './user/prices';
import Spinner2 from './Spinner2';
import Search from '../components/layout/Form/Search';
import { useNavigate } from 'react-router-dom';
import { IoIosClose } from "react-icons/io";
import { RiFilter3Fill } from "react-icons/ri";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filterActive, setFilterActive] = useState(false);
  const observer = useRef();

  const lastProductElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const fetchProducts = async (reset = false) => {
    setLoading(true);
    const endpoint = checked.length || radio.length 
      ? "https://valiant-sore-tennis.glitch.me/api/v1/product/filter-product"
      : `https://valiant-sore-tennis.glitch.me/api/v1/product/get-product?page=${page}&limit=15`;
    const method = checked.length || radio.length ? "post" : "get";
    const payload = checked.length || radio.length ? { checked, radio, page, limit: 15 } : {};
    
    const { data } = await axios[method](endpoint, payload);
    if (reset) {
      setProducts(data?.products);
    } else {
      setProducts(prevProducts => [...prevProducts, ...data?.products]);
    }
    setHasMore(data?.products.length === 15);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(true);
  }, [checked, radio]);

  useEffect(() => {
    if (page > 1) {
      fetchProducts();
    }
  }, [page]);

  const fetchCategories = async () => {
    const { data } = await axios.get("https://valiant-sore-tennis.glitch.me/api/v1/category/all-category");
    setCategories(data?.categoryList);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFilter = (value, id) => {
    const all = value ? [...checked, id] : checked.filter(c => c !== id);
    setChecked(all);
    setPage(1);
    setHasMore(true);
    fetchProducts(true); // Reset products when filter is applied
    setFilterActive(false); // Close the filter menu
  };

  const handlePriceFilter = (value) => {
    setRadio(value);
    setPage(1);
    setHasMore(true);
    fetchProducts(true); // Reset products when price filter is applied
    setFilterActive(false); // Close the filter menu
  };

  const clearFilters = () => {
    setChecked([]);
    setRadio([]);
    setPage(1);
    setHasMore(true);
    fetchProducts(true); // Reset products when clearing filters
    setFilterActive(false); // Close the filter menu
  };

  const toggleFilter = () => {
    setFilterActive(!filterActive);
  };

  return (
    <Layout title={"Zeyo Store"}>
      <div className="search-prod">
        <Search />
      </div>
      <div id='home'>
        <button className="filter-toggle-btn" onClick={toggleFilter}>
          {filterActive ? <IoIosClose /> : <RiFilter3Fill />}
        </button>
        <div className={`filters ${filterActive ? 'active' : ''}`}>
          <div className="filters-category">
            <p>Filter by category</p>
            {categories.map(c => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>{c.name}</Checkbox>
            ))}
          </div>
          <div className="filters-price">
            <p>Filter by prices</p>
            <Radio.Group onChange={e => handlePriceFilter(e.target.value)}>
              {Prices.map(p => (
                <div key={p.id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <button type='button' className='filters-button' onClick={clearFilters}>Clear Filters</button>
        </div>
        <div className={`all-products ${filterActive ? 'expanded' : ''}`}>
          {products?.map((p, index) => (
            <div
              ref={products.length === index + 1 ? lastProductElementRef : null}
              className="product-card"
              key={p._id}
            >
              {p.bestSale && (
                <p className='prod-bestSale'>Best Sale</p>
              )}
              <div className="img-box">
                <img src={`https://valiant-sore-tennis.glitch.me/api/v1/product/product-photo/${p._id}`} alt={p.name} />
              </div>
              <div className="product-details">
                <p className='prod-name'>{p.name}</p>
                <p className='prod-desc'>{p.description.substring(0, 40)}</p>
                <p className='prod-price'>₹ {p.price}</p>
                <div className="left-shipp">
                  <p className='prod-quantity'>Only {p.quantity} left</p>
                  {p.shipping && (
                    <p className='prod-shipping'>Free Shipping</p>
                  )}
                </div>
                <button onClick={() => navigate(`/product/${p.slug}`)} className='prod-see-btn'>See More</button>
              </div>
            </div>
          ))}
        </div>
        {loading && <Spinner2 />}
      </div>
    </Layout>
  );
};

export default Home;
