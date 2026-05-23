import React from 'react';
import { Play, Sparkles, Flame } from 'lucide-react';
import './VideoShowcase.css';

const VideoShowcase = () => {
  return (
    <section className="video-showcase container">
      <div className="video-card-wrapper">
        <div className="video-info-side">
          <span className="premium-badge">
            <Sparkles size={16} /> Inside the Pigglitz Lab
          </span>
          <h2>See the Magic Happen! 🎥</h2>
          <p>
            Ever wondered how a flat pile of cornstarch filament turns into a fully flexible, wiggly dragon? Watch our high-speed printers carve out interlocking joints layer-by-layer with micron precision!
          </p>
          <div className="lab-features">
            <div className="lab-feature">
              <span className="lab-icon">🔥</span>
              <div>
                <h4>220°C Precision Melting</h4>
                <p>Perfect layer adhesion for ultra-strong joints.</p>
              </div>
            </div>
            <div className="lab-feature">
              <span className="lab-icon">⚡</span>
              <div>
                <h4>0.12mm Layer Height</h4>
                <p>Super smooth silk finish with zero rough edges.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="video-player-side">
          <div className="video-container-frame">
            <video 
              className="lab-video"
              src="https://assets.mixkit.co/videos/preview/mixkit-3d-printer-printing-a-small-object-40074-large.mp4"
              autoPlay 
              loop 
              muted 
              playsInline
            />
            <div className="video-overlay-glow"></div>
            <div className="video-badge-live">
              <span className="live-dot"></span> LIVE LAB FEED
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;