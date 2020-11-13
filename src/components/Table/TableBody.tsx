import React, { ReactNode } from 'react';

export const TableBody = ({ children }: { children: ReactNode }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
  );
};
