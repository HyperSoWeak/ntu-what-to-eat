import { Restaurant } from '@/types/Restaurant';
import { Star, AccessTime, LocationOn, LocalDining } from '@mui/icons-material';

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  const handleOpenMap = () => {
    window.open(restaurant.link, '_blank'); // Open the restaurant's link in a new tab
  };

  return (
    <div className='flex flex-col w-full sm:w-72 md:w-64 lg:w-72 m-2 rounded-2xl shadow-md bg-gradient-to-r from-blue-50 to-white overflow-hidden transform hover:scale-105 transition-all duration-300'>
      {/* Content Area */}
      <div className='p-3 sm:p-4 md:p-5 flex flex-col gap-2'>
        {/* Restaurant Name */}
        <div className='flex justify-between'>
          <h3 className='font-semibold text-base sm:text-lg md:text-xl text-blue-600 truncate'>{restaurant.name}</h3>
        </div>

        {/* Rating and Price */}
        <div className='flex justify-between items-center'>
          {/* Rating */}
          <div className='flex items-center'>
            <Star className='text-yellow-400 w-4 h-4 sm:w-5 sm:h-5' />
            <p className='ml-1 text-xs sm:text-sm text-gray-800'>{restaurant.rating} / 5</p>
          </div>

          {/* Price */}
          <p className='text-xs sm:text-sm text-gray-700'>{restaurant.price}</p>
        </div>

        {/* Address */}
        <p className='text-xs sm:text-sm text-gray-600 mt-1 truncate'>{restaurant.address}</p>

        {/* Location */}
        <p className='text-xs sm:text-sm text-gray-600 flex items-center'>
          <LocationOn className='text-gray-600 w-4 h-4 sm:w-5 sm:h-5 mr-1' />
          {restaurant.location}
        </p>

        {/* Divider */}
        <div className='my-2 border-t border-gray-200' />

        {/* Opening Time */}
        <p className='text-xs sm:text-sm text-gray-600 flex items-center'>
          <AccessTime className='text-gray-600 w-4 h-4 sm:w-5 sm:h-5 mr-1' />
          {restaurant.opening_time.map((segment, index) => (
            <span key={index}>
              {segment.start} - {segment.end}
              {index < restaurant.opening_time.length - 1 && ' | '}
            </span>
          ))}
        </p>

        {/* Restaurant Type */}
        <p className='text-xs sm:text-sm text-gray-700 flex items-center'>
          <LocalDining className='text-gray-600 w-4 h-4 sm:w-5 sm:h-5 mr-1' />
          {restaurant.type.join(', ')}
        </p>
      </div>

      {/* Action Button */}
      <div className='p-3 sm:p-4 bg-blue-50 text-center rounded-b-2xl'>
        <button
          onClick={handleOpenMap}
          className='w-auto py-2 px-4 sm:py-2 sm:px-4 text-white bg-blue-700 rounded-lg text-sm sm:text-base font-medium shadow-md hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-105'
        >
          打開 Google 地圖
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;
