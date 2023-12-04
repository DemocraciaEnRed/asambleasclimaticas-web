import { faHandHoldingHeart, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'



const ArticlesCommentsCounter = ({ commentsCount, apoyosCount, project }) => (
  <div className='atricle-comment-wrapper is-align-content-space-between is-justify-content-space-around is-flex-direction-column'>
    <div className='counters is-flex is-align-items-center'>
      <p>{commentsCount}</p>
      <p className='text'>Aportes</p>
      <FontAwesomeIcon icon={faPencil}/>
    </div>
    <div className='counters is-flex is-align-items-center'>
      <p>{apoyosCount}</p>
      <p className='text'>Apoyos</p>
      <FontAwesomeIcon icon={faHandHoldingHeart} />
    </div>
  </div>
)


export default ArticlesCommentsCounter
