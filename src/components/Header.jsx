import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, User, ChevronDown } from 'lucide-react';
import { getCart } from '../utils/cartHelper';
import './Header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

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

  const updateCartBadge = () => {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };

  useEffect(() => {
    checkUserStatus();
    updateCartBadge();
    
    window.addEventListener('storage', checkUserStatus);
    window.addEventListener('cart-updated', updateCartBadge);
    
    return () => {
      window.removeEventListener('storage', checkUserStatus);
      window.removeEventListener('cart-updated', updateCartBadge);
    };
  }, []);

  const shopAllCategories = [
    { name: 'Build a Wigglitz Bundle', path: '/category/build-a-wigglitz-bundle' },
    { name: "Collector's Guides", path: '/category/collectors-guides' },
    { name: 'Monthly Box', path: '/category/monthly-box' },
    { name: 'Tubes', path: '/category/tubes' },
    { name: 'Real Time Collectibles', path: '/category/real-time-collectibles' },
    { name: 'Winky Plush', path: '/category/winky-plush' },
    { name: 'Gift Cards', path: '/category/gift-cards' },
    { name: 'Wigglitz Pouch', path: '/category/wigglitz-pouch' }
  ];

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
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
      </div>

      {/* Bottom Row: Navigation Links */}
      <nav className="header-nav">
        <div className="container nav-links">
          <Link to="/" className="nav-item active">Home</Link>
          <Link to="/build-bundle" className="nav-item">Build a Bundle</Link>
          <Link to="/category/real-time-collectibles" className="nav-item">Real Time Collectibles</Link>
          
          {/* Shop All Dropdown */}
          <div 
            className="nav-item dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span className="dropdown-trigger">
              Shop All <ChevronDown size={14} />
            </span>
            {dropdownOpen && (
              <div className="dropdown-menu">
                {shopAllCategories.map((cat, idx) => (
                  <Link 
                    key={idx} 
                    to={cat.path} 
                    className="dropdown-link"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/wholesale" className="nav-item">Wholesale</Link>
          <Link to="/about" className="nav-item">About Pigglitz</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;