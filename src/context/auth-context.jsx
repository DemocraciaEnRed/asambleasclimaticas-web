'use client'
import axiosServices from '@/utils/axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { dispatch } from '@/store';
import { deleteUser, setUser } from '@/store/reducers/auth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const token = getCookie('auth')
  const [userContext, setUserContext] = useState()

  useEffect(() => {
    fetchUserMe()
  }, [])

  async function fetchUserMe() {
    if (token) {
      try {
        const response = await axiosServices.get('/users/me')
        setUserContext(response.data.user)
        dispatch(setUser(response.data.user))

      } catch (err) {
        dispatch(deleteUser())
        deleteCookie('auth')
        console.log(err);
      }

    }
  }

  return (
    <AuthContext.Provider value={{user:userContext}}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };