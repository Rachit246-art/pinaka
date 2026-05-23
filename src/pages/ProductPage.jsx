import React from 'react';
import './ProductPage.css';

const ProductPage = () => {
  return (
    <div className="product-page container">
      <div className="product-layout">
        <div className="product-images">
          <img src="/hero_banner.png" alt="Pigglitz Product" className="main-image-placeholder" />
        </div>
        <div className="product-details">
          <h1>Pigglitz</h1>
          <div className="price-container">
            <span className="price">$19.99</span>
          </div>
          <div className="product-form">
            <button className="btn btn-primary full-width">Add to Cart</button>
            <button className="btn btn-secondary full-width">Buy it now</button>
          </div>
          <div className="product-description">
            <p>This is the amazing Pigglitz product.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
