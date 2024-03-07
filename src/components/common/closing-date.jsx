import React from 'react'

import { formatDate } from '@/utils/format'


export default function ClosingDate({ closingDate, creationDate }) {

  if(closingDate)return(
  <div className='closing-date-wrapper is-flex is-flex-direction-column is-justify-content-space-around is-align-items-center'>
      <div className='closing-date-title has-text-centered is-size-6-touch'>Fecha de cierre: {formatDate(closingDate)}</div>
      <div className='closing-date-title has-text-centered is-size-6-touch'>Fecha de creación: {formatDate(creationDate)}</div>
  </div>
  )
}