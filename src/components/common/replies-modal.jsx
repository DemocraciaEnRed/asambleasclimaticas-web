import { useEffect, useState } from 'react';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';

import Comment from '../pacto/body/pacto/comment';
import { postComments } from '@/utils/post-data';
import Pagination from './pagination';
import { fetchGeneralComments } from '@/utils/get-data';
import CommentContent from './comment-content';


export default function RepliesModal({ comment, commentUrl, active, addCommentDefault, closeCommentModal, user, project }) {

    const [addComment, setAddComment] = useState(addCommentDefault)
    const [textNewComment, setTextNewComment] = useState('')
    const [comments, setComments] = useState(null)
    const isProjectClosed = project.closed
    const fetchComents = async (page) => {
        const resp = await fetchGeneralComments(`${commentUrl}${page ? '?page=' + page : ''}`)
        setComments(resp);
    }

    const handlesubmit = async (event) => {
        event.preventDefault()
        if (textNewComment) {
            const resp = await postComments(`${commentUrl}`, { body: textNewComment })
            fetchComents()
            setTextNewComment('')
        }
    }

    useEffect(() => {
        fetchComents()
    }, [])

    return (
        <div className={`modal replies-modal-wrapper ${active ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={closeCommentModal}></div>
            <div className="modal-content" >
                {comments && <div className="card">
                    <div className="is-flex is-justify-content-end pt-3 px-3">
                        <FontAwesomeIcon onClick={closeCommentModal} icon={faXmark} />
                    </div>
                    <header className="card-header is-flex-direction-column ">
                        <CommentContent
                            emoji={comment.user.country.emoji}
                            username={comment.user.name}
                            participatedInAssembly={comment.user.participatedInAssembly}
                            createdAt={comment.createdAt}
                            text={comment.text} />
                    </header>
                    <p className="card-header-title is-uppercase  is-justify-content-center">
                        comentarios
                    </p>
                    <div className="replies-comment-box px-3 my-2">
                        <div>
                            {comments && (comments.replies.length > 0 ? comments.replies.map(comment => <Comment key={comment._id} project={project} comment={comment} urlComment={`${commentUrl}/${comment._id}`} />)
                                : comments.replies.length === 0 && <div className="has-text-centered p-3">Este comentario no tiene respuestas</div>)
                            }
                        </div>
                        {
                            comments && comments.total / comments.limit > 1 &&
                            <Pagination
                                className="is-flex is-justify-content-center pagination"
                                breakLabel="..."
                                nextLabel=">"
                                onPageChange={(e) => fetchComents(e.selected + 1)}
                                pageRangeDisplayed={5}
                                pageCount={Math.ceil(comments.total / comments.limit)}
                                previousLabel="<"
                                renderOnZeroPageCount={null}
                            />
                        }
                    </div>
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
                </div>}
            </div>
        </div>
    )
}