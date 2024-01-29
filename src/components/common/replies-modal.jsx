import { Swiper as SwiperComponent } from 'swiper/react';

import { useEffect, useState } from 'react';
import axiosServices from '@/utils/axios';
import Link from 'next/link';
import Comment from '../pacto/body/pacto/comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';
import { postComments } from '@/utils/post-data';
import Pagination from './pagination';

export default function RepliesModal({ comment, commentUrl, active, addCommentDefault, closeCommentModal, user, project }) {
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
        <div className={`modal replies-modal-wrapper ${active ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={closeCommentModal}></div>
            <div className="modal-content" >

                {comments && <div className="card">
                    <div className="is-flex is-justify-content-end pt-3 px-3">

                        <FontAwesomeIcon onClick={closeCommentModal} icon={faXmark} />
                    </div>
                    <header className="card-header is-flex-direction-column ">


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
                                <p>Inicia sesión <Link href="/auth/login"> aquí</Link> para poder comentar</p>
                            </div>
                        }
                    </footer>
                </div>}
            </div>
        </div>
    )
}