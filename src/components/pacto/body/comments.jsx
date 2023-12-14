import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp, faComment, faMessage } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import axiosServices from "@/utils/axios";
import CommentModal from "@/components/common/comment-modal";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";


export default function Comments({ project }) {
    const [commentSelected, setCommentSelected] = useState(null)
    const user = useAuth()

    const handlesubmit = (event) => {
        event.preventDefault()

        axiosServices.post(`/projects/${project._id}/comments`, { body: event.target[0].value })
    }
    return (
        <div className="comment-section">
            <h4 className="my-4">Comentarios:</h4>
            {user && <div className="comment-form">
                <h2 className="has-text-primary has-text-weight-bold ">Puede dejar sus comentarios sobre la presentación del proyecto aquí</h2>
                <form action="submit" className="my-4" onSubmit={handlesubmit}>
                    <textarea className="textarea my-4" placeholder="Comience a escribir su comentario.."></textarea>
                    <button className="button is-primary is-rounded">Enviar comentario</button>
                </form>
            </div>}
            <div className="comment-list">
                <div className="box">
                    {project.comments.length > 0 && project.comments.map(comment => <div key={comment._id}>
                         <div className="is-flex is-justify-content-space-between">
                            <div className="likes"> <FontAwesomeIcon color="grey" className="mx-1" icon={faThumbsUp} /><FontAwesomeIcon color="grey" className="mx-1" icon={faThumbsDown} /> </div>
                            <div className="replies" onClick={()=>setCommentSelected(comment._id)}> {comment.replies.length} Respuesta{comment.replies.length > 1 && 's'} <FontAwesomeIcon color="grey" className="mx-2" icon={faMessage} /></div>
                        </div>
                        <div className="is-flex p-4 comment" >
                            <div className="py-2 pl-0 mr-3">
                                <div className='avatar' />
                            </div>
                            <div className="is-flex-grow-1 is-flex-shrink-1">
                                <div className="user-name is-size-5 " ><p className="is-inline">{comment.user.country.emoji} </p> <p className="is-inline pl-2 has-text-weight-bold">{comment.user.name}</p></div>
                                <p className="has-text-grey is-size-7">fecha: {new Date(comment.createdAt).toLocaleString('es-ES')}</p>
                                <p className="has-text-grey my-2">{comment.text}</p>
                                
                            </div>

                        </div>
                            {commentSelected && <CommentModal 
                                                    postUrl={`/projects/${project._id}/comments/${comment._id}/replies`} 
                                                    active={commentSelected === comment._id} 
                                                    comments={comment.replies} 
                                                    closeCommentModal={()=>setCommentSelected(null)}
                                                    user={user}/>}
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}