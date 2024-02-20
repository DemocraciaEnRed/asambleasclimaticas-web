'use client'
import React from 'react';

export default function Overlay({show}) {

    

  return (
    <>
      {<div className={`overlay is-hidden-tablet ${show ? 'active':''}`} >
      </div>}
    </>
    
  );
};

