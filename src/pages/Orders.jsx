export default function Orders() {
  // Mock order data
  const orders = [
    {
      id: 1,
      restaurantName: "Domino's Pizza",
      items: ["Margherita Pizza", "Garlic Bread"],
      total: 298,
      date: "2024-01-15",
      status: "Delivered",
    },
    {
      id: 2,
      restaurantName: "Burger King",
      items: ["Whopper Burger", "French Fries"],
      total: 298,
      date: "2024-01-14",
      status: "Delivered",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Orders</h1>
        
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="text-gray-600 text-lg">No orders yet</p>
            <p className="text-gray-500 mt-2">Start ordering to see your order history here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      {order.restaurantName}
                    </h3>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="mb-4">
                  <p className="text-gray-600 mb-2">
                    {order.items.join(", ")}
                  </p>
                  <p className="font-semibold text-gray-800">₹{order.total}</p>
                </div>
                <button className="text-swiggy-orange hover:underline font-medium">
                  Reorder
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
