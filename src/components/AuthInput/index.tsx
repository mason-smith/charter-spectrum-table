import React from 'react';
import { AuthInputProps } from './types';

export const AuthInput = (props: AuthInputProps) => {
  const { id, label, type, value, onChange } = props;
  return (
    <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
      {label}
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e)}
        type={type}
        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
      />
    </label>
  );
};
