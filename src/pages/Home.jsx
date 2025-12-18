import { useState, useEffect } from "react";
import RestaurantCard from "../components/RestaurantCard";
import { api } from "../utils/api";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch restaurants and categories on mount and when filters change
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch categories once
        if (foodCategories.length === 0) {
          const categories = await api.fetchCategories();
          setFoodCategories(categories);
        }
        
        // Fetch restaurants with filters
        const filtered = await api.fetchRestaurants(search, selectedCategory);
        setRestaurants(filtered);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="bg-gradient-to-r from-swiggy-yellow to-yellow-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Hunger knocking? Order now!
            </h1>
            <p className="text-xl opacity-90">
              Order food from favorite restaurants near you
            </p>
          </div>

          
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for restaurants and food..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-6 py-4 pl-12 rounded-lg text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-white"
              />
              <svg 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Food Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">What's on your mind?</h2>
        {loading && foodCategories.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading categories...</p>
          </div>
        ) : (
          <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            {foodCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                className={`flex flex-col items-center space-y-2 min-w-[100px] p-4 rounded-lg transition-all ${
                  selectedCategory === category.name
                    ? "bg-swiggy-yellow text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                }`}
              >
                <span className="text-4xl">{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Restaurants Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedCategory ? `${selectedCategory} Restaurants` : "Top Restaurants"}
          </h2>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-swiggy-orange hover:underline text-sm font-medium"
            >
              Clear filter
            </button>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading restaurants...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-swiggy-orange hover:underline text-sm font-medium"
            >
              Retry
            </button>
          </div>
        ) : restaurants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No restaurants found. Try a different search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
