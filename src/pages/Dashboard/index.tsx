import cuid from 'cuid';
import React, { useEffect } from 'react';
import { Container } from 'src/components/Container';

// Local Dependencies
import { Table } from 'src/components/Table';
import { TableBody } from 'src/components/Table/TableBody';
import { TableCell } from 'src/components/Table/TableCell';
import { TableFooter } from 'src/components/Table/TableFooter';
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
  const {
    restaurants,
    fetchRestaurants,
    nextPage,
    prevPage,
  } = useRestaurants();
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
                              <p className="text-sm leading-5 font-medium text-primary">
                                {result.name}
                              </p>
                              <p className="text-sm leading-5 text-primary">
                                {result.address1}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell component="td">
                          <p className="text-sm leading-5 text-primary">
                            {result.city}
                          </p>
                        </TableCell>
                        <TableCell component="td">
                          <p className="text-sm leading-5 text-primary">
                            {result.state}
                          </p>
                        </TableCell>
                        <TableCell component="td">
                          <p className="text-sm leading-5 text-primary">
                            {result.telephone}
                          </p>
                        </TableCell>
                        <TableCell component="td">
                          <p className="text-sm leading-5 text-primary">
                            {result.genre.split(',').join(', ')}
                          </p>
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
              <TableFooter prevPage={prevPage} nextPage={nextPage} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
