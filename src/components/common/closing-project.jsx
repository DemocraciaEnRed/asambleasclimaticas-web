import React from 'react'


const formatDate = (createdAt) => {
  return (createdAt.substring(0, 10).split('-').reverse().join('/'))
}

const ClosingProject = ({ closed }) => (
  <div className={`closing-project `} >
      <div className={`has-text-white p-3 ${!closed ? 'project-open': 'project-closed'}`}>
        {!closed ? 'Abierto para Aportes':'Cerrado para Aportes'} 
      </div>
  </div>
)


export default ClosingProject
