import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../utils/api";

function PlaceOrderButton({ cart, total, clearCart }) {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        cart: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          restaurantId: item.restaurantId,
          restaurantName: item.restaurantName,
          veg: item.veg,
          image: item.image
        })),
        deliveryAddress: 'Default Address',
        paymentMethod: 'Cash on Delivery'
      };

      const data = await api.createOrder(orderData);
      alert(`Order placed successfully! Order ID: ${data.order._id}`);
      clearCart();
      navigate('/orders');
    } catch (error) {
      console.error('Order failed:', error);
      alert(`Failed to place order: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePlaceOrder}
      disabled={loading}
      className="w-full bg-swiggy-orange text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium text-lg disabled:opacity-50"
    >
      {loading ? 'Placing Order...' : 'Place Order'}
    </button>
  );
}

export default function Cart() {
  const { cart, addToCart, removeFromCart, clearCart, getTotalPrice } = useCart();
  const { user } = useAuth();
  const total = getTotalPrice();
  const deliveryFee = total > 0 ? 40 : 0;
  const platformFee = total > 0 ? 2 : 0;
  const finalTotal = total + deliveryFee + platformFee;

  // Group items by restaurant
  const groupedCart = cart.reduce((acc, item) => {
    const key = item.restaurantId;
    if (!acc[key]) {
      acc[key] = {
        restaurantName: item.restaurantName || "Unknown Restaurant",
        items: [],
      };
    }
    acc[key].items.push(item);
    return acc;
  }, {});

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="mx-auto h-24 w-24 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add items to your cart to continue</p>
          <Link
            to="/"
            className="inline-block bg-swiggy-orange text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Cart</h1>
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Clear Cart
                  </button>
                )}
              </div>

              {Object.entries(groupedCart).map(([restaurantId, group]) => (
                <div key={restaurantId} className="mb-6 last:mb-0">
                  <h3 className="font-semibold text-gray-800 mb-4 text-lg">
                    {group.restaurantName}
                  </h3>
                  <div className="space-y-4">
                    {group.items.map((item, index) => (
                      <div
                        key={`${item.id}-${index}`}
                        className="flex items-center justify-between p-4 border-b border-gray-200 last:border-0"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            {item.veg ? (
                              <span className="text-green-600 font-bold">🟢</span>
                            ) : (
                              <span className="text-red-600 font-bold">🔴</span>
                            )}
                            <h4 className="font-semibold text-gray-800">{item.name}</h4>
                          </div>
                          {item.description && (
                            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          )}
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => removeFromCart(item.id, item.restaurantId)}
                              className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition-colors"
                            >
                              -
                            </button>
                            <span className="font-semibold text-gray-800 w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => addToCart(item, item.restaurantId, item.restaurantName)}
                              className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition-colors"
                            >
                              +
                            </button>
                            <span className="text-gray-600 ml-4">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg ml-4"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Bill Details</h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Item Total</span>
                  <span>₹{total ? total.toFixed(2) : "0.00"}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Platform Fee</span>
                  <span>₹{platformFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg text-gray-800">
                    <span>Total</span>
                    <span>₹{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <PlaceOrderButton cart={cart} total={finalTotal} clearCart={clearCart} />
              <p className="text-xs text-gray-500 text-center mt-4">
                By placing this order, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
