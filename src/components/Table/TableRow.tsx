import React, { ReactNode } from 'react';

export const TableRow = ({ children }: { children: ReactNode }) => {
  return (
    <tr className="bg-opacity-25 hover:bg-gray-200 cursor-pointer">
      {children}
    </tr>
  );
};
