

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp, faComment, faMessage } from "@fortawesome/free-regular-svg-icons";
import axiosServices from "@/utils/axios";
import CommentModal from "@/components/common/comment-modal";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";


export default function Comment({ project, comment }) {
    const [commentSelected, setCommentSelected] = useState(null)
    const [likes, setLikes] = useState(comment.likes)
    const [dislikes, setDislikes] = useState(comment.dislikes)
    const user = useAuth()


    const handleLike = async () => {
        //setLikes(likes + 1)
    }
    const handleDislike = async () => {
        //setDislikes(dislikes + 1)
    }

    return (

        <div >
            <div className="is-flex is-justify-content-space-between">
                <div className="likes"> {likes > 0 && likes} <FontAwesomeIcon onClick={handleLike} color="grey" className="mx-1" icon={faThumbsUp} /><FontAwesomeIcon onClick={handleDislike} color="grey" className="mx-1" icon={faThumbsDown} /> {dislikes > 0 && dislikes} </div>
                <div className="replies" onClick={() => setCommentSelected(comment._id)}> {comment.repliesCount} Respuesta{comment.repliesCount > 1 && 's'} <FontAwesomeIcon color="grey" className="mx-2" icon={faMessage} /></div>
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
                commentId={comment._id}
                projectId={project._id}
                closeCommentModal={() => setCommentSelected(null)}
                user={user} />}
        </div>

    )
}