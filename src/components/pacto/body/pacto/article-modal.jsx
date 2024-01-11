import { faThumbsDown, faThumbsUp } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector } from "react-redux"
import { Remark } from "react-remark"
import Comment from "./comment"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { useEffect, useState } from "react"
import { postComments } from "@/utils/post-data"
import axiosServices from "@/utils/axios"

const ArticleModal = ({ article, active, closeCommentModal, liked, disliked, handleDislike, handleLike, likes, dislikes, projectId }) => {
    const [textNewComment, setTextNewComment] = useState(null)
    const [comments, setComments] = useState(null)
    const { language } = useSelector((state) => state.language)
    const { user } = useSelector((state) => state.auth)


    useEffect(() => {
        getComments()
    }, [])

    const getComments = async () => {
        const resp = await axiosServices.get(`/projects/${projectId}/articles/${article._id}/comments`)
        setComments(resp.data.comments);
    }

    const handlesubmit = async (event) => {
        event.preventDefault()
        if (textNewComment) {
            const resp = await postComments(`/projects/${projectId}/articles/${article._id}/comments`, { body: textNewComment })
            resp.user = user
            resp.likes = 0
            resp.dislikes = 0
            setComments([resp, ...comments])

        }
    }

    return (<div className={`modal article-modal ${active ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={closeCommentModal}></div>
        <div className="modal-card">

            <section className="modal-card-body p-0">
                <div className="content is-size-7-touch">
                    <Remark>
                        {language === 'pt' ? article.text_pt : article.text_es}
                    </Remark>
                </div>
                <div className="has-background-grey-lighter is-flex is-justify-content-space-between p-3 is-size-6-tablet is-size-7-mobile">
                    <div className="is-flex likes">
                        <button className={`button mx-1 is-rounded is-size-6-tablet is-size-7-mobile ${liked ? 'has-background-primary-dark has-text-white' : 'is-primary is-outlined '}`} onClick={handleLike}> <FontAwesomeIcon icon={faThumbsUp} className="mr-1" /> <p className="is-hidden-touch mr-1">Me gusta </p>  ({likes}) </button>
                        <button className={`button mx-1 is-rounded is-size-6-tablet is-size-7-mobile ${disliked ? 'has-background-primary-dark has-text-white' : 'is-primary is-outlined '}`} onClick={handleDislike}> <FontAwesomeIcon icon={faThumbsDown} className="mr-1" /> <p className="is-hidden-touch mr-1"> No me gusta </p>  ({dislikes}) </button>
                    </div>
                    <div className="is-flex is-align-items-center comments">
                        <span className="has-text-primary" > {article.commentsCount} Comentarios </span>
                    </div>
                </div>
                <div className="comment-box px-3 my-2">
                    {comments && (comments.length > 0 ? comments.map(comment => <Comment key={comment._id} projectId={projectId} comment={comment} urlComment={`/projects/${projectId}/articles/${article._id}/comments/${comment._id}`} />)
                                                      : comments.length === 0 && <div className="has-text-centered">Esta maxima todavia no tiene comentarios</div>)
                    }
                </div>
            </section>
            <footer className="modal-card-foot has-background-white">
                {user ? <form action="submit" className="w-100" onSubmit={handlesubmit}>
                    <p className="control has-icons-right ">
                        <input className="input is-rounded" type="text" placeholder="Escribe un comentario....." onChange={(e) => setTextNewComment(e.target.value)} />
                        <span className="icon is-small is-right is-clickable" onClick={handlesubmit}>
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </span>
                    </p>

                </form>
                    :
                    <div >
                        <p>Inicia sesion <Link href="/auth/login"> aqui</Link> para poder comentar</p>
                    </div>
                }
            </footer>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={closeCommentModal}></button>
    </div>)
}

export default ArticleModal