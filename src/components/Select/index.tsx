/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

// tailwind dependencies
import { Transition } from '@tailwindui/react';

type SelectProps = {
  label: string;
  options: string[];
};

export const Select = (props: SelectProps) => {
  const { label, options } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('All');

  const handleClick = (option: string) => {
    setIsOpen(false);
    setValue(option);
  };

  return (
    <div className="space-y-1 w-full">
      <label
        id="listbox-label"
        htmlFor="listbox-label"
        className="block text-sm leading-5 font-medium text-gray-700"
      >
        {label}
        <div className="relative">
          <span className="inline-block w-full rounded-md shadow-sm">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              aria-haspopup="listbox"
              aria-expanded="true"
              aria-labelledby="listbox-label"
              className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              <div className="flex items-center space-x-3">
                <span className="block truncate">{value}</span>
              </div>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </span>
          <Transition
            show={isOpen}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg">
              <ul
                tabIndex={-1}
                role="listbox"
                aria-labelledby="listbox-label"
                aria-activedescendant="listbox-item-3"
                className="max-h-56 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
              >
                {options.map((option) => {
                  return (
                    <li
                      onClick={() => handleClick(option)}
                      onKeyPress={() => handleClick(option)}
                      id="listbox-item-0"
                      role="option"
                      aria-selected
                      className="text-gray-900 cursor-pointer relative py-2 pl-3 pr-9 hover:bg-indigo-500 hover:text-white"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="font-normal block truncate">
                          {option}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Transition>
        </div>
      </label>
    </div>
  );
};
