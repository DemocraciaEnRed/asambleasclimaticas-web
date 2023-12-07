'use client'
import axiosServices from '@/utils/axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const {token} = useSelector((state)=>state.auth)
  const [user, setUser] = useState() 
  
  useEffect(()=>{
    fetchUser()
  },[])
  
  async function fetchUser() {
    if(token){
      try{
          const response = await axiosServices.get('/user/me')

          setUser(response.data)
          
      }catch(err){
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