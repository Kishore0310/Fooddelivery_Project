export const restaurants = [
  {
    "id": 1,
    "name": "Domino's Pizza",
    "cuisine": "Pizza, Fast Food",
    "rating": 4.2,
    "deliveryTime": "30-40 mins",
    "costForTwo": "₹400 for two",
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    "offers": [
      "50% off up to ₹100",
      "Free delivery"
    ],
    "promoted": true
  },
  {
    "id": 2,
    "name": "Burger King",
    "cuisine": "Burgers, American",
    "rating": 4.3,
    "deliveryTime": "25-35 mins",
    "costForTwo": "₹350 for two",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    "offers": [
      "Buy 1 Get 1 Free"
    ],
    "promoted": false
  },
  {
    "id": 3,
    "name": "Paradise Biryani",
    "cuisine": "Biryani, Hyderabadi",
    "rating": 4.5,
    "deliveryTime": "35-45 mins",
    "costForTwo": "₹500 for two",
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop",
    "offers": [
      "20% off on orders above ₹300"
    ],
    "promoted": true
  },
  {
    "id": 4,
    "name": "Mainland China",
    "cuisine": "Chinese, Asian",
    "rating": 4.4,
    "deliveryTime": "40-50 mins",
    "costForTwo": "₹600 for two",
    "image": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=300&fit=crop",
    "offers": [
      "Free dessert on orders above ₹500"
    ],
    "promoted": false
  },
  {
    "id": 5,
    "name": "Baskin Robbins",
    "cuisine": "Ice Cream, Desserts",
    "rating": 4.6,
    "deliveryTime": "20-30 mins",
    "costForTwo": "₹300 for two",
    "image": "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
    "offers": [
      "Buy 2 Get 1 Free"
    ],
    "promoted": false
  },
  {
    "id": 6,
    "name": "Saravana Bhavan",
    "cuisine": "South Indian, Vegetarian",
    "rating": 4.3,
    "deliveryTime": "25-35 mins",
    "costForTwo": "₹250 for two",
    "image": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
    "offers": [
      "10% off on first order"
    ],
    "promoted": false
  },
  {
    "id": 7,
    "name": "KFC",
    "cuisine": "Fast Food, Chicken",
    "rating": 4.1,
    "deliveryTime": "30-40 mins",
    "costForTwo": "₹450 for two",
    "image": "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
    "offers": [
      "Combo meals starting at ₹199"
    ],
    "promoted": true
  },
  {
    "id": 8,
    "name": "Haldiram's",
    "cuisine": "North Indian, Sweets",
    "rating": 4.4,
    "deliveryTime": "35-45 mins",
    "costForTwo": "₹400 for two",
    "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
    "offers": [
      "Free sweets on orders above ₹500"
    ],
    "promoted": false
  },
  {
    "id": 9,
    "name": "McDonald's",
    "cuisine": "Fast Food, Burgers",
    "rating": 4,
    "deliveryTime": "20-30 mins",
    "costForTwo": "₹350 for two",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    "offers": [
      "Happy Meal combos"
    ],
    "promoted": false
  },
  {
    "id": 10,
    "name": "Pizza Hut",
    "cuisine": "Pizza, Italian",
    "rating": 4.2,
    "deliveryTime": "30-40 mins",
    "costForTwo": "₹450 for two",
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    "offers": [
      "50% off on large pizzas"
    ],
    "promoted": true
  }
];

export const categories = [
  { id: 1, name: "Pizza", icon: "🍕" },
  { id: 2, name: "Burgers", icon: "🍔" },
  { id: 3, name: "Biryani", icon: "🍛" },
  { id: 4, name: "Chinese", icon: "🥡" },
  { id: 5, name: "Desserts", icon: "🍰" },
  { id: 6, name: "South Indian", icon: "🥘" },
  { id: 7, name: "Fast Food", icon: "🍟" },
  { id: 8, name: "North Indian", icon: "🍜" }
];

export const menuItems = [
  { id: 1, name: "Margherita Pizza", price: 199, description: "Classic pizza with tomato and mozzarella", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop", veg: true, restaurantId: 1 },
  { id: 2, name: "Pepperoni Pizza", price: 249, description: "Spicy pepperoni with cheese", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&h=200&fit=crop", veg: false, restaurantId: 1 },
  { id: 3, name: "Whopper Burger", price: 179, description: "Flame-grilled beef burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop", veg: false, restaurantId: 2 },
  { id: 4, name: "Veg Burger", price: 149, description: "Crispy veggie patty burger", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200&h=200&fit=crop", veg: true, restaurantId: 2 },
  { id: 5, name: "Chicken Biryani", price: 299, description: "Aromatic basmati rice with chicken", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200&h=200&fit=crop", veg: false, restaurantId: 3 },
  { id: 6, name: "Veg Biryani", price: 249, description: "Fragrant rice with mixed vegetables", image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=200&h=200&fit=crop", veg: true, restaurantId: 3 },
  { id: 7, name: "Hakka Noodles", price: 189, description: "Stir-fried noodles with vegetables", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=200&h=200&fit=crop", veg: true, restaurantId: 4 },
  { id: 8, name: "Chilli Chicken", price: 229, description: "Spicy chicken in Chinese sauce", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=200&h=200&fit=crop", veg: false, restaurantId: 4 },
  { id: 9, name: "Vanilla Ice Cream", price: 99, description: "Classic vanilla flavor", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&h=200&fit=crop", veg: true, restaurantId: 5 },
  { id: 10, name: "Chocolate Sundae", price: 149, description: "Rich chocolate with toppings", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200&h=200&fit=crop", veg: true, restaurantId: 5 }
];