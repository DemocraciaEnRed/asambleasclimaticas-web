import { Swiper as SwiperComponent } from 'swiper/react';

import { SwiperSlide } from "swiper/react";

import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import axiosServices from '@/utils/axios';

export default function CommentModal({ postUrl, active, commentList, addCommentDefault, closeCommentModal, user, isModal }) {
    const [addComment, setAddComment] = useState(false)
    const [newComment, setNewComment] = useState('')

    useEffect(() => {
        if (addCommentDefault) setAddComment(true)
    }, [])

    const sendComment = () => {
        axiosServices.post(postUrl, { body: newComment })
        closeCommentModal()

    }

    return (
        <div className={`${isModal ? 'modal' : ''} comment-modal-wrapper ${active ? 'is-active' : ''}`}>
            {isModal && <div className="modal-background" onClick={closeCommentModal}></div>}
            <div className={`${isModal ? "modal-content" : ''}`} >

                {commentList && <div className="card">
                    <header className="card-header has-background-primary ">
                        <p className="card-header-title is-uppercase has-text-white is-justify-content-center">
                            comentarios
                        </p>
                        <button className="button p-0 mr-5 is-primary has-text-weight-bold" aria-label="close" onClick={closeCommentModal}>x</button>
                    </header>
                    <div className="card-content">
                        <div className="content">
                            {!addComment && <div>
                                {commentList.length > 0 &&
                                    <SwiperComponent navigation={true}
                                        modules={[Navigation]}
                                        className="mySwiper">
                                        {commentList.map(comment => <SwiperSlide key={comment._id}><div className="swiper-item p-6">
                                            <p>{comment.user.country.emoji} {comment.user.name}</p>
                                            <p>{comment.text}</p>
                                        </div></SwiperSlide>)}

                                    </SwiperComponent>}

                            </div>}
                            {(addComment || commentList.length === 0) && user &&
                                <div>
                                    <p>{user.name}</p>
                                    <textarea className="textarea" placeholder="Agregue su comentario aqui...." onChange={(e) => setNewComment(e.target.value)}></textarea>
                                </div>}
                        </div>
                    </div>
                    <footer className="card-footer">
                        {commentList.length > 0 && <a href="#" className="card-footer-item" onClick={() => setAddComment(!addComment)}>{addComment ? 'Ver comentarios' : 'Agregar comentario'}</a>}
                        {(addComment || commentList.length === 0) && <a href="#" className="card-footer-item" onClick={sendComment}> enviar comentario  </a>}
                    </footer>
                </div>}
            </div>
            {isModal && <button className="modal-close is-large" aria-label="close" onClick={closeCommentModal}></button>}
        </div>
    )
}