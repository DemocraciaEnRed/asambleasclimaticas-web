import { faThumbsDown, faThumbsUp } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Remark } from "react-remark"
import Comment from "./comment"
import { faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { useEffect, useState } from "react"
import { postComments } from "@/utils/post-data"
import Pagination from "@/components/common/pagination"
import { useAuthContext } from "@/context/auth-context";
import { fetchGeneralComments } from "@/utils/get-data"
import { useLanguage } from "@/context/lang-context"

const ArticleModal = ({ article, active, closeCommentModal, liked, disliked, handleDislike, handleLike, likes, dislikes, project }) => {
    const [textNewComment, setTextNewComment] = useState('')
    const [comments, setComments] = useState(null)
    const { language } = useLanguage()
    const { user } = useAuthContext()
    const isProjectClosed = project.closed

    useEffect(() => {
        fetchComments()
    }, [])

    const fetchComments = async (page) => {
        try {
            const resp = await fetchGeneralComments(`/projects/${project._id}/articles/${article._id}/comments${page ? '?page=' + page : ''}`)
            setComments(resp);
        } catch (err) {
            console.error(err);
        }
    }

    const handlesubmit = async (event) => {
        event.preventDefault()
        if (textNewComment) {
            const resp = await postComments(`/projects/${project._id}/articles/${article._id}/comments`, { body: textNewComment })
            fetchComments()
            setTextNewComment('')

        }
    }

    return (<div className={`modal article-modal ${active ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={closeCommentModal}></div>
        <div className="modal-card">
            <section className="modal-card-body p-0">
                <div className="is-flex is-justify-content-end pt-3 px-3">

                    <FontAwesomeIcon onClick={closeCommentModal} icon={faXmark} />
                </div>
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
                    <div>
                        {comments && (comments.comments.length > 0 ? comments.comments.map(comment => <Comment key={comment._id} project={project} comment={comment} urlComment={`/projects/${project._id}/articles/${article._id}/comments/${comment._id}`} answerable />)
                            : comments.comments.length === 0 && <div className="has-text-centered p-3">Esta maxima todavia no tiene comentarios</div>)
                        }
                    </div>
                    {
                        comments && comments.total / comments.limit > 1 &&
                        <Pagination
                            className="is-flex is-justify-content-center pagination"
                            breakLabel="..."
                            nextLabel=">"
                            onPageChange={(e) => fetchComments(e.selected + 1)}
                            pageRangeDisplayed={5}
                            pageCount={Math.ceil(comments.total / comments.limit)}
                            previousLabel="<"
                            renderOnZeroPageCount={null}
                        />
                    }
                </div>
            </section>
            {
                !isProjectClosed && <footer className="modal-card-foot has-background-white">
                    {user ? <form action="submit" className="w-100" onSubmit={handlesubmit}>
                        <p className="control has-icons-right ">
                            <input className="input is-rounded" type="text" placeholder="Escribe un comentario....." value={textNewComment} onChange={(e) => setTextNewComment(e.target.value)} />
                            <span className="icon is-small is-right is-clickable" onClick={handlesubmit}>
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </span>
                        </p>
                    </form>
                        :
                        <div >
                            <p>Inicia sesión <Link href="/auth/login"> aquí</Link> para poder comentar</p>
                        </div>
                    }
                </footer>
            }
        </div>
    </div>)
}

export default ArticleModal