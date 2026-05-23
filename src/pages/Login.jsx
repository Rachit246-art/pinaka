import { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, mobile } = formData;
    if (name && email && mobile) {
      setSubmitted(true);
    }
  };

  return (
    <div className="login-page container">
      <h2>Login / Sign Up</h2>
      {submitted ? (
        <div className="success-msg">
          🎉 Thank you, {formData.name}! Your information has been received.
        </div>
      ) : (
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary full-width">
            Submit
          </button>
        </form>
      )}
      <div className="back-link">
        <Link to="/">← Back to Home</Link>
      </div>
    </div>
  );
};

export default Login;
