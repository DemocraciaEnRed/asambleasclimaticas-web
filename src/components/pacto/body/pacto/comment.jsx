'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp, faStar, faMessage, faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown as faSolidThumbsDown, faThumbsUp as faSolidThumbsUp } from "@fortawesome/free-solid-svg-icons"
import RepliesModal from "@/components/common/replies-modal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { highlighteComment, resolveComment, toDislike, toLike } from "@/utils/post-data";
import { faStar as faStarSolid, faCheckCircle as faSolidCheckCircle } from "@fortawesome/free-solid-svg-icons";
import axiosServices from "@/utils/axios";


export default function Comment({ project, comment, urlComment, answerable }) {
    const [commentSelected, setCommentSelected] = useState(null)
    const [likes, setLikes] = useState(comment.likes || 0)
    const [dislikes, setDislikes] = useState(comment.dislikes || 0)
    const [liked, setliked] =useState(comment.liked ? 'liked' : comment.disliked ? 'disliked': null)
    const [highlighted, setHighlighted] = useState(comment.highlightedInVersion)
    const [resolved, setResolved] = useState(comment.resolvedInVersion)
    const { user } = useSelector((state) => state.auth)


    const handleComment = async () => {
        setCommentSelected(comment._id)
    }

    const handleLike = async () => {
        const resp = await toLike(`${urlComment}`)
        if (resp.status === 200) setLikes(likes + 1); setliked('liked')
        if (resp.type === 'changed') setDislikes(dislikes - 1); 
        if (resp.type === 'removed') setLikes(likes - 1)

    }
    const handleDislike = async () => {
        const resp = await toDislike(`${urlComment}`)
        if (resp.status === 200) setDislikes(dislikes + 1); setliked('disliked')
        if (resp.type === 'changed') setLikes(likes - 1)
        if (resp.type === 'removed') setDislikes(dislikes - 1)
    }

    const handleHighlighted = async () => {
        const comment = await highlighteComment(urlComment)
        setHighlighted(comment.highlightedInVersion)
        setResolved(comment.resolvedInVersion)

    }

    const handleResolved = async () => {
        const comment = await resolveComment(urlComment)
        setHighlighted(comment.highlightedInVersion)
        setResolved(comment.resolvedInVersion)
    }

    return (

        <div className="comment-wrapper pt-3">
            <div className="is-flex is-justify-content-space-between">
                <div className="likes">
                    {likes > 0 && likes} <FontAwesomeIcon onClick={handleLike} color={liked === 'liked' ? '#23d160' : 'gray'} className="mx-1 is-clickable" icon={liked === 'liked' ? faSolidThumbsUp : faThumbsUp} />
                    <FontAwesomeIcon onClick={handleDislike} color={liked === 'disliked' ? '#ff3860' : 'gray'} className="mx-1 is-clickable" icon={liked === 'disliked' ? faSolidThumbsDown : faThumbsDown} /> {dislikes > 0 && dislikes}
                    {(!user || user && !(user.role === 'admin' || user.role === 'moderator')) &&
                        <div className="is-inline highlighted">
                            <div className="is-relative is-inline ">
                                {highlighted === project.version &&
                                    <>
                                        <FontAwesomeIcon className={`mx-2 has-text-warning`} icon={faStarSolid} />
                                        <span className="tag is-light is-absolute">Aporte destacado por un admin</span>
                                    </>
                                }
                            </div>
                            <div className="is-relative is-inline ">
                                {resolved === project.version &&
                                    <>
                                        <FontAwesomeIcon className={`mx-2 has-text-success`} icon={faSolidCheckCircle} />
                                        <span className="tag is-light is-absolute">Aporte resuelto por un admin</span>
                                    </>
                                }
                            </div>
                        </div>}
                </div>
                {answerable && <div className="is-flex">
                    <div className="replies is-clickable" onClick={handleComment}> {comment.repliesCount} Respuesta{comment.repliesCount > 1 && 's'} <FontAwesomeIcon color="grey" className="mx-2" icon={faMessage} /></div>
                    {user && (user.role === 'admin' || user.role === 'moderator') &&
                        <div className="highlighted">
                            <div className="is-relative is-inline ">
                                <FontAwesomeIcon onClick={handleHighlighted} className={`mx-2 is-clickable ${highlighted === project.version ? 'has-text-warning' : ''}`} icon={highlighted === project.version ? faStarSolid : faStar} />
                                <span className="tag is-light is-absolute">{highlighted === project.version ? 'quitar destacado' : 'destacar comentario'}</span>
                            </div>

                            <div className="is-relative is-inline ">
                                <FontAwesomeIcon onClick={handleResolved} className={`mx-2 is-clickable ${resolved === project.version ? 'has-text-success' : ''}`} icon={resolved === project.version ? faSolidCheckCircle : faCheckCircle} />
                                <span className="tag is-light is-absolute">{highlighted === project.version ? 'quitar resuelto' : 'resolver comentario'}</span>
                            </div>
                        </div>

                    }
                </div>
                }
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
            {commentSelected && <RepliesModal
                commentUrl={`${urlComment}/replies`}
                active={commentSelected === comment._id}
                project={project}
                closeCommentModal={() => setCommentSelected(null)}
                user={user}/>}
        </div>

    )
}