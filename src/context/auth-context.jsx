'use client'
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
          const response = await fetch('http://localhost:3000/user/me', {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                  // Otros encabezados necesarios
              },
              
             })
          const res = await response.json()
          setUser(res)
          
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