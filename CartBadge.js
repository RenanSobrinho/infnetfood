import React, { createContext, useContext, useState } from 'react';
import { MOCK_USERS } from '../data/mockData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    const found = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );
    if (found) {
      setUser(found);
      return { success: true };
    }
    return { success: false, message: 'E-mail ou senha inválidos.' };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
