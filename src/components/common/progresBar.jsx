import React from 'react'

import { ClosedProjectcheck, RemainingDate, progress } from '@/utils/format'


export default function ProgressBar({ closingDate, creationDate }) {

  const closed = ClosedProjectcheck(closingDate)

  if(closingDate) return (
    <div className='progress-bar-wrapper'>
      {closed ? <div className='reaming-days is-size-6'>Finalizó el periodo para aportes</div>
        : <>
          <div className='progress-fill' style={{ width: `${progress(RemainingDate(closingDate, creationDate), RemainingDate(new Date(), closingDate))}%` }} />
          <div className='reaming-days has-text-white is-size-6'>Días restantes: {RemainingDate(new Date(), closingDate)} </div>
        </>
      }
    </div>
  )
}