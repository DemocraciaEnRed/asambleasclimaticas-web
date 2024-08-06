'use client'
import { useAuthContext } from "@/context/auth-context";
import Link from "next/link";
import axiosServices from "@/utils/axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFile } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faAsterisk, faCaretRight, faPaperPlane, faEyeSlash, faSave, faTimes, faCheck, faExclamationTriangle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default function DeleteEventButton({project, event}) {
  const { user } = useAuthContext()
  
  function deleteEvent() {
    console.log('delete event')
    const answer = confirm('Seguro que desea eliminar este evento?')
    if(answer){
      axiosServices.delete(`/projects/${project._id}/events/${event._id}`)
      .then(res => {
        console.log('event deleted')
        location.reload()
      })
      .catch(err => {
        console.error(err)
      })
    } else {
      console.log('no delete')
    }
  }

  if(user && (user.role === 'admin' || project.author._id === user._id)) {
    return (
      <FontAwesomeIcon icon={faTimesCircle} size="lg" className="has-text-danger is-clickable" onClick={deleteEvent} style={{position: 'absolute', top: '5px', right: '5px'}}/>
    )
  } 

  return null
}

