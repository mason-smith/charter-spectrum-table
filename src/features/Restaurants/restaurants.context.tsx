import React, { createContext, useContext, useState } from 'react';

// Local Dependencies
import firebase, { firestore } from 'src/firebase';
import {
  RestaurantProviderProps,
  RestaurantContextType,
  Restaurant,
} from './types';

export const restaurantContext = createContext<RestaurantContextType>({
  restaurants: [],
  loading: false,
  restaurantError: null,
  fetchRestaurants: () => null,
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

export function useRestaurants() {
  return useContext(restaurantContext);
}

// Provider hook that creates auth object and handles state
export function useProvideRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[] | null>([]);
  const [restaurantError, setRestaurantError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [snap, setSnapshot] = useState<firebase.firestore.QuerySnapshot<
    firebase.firestore.DocumentData
  > | null>(null);
  const restaurantsRef = firestore.collection('restaurants');

  const fetchRestaurants = async () => {
    setLoading(true);
    const snapshot = await restaurantsRef
      .orderBy('name', 'asc')
      .limit(10)
      .get();
    if (snapshot) {
      setSnapshot(snapshot);
      const docs = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setRestaurants(docs as Restaurant[]);
      setLoading(false);
    } else {
      setRestaurantError('Could not find restaurants');
      setLoading(false);
    }
  };

  const nextPage = async () => {
    const last = snap?.docs[snap?.docs.length - 1];
    const snapshot = await restaurantsRef
      .orderBy('name', 'asc')
      // Construct a new query starting at this document.
      .startAfter(last?.data().name)
      .limit(10)
      .get();
    if (snapshot) {
      setSnapshot(snapshot);
      const docs = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setRestaurants(docs as Restaurant[]);
      setLoading(false);
    } else {
      setRestaurantError('Could not find restaurants');
      setLoading(false);
    }
  };
  const prevPage = async () => {
    const first = snap?.docs[0];
    const snapshot = await restaurantsRef
      .orderBy('name', 'asc')
      // Construct a new query starting at this document.
      .endBefore(first?.data().name)
      .limitToLast(10)
      .get();
    if (snapshot) {
      setSnapshot(snapshot);
      const docs = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setRestaurants(docs as Restaurant[]);
      setLoading(false);
    } else {
      setRestaurantError('Could not find restaurants');
      setLoading(false);
    }
  };

  return {
    restaurants,
    loading,
    restaurantError,
    fetchRestaurants,
    nextPage,
    prevPage,
  };
}
