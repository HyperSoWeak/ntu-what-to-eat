import { Restaurant } from '@/types/Restaurant';
import { Star, AccessTime, LocationOn, LocalDining } from '@mui/icons-material';

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  const handleOpenMap = () => {
    window.open(restaurant.link, '_blank'); // Open the restaurant's link in a new tab
  };

  return (
    <div className='flex flex-col w-72 m-2 rounded-xl shadow-md bg-white overflow-hidden'>
      {/* Content Area */}
      <div className='p-4 flex flex-col gap-2'>
        {/* Restaurant Name */}
        <div className='flex justify-between'>
          <h3 className='font-bold text-lg text-indigo-600 truncate'>{restaurant.name}</h3>
        </div>

        {/* Rating and Price */}
        <div className='flex justify-between items-center'>
          {/* Rating */}
          <div className='flex items-center'>
            <Star className='text-yellow-500 w-4 h-4' />
            <p className='ml-1 text-sm text-gray-600'>{restaurant.rating} / 5</p>
          </div>

          {/* Price */}
          <p className='text-sm text-gray-600'>{restaurant.price}</p>
        </div>

        {/* Address */}
        <p className='text-sm text-gray-500 mt-1'>{restaurant.address}</p>

        {/* Location */}
        <p className='text-sm text-gray-500 flex items-center'>
          <LocationOn className='text-gray-500 w-4 h-4 mr-1' />
          {restaurant.location}
        </p>

        {/* Divider */}
        <div className='my-2 border-t border-gray-200' />

        {/* Opening Time */}
        <p className='text-sm text-gray-500 flex items-center'>
          <AccessTime className='text-gray-500 w-4 h-4 mr-1' />
          {restaurant.opening_time.map((segment, index) => (
            <span key={index}>
              {segment.start} - {segment.end}
              {index < restaurant.opening_time.length - 1 && ' | '}
            </span>
          ))}
        </p>

        {/* Restaurant Type */}
        <p className='text-sm text-gray-600 flex items-center'>
          <LocalDining className='text-gray-500 w-4 h-4 mr-1' />
          {restaurant.type.join(', ')}
        </p>
      </div>

      {/* Action Button */}
      <div className='p-2 bg-gray-100 text-center'>
        <button
          onClick={handleOpenMap}
          className='w-full py-2 px-4 text-white bg-blue-600 rounded-md text-sm font-medium shadow-md hover:bg-blue-700'
        >
          打開 Google 地圖
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;
