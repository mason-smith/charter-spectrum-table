import React, { createContext } from 'react';

// Local Dependencies
import { useProvideRestaurants } from './hooks';
import { RestaurantProviderProps, RestaurantContextType } from './types';

export const restaurantContext = createContext<RestaurantContextType>({
  restaurants: [],
  states: [],
  loading: false,
  restaurantError: null,
  fetchRestaurants: () => null,
  fetchStates: () => null,
  nextPage: () => null,
  prevPage: () => null,
});

export function RestaurantProvider({ children }: RestaurantProviderProps) {
  const provideRestaurants = useProvideRestaurants();
  return (
    <restaurantContext.Provider
      /* eslint-disable @typescript-eslint/ban-ts-comment */
      // @ts-ignore
      value={provideRestaurants}
    >
      {children}
    </restaurantContext.Provider>
  );
}
