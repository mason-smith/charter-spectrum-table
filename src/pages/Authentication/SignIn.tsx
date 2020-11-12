import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

// Local Dependencies
import { GoogleAuthButton } from 'src/components/GoogleAuthButton';
import { AuthInput } from 'src/components/AuthInput';
import { useAuth } from 'src/features/Authentication/auth.context';

export const SignIn = () => {
  const history = useHistory();
  const location = useLocation<{
    from: {
      pathname: string;
    };
  }>();
  const { authUser, authError, signIn } = useAuth();

  // Local State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { from } = location.state || { from: { pathname: '/' } };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    signIn({ email, password });

    setEmail('');
    setPassword('');
  };

  // Check if user is authorized
  useEffect(() => {
    if (authUser) {
      history.replace(from);
    }
  }, [authUser]);

  // Check for auth error
  useEffect(() => {
    setError(authError);
  }, [authError]);

  return (
    <div className="py-6">
      <div className="flex bg-white rounded-lg sm:shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1533140235768-486e1ceaea23?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')",
          }}
        />
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Brand
          </h2>
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>
          <GoogleAuthButton label="Sign in with Google" />
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4" />
            <p className="text-xs text-center text-gray-500 uppercase">
              or login with email
            </p>
            <span className="border-b w-1/5 lg:w-1/4" />
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mt-4">
              <AuthInput
                id="signin-email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <AuthInput
                id="signin-passwordrf"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
              >
                Login
              </button>
            </div>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </form>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4" />
            <Link to="/signup" className="text-xs text-gray-500 uppercase">
              or sign up
            </Link>
            <span className="border-b w-1/5 md:w-1/4" />
          </div>
        </div>
      </div>
    </div>
  );
};
