import { Restaurant } from '@/types/Restaurant';

interface FilterCriteria {
  selectedType: string;
  selectedPrice: string;
  selectedLocation: string;
  isOpenNow: boolean;
  sortCriteria: string;
}

export const filterRestaurants = (
  restaurants: Restaurant[],
  { selectedType, selectedPrice, selectedLocation, isOpenNow, sortCriteria }: FilterCriteria
): Restaurant[] => {
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
    const currentTimeInMinutesMidnight = currentTimeInMinutes + 24 * 60;

    filtered = filtered.filter((restaurant) => {
      return restaurant.opening_time.some((timeSlot) => {
        const [startHour, startMinute] = timeSlot.start.split(':').map(Number);
        const [endHour, endMinute] = timeSlot.end.split(':').map(Number);

        const startTimeInMinutes = startHour * 60 + startMinute;
        const endTimeInMinutes = endHour * 60 + endMinute;

        return (
          (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes) ||
          (currentTimeInMinutesMidnight >= startTimeInMinutes && currentTimeInMinutesMidnight < endTimeInMinutes)
        );
      });
    });
  }

  // Sort the filtered restaurants
  const sortedRestaurants = [...filtered];

  if (sortCriteria === 'rating') {
    sortedRestaurants.sort((a, b) => b.rating - a.rating);
  } else if (sortCriteria === 'price') {
    sortedRestaurants.sort((a, b) => a.price.low - b.price.low);
  }

  return sortedRestaurants;
};
