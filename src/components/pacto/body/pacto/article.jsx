import { faThumbsDown, faThumbsUp, faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper as SwiperComponent } from 'swiper/react';
import { SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import { Remark } from "react-remark";
import axiosServices from "@/utils/axios";
import { useState } from "react";

export default function Article({ project, article }) {
    const [showComments, setShowComments] = useState(false)
    const [comments, setComments] = useState(null)

    const handleLike = async () => {
        const resp = await axiosServices.post(`/projects/${project._id}/articles/${article._id}/like`)
    }
    const handleDislike = async () => {
        const resp = await axiosServices.post(`/projects/${project._id}/articles/${article._id}/dislike`)
    }
    const handleShowComments = async () => {
        const resp = await axiosServices.get(`/projects/${project._id}/articles/${article._id}/comments`)
        setComments(resp.data.comments);
        setShowComments(!showComments)
    }


    return (
        <div className="columns article my-4">
            <div className={`column  ${showComments ? 'is-8':'is-9'}`}>
                <div className="card ">
                    <div className="card-content is-size-5 columns" >
                        <div className="content w-100">
                            <Remark>
                                {article.text_es}
                            </Remark>
                        </div>
                    </div>
                    <footer className="card-footer has-background-primary is-flex is-justify-content-space-between py-2 px-4">
                        <div>
                            <button className="button is-white has-text-primary is-rounded mx-2" onClick={handleLike}> <FontAwesomeIcon className="mr-3" icon={faThumbsUp} /> Me gusta ({article.likes}) </button>
                            <button className="button is-white has-text-primary is-rounded mx-2" onClick={handleDislike}> <FontAwesomeIcon className="mr-3" icon={faThumbsDown} /> No me gusta ({article.dislikes}) </button>
                        </div>
                        <div className="is-flex is-align-items-center">
                            <span className="has-text-white" onClick={handleShowComments}> {article.commentsCount} Comentarios </span>
                            <button className="button is-white has-text-primary is-rounded mx-2"><FontAwesomeIcon className="mr-3" icon={faComment} /> Comentar</button>
                        </div>
                    </footer>
                </div>
            </div>
            <div className={`column column-comment-article ${showComments ? ' is-4':'is-3 is-hidden'}`} >
                <div className="card w-100 card-comment-article" >
                    <header className="card-header has-background-primary ">
                        <p className="card-header-title is-uppercase has-text-white is-justify-content-center">
                            comentarios
                        </p>

                    </header>
                    <div className="card-content">
                        <div className="content">
                             <div>
                                {comments &&
                                    <SwiperComponent navigation={true}
                                        modules={[Navigation]}
                                        className="mySwiper">
                                        {comments.map(comment => <SwiperSlide key={comment._id}><div className="swiper-item p-6">
                                            <p>{comment.user.country.emoji} {comment.user.name}</p>
                                            <p>{comment.text}</p>
                                        </div></SwiperSlide>)}

                                    </SwiperComponent>}

                            </div>
                           {/*  {(addComment || comments.replies.length === 0) && user &&
                                <div>
                                    <p>{user.name}</p>
                                    <textarea className="textarea" placeholder="Agregue su comentario aqui...." onChange={(e) => setNewComment(e.target.value)}></textarea>
                                </div>} */}
                        </div>
                    </div>
                    <footer className="card-footer">
                        {/* {comments.replies.length > 0 && <a href="#" className="card-footer-item" onClick={() => setAddComment(!addComment)}>{addComment ? 'Ver comentarios' : 'Agregar comentario'}</a>}
                        {(addComment || comments.replies.length === 0) && <a href="#" className="card-footer-item" onClick={sendComment}> enviar comentario  </a>} */}
                    </footer>
                </div>
            </div>
        </div>

    )
}