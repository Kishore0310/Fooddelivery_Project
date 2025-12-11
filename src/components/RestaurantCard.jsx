import { Link } from "react-router-dom";

export default function RestaurantCard({ restaurant }) {
  return (
    <Link to={`/restaurant/${restaurant.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer">
        {/* Restaurant Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
          {restaurant.promoted && (
            <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
              Promoted
            </div>
          )}
          {restaurant.offers && restaurant.offers.length > 0 && (
            <div className="absolute bottom-2 left-2 bg-swiggy-orange text-white text-xs px-2 py-1 rounded font-medium">
              {restaurant.offers[0]}
            </div>
          )}
        </div>

        {/* Restaurant Info */}
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-800 mb-1 truncate">{restaurant.name}</h3>
          <p className="text-sm text-gray-600 mb-2 truncate">{restaurant.cuisine}</p>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-3">
              {/* Rating */}
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-green-600 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
                <span className="font-semibold text-gray-800">{restaurant.rating}</span>
              </div>
              
              {/* Delivery Time */}
              <div className="flex items-center space-x-1 text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{restaurant.deliveryTime}</span>
              </div>
            </div>
            
            {/* Cost for Two */}
            <div className="text-gray-600">
              {restaurant.costForTwo}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
