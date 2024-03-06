'use client'
import { useState } from "react";
import Comment from "./comment";
import Link from "next/link";
import Pagination from "@/components/common/pagination";
import { useAuthContext } from "@/context/auth-context";
import { postComments } from "@/utils/post-data";
import { fetchGeneralComments } from "@/utils/get-data";
import { ClosedProjectcheck } from "@/utils/format";


export default function Comments({ project, comments }) {
    const [commentList, setCommensList] = useState(comments.comments)
    const [textNewComment, setTextNewComment] = useState('')

    const { user } = useAuthContext()

    const handlesubmit = async (event) => {
        try {
            event.preventDefault()
            const resp = await postComments(`/projects/${project._id}/comments`, { body: textNewComment })
            resp.user = user
            fetchComments()
            setTextNewComment('')
        } catch (err) {
            console.error(err);
        }
    }

    const fetchComments = async (page) => {
        try {
            const commentList = await fetchGeneralComments(`/projects/${project._id}/comments${page ? '?page=' + page : ''}`)
            const comments = await commentList
            setCommensList(comments.comments)
        } catch (err) {
            console.error(err);
        }
    }

    const deleteCommentFromList = (commentId) => {
        const newComentList = [...commentList]
        let index = commentList.findIndex(comment => comment._id === commentId);
        newComentList.splice(index, 1)
        if (index !== -1) setCommensList(newComentList)
    }   

    return (
        <div className={`comment-section ${project.version !== project.currentVersion ? 'disabled is-relative' : ''}`}>
            <h4 className="my-4">Comentarios:</h4>
            {!ClosedProjectcheck(project.closedAt) && project.version === project.currentVersion ? <>
                {user ? <div className="comment-form">
                    <h2 className="has-text-primary has-text-weight-bold ">Puede dejar sus comentarios sobre la presentación del proyecto aquí</h2>
                    <form action="submit" className="my-4" onSubmit={handlesubmit}>
                        <textarea
                            className="textarea my-4"
                            placeholder="Comience a escribir su comentario.."
                            value={textNewComment}
                            onChange={(e) => setTextNewComment(e.target.value)} />
                        <button className="button is-primary is-rounded">Enviar comentario</button>
                    </form>
                </div>
                    :
                    <div >
                        <p>Inicia sesión <Link href="/auth/login"> aquí</Link> para poder comentar</p>
                    </div>
                }
            </>
                :
                <div >
                    {ClosedProjectcheck(project.closedAt)
                        ?
                        <p>Este pacto esta finalizado no se puede comentar</p>
                        :
                        <p>Estas viendo una version anterior no se puede comentar</p>
                    }
                </div>
            }
            <hr />
            <div className="comment-list">
                <div className="box">
                    {commentList.length > 0 && commentList.map(comment =>
                        <Comment
                            project={project}
                            comment={comment}
                            key={comment._id}
                            urlComment={`/projects/${project._id}/comments/${comment._id}`}
                            deleteCommentFromList={deleteCommentFromList}
                            answerable
                        />
                    )}
                </div>
                {comments.total / comments.limit > 1 &&<Pagination
                    className="is-flex is-justify-content-center pagination"
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={(e) => fetchComments(e.selected + 1)}
                    pageRangeDisplayed={comments.limit}
                    pageCount={Math.ceil(comments.total / comments.limit)}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />}
            </div>
        </div>
    )
}