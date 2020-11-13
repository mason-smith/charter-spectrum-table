import React, { ReactNode } from 'react';

export const Table = ({ children }: { children: ReactNode }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">{children}</table>
  );
};
