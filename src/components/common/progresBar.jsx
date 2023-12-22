import React from 'react'


const RemainingDate = (firstDate, secondDate) => {
  const date1 = new Date(firstDate)
  const date2 = new Date(secondDate)
  const diffTime = Math.abs(date2 - date1)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}

const progress = (total, remaining) => {
  return remaining * 100 / total
}

const ProgressBar = ({ closingDate, creationDate, closed, remaining }) => {
  if(closingDate) return (
    <div className='progress-bar-wrapper'>
      {closed ? <div className='reaming-days'>Finalizó el periodo para aportes</div>
        : <>
          <div className='progress-fill' style={{ width: `${progress(RemainingDate(closingDate, creationDate), RemainingDate(new Date(), closingDate))}%` }} />
          <div className='reaming-days'>Dias restantes: {RemainingDate(new Date(), closingDate)} </div>
        </>
      }
    </div>
  )
}


export default ProgressBar
