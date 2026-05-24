import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', password: '' });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('pigglitz_user');
    if (savedUser) {
      navigate('/account');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, mobile, password } = formData;
    if (name && email && mobile) {
      const isAdmin = email.trim() === 'connect2rachit882@gmail.com' && password === 'Rachit';
      
      const userObj = { 
        name, 
        email, 
        mobile,
        isAdmin 
      };

      localStorage.setItem('pigglitz_user', JSON.stringify(userObj));
      setSubmitted(true);
      
      setTimeout(() => {
        if (isAdmin) {
          navigate('/admin');
        } else {
          navigate('/account');
        }
        window.dispatchEvent(new Event('storage'));
      }, 1500);
    }
  };

  return (
    <div className="login-page container">
      <div className="login-container">
        <h2>Login / Sign Up</h2>
        {submitted ? (
          <div className="success-msg">
            🎉 Welcome, {formData.name}! Logging you in...
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
                placeholder="Enter your name"
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
                placeholder="Enter your email"
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
                placeholder="Enter mobile number"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password (Required for Admin)"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary full-width">
              Let's Play! 🚀
            </button>
          </form>
        )}
        <div className="back-link" style={{ marginTop: '20px' }}>
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;