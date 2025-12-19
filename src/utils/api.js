const LOCAL_API = window.location.hostname === 'localhost' ? 'http://localhost:3001/api' : null;
const RENDER_API = 'https://fooddelivery-backend-gcrf.onrender.com/api';

// Use local API for data, Render for auth and orders
const getApiUrl = (endpoint) => {
  if (endpoint.startsWith('/auth') || endpoint.startsWith('/orders')) {
    return RENDER_API;
  }
  return LOCAL_API || RENDER_API;
};

async function request(path, options = {}) {
  const token = localStorage.getItem("auth_token");
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options.headers || {}),
  };

  try {
    const apiUrl = getApiUrl(path);
    const res = await fetch(`${apiUrl}${path}`, {
      headers,
      ...options,
    });

    let data;
    try {
      data = await res.json();
    } catch (e) {
      data = { error: "Invalid response from server" };
    }
    
    if (!res.ok) {
      const message = data.error || data.message || `Request failed with status ${res.status}`;
      console.error(`API Error [${res.status}]:`, message, data);
      throw new Error(message);
    }
    
    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.error('Network Error: Cannot connect to backend. Is the server running?');
      throw new Error(`Cannot connect to server. Please check if the backend is running at ${apiUrl || 'the configured API endpoint'}`);
    }
    throw error;
  }
}

export const api = {
  // Restaurants
  fetchRestaurants: (search, category) => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (category) params.append("category", category);
    const query = params.toString();
    return request(`/restaurants${query ? `?${query}` : ""}`);
  },
  
  fetchRestaurant: (id) => request(`/restaurants/${id}`),

  // Categories
  fetchCategories: () => request("/categories"),

  // Menu
  fetchMenuByRestaurant: (id) => request(`/menu/restaurant/${id}`),
  fetchMenuItem: (id) => request(`/menu/item/${id}`),

  // Authentication
  login: (email, password) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  signup: (name, email, password) =>
    request("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    }),

  // Cart (optional - can be kept local or synced with backend)
  fetchCart: (userId) => request(`/cart?userId=${userId}`),
  addToCart: (userId, item, restaurantId, restaurantName) =>
    request("/cart/add", {
      method: "POST",
      body: JSON.stringify({ userId, item, restaurantId, restaurantName }),
    }),
  removeFromCart: (userId, itemId, restaurantId) =>
    request("/cart/remove", {
      method: "POST",
      body: JSON.stringify({ userId, itemId, restaurantId }),
    }),
  clearCart: (userId) =>
    request(`/cart/clear?userId=${userId}`, { method: "DELETE" }),

  // Orders
  fetchOrders: (userId) => request(`/orders?userId=${userId}`),
  fetchOrder: (id) => request(`/orders/${id}`),
  createOrder: (orderData) =>
    request("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    }),
};

export { API_BASE_URL };
