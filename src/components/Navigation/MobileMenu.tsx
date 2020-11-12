import React from 'react';
import { Link } from 'react-router-dom';

// Local Dependencies
import { AuthButton } from '../AuthButton';
import { NavProps } from './types';

export const MobileMenu = (props: NavProps) => {
  const { onClick } = props;
  return (
    <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
      <div className="rounded-lg shadow-md">
        <div
          className="rounded-lg bg-white shadow-xs overflow-hidden"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="main-menu"
        >
          <div className="px-5 pt-4 flex items-center justify-between">
            <div>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/v1/workflow-mark-on-white.svg"
                alt=""
              />
            </div>
            <div className="-mr-2">
              <button
                onClick={onClick}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                aria-label="Close menu"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="px-2 pt-2 pb-3">
            <Link
              onClick={onClick}
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
              role="menuitem"
            >
              Home
            </Link>
            <Link
              onClick={onClick}
              to="/dashboard"
              className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
              role="menuitem"
            >
              Dashboard
            </Link>
          </div>
          <div>
            <AuthButton
              onClick={onClick}
              styles="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100 hover:text-indigo-700 focus:outline-none focus:bg-gray-100 focus:text-indigo-700 transition duration-150 ease-in-out"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
