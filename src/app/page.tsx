'use client';

import { useState, useEffect } from 'react';
import RestaurantCard from '@/components/RestaurantCard';
import { Restaurant } from '@/types/Restaurant';

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [selectedType, setSelectedType] = useState<string>('全部');
  const [selectedPrice, setSelectedPrice] = useState<string>('全部');

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
      filtered = filtered.filter((restaurant) => restaurant.type.includes(selectedType));
    }

    if (selectedPrice !== '全部') {
      filtered = filtered.filter((restaurant) => restaurant.price === selectedPrice);
    }

    setFilteredRestaurants(filtered);
  };

  return (
    <div className='container mx-auto px-4 mt-6'>
      {/* Header */}
      <div className='mb-6 text-center'>
        <h1 className='text-4xl sm:text-5xl font-bold text-blue-600 tracking-wide'>NTU What To Eat</h1>
        <p className='mt-2 text-base sm:text-lg text-gray-600'>Discover your next meal at NTU</p>
      </div>

      {/* Filters Section */}
      <div className='flex flex-col sm:flex-row justify-center gap-6 mb-8'>
        {/* Type Filter */}
        <div className='w-full sm:w-56'>
          <label htmlFor='type' className='block text-sm font-medium text-gray-700'>
            Type
          </label>
          <select
            id='type'
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className='mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
          >
            <option value='全部'>全部</option>
            <option value='早餐'>早餐</option>
            <option value='午餐'>午餐</option>
            <option value='晚餐'>晚餐</option>
            <option value='點心'>點心</option>
            <option value='宵夜'>宵夜</option>
          </select>
        </div>

        {/* Price Filter */}
        <div className='w-full sm:w-56'>
          <label htmlFor='price' className='block text-sm font-medium text-gray-700'>
            Price
          </label>
          <select
            id='price'
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className='mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
          >
            <option value='全部'>全部</option>
            <option value='$'>$$</option>
            <option value='$$'>$$$</option>
            <option value='$$$'>$$$$</option>
          </select>
        </div>

        {/* Apply Filters Button */}
        <div className='flex items-end w-full sm:w-auto'>
          <button
            onClick={handleFilterChange}
            className='w-full py-3 px-6 text-white bg-blue-600 rounded-lg text-lg font-medium shadow-lg hover:bg-blue-700 transition duration-200 ease-in-out'
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Restaurant List */}
      <div className='flex flex-wrap justify-center gap-4'>
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.name} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}
