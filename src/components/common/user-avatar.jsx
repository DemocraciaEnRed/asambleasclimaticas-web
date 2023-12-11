import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'



const UserAvatar = ({ projectView, userId, name, party, badge,cardUser }) => (
  <div className='user-avatar-wrapper is-flex is-align-items-flex-start has-text-left' /* projectView={projectView} */>
    <Link href={{ pathname: '/userprofile', query: { id: userId } }}>
      <div className='avatar'/* projectView={projectView} */ userId={userId} cardUser={cardUser}/>
    </Link>
    <div className='text-wrapper is-flex is-flex-grow-1 is-flex-shrink-1 is-flex-direction-column'>
      <Link href={{ pathname: '/userprofile', query: { id: userId } }}>
        <div className='name has-text-primary'>{name}</div>
      </Link>
      {window.location.pathname === '/admin' && <div className='user-party'>
        {badge && <div className='icon-wrapper'><FontAwesomeIcon icon={faCheckCircle} /></div>}
        <p>{party}</p>
      </div>}
    </div>
  </div>
)


export default UserAvatar
