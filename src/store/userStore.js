import React, { useContext, useState, useEffect } from 'react';
import { auth } from './firebase';

const UserContext = React.createContext();

export function useUserValue() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      user ? setCurrentUser(user) : setCurrentUser(null);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
