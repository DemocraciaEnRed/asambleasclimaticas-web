import { Swiper as SwiperComponent } from 'swiper/react';

import { useEffect, useState } from 'react';
import axiosServices from '@/utils/axios';
import Link from 'next/link';
import Comment from '../pacto/body/pacto/comment';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { postComments } from '@/utils/post-data';

export default function RepliesModal({ commentUrl, active,  addCommentDefault, closeCommentModal, user, project, isModal }) {
    const [addComment, setAddComment] = useState(addCommentDefault)
    const [textNewComment, setTextNewComment] = useState('')
    const [comments, setComments] = useState(null)



    useEffect(() => {
        fetchComents()
    }, [])

    const fetchComents = async (page) => {
        try {
            const resp = await axiosServices.get(`${commentUrl}${page ? '?page=' + page : ''}`)
            setComments(resp.data);

        } catch (err) {
            console.log(err);
        }
    }

    const handlesubmit = async (event) => {
        event.preventDefault()
        if (textNewComment) {
            const resp = await postComments(`${commentUrl}`, { body: textNewComment })
            fetchComents()
            setTextNewComment('')
        }
    }

    const handleNewComment = () => {
        setAddComment(!addComment)
    }

    return (
        <div className={`${isModal ? 'modal' : 'is-stick-top'} replies-modal-wrapper ${active ? 'is-active' : ''}`}>
            {isModal && <div className="modal-background" onClick={closeCommentModal}></div>}
            <div className={`${isModal ? "modal-content" : ''}`} >

                {comments && <div className="card">
                    <header className="card-header  ">
                        <p className="card-header-title is-uppercase  is-justify-content-center">
                            comentarios
                        </p>
                    </header>
                    <div className="replies-comment-box px-3 my-2">
                        {comments && (comments.replies.length > 0 ? comments.replies.map(comment => <Comment key={comment._id} project={project} comment={comment} urlComment={`${commentUrl}/${comment._id}`} />)
                            : comments.replies.length === 0 && <div className="has-text-centered p-3">Este comentario no tiene respuestas</div>)
                        }
                        {
                            comments &&

                            <ReactPaginate
                                className="is-flex is-justify-content-center pagination has-text-weight-bold is-size-5"
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
                    <footer className="modal-card-foot has-background-white">
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
                                <p>Inicia sesion <Link href="/auth/login"> aqui</Link> para poder comentar</p>
                            </div>
                        }
                    </footer>
                </div>}
            </div>
            {isModal && <button className="modal-close is-large" aria-label="close" onClick={closeCommentModal}></button>}
        </div>
    )
}