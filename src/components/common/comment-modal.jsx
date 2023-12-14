import { Swiper as SwiperComponent } from 'swiper/react';

import { SwiperSlide } from "swiper/react";

import { Navigation } from 'swiper/modules';
import { useState } from 'react';
import axiosServices from '@/utils/axios';

export default function CommentModal({postUrl, active, comments, closeCommentModal, user }) {
    const [addComment, setAddComment] = useState(false)
    const [newComment, setNewComment] = useState('')
    console.log(user);

    const sendComment = () => {
        axiosServices.post(postUrl, { body: newComment })

    }

    return (
        <div className={`modal comment-modal-wrapper ${active ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={closeCommentModal}></div>
            <div className="modal-content">

                <div className="card">
                    <header className="card-header has-background-primary ">
                        <p className="card-header-title is-uppercase has-text-white is-justify-content-center">
                            comentarios
                        </p>

                    </header>
                    <div className="card-content">
                        <div className="content">
                            {!addComment && <div>
                                {comments.length > 0 &&
                                    <SwiperComponent navigation={true}
                                        modules={[Navigation]}
                                        className="mySwiper">
                                        {comments.map(comment => <SwiperSlide  key={comment._id}><div className="swiper-item p-6">
                                            <p>{comment.user.country.emoji} {comment.user.name}</p>
                                            <p>{comment.text}</p>
                                        </div></SwiperSlide>)}

                                    </SwiperComponent>}

                            </div>}
                            {(addComment || comments.length === 0) && user && 
                                <div>
                                    <p>{user.name}</p>
                                    {postUrl}
                                    <textarea className="textarea" placeholder="e.g. Hello world" onChange={(e) => setNewComment(e.target.value)}></textarea>
                                </div>}
                        </div>
                    </div>
                    <footer className="card-footer">
                        {comments.length > 0 && <a href="#" className="card-footer-item" onClick={() => setAddComment(!addComment)}>{addComment ? 'Ver comentarios' : 'Agregar comentario'}</a>}
                        {(addComment || comments.length === 0) && <a href="#" className="card-footer-item" onClick={sendComment}> enviar comentario  </a>}
                    </footer>
                </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={closeCommentModal}></button>
        </div>
    )
}