'use client'
import { handleOverlay } from '@/store/reducers/config';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Overlay(props) {
    const config = useSelector((state)=>state.config)

    

  return (
    <>
    <div className={`overlay `} >
      </div>
      {/* <div className={`overlay ${config.overlayOpen ? 'active':''}`} >
      </div> */}
    </>
    
  );
};

