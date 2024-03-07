import React from 'react'

import { faHandHoldingHeart, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ArticlesCommentsCounter({ commentsCount, apoyosCount }) {

    return (<div className='atricle-comment-wrapper is-align-content-space-between is-align-items-center is-justify-content-space-around is-flex-direction-column'>
        <div className='counters is-flex is-align-items-center'>
            <p className='is-size-7-touch'>{commentsCount}</p>
            <p className='text is-size-6-touch'>Aportes</p>
            <FontAwesomeIcon icon={faPencil} />
        </div>
        <div className='counters is-flex is-align-items-center '>
            <p className='is-size-7-touch'>{apoyosCount}</p>
            <p className='text is-size-6-touch'>Apoyos</p>
            <FontAwesomeIcon icon={faHandHoldingHeart} />
        </div>
    </div>);
}
