import React, { createContext, useContext, useState } from 'react';

// Local Dependencies
import { firestore } from 'src/firebase';
import {
  RestaurantProviderProps,
  RestaurantContextType,
  Restaurant,
} from './types';

/* eslint-disable  @typescript-eslint/no-unused-vars */
export const restaurantContext = createContext<RestaurantContextType>({
  restaurants: [],
  restaurantError: null,
  fetchRestaurants: () => null,
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

export function useRestaurants() {
  return useContext(restaurantContext);
}

// Provider hook that creates auth object and handles state
export function useProvideRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[] | null>([]);
  const [restaurantError, setRestaurantError] = useState<string | null>(null);

  const fetchRestaurants = async () => {
    const restaurantsRef = firestore.collection('restaurants');
    const snapshot = await restaurantsRef.get();
    if (snapshot) {
      const docs = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setRestaurants(docs as Restaurant[]);
    } else {
      setRestaurantError('Could not find restaurants');
    }
  };

  return {
    restaurants,
    restaurantError,
    fetchRestaurants,
  };
}
