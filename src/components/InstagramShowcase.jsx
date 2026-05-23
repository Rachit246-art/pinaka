import React, { useState } from 'react';
import { Instagram, Heart, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import './InstagramShowcase.css';

const InstagramShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(2);

  const reels = [
    {
      id: 1,
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-spinning-colorful-plastic-spinning-tops-42242-large.mp4',
      likes: '374',
      comments: '18',
      link: 'https://www.instagram.com/wigglitz.zb/'
    },
    {
      id: 2,
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-small-colorful-toy-42243-large.mp4',
      likes: '120',
      comments: '9',
      link: 'https://www.instagram.com/wigglitz.zb/'
    },
    {
      id: 3,
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-3d-printer-printing-40074-large.mp4',
      likes: '65',
      comments: '4',
      link: 'https://www.instagram.com/wigglitz.zb/'
    },
    {
      id: 4,
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-child-playing-with-colorful-building-blocks-42241-large.mp4',
      likes: '245',
      comments: '15',
      link: 'https://www.instagram.com/wigglitz.zb/'
    },
    {
      id: 5,
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-craftsman-sculpting-a-clay-face-41590-large.mp4',
      likes: '189',
      comments: '11',
      link: 'https://www.instagram.com/wigglitz.zb/'
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reels.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reels.length) % reels.length);
  };

  return (
    <section className="instagram-section container">
      <h2 className="instagram-title">Follow Us On Instagram 📸</h2>
      
      <div className="reels-carousel-container">
        <button className="carousel-nav-btn prev-btn" onClick={handlePrev}>
          <ChevronLeft size={24} />
        </button>

        <div className="reels-stack">
          {reels.map((reel, idx) => {
            // Calculate relative position for stacked card effect
            let position = idx - activeIndex;
            if (position < -2) position += reels.length;
            if (position > 2) position -= reels.length;

            const isActive = position === 0;
            const isVisible = Math.abs(position) <= 2;

            if (!isVisible) return null;

            return (
              <a 
                key={reel.id}
                href={reel.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`reel-card pos-${position} ${isActive ? 'active' : ''}`}
                style={{
                  zIndex: 10 - Math.abs(position),
                  transform: `translateX(${position * 120}px) scale(${1 - Math.abs(position) * 0.15}) rotate(${position * 5}deg)`,
                  opacity: 1 - Math.abs(position) * 0.25
                }}
              >
                <video 
                  className="reel-video"
                  src={reel.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div className="reel-overlay">
                  <div className="instagram-icon-badge">
                    <Instagram size={20} />
                  </div>
                  <div className="reel-stats">
                    <span className="stat-item">
                      <Heart size={16} fill="white" /> {reel.likes}
                    </span>
                    <span className="stat-item">
                      <MessageCircle size={16} fill="white" /> {reel.comments}
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <button className="carousel-nav-btn next-btn" onClick={handleNext}>
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="instagram-button-wrapper">
        <a 
          href="https://www.instagram.com/wigglitz.zb/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-primary instagram-follow-btn"
        >
          <Instagram size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          @wigglitz.zb
        </a>
      </div>
    </section>
  );
};

export default InstagramShowcase;