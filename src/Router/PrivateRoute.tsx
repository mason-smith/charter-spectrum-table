import React, { ReactNode } from 'react';
import { Route, Redirect } from 'react-router-dom';

// Local Dependencies
import { useAuth } from 'src/features/Authentication/auth.context';

type PrivateRouteProps = {
  children: ReactNode;
  exact: boolean;
  path: string;
};

export const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {
  const { authUser } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
