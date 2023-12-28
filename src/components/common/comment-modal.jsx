import { Swiper as SwiperComponent } from 'swiper/react';

import { SwiperSlide } from "swiper/react";

import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import axiosServices from '@/utils/axios';
import { useRouter } from 'next/navigation';

export default function CommentModal({ postUrl, active, commentList, addCommentDefault, closeCommentModal, user, isModal }) {
    const [addComment, setAddComment] = useState(false)
    const [newComment, setNewComment] = useState('')
    const [error, setError] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (addCommentDefault) {
            if(!user) router.push('/auth/login')

            setAddComment(true)
            
        }
    }, [])

    const sendComment = () => {
        if(newComment){
            axiosServices.post(postUrl, { body: newComment })
            closeCommentModal()
        }else{
            setError(true)
        }

    }

    const handleNewComment = () => {
        if(!addComment && !user) router.push('/auth/login')
        setAddComment(!addComment)
    }

    return (
        <div className={`${isModal ? 'modal' : 'is-stick-top'} comment-modal-wrapper ${active ? 'is-active' : ''}`}>
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
                                    <textarea className={`textarea ${error?'is-danger':''}`} placeholder="Agregue su comentario aqui...." onChange={(e) => setNewComment(e.target.value)}></textarea>
                                </div>}
                        </div>
                    </div>
                    <footer className="card-footer">
                        {commentList.length > 0 && <button href="#" className="card-footer-item has-text-primary" onClick={handleNewComment}>{addComment ? 'Ver comentarios' : 'Agregar comentario'}</button>}
                        {(addComment || commentList.length === 0) && <button href="#" className="card-footer-item has-text-primary" onClick={sendComment}> enviar comentario  </button>}
                    </footer>
                </div>}
            </div>
            {isModal && <button className="modal-close is-large" aria-label="close" onClick={closeCommentModal}></button>}
        </div>
    )
}