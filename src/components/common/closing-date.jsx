import React from 'react'


const formatDate = (createdAt) => {
  return (createdAt.substring(0, 10).split('-').reverse().join('/'))
}

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
