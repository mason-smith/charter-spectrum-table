import React from 'react';
import { Link, useHistory } from 'react-router-dom';

// Local Dependencies
import { useAuth } from 'src/features/Authentication/auth.context';
import { AuthButtonProps } from '../Navigation/types';

export const AuthButton = (props: AuthButtonProps) => {
  const { onClick, styles } = props;
  const history = useHistory();
  const { authUser, signOut } = useAuth();

  return authUser ? (
    <>
      {/* <p className="ml-8 font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out">
        Welcome {authUser?.displayName}!{' '}
      </p> */}
      <button
        className="ml-8 font-medium text-indigo-600 hover:text-gray-900 transition duration-150 ease-in-out"
        type="button"
        onClick={() => {
          signOut(() => history.push('/'));
        }}
      >
        Sign out
      </button>
    </>
  ) : (
    <Link onClick={onClick} to="/login" className={styles}>
      Login
    </Link>
  );
};
