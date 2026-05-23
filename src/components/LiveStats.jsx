import React, { useState, useEffect } from 'react';
import { Printer, Heart, Layers, Award } from 'lucide-react';
import './LiveStats.css';

const LiveStats = () => {
  const [layers, setLayers] = useState(14285900);

  useEffect(() => {
    const interval = setInterval(() => {
      setLayers(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="live-stats-section">
      <div className="container stats-grid">
        <div className="stat-item">
          <div className="stat-icon-box pink">
            <Layers size={28} />
          </div>
          <div className="stat-info">
            <h3 className="stat-number">{layers.toLocaleString()}</h3>
            <p className="stat-label">Layers Printed Worldwide 🌍</p>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon-box yellow">
            <Printer size={28} />
          </div>
          <div className="stat-info">
            <h3 className="stat-number">42</h3>
            <p className="stat-label">Printers Humming Right Now 🖨️</p>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon-box blue">
            <Heart size={28} />
          </div>
          <div className="stat-info">
            <h3 className="stat-number">12,450+</h3>
            <p className="stat-label">Happy Smiles Delivered 😊</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStats;