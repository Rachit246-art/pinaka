import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, User, ChevronDown } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const checkUserStatus = () => {
    const savedUser = localStorage.getItem('pigglitz_user');
    if (savedUser) {
      setIsLoggedIn(true);
      setUserName(JSON.parse(savedUser).name);
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  };

  useEffect(() => {
    checkUserStatus();
    window.addEventListener('storage', checkUserStatus);
    return () => {
      window.removeEventListener('storage', checkUserStatus);
    };
  }, []);

  return (
    <header className="header">
      {/* Top Row */}
      <div className="container header-top">
        {/* Left: Search Bar */}
        <div className="header-search-container">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search our store" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="header-search-input"
          />
        </div>
        
        {/* Center: Logo */}
        <div className="header-center">
          <Link to="/" className="logo">
            Pigglitz
          </Link>
        </div>
        
        {/* Right: Currency, Account, Cart */}
        <div className="header-right">
          <div className="currency-selector">
            <span>India (INR ₹)</span>
            <ChevronDown size={14} />
          </div>

          <Link to={isLoggedIn ? "/account" : "/login"} className="account-link" title={isLoggedIn ? `Account (${userName})` : "Login"}>
            <div className="account-icon-wrapper">
              <User size={22} />
              {isLoggedIn && <span className="logged-in-dot"></span>}
            </div>
          </Link>

          <Link to="/cart" className="cart-link">
            <ShoppingCart size={22} />
            <span className="cart-count">0</span>
          </Link>
        </div>
      </div>

      {/* Bottom Row: Navigation Links */}
      <nav className="header-nav">
        <div className="container nav-links">
          <Link to="/" className="nav-item active">Home</Link>
          <Link to="/build-bundle" className="nav-item">Build a Bundle</Link>
          <Link to="/collectibles" className="nav-item">Real Time Collectibles</Link>
          <div className="nav-item dropdown">
            <span>Shop All</span>
            <ChevronDown size={14} />
          </div>
          <Link to="/wholesale" className="nav-item">Wholesale</Link>
          <Link to="/about" className="nav-item">About ZB Designs</Link>
          <Link to="/store-locator" className="nav-item">Store Locator</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;