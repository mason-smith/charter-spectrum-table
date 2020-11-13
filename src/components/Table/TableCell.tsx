import React, { ReactNode } from 'react';

type TableCellProps = {
  children: ReactNode;
  component: 'th' | 'td';
};

export const TableCell = (props: TableCellProps) => {
  const { children, component } = props;
  return (
    <>
      {component === 'th' ? (
        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-primary uppercase tracking-wider bg-primary">
          {children}
        </th>
      ) : (
        <td className="px-6 py-4 whitespace-no-wrap bg-primary">{children}</td>
      )}
    </>
  );
};
