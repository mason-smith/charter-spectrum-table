import { useContext, useState } from 'react';

// Local Dependencies
import firebase, { firestore } from 'src/firebase';
import { uniq } from 'src/utils/uniq';
import { restaurantContext } from './restaurants.context';
import { Restaurant } from './types';

// Provider hook that creates auth object and handles state
export function useProvideRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[] | null>([]);
  const [states, setStates] = useState<string[]>([]);
  const [restaurantError, setRestaurantError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [snap, setSnapshot] = useState<firebase.firestore.QuerySnapshot<
    firebase.firestore.DocumentData
  > | null>(null);
  const restaurantsRef = firestore.collection('restaurants');

  const handleSetRestaurants = (
    snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  ) => {
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

  const fetchRestaurants = async () => {
    setLoading(true);
    const snapshot = await restaurantsRef
      .orderBy('name', 'asc')
      .limit(10)
      .get();
    handleSetRestaurants(snapshot);
  };

  const fetchStates = async () => {
    const snapshot = await restaurantsRef.orderBy('state', 'asc').get();
    if (snapshot) {
      setSnapshot(snapshot);
      const docs = snapshot.docs.map((doc) => {
        return doc.data().state;
      });
      setStates(uniq(docs));
    } else {
      setRestaurantError('Could not find restaurants');
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
    handleSetRestaurants(snapshot);
  };

  const prevPage = async () => {
    const first = snap?.docs[0];
    const snapshot = await restaurantsRef
      .orderBy('name', 'asc')
      // Construct a new query starting at this document.
      .endBefore(first?.data().name)
      .limitToLast(10)
      .get();
    handleSetRestaurants(snapshot);
  };

  return {
    restaurants,
    states,
    loading,
    restaurantError,
    fetchRestaurants,
    fetchStates,
    nextPage,
    prevPage,
  };
}

export function useRestaurants() {
  return useContext(restaurantContext);
}
