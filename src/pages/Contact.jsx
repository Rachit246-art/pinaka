import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bundleSize: 'Medium Pitara (3 Toys)',
    customColors: 'Rainbow Gradient',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page container">
      <div className="contact-container">
        <h2>Build Your Custom Bundle! 🎁</h2>
        <p className="contact-subtitle">Tell us what magical 3D printed toys you want in your custom Pitara bundle, and we'll make it happen!</p>

        {submitted ? (
          <div className="success-msg">
            🎉 <strong>Yay! Your request is sent!</strong> <br />
            We are warming up our 3D printers and will get back to you at <strong>{formData.email}</strong> super fast!
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="bundleSize">Bundle Size</label>
              <select
                id="bundleSize"
                name="bundleSize"
                value={formData.bundleSize}
                onChange={handleChange}
              >
                <option>Small Pitara (2 Toys) - $24.99</option>
                <option>Medium Pitara (3 Toys) - $34.99</option>
                <option>Mega Pitara (5 Toys) - $49.99</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="customColors">Filament Theme</label>
              <select
                id="customColors"
                name="customColors"
                value={formData.customColors}
                onChange={handleChange}
              >
                <option>Rainbow Gradient 🌈</option>
                <option>Glow in the Dark 🌟</option>
                <option>Shiny Silk Gold & Purple ✨</option>
                <option>Surprise Me! 🎁</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Which toys would you like? (e.g. Dragon, Octopus, Rex)</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us your dream toy combination..."
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary full-width">
              Send Bundle Request! 🚀
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;