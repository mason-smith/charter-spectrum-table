import React from 'react';

type TableFooterProps = {
  prevPage: () => void;
  nextPage: () => void;
};

export const TableFooter = (props: TableFooterProps) => {
  const { nextPage, prevPage } = props;
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between ">
        <button
          type="button"
          onClick={() => prevPage()}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => nextPage()}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
        >
          Next
        </button>
      </div>
    </div>
  );
};
