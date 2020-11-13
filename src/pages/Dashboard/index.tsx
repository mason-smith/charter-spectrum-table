import cuid from 'cuid';
import React, { useEffect } from 'react';

// Local Dependencies
import { Container } from 'src/components/Container';
import { Select } from 'src/components/Select';
import { Table } from 'src/components/Table';
import { TableBody } from 'src/components/Table/TableBody';
import { TableCell } from 'src/components/Table/TableCell';
import { TableFooter } from 'src/components/Table/TableFooter';
import { TableHead } from 'src/components/Table/TableHead';
import { TableRow } from 'src/components/Table/TableRow';
import { useRestaurants } from 'src/features/Restaurants/hooks';

const tableHeaders = [
  { title: 'Name' },
  { title: 'City' },
  { title: 'State' },
  { title: 'Phone Number' },
  { title: 'Genres' },
];

export const Dashboard = () => {
  const {
    restaurants,
    states,
    fetchRestaurants,
    fetchStates,
    nextPage,
    prevPage,
  } = useRestaurants();
  useEffect(() => {
    // Only fetch restaurants if there are none
    // In our context
    if (!restaurants.length) {
      fetchRestaurants();
      fetchStates();
    }
  }, [restaurants]);

  return (
    <Container>
      <div className="flex flex-row w-full">
        <div className="flex flex-row w-1/2 mr-2">
          <Select label="Select a state" options={['All', ...states]} />
        </div>
        <div className="flex flex-row w-1/2 ml-2">
          <Select label="Select a genre" options={[]} />
        </div>
      </div>

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
