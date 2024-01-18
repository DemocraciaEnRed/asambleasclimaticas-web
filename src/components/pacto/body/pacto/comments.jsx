'use client'
import axiosServices from "@/utils/axios";
import { useState } from "react";
import Comment from "./comment";
import { useSelector } from "react-redux";
import Link from "next/link";
import Pagination from "@/components/common/pagination";


export default function Comments({ project, comments }) {
    const [commentList, setCommensList] = useState(comments.comments)
    const [textNewComment, setTextNewComment] = useState('')
    const { user } = useSelector((state) => state.auth)


    const handlesubmit = async (event) => {
        try {
            event.preventDefault()
            const resp = await axiosServices.post(`/projects/${project._id}/comments`, { body: textNewComment })
            resp.data.user = user
            fetchComments()
            setTextNewComment('')
        } catch (err) {
            console.log(err);
        }
    }

    const fetchComments = async (page) => {
        try {
            const resp = await axiosServices.get(`/projects/${project._id}/comments${page ? '?page=' + page : ''}`)
            const comments = await resp.data
            setCommensList(comments.comments)
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="comment-section">
            <h4 className="my-4">Comentarios:</h4>
            {user ? <div className="comment-form">
                <h2 className="has-text-primary has-text-weight-bold ">Puede dejar sus comentarios sobre la presentación del proyecto aquí</h2>
                <form action="submit" className="my-4" onSubmit={handlesubmit}>
                    <textarea 
                        className="textarea my-4" 
                        placeholder="Comience a escribir su comentario.."  
                        value={textNewComment} 
                        onChange={(e) => setTextNewComment(e.target.value)}/>
                    <button className="button is-primary is-rounded">Enviar comentario</button>
                </form>
            </div>
                :
                <div >
                    <p>Inicia sesión <Link href="/auth/login"> aquí</Link> para poder comentar</p>
                </div>
            }
            <hr />
            <div className="comment-list">
                <div className="box">
                    {commentList.length > 0 && commentList.map(comment => <Comment project={project} comment={comment} key={comment._id} urlComment={`/projects/${project._id}/comments/${comment._id}`} answerable />
                    )}
                </div>
                <Pagination
                    className="is-flex is-justify-content-center pagination"
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={(e) => fetchComments(e.selected + 1)}
                    pageRangeDisplayed={comments.limit}
                    pageCount={Math.ceil(comments.total / comments.limit)}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    )
}