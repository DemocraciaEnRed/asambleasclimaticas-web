import React from 'react'



const ClosedProjectcheck = (closedAt) => {
  const today = new Date();
  const ClosedDate = new Date(closedAt)
  return ClosedDate <= today  
}

const ClosingProject = ({ closingDate }) => {
  const closed = ClosedProjectcheck(closingDate)

  return(<div className={`closing-project has-text-white is-size-6 is-flex is-align-items-center px-3 ${!closed ? 'has-background-primary': 'has-background-orange'}`} >
        {!closed ? 'Abierto para Aportes':'Cerrado para Aportes'} 
  </div>
)}


export default ClosingProject
