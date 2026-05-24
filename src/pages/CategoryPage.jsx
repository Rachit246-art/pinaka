import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { addToCart } from '../utils/cartHelper';
import { formatPrice } from '../utils/currencyHelper';
import { getProducts } from '../utils/productHelper';
import './CategoryPage.css';

const categoryMeta = {
  'build-a-wigglitz-bundle': {
    title: 'Build a Wigglitz Bundle',
    description: 'Create your own custom collection of wiggly, flexible 3D printed toys!'
  },
  'collectors-guides': {
    title: "Collector's Guides",
    description: 'Track your collection and discover rare, ultra-rare, and legendary prints!'
  },
  'monthly-box': {
    title: 'Monthly Box',
    description: 'Subscribe to get a surprise box of exclusive, limited-edition 3D prints delivered to your door!'
  },
  'tubes': {
    title: 'Tubes',
    description: 'Fun, stackable tubes filled with mini flexible pocket pals!'
  },
  'real-time-collectibles': {
    title: 'Real Time Collectibles',
    description: 'Highly detailed, articulated masterpieces printed in real-time with premium silk gradients.'
  },
  'winky-plush': {
    title: 'Winky Plush',
    description: 'Super soft, huggable plushies featuring your favorite Pigglitz characters!'
  },
  'gift-cards': {
    title: 'Gift Cards',
    description: 'Give the gift of choice! Perfect for birthdays, holidays, and special surprises.'
  },
  'wigglitz-pouch': {
    title: 'Wigglitz Pouch',
    description: 'Vibrant, durable pouches to carry your flexible friends wherever you go!'
  }
};

const cardColors = [
  'var(--accent-pink)',
  'var(--accent-blue)',
  'var(--accent-orange)',
  'var(--accent-yellow)'
];

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [currencyTrigger, setCurrencyTrigger] = useState(0);

  const loadProducts = () => {
    const allProducts = getProducts();
    const filtered = allProducts.filter(p => p.category === categoryId);
    setProducts(filtered);
  };

  useEffect(() => {
    loadProducts();

    const handleCurrencyUpdate = () => {
      setCurrencyTrigger(prev => prev + 1);
    };
    
    window.addEventListener('currency-updated', handleCurrencyUpdate);
    window.addEventListener('products-updated', loadProducts);
    
    return () => {
      window.removeEventListener('currency-updated', handleCurrencyUpdate);
      window.removeEventListener('products-updated', loadProducts);
    };
  }, [categoryId]);

  const meta = categoryMeta[categoryId] || {
    title: 'Shop All',
    description: 'Explore our entire collection of magical 3D printed toys!'
  };

  return (
    <div className="category-page container">
      <div className="category-header">
        <h1>{meta.title}</h1>
        <p>{meta.description}</p>
      </div>

      {products.length > 0 ? (
        <div className="products-grid">
          {products.map((product, idx) => {
            const cardColor = cardColors[idx % cardColors.length];
            return (
              <div 
                key={product.id} 
                className="product-card" 
                style={{ 
                  '--card-shadow-color': cardColor,
                  borderColor: 'var(--primary-color)'
                }}
              >
                {product.tag && (
                  <div className="product-tag" style={{ backgroundColor: cardColor }}>
                    {product.tag}
                  </div>
                )}
                <div className="product-image-wrapper">
                  <img src={product.image} alt={product.name} className="product-image" />
                </div>
                <h3>{product.name}</h3>
                <p className="product-price">{formatPrice(product.price)}</p>
                <div className="product-card-buttons">
                  <Link to={`/products/${product.id}`} className="btn btn-secondary btn-sm">View Details</Link>
                  <button 
                    onClick={() => addToCart(product)} 
                    className="btn btn-primary btn-sm"
                  >
                    Add to Cart 🛒
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-products">
          <p>No products found in this category yet. Stay tuned for magical additions!</p>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;