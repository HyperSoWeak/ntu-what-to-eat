import { Restaurant } from '@/types/Restaurant';
import { Star, AccessTime, LocationOn, LocalDining } from '@mui/icons-material';

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <div className='flex flex-col w-full sm:w-72 md:w-64 lg:w-72 m-2 rounded-xl shadow-md bg-slate-50 overflow-hidden transform hover:scale-105 transition-all duration-300'>
      {/* Content Area */}
      <div className='p-4 sm:p-5 flex flex-col gap-2'>
        {/* Restaurant Name */}
        <div className='flex justify-between'>
          <h3 className='font-semibold text-base sm:text-xl text-blue-600 truncate'>{restaurant.name}</h3>
        </div>

        {/* Address */}
        <a
          className='text-xs sm:text-sm text-gray-600 mt-1 truncate transition-colors duration-200 ease-in-out hover:text-blue-500'
          href={restaurant.link}
        >
          {restaurant.address}
        </a>

        {/* Divider */}
        <div className='my-2 border-t border-gray-200' />

        {/* Rating and Price */}
        <div className='flex justify-between items-center'>
          {/* Rating */}
          <div className='flex items-center'>
            <Star className='text-yellow-400 w-4 h-4 sm:w-5 sm:h-5' />
            <p className='ml-1 text-xs sm:text-sm text-gray-800'>{restaurant.rating} / 5</p>
          </div>

          {/* Price */}
          <p className='text-xs sm:text-sm text-gray-700'>
            ${restaurant.price.low}
            {restaurant.price.high && ` - $${restaurant.price.high}`}
            {!restaurant.price.high && '+'}
          </p>
        </div>

        {/* Type and Location */}
        <div className='flex justify-between items-center'>
          {/* Restaurant Type */}
          <p className='text-xs sm:text-sm text-gray-700 flex items-center'>
            <LocalDining className='text-gray-600 w-4 h-4 sm:w-5 sm:h-5 mr-1' />
            {restaurant.type.join(', ')}
          </p>
          {/* Location */}
          <p className='text-xs sm:text-sm text-gray-600 flex items-center'>
            <LocationOn className='text-gray-600 w-4 h-4 sm:w-5 sm:h-5 mr-1' />
            {restaurant.location}
          </p>
        </div>

        {/* Opening Time */}
        <p className='text-xs sm:text-sm text-gray-600 flex items-center'>
          <AccessTime className='text-gray-600 w-4 h-4 sm:w-5 sm:h-5 mr-1' />
          {restaurant.opening_time.map((segment, index) => (
            <span key={index}>
              {segment.start} - {segment.end}
              {index < restaurant.opening_time.length - 1 && <span>&nbsp;•&nbsp;</span>}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default RestaurantCard;
