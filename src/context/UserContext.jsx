import React, { useState } from 'react';
import { useContext } from 'react';

// CONTEXTO PARA USUARIO
const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const saveOrRemoveUser = (data) => {
    setUser(data);
    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
    } else {
      localStorage.removeItem('user');
    }
  };

  return (
    <UserContext.Provider value={[user, saveOrRemoveUser]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
