import React from 'react';
import { useSearch } from '../../../context/search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TfiSearch } from "react-icons/tfi";
import '../../../style/searchform.css'
const Search = () => {
  const [value, setValue] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const { data } = await axios.get(`https://valiant-sore-tennis.glitch.me/api/v1/product/search/${value.keyword}`);
        setValue({ ...value, results: data });
        navigate("/search");
    } catch (error) {
        console.log(error)
        
    }   
   
  };

  return (
    <div id="search-product-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search product..."
          value={value.keyword}
          onChange={(e) => setValue({ ...value, keyword: e.target.value })}
        />
        <button type="submit">{<TfiSearch/>}</button>
      </form>
    </div>
  );
};

export default Search;
