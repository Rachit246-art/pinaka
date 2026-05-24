import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, User, ChevronDown, Globe, ShieldAlert } from 'lucide-react';
import { getCart } from '../utils/cartHelper';
import { currencies, getSelectedCurrency, setSelectedCurrency } from '../utils/currencyHelper';
import './Header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [currentCurrency, setCurrentCurrency] = useState(getSelectedCurrency());
  
  const currencyRef = useRef(null);

  const checkUserStatus = () => {
    const savedUser = localStorage.getItem('pigglitz_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setIsLoggedIn(true);
      setUserName(parsed.name);
      setIsAdmin(!!parsed.isAdmin);
    } else {
      setIsLoggedIn(false);
      setUserName('');
      setIsAdmin(false);
    }
  };

  const updateCartBadge = () => {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };

  const handleCurrencyChange = (code) => {
    setSelectedCurrency(code);
    setCurrentCurrency(getSelectedCurrency());
    setCurrencyDropdownOpen(false);
  };

  useEffect(() => {
    checkUserStatus();
    updateCartBadge();
    
    const handleCurrencyUpdate = () => {
      setCurrentCurrency(getSelectedCurrency());
    };

    window.addEventListener('storage', checkUserStatus);
    window.addEventListener('cart-updated', updateCartBadge);
    window.addEventListener('currency-updated', handleCurrencyUpdate);
    
    const handleClickOutside = (event) => {
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setCurrencyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('storage', checkUserStatus);
      window.removeEventListener('cart-updated', updateCartBadge);
      window.removeEventListener('currency-updated', handleCurrencyUpdate);
      document.removeEventListener('mousedown', handleClickOutside);
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
          {/* Currency Selector Dropdown */}
          <div className="currency-selector-wrapper" ref={currencyRef}>
            <div 
              className="currency-selector" 
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
            >
              <Globe size={16} className="globe-icon" />
              <span>{currentCurrency.name}</span>
              <ChevronDown size={14} />
            </div>
            
            {currencyDropdownOpen && (
              <div className="currency-dropdown-menu">
                {currencies.map((c) => (
                  <button 
                    key={c.code} 
                    className={`currency-dropdown-item ${currentCurrency.code === c.code ? 'active' : ''}`}
                    onClick={() => handleCurrencyChange(c.code)}
                  >
                    <span className="currency-symbol-badge">{c.symbol}</span>
                    <span className="currency-name-text">{c.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {isAdmin && (
            <Link to="/admin" className="admin-badge-link" title="Admin Panel">
              <div className="admin-icon-wrapper">
                <ShieldAlert size={22} />
                <span className="admin-text">Admin</span>
              </div>
            </Link>
          )}

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
            onMouseEnter={() => setShopDropdownOpen(true)}
            onMouseLeave={() => setShopDropdownOpen(false)}
          >
            <span className="dropdown-trigger">
              Shop All <ChevronDown size={14} />
            </span>
            {shopDropdownOpen && (
              <div className="dropdown-menu">
                {shopAllCategories.map((cat, idx) => (
                  <Link 
                    key={idx} 
                    to={cat.path} 
                    className="dropdown-link"
                    onClick={() => setShopDropdownOpen(false)}
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