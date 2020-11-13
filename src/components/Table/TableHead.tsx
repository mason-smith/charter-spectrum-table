import React, { ReactNode } from 'react';

export const TableHead = ({ children }: { children: ReactNode }) => {
  return <thead>{children}</thead>;
};
