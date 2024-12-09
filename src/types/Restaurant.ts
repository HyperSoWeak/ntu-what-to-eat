export interface Restaurant {
  name: string;
  opening_time: { start: string; end: string }[];
  type: string[];
  address: string;
  rating: number;
  price: { low: number; high?: number };
  location: string;
  link: string;
}
