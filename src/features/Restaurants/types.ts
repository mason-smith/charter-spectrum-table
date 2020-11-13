import { ReactNode } from 'react';

// Local Dependencies

export type RestaurantProviderProps = {
  children: ReactNode;
};

export type Restaurant = {
  id: string;
  name: string;
  address1: string;
  city: string;
  state: string;
  zip: string;
  lat: string;
  long: string;
  telephone: string;
  tags: string;
  website: string;
  genre: string;
  hours: string;
  attire: string;
};

export type RestaurantContextType = {
  restaurants: Restaurant[];
  restaurantError: string | null;
  fetchRestaurants: () => void;
};
