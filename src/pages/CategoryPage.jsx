import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { addToCart } from '../utils/cartHelper';
import { formatPrice } from '../utils/currencyHelper';
import './CategoryPage.css';

const categoryData = {
  'build-a-wigglitz-bundle': {
    title: 'Build a Wigglitz Bundle',
    description: 'Create your own custom collection of wiggly, flexible 3D printed toys!',
    products: [
      {
        id: 'custom-trio-bundle',
        name: 'Custom Trio Pitara Bundle',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&q=80',
        tag: 'Popular 🌟'
      }
    ]
  },
  'collectors-guides': {
    title: "Collector's Guides",
    description: 'Track your collection and discover rare, ultra-rare, and legendary prints!',
    products: [
      {
        id: 'official-guide-v1',
        name: 'Official Pigglitz Collector Guide (Vol. 1)',
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=80',
        tag: 'New 📖'
      }
    ]
  },
  'monthly-box': {
    title: 'Monthly Box',
    description: 'Subscribe to get a surprise box of exclusive, limited-edition 3D prints delivered to your door!',
    products: [
      {
        id: 'mystery-monthly-box',
        name: 'Pigglitz Mystery Monthly Box',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=500&q=80',
        tag: 'Best Value 🎁'
      }
    ]
  },
  'tubes': {
    title: 'Tubes',
    description: 'Fun, stackable tubes filled with mini flexible pocket pals!',
    products: [
      {
        id: 'mini-flexi-tube',
        name: 'Mini Flexi Pocket Pals Tube',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=500&q=80',
        tag: 'Hot Seller 🔥'
      }
    ]
  },
  'real-time-collectibles': {
    title: 'Real Time Collectibles',
    description: 'Highly detailed, articulated masterpieces printed in real-time with premium silk gradients.',
    products: [
      {
        id: 'crystal-dragon-articulated',
        name: 'Articulated Crystal Dragon',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1508898578281-774ac4893c0c?auto=format&fit=crop&w=500&q=80',
        tag: 'Masterpiece 🐲'
      }
    ]
  },
  'winky-plush': {
    title: 'Winky Plush',
    description: 'Super soft, huggable plushies featuring your favorite Pigglitz characters!',
    products: [
      {
        id: 'winky-octopus-plush',
        name: 'Winky Octopus Soft Plush',
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?auto=format&fit=crop&w=500&q=80',
        tag: 'Super Soft 🧸'
      }
    ]
  },
  'gift-cards': {
    title: 'Gift Cards',
    description: 'Give the gift of choice! Perfect for birthdays, holidays, and special surprises.',
    products: [
      {
        id: 'pigglitz-digital-gift-card',
        name: 'Pigglitz Digital Gift Card',
        price: 25.00,
        image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=500&q=80',
        tag: 'E-Gift ✉️'
      }
    ]
  },
  'wigglitz-pouch': {
    title: 'Wigglitz Pouch',
    description: 'Vibrant, durable pouches to carry your flexible friends wherever you go!',
    products: [
      {
        id: 'canvas-toy-pouch',
        name: 'Pigglitz Canvas Adventure Pouch',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=500&q=80',
        tag: 'Travel Ready 🎒'
      }
    ]
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

  const category = categoryData[categoryId] || {
    title: 'Shop All',
    description: 'Explore our entire collection of magical 3D printed toys!',
    products: []
  };

  return (
    <div className="category-page container">
      <div className="category-header">
        <h1>{category.title}</h1>
        <p>{category.description}</p>
      </div>

      {category.products.length > 0 ? (
        <div className="products-grid">
          {category.products.map((product, idx) => {
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
                <div className="product-tag" style={{ backgroundColor: cardColor }}>
                  {product.tag}
                </div>
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