import React, { useState } from 'react';
import { useContext } from 'react';

const DarkContext = React.createContext();

export const DarkProvider = ({ children }) => {
  const [dark, setDark] = useState('day');

  const DarkMode = () => {
    setDark(dark === 'day' ? 'night' : 'day');
    localStorage.setItem('mode', dark);
  };

  return (
    <DarkContext.Provider value={[dark, DarkMode]}>
      {children}
    </DarkContext.Provider>
  );
};

export const useDark = () => useContext(DarkContext);
