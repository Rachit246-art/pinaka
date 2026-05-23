import { toast } from 'react-hot-toast';

export const getCart = () => {
  const cart = localStorage.getItem('pigglitz_cart');
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product) => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.id === product.id);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  localStorage.setItem('pigglitz_cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cart-updated'));
  toast.success(`Added ${product.name} to your Pitara! 🎁`, {
    icon: '🎉',
    style: {
      borderRadius: '16px',
      background: '#6a0dad',
      color: '#fff',
      fontWeight: 'bold',
      border: '3px solid #ffb703'
    }
  });
};

export const updateQuantity = (productId, quantity) => {
  let cart = getCart();
  if (quantity <= 0) {
    cart = cart.filter(item => item.id !== productId);
  } else {
    const item = cart.find(item => item.id === productId);
    if (item) item.quantity = quantity;
  }
  localStorage.setItem('pigglitz_cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cart-updated'));
};

export const removeFromCart = (productId) => {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('pigglitz_cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cart-updated'));
  toast.error('Removed item from your Pitara.', {
    style: {
      borderRadius: '16px',
      fontWeight: 'bold'
    }
  });
};

export const clearCart = () => {
  localStorage.removeItem('pigglitz_cart');
  window.dispatchEvent(new Event('cart-updated'));
};