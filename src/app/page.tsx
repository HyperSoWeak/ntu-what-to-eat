'use client';

import { useState, useEffect } from 'react';
import RestaurantCard from '@/components/RestaurantCard';
import { Restaurant } from '@/types/Restaurant';

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await fetch('/restaurants.json');
      const data = await response.json();
      setRestaurants(data);
      setFilteredRestaurants(data);
    };

    fetchRestaurants();
  }, []);

  const handleFilterChange = () => {
    let filtered = restaurants;

    if (selectedType !== '全部') {
      filtered = filtered.filter((restaurant) =>
        restaurant.type.includes(selectedType)
      );
    }

    if (selectedPrice !== '全部') {
      filtered = filtered.filter((restaurant) => restaurant.price === selectedPrice);
    }

    setFilteredRestaurants(filtered);
  };

  return (
    <div className="container mx-auto mt-4">
      {/* Header */}
      <div className="mb-4 text-center">
        <h1 className="text-4xl font-bold text-indigo-600">NTU What To Eat</h1>
      </div>

      {/* Filters Section */}
      <div className="flex justify-center gap-4 mb-6">
        {/* Type Filter */}
        <div className="w-56">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
          <select
            id="type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="全部">全部</option>
            <option value="早餐">早餐</option>
            <option value="午餐">午餐</option>
            <option value="晚餐">晚餐</option>
            <option value="點心">點心</option>
            <option value="宵夜">宵夜</option>
          </select>
        </div>

        {/* Price Filter */}
        <div className="w-56">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <select
            id="price"
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="全部">全部</option>
            <option value="$">$$</option>
            <option value="$$">$$$</option>
            <option value="$$$">$$$$</option>
          </select>
        </div>

        {/* Apply Filters Button */}
        <div className="flex items-end">
          <button
            onClick={handleFilterChange}
            className="w-full py-2 px-4 text-white bg-blue-600 rounded-md text-sm font-medium shadow-md hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Restaurant List */}
      <div className="flex flex-wrap justify-start gap-4">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.name} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}
