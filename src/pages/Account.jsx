import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, LogOut, ShoppingBag, ShieldAlert } from 'lucide-react';
import { getOrders } from '../utils/productHelper';
import { formatPrice } from '../utils/currencyHelper';
import './Account.css';

const Account = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('pigglitz_user');
    if (!savedUser) {
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      
      // Load orders from localStorage and filter by current user's email
      const allOrders = getOrders();
      const userOrders = allOrders.filter(
        order => order.userEmail?.toLowerCase() === parsedUser.email?.toLowerCase()
      );
      setOrders(userOrders);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('pigglitz_user');
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  if (!user) {
    return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  const isUserAdmin = user.isAdmin || user.email?.trim() === 'connect2rachit882@gmail.com';

  return (
    <div className="account-page container">
      <div className="account-grid">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="avatar-container">
            <div className="avatar">
              <User size={48} />
            </div>
          </div>
          <h2>Hey, {user.name}!</h2>
          <p className="profile-email">{user.email}</p>
          <p className="profile-phone">📞 {user.mobile}</p>
          
          {isUserAdmin && (
            <Link to="/admin" className="btn btn-primary admin-panel-btn" style={{ marginBottom: '12px', width: '100%' }}>
              <ShieldAlert size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Admin Control Pitara 🛠️
            </Link>
          )}

          <button onClick={handleLogout} className="btn btn-secondary logout-btn">
            <LogOut size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Logout
          </button>
        </div>

        {/* Orders Section */}
        <div className="orders-section">
          <h3>Your Pitara Orders 🎁</h3>
          {orders.length > 0 ? (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <span className="order-id">{order.id}</span>
                    <span className="order-status">{order.status}</span>
                  </div>
                  <div className="order-details">
                    <p className="order-items">
                      <strong>Items:</strong>{' '}
                      {Array.isArray(order.items)
                        ? order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')
                        : order.items}
                    </p>
                    <p className="order-date"><strong>Ordered on:</strong> {order.date}</p>
                  </div>
                  <div className="order-footer">
                    <span>Total: <strong>{formatPrice(order.total)}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-orders">
              <ShoppingBag size={48} />
              <p>Your Pitara is empty! Let's add some magic.</p>
              <Link to="/" className="btn btn-primary">Shop Now</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;