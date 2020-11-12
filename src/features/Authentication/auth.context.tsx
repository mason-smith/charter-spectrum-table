import React, { createContext, useContext, useEffect, useState } from 'react';

// Local Dependencies
import firebase, { auth, createUserProfileDocument } from 'src/firebase';
import { UserAuth } from 'src/firebase/types';
import {
  AuthProviderProps,
  AuthUserContextType,
  SignedUserType,
} from './types';

/* eslint-disable  @typescript-eslint/no-unused-vars */
export const authContext = createContext<AuthUserContextType>({
  authUser: null,
  authError: null,
  signIn: (_signInUser: SignedUserType) => null,
  signUp: (_signUpUser: SignedUserType) => null,
  signOut: (_cb: () => void) => null,
});

export function AuthProvider({ children }: AuthProviderProps) {
  const providedAuth = useProvideAuth();
  return (
    <authContext.Provider
      /* eslint-disable @typescript-eslint/ban-ts-comment */
      // @ts-ignore
      value={providedAuth}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}

// Provider hook that creates auth object and handles state
export function useProvideAuth() {
  const [authUser, setAuthUser] = useState<UserAuth | firebase.User | null>(
    null
  );
  const [authError, setAuthError] = useState<string | null>(null);

  const signIn = async (signUpUser: SignedUserType) => {
    const { email, password } = signUpUser;
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      setAuthUser(user);
    } catch (err) {
      setAuthError(err.message);
    }
  };

  const signUp = async (signUpUser: SignedUserType) => {
    const { email, password, displayName } = signUpUser;
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (user) {
        createUserProfileDocument(user, { displayName });
        setAuthUser(user);
        setAuthError(null);
      }
    } catch (err) {
      setAuthError(err.message);
    }
  };

  const signOut = async (cb: () => void) => {
    await auth.signOut();
    setAuthUser(null);
    cb();
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = await createUserProfileDocument(user);

        userRef?.onSnapshot((snapShot) => {
          setAuthUser({ id: snapShot.id, ...snapShot.data() } as UserAuth);
        });
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    authError,
    signIn,
    signUp,
    signOut,
  };
}
