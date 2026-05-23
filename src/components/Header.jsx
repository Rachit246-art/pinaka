import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, Search, User } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

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

    // Listen for storage changes to update header state instantly
    window.addEventListener('storage', checkUserStatus);
    return () => {
      window.removeEventListener('storage', checkUserStatus);
    };
  }, []);

  return (
    <header className="header">
      <div className="container header-content">
        <div className="header-left">
          <button className="menu-btn" aria-label="Menu">
            <Menu size={24} />
          </button>
          <button className="search-btn" aria-label="Search">
            <Search size={24} />
          </button>
        </div>
        
        <div className="header-center">
          <Link to="/" className="logo">
            Pigglitz
          </Link>
        </div>
        
        <div className="header-right">
          <Link to={isLoggedIn ? "/account" : "/login"} className="account-link" title={isLoggedIn ? `Account (${userName})` : "Login"}>
            <div className="account-icon-wrapper">
              <User size={24} />
              {isLoggedIn && <span className="logged-in-dot"></span>}
            </div>
          </Link>
          <Link to="/cart" className="cart-link">
            <ShoppingCart size={24} />
            <span className="cart-count">0</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;