import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, Search, User } from 'lucide-react';
import './Header.css';

const Header = () => {
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
          <Link to="/account" className="account-link">
            <User size={24} />
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
