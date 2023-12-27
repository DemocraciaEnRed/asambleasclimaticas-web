import { formatDate } from '@/utils/format'
import React from 'react'



const ClosingDate = ({ closingDate, creationDate }) => {
  if(closingDate)return(
  <div className='closing-date-wrapper'>
    <div>
      <div className='closing-date-title has-text-centered'>Fecha de cierre: {formatDate(closingDate)}</div>
      <div className='closing-date-title has-text-centered'>Fecha de creación: {formatDate(creationDate)}</div>
    </div>
  </div>
)}


export default ClosingDate
