import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

// Local Dependencies
import { GoogleAuthButton } from 'src/components/GoogleAuthButton';
import { AuthInput } from 'src/components/AuthInput';
import { useAuth } from 'src/features/Authentication/auth.context';

export const SignUp = () => {
  const history = useHistory();
  const location = useLocation<{
    from: {
      pathname: string;
    };
  }>();
  const { authUser, authError, signUp } = useAuth();

  // Local State
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { from } = location.state || { from: { pathname: '/' } };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    signUp({ displayName, email, password });

    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
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
              "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
          }}
        />
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Brand
          </h2>
          <p className="text-xl text-gray-600 text-center">Welcome!</p>
          <GoogleAuthButton label="Sign up with Google" />
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4" />
            <p className="text-xs text-center text-gray-500 uppercase">
              or sign up with email
            </p>
            <span className="border-b w-1/5 lg:w-1/4" />
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mt-4">
              <AuthInput
                id="signup-username"
                label="User Name"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <AuthInput
                id="signup-email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2 px-3 mt-4">
                <AuthInput
                  id="signup-password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mt-4">
                <AuthInput
                  id="signup-password-confirm"
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
              >
                Sign Up
              </button>
            </div>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </form>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4" />
            <Link to="/login" className="text-xs text-gray-500 uppercase">
              or sign in
            </Link>
            <span className="border-b w-1/5 md:w-1/4" />
          </div>
        </div>
      </div>
    </div>
  );
};
