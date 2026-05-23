import React, { useState, useEffect } from 'react';
import { addToCart } from '../utils/cartHelper';
import { formatPrice } from '../utils/currencyHelper';
import './ProductPage.css';

const ProductPage = () => {
  const [currencyTrigger, setCurrencyTrigger] = useState(0);

  useEffect(() => {
    const handleCurrencyUpdate = () => {
      setCurrencyTrigger(prev => prev + 1);
    };
    window.addEventListener('currency-updated', handleCurrencyUpdate);
    return () => {
      window.removeEventListener('currency-updated', handleCurrencyUpdate);
    };
  }, []);

  const product = {
    id: 'crystal-dragon-articulated',
    name: 'Articulated Crystal Dragon',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1508898578281-774ac4893c0c?auto=format&fit=crop&w=500&q=80'
  };

  return (
    <div className="product-page container">
      <div className="product-layout">
        <div className="product-images">
          <img src={product.image} alt={product.name} className="main-image-placeholder" />
        </div>
        <div className="product-details">
          <h1>{product.name}</h1>
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
              onClick={() => addToCart(product)} 
              className="btn btn-secondary full-width"
            >
              Buy it now 🚀
            </button>
          </div>
          <div className="product-description">
            <p>This is the amazing, fully articulated Crystal Dragon! Printed layer-by-layer with premium silk gradient filament, it wiggles, flexes, and makes the perfect fidget companion.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;