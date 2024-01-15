'use client'
import axiosServices from "@/utils/axios";
import { useState } from "react";
import Comment from "./comment";
import { useSelector } from "react-redux";
import Link from "next/link";
import ReactPaginate from "react-paginate";


export default function Comments({ project, comments }) {
    const [commentList, setCommensList] = useState(comments.comments)
    const { user } = useSelector((state) => state.auth)


    const handlesubmit = async (event) => {
        try {
            event.preventDefault()
            const resp = await axiosServices.post(`/projects/${project._id}/comments`, { body: event.target[0].value })
            resp.data.user = user
            setCommensList([resp.data, ...commentList])
            event.target[0].value = ''
        } catch (err) {
            console.log(err);
        }
    }

    const fetchMoreComments = async (page) => {
        try {
            const resp = await axiosServices.get(`/projects/${project._id}/comments?page=${page}`)
            const comments = await resp.data
            setCommensList(comments.comments)
        } catch (err) {
            console.log(err);
        }
    }

    const handlePageClick = (event) => {
        const newOffset = event.selected + 1;
        fetchMoreComments(newOffset)
    }


    return (
        <div className="comment-section">
            <h4 className="my-4">Comentarios:</h4>
            {user ? <div className="comment-form">
                <h2 className="has-text-primary has-text-weight-bold ">Puede dejar sus comentarios sobre la presentación del proyecto aquí</h2>
                <form action="submit" className="my-4" onSubmit={handlesubmit}>
                    <textarea className="textarea my-4" placeholder="Comience a escribir su comentario.."  ></textarea>
                    <button className="button is-primary is-rounded">Enviar comentario</button>
                </form>
            </div>
                :
                <div >
                    <p>Inicia sesion <Link href="/auth/login"> aqui</Link> para poder comentar</p>
                </div>
            }
            <hr />
            <div className="comment-list">
                <div className="box">
                    {commentList.length > 0 && commentList.map(comment => <Comment projectId={project._id} comment={comment} key={comment._id} urlComment={`/projects/${project._id}/comments/${comment._id}`} answerable />
                    )}
                </div>
                <ReactPaginate
                    className="is-flex is-justify-content-center pagination has-text-weight-bold is-size-5"
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={comments.limit}
                    pageCount={Math.ceil(comments.total / comments.limit)}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    )
}