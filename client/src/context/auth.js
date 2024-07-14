import axios from 'axios';
import { useState, useContext, createContext, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const data = localStorage.getItem('auth');
    if (data) {
      return JSON.parse(data);
    } else {
      return { user: null, token: '' };
    }
  });
//default axios 
axios.defaults.headers.common["Authorization"] = auth?.token

  useEffect(() => {
    if (auth.user && auth.token) {
      localStorage.setItem('auth', JSON.stringify(auth));
    }
    //eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
