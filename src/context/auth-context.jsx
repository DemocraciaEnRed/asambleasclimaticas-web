'use client'
import axiosServices from '@/utils/axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const token = getCookie('auth')
  const [user, setUser] = useState()

  useEffect(() => {
    fetchUserMe()
  }, [])

  async function fetchUserMe() {
    if (token) {
      try {
        const response = await axiosServices.get('/users/me')

        setUser(response.data)

      } catch (err) {
        console.log(err);
      }

    }
  }

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };