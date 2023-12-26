import React from 'react'


const formatDate = (createdAt) => {
  return (createdAt.substring(0, 10).split('-').reverse().join('/'))
}

const ClosedProjectcheck = (closedAt) => {
  const today = new Date();
  const ClosedDate = new Date(closedAt)
  return ClosedDate <= today  
}

const ClosingProject = ({ closingDate }) => {
  const closed = ClosedProjectcheck(closingDate)

  return(<div className={`closing-project `} >
      <div className={`has-text-white p-3 ${!closed ? 'has-background-primary': 'has-background-orange'}`}>
        {!closed ? 'Abierto para Aportes':'Cerrado para Aportes'} 
      </div>
  </div>
)}


export default ClosingProject
