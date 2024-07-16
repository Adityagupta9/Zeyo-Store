import React from 'react'
import Layout from '../components/layout/Layout'
import { useSearch } from '../context/search'
import { useNavigate } from 'react-router-dom'
import '../style/searchproduct.css'
const SearchProd = () => {
  const navigate = useNavigate()
    const [value,setValue]  = useSearch()
  return (
    <Layout>
      <div className="search-product-page">
       <h4>{value?.results.length < 1 ? 'No result found':  `Total ${value?.results.length} products found`}</h4>
      <div className="search-product-container">
     
      {value?.results.map((p) => (
            <div
              className="product-card"
              key={p._id}
              onClick={()=>navigate(`/product/${p.slug}`)}
            >
              {p.bestSale && (
                    <p className='prod-bestSale'>Best Sale</p>
                  )}
                  <div className="img-box">
                  <img src={`https://valiant-sore-tennis.glitch.me/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                  </div>
                <div className="product-details">
                    <p className='prod-name'>{p.name}</p>
                    <p className='prod-desc'>{p.description.substring(0,40)}</p>
                    <p className='prod-price'>₹ {p.price}</p>
                    <div className="left-shipp">
                    <p className='prod-quantity'>Only {p.quantity} left</p>
                    {p.shipping && (
                    <p className='prod-shipping'>Free Shipping</p>
                    )}
                    </div>
                </div>
            </div>
          ))}
          </div>
          </div>
    </Layout>
  )
}

export default SearchProd

