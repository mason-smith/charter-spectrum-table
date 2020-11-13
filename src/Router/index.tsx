import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Local Dependencies
import { Navigation } from 'src/components/Navigation';
// Contexts
import { RestaurantProvider } from 'src/features/Restaurants/restaurants.context';
import { AuthProvider } from 'src/features/Authentication/auth.context';
// pages
import { Home } from 'src/pages/Home';
import { SignIn } from 'src/pages/Authentication/SignIn';
import { SignUp } from 'src/pages/Authentication/SignUp';
import { Dashboard } from 'src/pages/Dashboard';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
  return (
    <AuthProvider>
      <RestaurantProvider>
        <Router>
          <Navigation />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <SignIn />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <PrivateRoute exact path="/dashboard">
              <Dashboard />
            </PrivateRoute>
          </Switch>
        </Router>
      </RestaurantProvider>
    </AuthProvider>
  );
};
