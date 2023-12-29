'use client'
import { faThumbsDown, faThumbsUp, faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Remark } from "react-remark";
import axiosServices from "@/utils/axios";
import { useRef, useState } from "react";
import CommentModal from "@/components/common/comment-modal";
import { useSelector } from "react-redux";
import { toDislike, toLike } from "@/utils/post-data";

export default function Article({ project, article }) {
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    const [likes,setLikes] = useState(article.likes)
    const [liked, setLiked] = useState(article.liked)
    const [disliked, setDisliked] = useState(article.disliked)
    const [dislikes, setDislikes] = useState(article.dislikes)
    const [showComments, setShowComments] = useState(false)
    const [comments, setComments] = useState(null)
    const [newComment, setNewComment] = useState(false)
    const { user } = useSelector((state) => state.auth)

    const handleLike = async () => {
        const resp = await toLike(`/projects/${project._id}/articles/${article._id}`)
        if(resp.status === 200) {setLikes(likes+1); setLiked(!liked)}
        if(resp.type === 'changed') {setDislikes(dislikes-1); setDisliked(!disliked)}
        if(resp.type === 'removed') {setLikes(likes-1); setLiked(!liked)}


    }
    const handleDislike = async () => {
        const resp = await toDislike(`/projects/${project._id}/articles/${article._id}`)
        if(resp.status === 200) {setDislikes(dislikes+1); setDisliked(!disliked)}
        if(resp.type === 'changed') {setLikes(likes-1); setLiked(!liked)}
        if(resp.type === 'removed') {setDislikes(dislikes-1); setDisliked(!disliked)}

    }

    const fetchComments = async () => {
        const resp = await axiosServices.get(`/projects/${project._id}/articles/${article._id}/comments`)
        setComments(resp.data.comments);
    }

    const handleShowComments = () => {
        setShowComments(false)
        setTimeout(() => {
            setNewComment(false)
            fetchComments()
            setShowComments(true)
        }, 300);
    }

    const handleNewShowComments = () => {
        setShowComments(false)
        setTimeout(() => {
            setNewComment(true)
            fetchComments()
            setShowComments(true)
        }, 300);
    }


    return (
        <div className="columns article my-4">
            <div className={`column  ${showComments ? 'is-8' : 'is-11'}`}>
                <div className="card card-article">
                    <div className="card-content is-size-5 columns" >
                        <div className="content w-100">
                            <Remark>
                                {article.text_es}
                            </Remark>
                        </div>
                    </div>
                    <footer className="card-footer has-background-primary is-flex is-justify-content-space-between">
                        <div className="is-flex likes">
                            <button className={`button is-rounded ${liked ? 'has-background-primary-dark has-text-white': 'is-white has-text-primary'}`} onClick={handleLike}> <FontAwesomeIcon icon={faThumbsUp} /> <p className="is-hidden-touch">Me gusta </p>  ({likes}) </button>
                            <button className={`button is-rounded ${disliked ? 'has-background-primary-dark has-text-white' : 'is-white has-text-primary'}`} onClick={handleDislike}> <FontAwesomeIcon icon={faThumbsDown} /> <p className="is-hidden-touch"> No me gusta </p>  ({dislikes}) </button>
                        </div>
                        <div className="is-flex is-align-items-center comments">
                            <span className="has-text-white is-clickable is-hidden-mobile" onClick={handleShowComments}> {article.commentsCount} Comentarios </span>
                            <button className="button is-white has-text-primary is-rounded" onClick={handleNewShowComments}><FontAwesomeIcon  icon={faComment} /> Comentar</button>
                        </div>
                    </footer>
                </div>
            </div>
            <div className={`column column-comment-article ${showComments ? ' is-4' : 'is-hidden'}`} >
                {showComments && <CommentModal
                    postUrl={`/projects/${project._id}/articles/${article._id}/comments`}
                    active={showComments}
                    commentList={comments}
                    projectId={project._id}
                    addCommentDefault={newComment}
                    closeCommentModal={() => setShowComments(false)}
                    user={user}
                    isModal={windowSize.current[0] < 980} />}

            </div>
        </div>

    )
}