'use client'
import { useLanguage } from '@/context/lang-context';
import { faStickyNote } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

function AuthorNotesWrapper({project}) {
  let { language } = useLanguage();
  let authorNotes = null;  
  if(language === 'pt'){
    authorNotes = project.authorNotes_pt
  } else {
    authorNotes = project.authorNotes_es
  }
  return (
    <div className="columns mx-0">
      <div className='column is-11 is-12-touch'>
        <div className="card " style={{border: '1px solid #777', boxShadow: 'none'}}>
          <div className="card-content">

        <div className="title-section has-text-primary">
          <h1 className="is-size-4 has-text-weight-medium mb-3">
            <FontAwesomeIcon icon={faStickyNote} className="mr-2" />
            {
              language === 'pt' ? "Notas da versão" : "Notas de la versión"
            }
          </h1>
        </div>          
        <div class="is-italic" style={{whiteSpace: 'pre-line'}}>{authorNotes}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthorNotesWrapper