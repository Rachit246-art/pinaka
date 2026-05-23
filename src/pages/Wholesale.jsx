import React, { useState } from 'react';
import './Wholesale.css';

const Wholesale = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneCode: '+91',
    phoneNumber: '',
    contactMethod: 'Email',
    contactTime: 'Morning',
    companyName: '',
    websiteUrl: '',
    streetAddress: '',
    apartment: '',
    city: '',
    stateRegion: '',
    postalCode: '',
    businessDescription: ''
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
    <div className="wholesale-page container">
      <div className="wholesale-container">
        <div className="wholesale-header">
          <h2>Become a Wigglitz Retailer</h2>
          <p className="wholesale-subtitle">
            Bring the magic of 3D printed articulated toys to your store! Fill out the form below to apply.
          </p>
        </div>

        {submitted ? (
          <div className="wholesale-success-msg">
            <div className="success-icon">🎉</div>
            <h3>Application Received!</h3>
            <p>
              Thank you, <strong>{formData.firstName}</strong>! We have received your application for <strong>{formData.companyName}</strong>.
            </p>
            <p>Our wholesale team will review your profile and contact you via <strong>{formData.email}</strong> soon!</p>
            <button className="btn btn-primary" onClick={() => setSubmitted(false)}>
              Submit Another Application
            </button>
          </div>
        ) : (
          <form className="wholesale-form" onSubmit={handleSubmit}>
            
            {/* Section 1: Contact Information */}
            <div className="form-section">
              <h3 className="section-heading">Contact Information</h3>
              
              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="firstName">First Name <span className="required">*</span></label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name <span className="required">*</span></label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Direct Email <span className="required">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number <span className="required">*</span></label>
                <div className="phone-input-container">
                  <select
                    name="phoneCode"
                    value={formData.phoneCode}
                    onChange={handleChange}
                    className="phone-code-select"
                  >
                    <option value="+91">IN +91</option>
                    <option value="+1">US +1</option>
                    <option value="+44">UK +44</option>
                    <option value="+61">AU +61</option>
                    <option value="+971">AE +971</option>
                  </select>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="contactMethod">How should we contact you?</label>
                  <select
                    id="contactMethod"
                    name="contactMethod"
                    value={formData.contactMethod}
                    onChange={handleChange}
                  >
                    <option value="Email">Email</option>
                    <option value="Phone Call">Phone Call</option>
                    <option value="WhatsApp">WhatsApp</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="contactTime">When should we contact you?</label>
                  <select
                    id="contactTime"
                    name="contactTime"
                    value={formData.contactTime}
                    onChange={handleChange}
                  >
                    <option value="Morning">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon">Afternoon (12 PM - 5 PM)</option>
                    <option value="Evening">Evening (5 PM - 8 PM)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Business Profile */}
            <div className="form-section">
              <h3 className="section-heading">Business Profile</h3>

              <div className="form-group">
                <label htmlFor="companyName">Company name <span className="required">*</span></label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Your Company Name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="websiteUrl">Website URL</label>
                <input
                  type="url"
                  id="websiteUrl"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleChange}
                  placeholder="https://example.com"
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="streetAddress">Street Address <span className="required">*</span></label>
                  <input
                    type="text"
                    id="streetAddress"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    placeholder="Street Address"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="apartment">Apartment, suite, etc.</label>
                  <input
                    type="text"
                    id="apartment"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                    placeholder="Apartment, suite, etc."
                  />
                </div>
              </div>

              <div className="form-row-3">
                <div className="form-group">
                  <label htmlFor="city">City <span className="required">*</span></label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="stateRegion">State/Region <span className="required">*</span></label>
                  <input
                    type="text"
                    id="stateRegion"
                    name="stateRegion"
                    value={formData.stateRegion}
                    onChange={handleChange}
                    placeholder="State/Region"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code <span className="required">*</span></label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Postal Code"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="businessDescription">Tell us about your business</label>
                <textarea
                  id="businessDescription"
                  name="businessDescription"
                  rows="4"
                  value={formData.businessDescription}
                  onChange={handleChange}
                  placeholder="Tell us about your store, target audience, and why you want to sell Wigglitz!"
                ></textarea>
              </div>
            </div>

            {/* reCAPTCHA Badge & Submit */}
            <div className="form-footer">
              <div className="recaptcha-badge">
                <div className="recaptcha-logo">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#4285F4" d="M12.5 2C6.7 2 2 6.7 2 12.5S6.7 23 12.5 23 23 18.3 23 12.5 18.3 2 12.5 2zm0 18c-3.6 0-6.5-2.9-6.5-6.5S8.9 7 12.5 7s6.5 2.9 6.5 6.5-2.9 6.5-6.5 6.5z"/>
                    <path fill="#34A853" d="M12.5 9c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5S14.4 9 12.5 9z"/>
                  </svg>
                </div>
                <div className="recaptcha-text">
                  <span>protected by <strong>reCAPTCHA</strong></span>
                  <div className="recaptcha-links">
                    <a href="https://google.com/recaptcha" target="_blank" rel="noreferrer">Privacy</a> - <a href="https://google.com/recaptcha" target="_blank" rel="noreferrer">Terms</a>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary submit-btn">
                Submit Application 🚀
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};

export default Wholesale;