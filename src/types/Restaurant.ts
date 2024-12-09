export interface Restaurant {
  name: string;
  opening_time: { start: string; end: string }[];
  type: string[];
  address: string;
  rating: number;
  price: string;
  location: string;
  link: string;
}
