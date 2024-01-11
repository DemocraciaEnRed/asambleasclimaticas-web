'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp, faComment, faMessage } from "@fortawesome/free-regular-svg-icons";
import axiosServices from "@/utils/axios";
import CommentModal from "@/components/common/comment-modal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toDislike, toLike } from "@/utils/post-data";


export default function Comment({ projectId, comment, urlComment }) {
    const [commentSelected, setCommentSelected] = useState(null)
    const [likes, setLikes] = useState(comment.likes)
    const [dislikes, setDislikes] = useState(comment.dislikes)
    const { user } = useSelector((state) => state.auth)
    const [replies, setReplies] = useState(null)

    const handleComment = async () => {
        setCommentSelected(comment._id)
        const resp = await axiosServices.get(`${urlComment}/replies`)
        setReplies(resp.data.replies)
    }

    const handleLike = async () => {
        const resp = await toLike(`${urlComment}`)
        if (resp.status === 200) setLikes(likes + 1)
        if (resp.type === 'changed') setDislikes(dislikes - 1)
        if (resp.type === 'removed') setLikes(likes - 1)

    }
    const handleDislike = async () => {
        const resp = await toDislike(`${urlComment}`)
        if (resp.status === 200) setDislikes(dislikes + 1)
        if (resp.type === 'changed') setLikes(likes - 1)
        if (resp.type === 'removed') setDislikes(dislikes - 1)

    }


    return (

        <div className="comment-wrapper pt-3">
            <div className="is-flex is-justify-content-space-between">
                <div className="likes">
                    {likes > 0 && likes} <FontAwesomeIcon onClick={handleLike} color="grey" className="mx-1 is-clickable" icon={faThumbsUp} />
                    <FontAwesomeIcon onClick={handleDislike} color="grey" className="mx-1 is-clickable" icon={faThumbsDown} /> {dislikes > 0 && dislikes}
                </div>
                <div className="replies is-clickable" onClick={handleComment}> {comment.repliesCount} Respuesta{comment.repliesCount > 1 && 's'} <FontAwesomeIcon color="grey" className="mx-2" icon={faMessage} /></div>
            </div>
            <div className="is-flex p-4 comment" >
                <div className="py-2 pl-0 mr-3 is-hidden-touch">
                    <div className='avatar' />
                </div>
                <div className="is-flex-grow-1 is-flex-shrink-1">
                    <div className="is-flex">
                        <div className="py-2 pl-0 mr-1 is-hidden-desktop">
                            <div className='avatar' />
                        </div>
                        <div>
                            <div className="user-name is-size-5 " ><p className="is-inline">{comment.user.country.emoji} </p> <p className="is-inline pl-2 has-text-weight-bold">{comment.user.name}</p></div>
                            <p className="has-text-grey is-size-7">fecha: {new Date(comment.createdAt).toLocaleString('es-ES')}</p>

                        </div>
                    </div>
                    <p className="has-text-grey my-2 is-size-7-touch">{comment.text}</p>

                </div>

            </div>
            {commentSelected && <CommentModal
                postUrl={`${urlComment}/replies`}
                active={commentSelected === comment._id}
                commentList={replies}
                projectId={projectId}
                closeCommentModal={() => setCommentSelected(null)}
                user={user}
                isModal />}
        </div>

    )
}