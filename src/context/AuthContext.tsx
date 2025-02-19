import { firebaseAuth } from "@/lib/config";
import { User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

const valuesFallback = {
  user: undefined as User | undefined,
  setUser: (user: User | undefined) => {},
  loading: true,
};

export const UseAuth = createContext(valuesFallback);

export const AuthContext = ({ children }: any) => {
  /**
   * This component creates a context for storing the current user and loading state.
   * The user is the current user signed into firebase, or undefined if no user is signed in.
   * The loading state is a boolean that indicates whether the user has finished loading.
   *
   * The context is created using the createContext hook, and the user and loading state are stored
   * in the state using the useState hook.
   *
   * The useEffect hook is used to set up a listener for the onAuthStateChanged event, which is
   * fired whenever the user is changed. The user and loading state are updated accordingly.
   *
   * The values object is created and passed to the context provider, which wraps the children
   * components.
   */
  const auth = firebaseAuth;
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * This function is called whenever the user is changed. It updates the user and loading state
     * accordingly.
     */
    auth.onAuthStateChanged((user) => {
      if (user) {
        /**
         * If the user is signed in, update the user state to the signed in user.
         */
        setUser(user);
      } else {
        /**
         * If the user is signed out, update the user state to undefined.
         */
        setUser(undefined);
      }
      /**
       * In either case, set the loading state to false, indicating that the user has finished loading.
       */
      setLoading(false);
    });
  }, []);

  const values = {
    user: user,
    setUser: setUser,
    loading: loading,
  };

  return (
    /**
     * This wraps the children components in the context provider, which provides the user and loading
     * state to the components.
     */
    <UseAuth.Provider value={values}>{children}</UseAuth.Provider>
  );
};
