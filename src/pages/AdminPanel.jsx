"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, addProduct, updateProduct, deleteProduct, getOrders, updateOrderStatus } from '../utils/productHelper';
import { formatPrice } from '../utils/currencyHelper';
import { Plus, Edit, Trash2, ShoppingBag, LayoutDashboard, Package, Users, ShieldAlert } from 'lucide-react';
import './AdminPanel.css';

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const navigate = useNavigate();

  // Form States
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    image: '',
    tag: '',
    category: 'real-time-collectibles',
    description: ''
  });

  const categories = [
    { id: 'build-a-wigglitz-bundle', name: 'Build a Wigglitz Bundle' },
    { id: 'collectors-guides', name: "Collector's Guides" },
    { id: 'monthly-box', name: 'Monthly Box' },
    { id: 'tubes', name: 'Tubes' },
    { id: 'real-time-collectibles', name: 'Real Time Collectibles' },
    { id: 'winky-plush', name: 'Winky Plush' },
    { id: 'gift-cards', name: 'Gift Cards' },
    { id: 'wigglitz-pouch', name: 'Wigglitz Pouch' }
  ];

  useEffect(() => {
    const savedUser = localStorage.getItem('pigglitz_user');
    if (!savedUser) {
      navigate('/login');
      return;
    }
    const parsed = JSON.parse(savedUser);
    if (!parsed.isAdmin && parsed.email?.trim() !== 'connect2rachit882@gmail.com') {
      navigate('/account');
      return;
    }
    setUser(parsed);
    setProducts(getProducts());
    setOrders(getOrders());
    
    // Load registered users list
    const savedUsers = JSON.parse(localStorage.getItem('pigglitz_users') || '[]');
    // Ensure the admin is in the list if not already
    if (savedUsers.length === 0 && parsed) {
      savedUsers.push(parsed);
      localStorage.setItem('pigglitz_users', JSON.stringify(savedUsers));
    }
    setUsersList(savedUsers);
  }, [navigate]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProductForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdateProduct = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateProduct({ ...productForm, id: editingId });
      setIsEditing(false);
      setEditingId(null);
    } else {
      addProduct(productForm);
    }
    setProductForm({
      name: '',
      price: '',
      image: '',
      tag: '',
      category: 'real-time-collectibles',
      description: ''
    });
    setProducts(getProducts());
  };

  const handleEditClick = (product) => {
    setIsEditing(true);
    setEditingId(product.id);
    setProductForm({
      name: product.name,
      price: product.price,
      image: product.image,
      tag: product.tag || '',
      category: product.category || 'real-time-collectibles',
      description: product.description || ''
    });
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this product? 😢')) {
      deleteProduct(id);
      setProducts(getProducts());
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    setOrders(getOrders());
  };

  // Calculate Stats
  const totalSales = orders.reduce((sum, o) => sum + parseFloat(o.total), 0);
  const pendingOrders = orders.filter(o => o.status.includes('Pending')).length;
  const activePrinters = 42 + pendingOrders;

  return (
    <div className="admin-panel container">
      <div className="admin-header">
        <h1>Wigglitz Control Pitara 🛠️</h1>
        <p>Welcome back, Commander <strong>{user?.name}</strong>! Control the 3D printing empire from here.</p>
      </div>

      {/* Navigation Tabs */}
      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <LayoutDashboard size={18} /> Dashboard
        </button>
        <button 
          className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          <Package size={18} /> Manage Products
        </button>
        <button 
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <ShoppingBag size={18} /> Manage Orders
        </button>
        <button 
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <Users size={18} /> Registered Users
        </button>
      </div>

      {/* Tab Content: Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="dashboard-tab">
          <div className="stats-grid">
            <div className="stat-card pink-shadow">
              <h3>Total Sales 💰</h3>
              <p className="stat-value">{formatPrice(totalSales)}</p>
              <span className="stat-sub">From {orders.length} orders</span>
            </div>
            <div className="stat-card yellow-shadow">
              <h3>Pending Orders ⏳</h3>
              <p className="stat-value">{pendingOrders}</p>
              <span className="stat-sub">Need printing attention</span>
            </div>
            <div className="stat-card blue-shadow">
              <h3>Active Printers 🖨️</h3>
              <p className="stat-value">{activePrinters}</p>
              <span className="stat-sub">Humming at 220°C</span>
            </div>
          </div>

          <div className="recent-activity">
            <h3>Recent Orders Queue 🎁</h3>
            <div className="orders-list">
              {orders.slice(0, 3).map(order => (
                <div key={order.id} className="order-row">
                  <div className="order-info">
                    <strong>{order.id}</strong>
                    <span>{order.userName} ({order.userEmail})</span>
                  </div>
                  <div className="order-status-badge">{order.status}</div>
                  <div className="order-total">{formatPrice(order.total)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Products */}
      {activeTab === 'products' && (
        <div className="products-tab">
          <div className="product-management-grid">
            {/* Product Form */}
            <div className="product-form-card">
              <h3>{isEditing ? 'Edit Product ✏️' : 'Add New Toy 🧸'}</h3>
              <form onSubmit={handleAddOrUpdateProduct} className="admin-form">
                <div className="form-group">
                  <label>Product Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={productForm.name} 
                    onChange={handleFormChange} 
                    placeholder="e.g. Flexi Dragon" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Price (USD)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    name="price" 
                    value={productForm.price} 
                    onChange={handleFormChange} 
                    placeholder="e.g. 19.99" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Image URL</label>
                  <input 
                    type="url" 
                    name="image" 
                    value={productForm.image} 
                    onChange={handleFormChange} 
                    placeholder="https://images.unsplash.com/..." 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Tag / Badge</label>
                  <input 
                    type="text" 
                    name="tag" 
                    value={productForm.tag} 
                    onChange={handleFormChange} 
                    placeholder="e.g. Best Seller 🔥" 
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={productForm.category} onChange={handleFormChange}>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea 
                    name="description" 
                    value={productForm.description} 
                    onChange={handleFormChange} 
                    rows="3" 
                    placeholder="Describe the wiggly magic..."
                    required
                  ></textarea>
                </div>
                <div className="form-buttons">
                  <button type="submit" className="btn btn-primary">
                    {isEditing ? 'Update Product 🚀' : 'Add to Pitara 🎁'}
                  </button>
                  {isEditing && (
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => {
                        setIsEditing(false);
                        setProductForm({ name: '', price: '', image: '', tag: '', category: 'real-time-collectibles', description: '' });
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Products List */}
            <div className="products-list-card">
              <h3>Current Pitara Inventory ({products.length})</h3>
              <div className="admin-products-list">
                {products.map(product => (
                  <div key={product.id} className="admin-product-row">
                    <img src={product.image} alt={product.name} className="admin-prod-img" />
                    <div className="admin-prod-details">
                      <h4>{product.name}</h4>
                      <span className="admin-prod-price">{formatPrice(product.price)}</span>
                      <span className="admin-prod-cat">{categories.find(c => c.id === product.category)?.name || product.category}</span>
                    </div>
                    <div className="admin-prod-actions">
                      <button onClick={() => handleEditClick(product)} className="action-btn edit" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDeleteClick(product.id)} className="action-btn delete" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Orders */}
      {activeTab === 'orders' && (
        <div className="orders-tab">
          <h3>All Customer Orders ({orders.length})</h3>
          <div className="admin-orders-grid">
            {orders.map(order => (
              <div key={order.id} className="admin-order-card">
                <div className="order-card-header">
                  <div>
                    <h4>{order.id}</h4>
                    <span className="order-date">{order.date}</span>
                  </div>
                  <div className="order-status-badge-wrapper">
                    <select 
                      value={order.status} 
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="Pending ⏳">Pending ⏳</option>
                      <option value="Printing 🖨️">Printing 🖨️</option>
                      <option value="Shipped 📦">Shipped 📦</option>
                      <option value="Delivered 🚚">Delivered 🚚</option>
                    </select>
                  </div>
                </div>
                <div className="order-card-body">
                  <p><strong>Customer:</strong> {order.userName} ({order.userEmail})</p>
                  <div className="order-items-list">
                    <strong>Items:</strong>
                    <ul>
                      {order.items?.map((item, idx) => (
                        <li key={idx}>{item.quantity}x {item.name} ({formatPrice(item.price)})</li>
                      )) || <li>{order.items}</li>}
                    </ul>
                  </div>
                </div>
                <div className="order-card-footer">
                  <span>Total Paid: <strong>{formatPrice(order.total)}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Users */}
      {activeTab === 'users' && (
        <div className="users-tab">
          <h3>Registered Playmates ({usersList.length})</h3>
          <div className="admin-users-grid">
            {usersList.map((u, idx) => (
              <div key={idx} className="admin-user-card">
                <div className="user-card-header">
                  <h4>{u.name}</h4>
                  {u.isAdmin && (
                    <span className="admin-badge">
                      <ShieldAlert size={14} /> Commander
                    </span>
                  )}
                </div>
                <div className="user-card-body">
                  <p><strong>Email:</strong> {u.email}</p>
                  <p><strong>Mobile:</strong> {u.mobile || 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;