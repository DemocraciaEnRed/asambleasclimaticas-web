'use client'
import { landingSkip } from '@/store/reducers/config';
import { redirect, usePathname } from 'next/navigation';
import { createContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

const LandingContext = createContext();

const LandingProvider = ({ children }) => {
    const config = useSelector((state)=>state.config)
    const pathname = usePathname()

  
  /* useEffect(()=>{
    if (pathname !== '/landing' && !config.landingSkip) return redirect('/landing')
  },[]) */
  
  

  return (
    <LandingContext.Provider value={config.landingSkip}>
      {children}
    </LandingContext.Provider>
  );
};

export { LandingProvider};