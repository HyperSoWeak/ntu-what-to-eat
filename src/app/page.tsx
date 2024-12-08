'use client';

import { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import RestaurantCard from './components/RestaurantCard';

interface Restaurant {
  name: string;
  opening_time: { start: string; end: string }[];
  type: string[];
  address: string;
  rating: number;
  price: string;
}

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
    <Container sx={{ marginTop: 4 }}>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h4" component="h1" align="center" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
          NTU What To Eat
        </Typography>
      </Box>

      {/* Filters Section */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 3 }}>
        <FormControl sx={{ width: 200 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={selectedType}
            label="Type"
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <MenuItem value="全部">全部</MenuItem>
            <MenuItem value="早餐">早餐</MenuItem>
            <MenuItem value="午餐">午餐</MenuItem>
            <MenuItem value="晚餐">晚餐</MenuItem>
            <MenuItem value="點心">點心</MenuItem>
            <MenuItem value="宵夜">宵夜</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ width: 200 }}>
          <InputLabel>Price</InputLabel>
          <Select
            value={selectedPrice}
            label="Price"
            onChange={(e) => setSelectedPrice(e.target.value)}
          >
            <MenuItem value="全部">全部</MenuItem>
            <MenuItem value="$$">$$</MenuItem>
            <MenuItem value="$$$">$$$</MenuItem>
            <MenuItem value="$$$$">$$$$</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleFilterChange}>
          Apply Filters
        </Button>
      </Box>

      {/* Restaurant List */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.name} restaurant={restaurant} />
        ))}
      </Box>
    </Container>
  );
}
