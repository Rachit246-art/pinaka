import React from 'react';
import { Sparkles, Heart, Printer, ShieldCheck } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-page container">
      {/* Hero Section */}
      <div className="about-hero">
        <h1>About Pigglitz Designs 🎨</h1>
        <p className="about-subtitle">
          Where imagination meets 3D printing magic! We bring flexible, wiggly, and articulated joy straight to your hands.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="about-grid">
        <div className="about-image-container">
          <img 
            src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80" 
            alt="Pigglitz 3D Printing Workshop" 
            className="about-main-image"
          />
          <div className="image-badge">✨ Made with Love & Cornstarch!</div>
        </div>

        <div className="about-info">
          <h2>Our Magical Story 📖</h2>
          <p>
            Pigglitz Designs started with a simple dream: to turn premium, biodegradable materials into interactive, articulated wonders. We wanted to create toys that aren't just meant to sit on a shelf, but are designed to wiggle, flex, and bring endless smiles!
          </p>
          <p>
            Every single toy in our <strong>Pitara</strong> is printed layer-by-layer in our state-of-the-art workshop. With interlocking joints printed directly in place, our creations require no assembly—they come out of the printer ready to play!
          </p>

          <div className="about-stats">
            <div className="stat-card">
              <span className="stat-number">100%</span>
              <span className="stat-label">Eco-Friendly PLA</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">10k+</span>
              <span className="stat-label">Happy Smiles</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="about-values">
        <h2 className="values-title">What Makes Us Special ✨</h2>
        <div className="values-grid">
          <div className="value-card pink-shadow">
            <div className="value-icon-wrapper pink-bg">
              <Sparkles size={28} />
            </div>
            <h3>Articulated Fun</h3>
            <p>Our toys are fully flexible and wiggly, making them perfect fidget companions and sensory toys for all ages.</p>
          </div>

          <div className="value-card yellow-shadow">
            <div className="value-icon-wrapper yellow-bg">
              <Printer size={28} />
            </div>
            <h3>Precision Printing</h3>
            <p>We use high-end 3D printers and premium silk filaments to ensure vibrant colors and smooth, durable joints.</p>
          </div>

          <div className="value-card blue-shadow">
            <div className="value-icon-wrapper blue-bg">
              <ShieldCheck size={28} />
            </div>
            <h3>Safe & Non-Toxic</h3>
            <p>Crafted from biodegradable PLA filament derived from cornstarch, our toys are safe for kids and kind to the Earth.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;