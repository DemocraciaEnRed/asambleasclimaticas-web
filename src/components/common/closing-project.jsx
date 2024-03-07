import React from 'react'

import { ClosedProjectcheck } from '@/utils/format'


export default function ClosingProject({ closingDate }) {

  const closed = ClosedProjectcheck(closingDate)

  return(<div className={`closing-project has-text-white is-size-6 is-flex is-align-items-center px-3 ${!closed ? 'has-background-primary': 'has-background-orange'}`} >
        {!closed ? 'Abierto para Aportes':'Cerrado para Aportes'} 
  </div>
)}


