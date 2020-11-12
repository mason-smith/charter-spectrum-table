import { ReactNode } from 'react';

export type AuthProviderProps = {
  children: ReactNode;
};

export type SignedUserType = {
  displayName?: string;
  email: string;
  password: string;
};

export type AuthUserContextType = {
  authUser: SignedUserType | null;
  authError: null | string;
  signIn: (_signInUser: SignedUserType) => void;
  signUp: (_signUpUser: SignedUserType) => void;
  signOut: (_cb: () => void) => void;
};
