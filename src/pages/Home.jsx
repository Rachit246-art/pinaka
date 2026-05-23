import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Palette, Flame, Star, Heart, Printer, RefreshCw } from 'lucide-react';
import './Home.css';

const Home = () => {
  // Interactive 3D Print Simulator State
  const [selectedToy, setSelectedToy] = useState('Dragon');
  const [selectedColor, setSelectedColor] = useState('#ff2a7a'); // Pink
  const [printingProgress, setPrintingProgress] = useState(0);
  const [isPrinting, setIsPrinting] = useState(false);
  const [printComplete, setPrintComplete] = useState(false);

  const toysList = ['Dragon', 'Mini Octopus', 'Flexi Rex', 'Magic Castle'];
  const colorsList = [
    { name: 'Pink Magic', hex: '#ff2a7a' },
    { name: 'Sunny Yellow', hex: '#ffb703' },
    { name: 'Ocean Blue', hex: '#00bbf9' },
    { name: 'Neon Orange', hex: '#fb8500' },
    { name: 'Playful Purple', hex: '#6a0dad' }
  ];

  const startPrinting = () => {
    if (isPrinting) return;
    setIsPrinting(true);
    setPrintComplete(false);
    setPrintingProgress(0);
  };

  useEffect(() => {
    let interval;
    if (isPrinting && printingProgress < 100) {
      interval = setInterval(() => {
        setPrintingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPrinting(false);
            setPrintComplete(true);
            return 100;
          }
          return prev + 5;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isPrinting, printingProgress]);

  // Mock Products
  const featuredProducts = [
    {
      id: 'wigglitz-dragon',
      name: 'Flexi Rainbow Dragon',
      price: '$19.99',
      tag: 'Best Seller 🔥',
      color: 'var(--accent-pink)',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&q=80' // Playful abstract/magical background
    },
    {
      id: 'wigglitz-octopus',
      name: 'Cute Wiggle Octopus',
      price: '$12.99',
      tag: 'Super Flexi 🐙',
      color: 'var(--accent-blue)',
      image: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?auto=format&fit=crop&w=500&q=80' // Cute toy-like image
    },
    {
      id: 'wigglitz-rex',
      name: 'Chomp-O-Saurus Rex',
      price: '$15.99',
      tag: 'New Arrival ✨',
      color: 'var(--accent-orange)',
      image: 'https://images.unsplash.com/photo-1581579438747-1dc8d1e0ca96?auto=format&fit=crop&w=500&q=80' // Playful dinosaur vibe
    }
  ];

  // Categories
  const categories = [
    { name: 'Flexi Animals', icon: '🦁', color: 'var(--accent-pink)' },
    { name: 'Articulated Dragons', icon: '🐲', color: 'var(--accent-yellow)' },
    { name: 'Fidget Toys', icon: '🌀', color: 'var(--accent-blue)' },
    { name: 'Mystery Boxes', icon: '🎁', color: 'var(--accent-orange)' }
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Aarav (9 years old)',
      role: 'Chief Toy Tester',
      text: 'The Rainbow Dragon is so wiggly! I take it to school every day. It feels like a real pet!',
      stars: 5,
      avatar: '👦'
    },
    {
      name: 'Meera S.',
      role: 'Happy Parent',
      text: 'Super safe, durable, and absolutely gorgeous colors. My kids are obsessed with the fidget octopus!',
      stars: 5,
      avatar: '👩'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <span className="hero-badge">✨ 100% Biodegradable Magic ✨</span>
          <h1>Welcome to Pigglitz!</h1>
          <p>3D Printing Pitara - Little Prints. Big Smiles. Discover articulated dragons, wiggly animals, and custom fidget toys!</p>
          <div className="hero-buttons">
            <Link to="/products/wigglitz-dragon" className="btn btn-primary">Explore Pitara 🎁</Link>
            <a href="#simulator" className="btn btn-secondary">Try 3D Printer 🖨️</a>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section container">
        <h2 className="section-title">Choose Your Adventure! 🚀</h2>
        <div className="categories-grid">
          {categories.map((cat, idx) => (
            <div key={idx} className="category-card" style={{ '--cat-color': cat.color }}>
              <span className="category-icon">{cat.icon}</span>
              <h3>{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2>Featured Pitara Treasures 💎</h2>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card" style={{ borderColor: product.color }}>
                <div className="product-tag" style={{ backgroundColor: product.color }}>{product.tag}</div>
                <div className="product-image-wrapper">
                  <img src={product.image} alt={product.name} className="product-image" />
                </div>
                <h3>{product.name}</h3>
                <p className="product-price">{product.price}</p>
                <div className="product-card-buttons">
                  <Link to={`/products/${product.id}`} className="btn btn-secondary btn-sm">View Details</Link>
                  <button className="btn btn-primary btn-sm">Add to Cart 🛒</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive 3D Print Simulator */}
      <section id="simulator" className="simulator-section container">
        <div className="simulator-card">
          <div className="simulator-info">
            <h2>Create Your Own Toy! 🖨️</h2>
            <p>Experience the magic of 3D printing! Choose a model and a filament color, then hit print to watch your toy come to life.</p>
            
            {/* Toy Selector */}
            <div className="selector-group">
              <h4>1. Choose Your Toy:</h4>
              <div className="toy-options">
                {toysList.map((toy) => (
                  <button 
                    key={toy} 
                    className={`option-btn ${selectedToy === toy ? 'active' : ''}`}
                    onClick={() => { setSelectedToy(toy); setPrintComplete(false); setPrintingProgress(0); }}
                    disabled={isPrinting}
                  >
                    {toy}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="selector-group">
              <h4>2. Choose Filament Color:</h4>
              <div className="color-options">
                {colorsList.map((color) => (
                  <button 
                    key={color.hex} 
                    className={`color-dot ${selectedColor === color.hex ? 'active' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => { setSelectedColor(color.hex); setPrintComplete(false); setPrintingProgress(0); }}
                    title={color.name}
                    disabled={isPrinting}
                  />
                ))}
              </div>
            </div>

            {/* Print Button */}
            <button 
              className="btn btn-primary print-trigger-btn" 
              onClick={startPrinting}
              disabled={isPrinting}
            >
              {isPrinting ? 'Printing Magic... ⚡' : 'Start 3D Printing! 🚀'}
            </button>
          </div>

          {/* Printer Visualizer */}
          <div className="printer-visualizer">
            <div className="printer-frame">
              <div className="printer-gantry" style={{ top: `${10 + (printingProgress * 0.7)}%` }}>
                <div className="printer-extruder" style={{ left: isPrinting ? `${20 + (printingProgress % 3) * 20}%` : '50%' }}>
                  <Printer size={28} className="extruder-icon" style={{ color: selectedColor }} />
                  {isPrinting && <span className="laser-beam" style={{ backgroundColor: selectedColor }}></span>}
                </div>
              </div>
              
              <div className="printer-bed">
                {printingProgress > 0 && (
                  <div 
                    className={`printed-toy-preview ${printComplete ? 'bounce-animation' : ''}`}
                    style={{ 
                      color: selectedColor, 
                      opacity: printingProgress / 100,
                      transform: `scale(${0.3 + (printingProgress * 0.007)})`
                    }}
                  >
                    {selectedToy === 'Dragon' && '🐲'}
                    {selectedToy === 'Mini Octopus' && '🐙'}
                    {selectedToy === 'Flexi Rex' && '🦖'}
                    {selectedToy === 'Magic Castle' && '🏰'}
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              {isPrinting && (
                <div className="print-progress-container">
                  <div className="print-progress-bar" style={{ width: `${printingProgress}%`, backgroundColor: selectedColor }}></div>
                  <span className="progress-text">{printingProgress}% Printed</span>
                </div>
              )}

              {printComplete && (
                <div className="print-success-overlay">
                  <h3>🎉 Ta-Da!</h3>
                  <p>Your custom {selectedToy} is ready!</p>
                  <button className="btn btn-secondary btn-sm" onClick={() => setPrintComplete(false)}>Print Another</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Pigglitz Section */}
      <section className="features-section container">
        <h2 className="section-title">Why Pigglitz is Magical ✨</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper pink">
              <Sparkles size={32} />
            </div>
            <h3>Articulated Magic</h3>
            <p>Every toy is printed with interlocking joints, making them fully flexible, wiggly, and incredibly fun to play with!</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper yellow">
              <ShieldCheck size={32} />
            </div>
            <h3>100% Safe & Eco-Friendly</h3>
            <p>We use premium, non-toxic PLA filament made from cornstarch. Safe for little hands and kind to our planet!</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper blue">
              <Palette size={32} />
            </div>
            <h3>Rainbow of Colors</h3>
            <p>From dual-tone silk filaments to glow-in-the-dark and rainbow gradients, every print is a unique masterpiece.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">Loved by Little Printers ❤️</h2>
          <div className="testimonials-grid">
            {testimonials.map((t, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="testimonial-avatar">{t.avatar}</div>
                <div className="testimonial-stars">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} size={18} fill="var(--accent-yellow)" color="var(--accent-yellow)" />
                  ))}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <h4 className="testimonial-name">{t.name}</h4>
                <span className="testimonial-role">{t.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;