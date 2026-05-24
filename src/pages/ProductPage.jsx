import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addToCart } from '../utils/cartHelper';
import { formatPrice } from '../utils/currencyHelper';
import { getProductById } from '../utils/productHelper';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [currencyTrigger, setCurrencyTrigger] = useState(0);

  useEffect(() => {
    const found = getProductById(id);
    if (found) {
      setProduct(found);
    } else {
      navigate('/');
    }

    const handleCurrencyUpdate = () => {
      setCurrencyTrigger(prev => prev + 1);
    };
    window.addEventListener('currency-updated', handleCurrencyUpdate);
    return () => {
      window.removeEventListener('currency-updated', handleCurrencyUpdate);
    };
  }, [id, navigate]);

  if (!product) {
    return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div className="product-page container">
      <div className="product-layout">
        <div className="product-images">
          <img src={product.image} alt={product.name} className="main-image-placeholder" />
        </div>
        <div className="product-details">
          <h1>{product.name}</h1>
          {product.tag && (
            <span className="hero-badge" style={{ display: 'inline-block', backgroundColor: 'var(--accent-pink)', color: 'white', padding: '4px 12px', borderRadius: '50px', fontWeight: '900', fontSize: '14px', marginBottom: '16px' }}>
              {product.tag}
            </span>
          )}
          <div className="price-container">
            <span className="price">{formatPrice(product.price)}</span>
          </div>
          <div className="product-form">
            <button 
              onClick={() => addToCart(product)} 
              className="btn btn-primary full-width"
            >
              Add to Cart 🛒
            </button>
            <button 
              onClick={() => {
                addToCart(product);
                navigate('/cart');
              }} 
              className="btn btn-secondary full-width"
            >
              Buy it now 🚀
            </button>
          </div>
          <div className="product-description">
            <p>{product.description || 'This is an amazing, fully articulated 3D printed toy! Printed layer-by-layer with premium silk gradient filament, it wiggles, flexes, and makes the perfect fidget companion.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;