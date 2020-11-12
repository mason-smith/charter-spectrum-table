import React from 'react';
import { Link } from 'react-router-dom';
import { AuthButton } from '../AuthButton';

export const DesktopLinks = () => {
  return (
    <div className="hidden md:block md:ml-10 md:pr-4">
      <Link
        to="/"
        className="ml-8 font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
      >
        Home
      </Link>
      <Link
        to="/dashboard"
        className="ml-8 font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
      >
        Dashboard
      </Link>

      <AuthButton styles="ml-8 font-medium text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out" />
    </div>
  );
};
