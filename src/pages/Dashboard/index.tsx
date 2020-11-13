import React, { useEffect } from 'react';
import { useRestaurants } from 'src/features/Restaurants/restaurants.context';

export const Dashboard = () => {
  const { restaurants, fetchRestaurants } = useRestaurants();
  useEffect(() => {
    // Only fetch restaurants if there are none
    // In our context
    if (!restaurants.length) {
      fetchRestaurants();
    }
  }, [restaurants]);

  console.log('restaurants :>> ', restaurants);

  return (
    <div className="max-w-md mx-auto flex p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
      <div className="ml-6 pt-1">
        <h1 className="text-2xl text-blue-700 leading-tight">Dashboard</h1>
        <p className="text-base text-gray-700 leading-normal">
          Building apps together
        </p>
      </div>
    </div>
  );
};
