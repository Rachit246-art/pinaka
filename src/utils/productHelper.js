"use client";

// Default categories and products
const defaultProducts = [
  {
    id: 'custom-trio-bundle',
    name: 'Custom Trio Pitara Bundle',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&q=80',
    tag: 'Popular 🌟',
    category: 'build-a-wigglitz-bundle',
    description: 'Create your own custom collection of wiggly, flexible 3D printed toys! Choose three of your favorite models and we will print them in your chosen filament theme.'
  },
  {
    id: 'official-guide-v1',
    name: 'Official Pigglitz Collector Guide (Vol. 1)',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=80',
    tag: 'New 📖',
    category: 'collectors-guides',
    description: 'Track your collection and discover rare, ultra-rare, and legendary prints! Includes high-quality photos and checklists.'
  },
  {
    id: 'mystery-monthly-box',
    name: 'Pigglitz Mystery Monthly Box',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=500&q=80',
    tag: 'Best Value 🎁',
    category: 'monthly-box',
    description: 'Subscribe to get a surprise box of exclusive, limited-edition 3D prints and pocket pals delivered straight to your door every month!'
  },
  {
    id: 'mini-flexi-tube',
    name: 'Mini Flexi Pocket Pals Tube',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=500&q=80',
    tag: 'Hot Seller 🔥',
    category: 'tubes',
    description: 'Fun, stackable tubes filled with mini flexible pocket pals! Perfect for on-the-go fidgeting.'
  },
  {
    id: 'crystal-dragon-articulated',
    name: 'Articulated Crystal Dragon',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1508898578281-774ac4893c0c?auto=format&fit=crop&w=500&q=80',
    tag: 'Masterpiece 🐲',
    category: 'real-time-collectibles',
    description: 'This is the amazing, fully articulated Crystal Dragon! Printed layer-by-layer with premium silk gradient filament, it wiggles, flexes, and makes the perfect fidget companion.'
  },
  {
    id: 'winky-octopus-plush',
    name: 'Winky Octopus Soft Plush',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?auto=format&fit=crop&w=500&q=80',
    tag: 'Super Soft 🧸',
    category: 'winky-plush',
    description: 'Super soft, huggable plushies featuring your favorite Pigglitz characters! Perfect for bedtime cuddles.'
  },
  {
    id: 'pigglitz-digital-gift-card',
    name: 'Pigglitz Digital Gift Card',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=500&q=80',
    tag: 'E-Gift ✉️',
    category: 'gift-cards',
    description: 'Give the gift of choice! Perfect for birthdays, holidays, and special surprises. Delivered instantly via email.'
  },
  {
    id: 'canvas-toy-pouch',
    name: 'Pigglitz Canvas Adventure Pouch',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=500&q=80',
    tag: 'Travel Ready 🎒',
    category: 'wigglitz-pouch',
    description: 'Vibrant, durable pouches to carry your flexible friends wherever you go! Made from heavy-duty canvas.'
  },
  {
    id: 'wigglitz-dragon',
    name: 'Flexi Rainbow Dragon',
    price: 19.99,
    tag: 'Best Seller 🔥',
    category: 'real-time-collectibles',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&q=80',
    description: 'Articulated, wiggly, and printed in gorgeous rainbow gradients. The ultimate fidget companion for little hands and big imaginations!'
  },
  {
    id: 'wigglitz-octopus',
    name: 'Cute Wiggle Octopus',
    price: 12.99,
    tag: 'Super Flexi 🐙',
    category: 'real-time-collectibles',
    image: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?auto=format&fit=crop&w=500&q=80',
    description: 'A super cute, fully articulated wiggle octopus. Perfect for sensory play and desk decoration!'
  },
  {
    id: 'wigglitz-rex',
    name: 'Chomp-O-Saurus Rex',
    price: 15.99,
    tag: 'New Arrival ✨',
    category: 'real-time-collectibles',
    image: 'https://images.unsplash.com/photo-1581579438747-1dc8d1e0ca96?auto=format&fit=crop&w=500&q=80',
    description: 'A fully articulated T-Rex with a chomping jaw! Printed in premium silk filament.'
  }
];

const defaultOrders = [
  {
    id: "ORD-9821",
    userEmail: "connect2rachit882@gmail.com",
    userName: "Rachit",
    date: "Feb 15, 2025",
    status: "Delivered 🚚",
    total: 24.99,
    items: [
      { name: "Flexi-Dragon (Rainbow Edition)", quantity: 1, price: 24.99 }
    ]
  },
  {
    id: "ORD-7742",
    userEmail: "connect2rachit882@gmail.com",
    userName: "Rachit",
    date: "Jan 28, 2025",
    status: "Shipped 📦",
    total: 19.99,
    items: [
      { name: "Pigglitz Classic Toy", quantity: 1, price: 19.99 }
    ]
  }
];

// Initialize localStorage if empty
export const initializeData = () => {
  if (!localStorage.getItem('pigglitz_products')) {
    localStorage.setItem('pigglitz_products', JSON.stringify(defaultProducts));
  }
  if (!localStorage.getItem('pigglitz_orders')) {
    localStorage.setItem('pigglitz_orders', JSON.stringify(defaultOrders));
  }
};

// Products API
export const getProducts = () => {
  initializeData();
  return JSON.parse(localStorage.getItem('pigglitz_products'));
};

export const getProductById = (id) => {
  const products = getProducts();
  return products.find(p => p.id === id) || products[0];
};

export const addProduct = (product) => {
  const products = getProducts();
  const newProduct = {
    ...product,
    id: product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    price: parseFloat(product.price)
  };
  products.push(newProduct);
  localStorage.setItem('pigglitz_products', JSON.stringify(products));
  window.dispatchEvent(new Event('products-updated'));
  return newProduct;
};

export const updateProduct = (updatedProduct) => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === updatedProduct.id);
  if (index !== -1) {
    products[index] = {
      ...updatedProduct,
      price: parseFloat(updatedProduct.price)
    };
    localStorage.setItem('pigglitz_products', JSON.stringify(products));
    window.dispatchEvent(new Event('products-updated'));
    return true;
  }
  return false;
};

export const deleteProduct = (id) => {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);
  localStorage.setItem('pigglitz_products', JSON.stringify(filtered));
  window.dispatchEvent(new Event('products-updated'));
};

// Orders API
export const getOrders = () => {
  initializeData();
  return JSON.parse(localStorage.getItem('pigglitz_orders'));
};

export const addOrder = (order) => {
  const orders = getOrders();
  const newOrder = {
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    status: "Pending ⏳",
    ...order
  };
  orders.unshift(newOrder);
  localStorage.setItem('pigglitz_orders', JSON.stringify(orders));
  window.dispatchEvent(new Event('orders-updated'));
  return newOrder;
};

export const updateOrderStatus = (orderId, status) => {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === orderId);
  if (index !== -1) {
    orders[index].status = status;
    localStorage.setItem('pigglitz_orders', JSON.stringify(orders));
    window.dispatchEvent(new Event('orders-updated'));
    return true;
  }
  return false;
};