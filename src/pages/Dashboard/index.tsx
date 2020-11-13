import cuid from 'cuid';
import React, { useEffect } from 'react';
import { Container } from 'src/components/Container';

// Local Dependencies
import { Table } from 'src/components/Table';
import { TableBody } from 'src/components/Table/TableBody';
import { TableCell } from 'src/components/Table/TableCell';
import { TableHead } from 'src/components/Table/TableHead';
import { TableRow } from 'src/components/Table/TableRow';
import { useRestaurants } from 'src/features/Restaurants/restaurants.context';

const tableHeaders = [
  { title: 'Name' },
  { title: 'City' },
  { title: 'State' },
  { title: 'Phone Number' },
  { title: 'Genres' },
  { title: '' },
];

export const Dashboard = () => {
  const { restaurants, loading, fetchRestaurants } = useRestaurants();
  useEffect(() => {
    // Only fetch restaurants if there are none
    // In our context
    if (!restaurants.length) {
      fetchRestaurants();
    }
  }, [restaurants]);

  return (
    <Container>
      <div className="flex flex-col mt-4">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <Table>
                <TableHead>
                  <TableRow>
                    {tableHeaders.map((header) => {
                      return (
                        <TableCell key={cuid()} component="th">
                          {header.title}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {restaurants.map((result) => {
                    return (
                      <TableRow key={cuid()}>
                        <TableCell component="td">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm leading-5 font-medium text-primary">
                                {result.name}
                              </div>
                              <div className="text-sm leading-5 text-primary">
                                {result.address1}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell component="td">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                            {result.city}
                          </span>
                        </TableCell>
                        <TableCell component="td">
                          <div className="text-sm leading-5 text-primary">
                            {result.state}
                          </div>
                          {/* <div className="text-sm leading-5 text-primary">
                            {result.employerId}
                          </div> */}
                        </TableCell>
                        <TableCell component="td">
                          <div className="text-sm leading-5 text-primary">
                            {result.telephone}
                          </div>
                        </TableCell>
                        <TableCell component="td">
                          <div className="text-sm leading-5 text-primary">
                            {result.genre.split(',').join(', ')}
                          </div>
                        </TableCell>
                        <TableCell component="td">
                          <button
                            type="button"
                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                          >
                            Details
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
