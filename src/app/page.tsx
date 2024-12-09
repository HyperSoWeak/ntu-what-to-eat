'use client';

import { useState, useEffect } from 'react';
import RestaurantCard from '@/components/RestaurantCard';
import { Restaurant } from '@/types/Restaurant';
import config from '@/../next.config';

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [randomRestaurant, setRandomRestaurant] = useState<Restaurant | null>(null); // State for random restaurant

  // Filters
  const [selectedType, setSelectedType] = useState<string>('不限');
  const [selectedPrice, setSelectedPrice] = useState<string>('不限');
  const [selectedLocation, setSelectedLocation] = useState<string>('不限');
  const [isOpenNow, setIsOpenNow] = useState<boolean>(false);

  // Sorting
  const [sortCriteria, setSortCriteria] = useState<string>('none');

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await fetch(`${config.basePath}/restaurants.json`);
      const data = await response.json();
      setRestaurants(data);
      setFilteredRestaurants(data);
    };

    fetchRestaurants();
  }, []);

  const handleFilterChange = () => {
    let filtered = restaurants;

    // Filter by type
    if (selectedType !== '不限') {
      filtered = filtered.filter((restaurant) => restaurant.type.includes(selectedType));
    }

    // Filter by price range
    if (selectedPrice !== '不限') {
      filtered = filtered.filter((restaurant) => {
        const [minSelectedPrice, maxSelectedPrice] = [0, parseInt(selectedPrice)];
        const { low, high } = restaurant.price;
        return low < maxSelectedPrice && (high ? high >= minSelectedPrice : true);
      });
    }

    // Filter by location
    if (selectedLocation !== '不限') {
      filtered = filtered.filter((restaurant) => restaurant.location === selectedLocation);
    }

    // Filter by whether it's open now
    if (isOpenNow) {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();
      const currentTimeInMinutes = currentHour * 60 + currentMinute;

      filtered = filtered.filter((restaurant) => {
        return restaurant.opening_time.some((timeSlot) => {
          const [startHour, startMinute] = timeSlot.start.split(':').map(Number);
          const [endHour, endMinute] = timeSlot.end.split(':').map(Number);

          const startTimeInMinutes = startHour * 60 + startMinute;
          const endTimeInMinutes = endHour * 60 + endMinute;

          return currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes;
        });
      });
    }

    // Sort the filtered restaurants
    if (sortCriteria === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortCriteria === 'price') {
      filtered.sort((a, b) => a.price.low - b.price.low);
    }

    setFilteredRestaurants(filtered);
    setRandomRestaurant(null);
  };

  // Function to select a random restaurant
  const handleDecideForMe = () => {
    const randomIndex = Math.floor(Math.random() * filteredRestaurants.length);
    const selected = filteredRestaurants[randomIndex];
    setRandomRestaurant(selected);
  };

  return (
    <div className='container mx-auto px-4 mt-6'>
      {/* Header Section */}
      <div className='mt-8 mb-4 text-center'>
        <h1 className='text-4xl sm:text-5xl font-bold text-blue-600 tracking-wide'>NTU What To Eat</h1>
        <p className='mt-2 text-base sm:text-lg text-gray-600'>Discover your next meal at NTU</p>
      </div>

      {/* Version and Information */}
      <div className='mb-6 text-center text-sm text-gray-500'>
        <p>Version: 1.0.0</p>
        <p>Last Update: 2024-12-09</p>
        <p>
          Made by:{' '}
          <a href='https://github.com/HyperSoWeak' target='_blank' className='text-blue-500 hover:underline'>
            HyperSoWeak
          </a>
        </p>
      </div>

      {/* Filters Section */}
      <div className='flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-8'>
        {/* Type Filter */}
        <div className='w-full sm:w-40'>
          <label htmlFor='type' className='block text-sm font-medium text-gray-700'>
            類型
          </label>
          <select
            id='type'
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className='mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
          >
            <option value='不限'>不限</option>
            <option value='早餐'>早餐</option>
            <option value='午餐'>午餐</option>
            <option value='晚餐'>晚餐</option>
            <option value='點心'>點心</option>
            <option value='宵夜'>宵夜</option>
          </select>
        </div>

        {/* Price Filter */}
        <div className='w-full sm:w-40'>
          <label htmlFor='price' className='block text-sm font-medium text-gray-700'>
            價格低於
          </label>
          <select
            id='price'
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className='mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
          >
            <option value='不限'>不限</option>
            <option value='100'>$100</option>
            <option value='200'>$200</option>
            <option value='400'>$400</option>
            <option value='600'>$600</option>
          </select>
        </div>

        {/* Location Filter */}
        <div className='w-full sm:w-40'>
          <label htmlFor='location' className='block text-sm font-medium text-gray-700'>
            位置
          </label>
          <select
            id='location'
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className='mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
          >
            <option value='不限'>不限</option>
            <option value='校內'>校內</option>
            <option value='118巷'>118巷</option>
            <option value='公館'>公館</option>
            <option value='溫州街'>溫州街</option>
          </select>
        </div>

        {/* Open Now Checkbox */}
        <div className='flex items-center'>
          <label className='inline-flex items-center mt-3'>
            <input
              type='checkbox'
              checked={isOpenNow}
              onChange={(e) => setIsOpenNow(e.target.checked)}
              className='form-checkbox h-4 w-4 text-blue-600'
            />
            <span className='ml-2 text-sm text-gray-700'>營業中</span>
          </label>
        </div>

        {/* Sort Filter */}
        <div className='w-full sm:w-40'>
          <label htmlFor='sort' className='block text-sm font-medium text-gray-700'>
            排序
          </label>
          <select
            id='sort'
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
            className='mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
          >
            <option value='none'>無</option>
            <option value='rating'>評價</option>
            <option value='price'>價格</option>
          </select>
        </div>

        {/* Search Button */}
        <div className='flex items-end w-full sm:w-auto'>
          <button
            onClick={handleFilterChange}
            className='w-full sm:w-auto py-3 px-6 text-white bg-blue-600 rounded-lg text-lg font-medium shadow-lg hover:bg-blue-700 transition duration-200 ease-in-out'
          >
            查詢
          </button>
        </div>

        {/* Decide for me Button */}
        <div className='flex items-end w-full sm:w-auto'>
          <button
            onClick={handleDecideForMe}
            className='w-full sm:w-auto py-3 px-6 text-white bg-green-600 rounded-lg text-lg font-medium shadow-lg hover:bg-green-700 transition duration-200 ease-in-out mt-4'
          >
            幫我選
          </button>
        </div>
      </div>

      {/* Restaurant List */}
      <div className='flex flex-wrap justify-center gap-4'>
        {randomRestaurant ? (
          <RestaurantCard key={randomRestaurant.name} restaurant={randomRestaurant} />
        ) : (
          filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.name} restaurant={restaurant} />
          ))
        )}
      </div>
    </div>
  );
}
