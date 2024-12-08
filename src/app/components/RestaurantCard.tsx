import { Card, CardContent, CardActions, Typography, Button, Box, Divider } from '@mui/material';
import { Star, LocalDining, AccessTime } from '@mui/icons-material';

interface Restaurant {
  name: string;
  opening_time: { start: string; end: string }[];
  type: string[];
  address: string;
  rating: number;
  price: string;
}

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2, borderRadius: 2, boxShadow: 3, overflow: 'hidden' }}>
      <CardContent>
        {/* Restaurant Name and Address */}
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
          {restaurant.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {restaurant.address}
        </Typography>

        <Divider sx={{ mb: 1 }} />

        {/* Restaurant Type and Price */}
        <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            <LocalDining sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
            {restaurant.type.join(', ')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {restaurant.price}
          </Typography>
        </Box>

        {/* Rating */}
        <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
          <Star sx={{ color: '#fbc02d', fontSize: 18 }} />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
            {restaurant.rating} / 5
          </Typography>
        </Box>

        {/* Opening Time */}
        <Typography variant="body2" color="text.secondary">
          <AccessTime sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
          {restaurant.opening_time.map((segment, index) => (
            <span key={index}>
              {segment.start} - {segment.end}
              {index < restaurant.opening_time.length - 1 && ' | '}
            </span>
          ))}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" variant="contained" color="primary" sx={{ width: '100%' }}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default RestaurantCard;
