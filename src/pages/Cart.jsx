import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { getCart, updateQuantity, removeFromCart, clearCart } from '../utils/cartHelper';
import { formatPrice } from '../utils/currencyHelper';
import { addOrder } from '../utils/productHelper';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [currencyTrigger, setCurrencyTrigger] = useState(0);

  const loadCart = () => {
    setCartItems(getCart());
  };

  useEffect(() => {
    loadCart();
    
    const handleCurrencyUpdate = () => {
      setCurrencyTrigger(prev => prev + 1);
    };

    window.addEventListener('cart-updated', loadCart);
    window.addEventListener('currency-updated', handleCurrencyUpdate);
    
    return () => {
      window.removeEventListener('cart-updated', loadCart);
      window.removeEventListener('currency-updated', handleCurrencyUpdate);
    };
  }, []);

  const handleQuantityChange = (id, currentQty, delta) => {
    updateQuantity(id, currentQty + delta);
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const priceNum = typeof item.price === 'number' ? item.price : parseFloat(item.price.toString().replace(/[^0-9.]/g, ''));
      return total + (priceNum * item.quantity);
    }, 0);
  };

  const handleCheckout = () => {
    const savedUser = localStorage.getItem('pigglitz_user');
    const user = savedUser ? JSON.parse(savedUser) : { name: 'Guest', email: 'guest@example.com' };

    // Save order to mock backend
    addOrder({
      userEmail: user.email,
      userName: user.name,
      total: calculateTotal(),
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    });

    setCheckoutSuccess(true);
    clearCart();
  };

  if (checkoutSuccess) {
    return (
      <div className="cart-page container">
        <div className="checkout-success-card">
          <div className="success-emoji">🎉 🖨️ ✨</div>
          <h2>Order Placed Successfully!</h2>
          <p>We have warmed up our 3D printers and started printing your custom articulated toys layer-by-layer!</p>
          <p className="success-subtext">You will receive a confirmation email with tracking details shortly.</p>
          <Link to="/" className="btn btn-primary">Keep Playing! 🚀</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <h1 className="cart-title">Your Pitara Cart 🎁</h1>

      {cartItems.length > 0 ? (
        <div className="cart-grid">
          {/* Cart Items List */}
          <div className="cart-items-list">
            {cartItems.map((item) => {
              const priceNum = typeof item.price === 'number' ? item.price : parseFloat(item.price.toString().replace(/[^0-9.]/g, ''));
              return (
                <div key={item.id} className="cart-item-card">
                  <div className="cart-item-image-wrapper">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                  </div>
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="cart-item-price">{formatPrice(priceNum)}</p>
                  </div>
                  <div className="cart-item-controls">
                    <div className="quantity-selector">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                        className="qty-btn"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="qty-number">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                        className="qty-btn"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button 
                      onClick={() => handleRemove(item.id)} 
                      className="remove-btn"
                      title="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary-card">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>{formatPrice(calculateTotal())}</strong>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <strong className="free-shipping">FREE 🚚</strong>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <strong>{formatPrice(calculateTotal())}</strong>
            </div>
            <button onClick={handleCheckout} className="btn btn-primary checkout-btn">
              Proceed to Checkout 🚀
            </button>
            <Link to="/" className="continue-shopping">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="empty-cart-card">
          <ShoppingBag size={64} className="empty-cart-icon" />
          <h2>Your Pitara is Empty!</h2>
          <p>Add some flexible, wiggly 3D printed magic to your collection.</p>
          <Link to="/" className="btn btn-primary">Shop Now 🧸</Link>
        </div>
      )}
    </div>
  );
};

export default Cart;