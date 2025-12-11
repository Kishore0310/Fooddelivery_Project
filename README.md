# Swiggy Clone - Food Delivery App

A beautiful frontend clone of Swiggy, India's popular food delivery platform. Built with React, Vite, and Tailwind CSS.

## Features

- 🏠 **Home Page** - Browse restaurants with search and category filters
- 🍕 **Restaurant Menu** - View detailed menus with add to cart functionality
- 🛒 **Shopping Cart** - Manage cart items with quantity controls
- 📦 **Order History** - View past orders
- 🎨 **Modern UI** - Beautiful, responsive design inspired by Swiggy
- 📱 **Mobile Friendly** - Works seamlessly on all devices

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Context API** - State management

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── Navbar.jsx
│   └── RestaurantCard.jsx
├── context/          # React Context for state
│   └── CartContext.jsx
├── pages/            # Page components
│   ├── Home.jsx
│   ├── RestaurantMenu.jsx
│   ├── Cart.jsx
│   └── Orders.jsx
├── utils/            # Utility files
│   └── data.js       # Mock data
├── App.jsx           # Main app component
└── main.jsx          # Entry point
```

## Features in Detail

### Home Page
- Hero section with search functionality
- Food category filters
- Restaurant grid with ratings, delivery time, and offers
- Responsive design

### Restaurant Menu
- Detailed restaurant information
- Menu items with images and descriptions
- Add/remove items with quantity controls
- Veg/Non-veg indicators

### Shopping Cart
- Group items by restaurant
- Quantity management
- Bill breakdown (item total, delivery fee, platform fee)
- Place order functionality

### Order History
- View past orders
- Order status tracking
- Reorder functionality

## Mock Data

The app uses mock data stored in `src/utils/data.js`. You can easily modify this file to add more restaurants, menu items, or categories.

## Notes

- This is a frontend-only application with no backend
- All data is stored in memory (cart resets on page refresh)
- Images are loaded from Unsplash (placeholder images)

## License

This project is for educational purposes only.
