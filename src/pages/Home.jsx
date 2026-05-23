import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="container hero-content">
          <h1>Welcome to Pigglitz!</h1>
          <p>3D Printing Pitara - Little Prints. Big Smiles.</p>
          <a href="/products/1" className="btn btn-primary">Shop Now</a>
        </div>
      </section>
      
      <section className="featured-products">
        <div className="container">
          <h2>Featured Collection</h2>
          <div className="products-grid">
            {/* We will map products here later */}
            <div className="product-card">
              <img src="/hero_banner.png" alt="Pigglitz Product" className="product-image" />
              <h3>Pigglitz Product</h3>
              <p>$19.99</p>
              <button className="btn btn-primary">Add to Cart</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
