'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp, faComment, faMessage } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import axiosServices from "@/utils/axios";
import CommentModal from "@/components/common/comment-modal";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import Comment from "./comment";
import { useSelector } from "react-redux";
import Link from "next/link";


export default function Comments({ project, comments }) {
    const [commentList, setCommensList] = useState(comments.comments)
    const { user } = useSelector((state) => state.auth)


    const handlesubmit = async (event) => {
        event.preventDefault()

        const resp = await axiosServices.post(`/projects/${project._id}/comments`, { body: event.target[0].value })
        resp.data.user = user
        setCommensList([resp.data, ...commentList])
    }



    return (
        <div className="comment-section">
            <h4 className="my-4">Comentarios:</h4>
            {user ? <div className="comment-form">
                <h2 className="has-text-primary has-text-weight-bold ">Puede dejar sus comentarios sobre la presentación del proyecto aquí</h2>
                <form action="submit" className="my-4" onSubmit={handlesubmit}>
                    <textarea className="textarea my-4" placeholder="Comience a escribir su comentario.."></textarea>
                    <button className="button is-primary is-rounded">Enviar comentario</button>
                </form>
            </div>
                :
                <div >
                    <p>Inicia sesion <Link href="/auth/login"> aqui</Link> para poder comentar</p>
                </div>
            }
            <hr/>
            <div className="comment-list">
                <div className="box">
                    {commentList.length > 0 && commentList.map(comment => <Comment project={project} comment={comment} key={comment._id} />
                    )}
                </div>
            </div>
        </div>
    )
}