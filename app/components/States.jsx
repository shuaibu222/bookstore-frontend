'use client'

import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  

  return (
    <AppContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}

