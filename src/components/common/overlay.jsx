'use client'
import { handleOverlay } from '@/store/reducers/config';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Overlay({show}) {
    const config = useSelector((state)=>state.config)

    

  return (
    <>
      {<div className={`overlay is-hidden-tablet ${show ? 'active':''}`} >
      </div>}
    </>
    
  );
};

