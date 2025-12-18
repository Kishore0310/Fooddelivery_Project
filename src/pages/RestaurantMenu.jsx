import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../utils/api";
import { useCart } from "../context/CartContext";

export default function RestaurantMenu() {
  const { id } = useParams();
  const { addToCart, removeFromCart, cart } = useCart();
  const restaurantId = parseInt(id);
  const [restaurant, setRestaurant] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [restaurantData, menuData] = await Promise.all([
          api.fetchRestaurant(restaurantId),
          api.fetchMenuByRestaurant(restaurantId),
        ]);
        setRestaurant(restaurantData);
        setItems(menuData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching restaurant data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [restaurantId]);

  const getItemQuantity = (itemId) => {
    const cartItem = cart.find(
      (item) => item.id === itemId && item.restaurantId === restaurantId
    );
    return cartItem ? cartItem.quantity : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">
            {error || "Restaurant not found"}
          </p>
          <Link
            to="/"
            className="text-swiggy-black hover:underline font-medium"
          >
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="bg-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full md:w-64 h-48 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {restaurant.name}
              </h1>
              <p className="text-gray-600 mb-3">{restaurant.cuisine}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-green-600 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                  <span className="font-semibold">{restaurant.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <div>{restaurant.costForTwo}</div>
              </div>
              {restaurant.offers && restaurant.offers.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {restaurant.offers.map((offer, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                    >
                      {offer}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Menu</h2>
        <div className="space-y-6">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center py-12">No menu items available</p>
          ) : (
            items.map((item) => {
              const quantity = getItemQuantity(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {item.veg ? (
                            <span className="text-green-600 font-bold text-lg">🟢</span>
                          ) : (
                            <span className="text-red-600 font-bold text-lg">🔴</span>
                          )}
                          <h3 className="text-xl font-semibold text-gray-800">
                            {item.name}
                          </h3>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">₹{item.price}</p>
                      <p className="text-sm text-gray-500 mb-4">{item.description}</p>
                      
                      {quantity > 0 ? (
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => removeFromCart(item.id, restaurantId)}
                            className="bg-swiggy-black text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                          >
                            -
                          </button>
                          <span className="font-semibold text-gray-800">{quantity}</span>
                          <button
                            onClick={() => addToCart(item, restaurantId, restaurant.name)}
                            className="bg-swiggy-black text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item, restaurantId, restaurant.name)}
                          className="bg-swiggy-black text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                    {item.image && (
                      <div className="w-32 h-32 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
