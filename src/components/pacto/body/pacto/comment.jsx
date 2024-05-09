'use client'
import { useState } from "react";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faStar,
    faMessage,
    faCheckCircle,
    faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import {
    faStar as faStarSolid,
    faCheckCircle as faSolidCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

import {
    highlighteComment,
    resolveComment,
    toDislike,
    toLike,
} from "@/utils/post-data";
import RepliesModal from "@/components/common/replies-modal";
import { useAuthContext } from "@/context/auth-context";
import CommentContent from "@/components/common/comment-content";
import { deleteComment } from "@/utils/delete-data";
import { useAlert } from "@/context/alert-context";

export default function Comment({
    project,
    comment,
    urlComment,
    answerable,
    deleteCommentFromList,
}) {
    const [commentSelected, setCommentSelected] = useState(null);
    const [likes, setLikes] = useState(comment.likes || 0);
    const [dislikes, setDislikes] = useState(comment.dislikes || 0);
    const [liked, setliked] = useState(
        comment.liked ? "liked" : comment.disliked ? "disliked" : null
    );
    const [highlighted, setHighlighted] = useState(
        comment.highlightedInVersion
    );
    const [resolved, setResolved] = useState(comment.resolvedInVersion);
    const [deleteTime, setDeleteTime] = useState(false);

    const { user } = useAuthContext();
    const { addAlert, removeAlert } = useAlert();

    const handleComment = async () => {
        setCommentSelected(comment);
    };

    const handleLike = async () => {
        const resp = await toLike(`${urlComment}`);
        if (resp.status === 200) setLikes(likes + 1);
        setliked("liked");
        if (resp.type === "changed") setDislikes(dislikes - 1);
        if (resp.type === "removed") {
            setLikes(likes - 1);
            setliked(null);
        }
    };
    const handleDislike = async () => {
        const resp = await toDislike(`${urlComment}`);
        if (resp.status === 200) setDislikes(dislikes + 1);
        setliked("disliked");
        if (resp.type === "changed") setLikes(likes - 1);
        if (resp.type === "removed") {
            setDislikes(dislikes - 1);
            setliked(null);
        }
    };

    const handleHighlighted = async () => {
        const comment = await highlighteComment(urlComment);
        setHighlighted(comment.highlightedInVersion);
        setResolved(comment.resolvedInVersion);
    };

    const handleResolved = async () => {
        const comment = await resolveComment(urlComment);
        setHighlighted(comment.highlightedInVersion);
        setResolved(comment.resolvedInVersion);
    };

    const handleDelete = async () => {
        let timeToCancel = 10000;
        addAlert(
            "Si esta seguro de eliminar este comentario haga nuevamente click en el botón",
            "danger",
            false,
            timeToCancel
        );
        const timeout = setTimeout(() => {
            setDeleteTime(false);
        }, timeToCancel);

        if (deleteTime) {
            clearTimeout(timeout);
            try {
                await deleteComment(urlComment);
                deleteCommentFromList(comment._id);
                setDeleteTime(false);
                removeAlert();
            } catch (err) {
                addAlert(err.message, "danger");
                console.error(err);
            }
            return;
        }
        setDeleteTime(true);
    };

    // status if it is an admin or moderator
    const isAdminOrModerator = () => {
        if(!user) return false;
        return user.role === "admin" || user.role === "moderator";
    }
    // // status if it is the author of the project
    // const isAuthor = () =>
    //     user.role === "author" && user._id === project.author._id;
    // // status if it is the owner of the comment
    // const isCommentOwner = () => user._id === comment.user._id;


    const canDeleteComment = () => {
        if (!user) return false;

        const isAdminOrModerator =
            user.role === "admin" || user.role === "moderator";
        const isAuthor =
            user.role === "author" && user._id === project.author._id;
        const isCommentOwner = user._id === comment.user._id;

        return isAdminOrModerator || isAuthor || isCommentOwner;
    };

    const showResolvedButton = () => {
        // NOTE: if resolved or highlighted is 0 then it hasnt been resolved nor highlighted

        // if the comment is not highlighted or resolved then it should be available
        const resolvedOrHighlighted = Math.max(resolved,highlighted);
        if(resolvedOrHighlighted === 0) return true
        // if the comment has been resolved in the current version then the button is available (to remove the highlight)
        if(resolved > 0 && resolved === project.version) return true
        // if the comment has been resolved or highlighted in a previous version then the button is not available
        if(resolvedOrHighlighted > 0 && resolvedOrHighlighted < project.version) return false
        // if the comment has been highlighted in a previous version then the button is not available
        if(highlighted > 0 && highlighted <= project.version) return false

        return true
    }

    const showHighlightedButton = () => {
        // NOTE: if resolved or highlighted is 0 then it hasnt been resolved nor highlighted

        // if the comment is not highlighted or resolved then it should be available
        const resolvedOrHighlighted = Math.max(resolved,highlighted);
        if(resolvedOrHighlighted === 0) return true
        // if the comment has been highlighted in the current version then the button is available (to remove the highlight)
        if(highlighted > 0 && highlighted == project.version) return true
        // if the comment has been resolved or highlighted in a previous version then the button is not available
        if(resolvedOrHighlighted > 0 && resolvedOrHighlighted < project.version) return false
        // if the comment has been resolved in a previous version, or in the current, then the button is not available
        if(resolved > 0 && resolved <= project.version) return false
        return true
    }

    return (
        <div className="comment-wrapper pt-3">
            <div className="is-flex is-justify-content-space-between">
                <div className="likes is-flex is-align-items-center">
                    {likes > 0 && likes}
                    <Image
                        onClick={handleLike}
                        src="/icon/like.svg"
                        alt="like icon"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className={`mx-1 is-clickable ${
                            liked === "liked" ? "liked" : ""
                        }`}
                    />
                    <Image
                        onClick={handleDislike}
                        src="/icon/dislike.svg"
                        alt="dislike icon"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className={`mx-1 is-clickable ${
                            liked === "disliked" ? "disliked" : ""
                        }`}
                    />
                    {dislikes > 0 && dislikes}
                    {/* {(!user ||
                        (user &&
                            !(
                                user.role === "admin" ||
                                user.role === "moderator"
                            ))) && (
                        <div className="is-inline highlighted">
                            <div className="is-relative is-inline ">
                                {highlighted === project.version && (
                                    <>
                                        <FontAwesomeIcon
                                            className={`mx-2 has-text-warning`}
                                            icon={faStarSolid}
                                        />
                                        <span className="tag is-light is-absolute">
                                            Aporte destacado - Recibido en
                                            version{" "}
                                            {comment.highlightedInVersion}
                                        </span>
                                    </>
                                )}
                            </div>
                            <div className="is-relative is-inline ">
                                {resolved === project.version && (
                                    <>
                                        <FontAwesomeIcon
                                            className={`mx-2 has-text-success`}
                                            icon={faSolidCheckCircle}
                                        />
                                        <span className="tag is-light is-absolute">
                                            Aporte resuelto por un admin
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    )} */}
                    <div className="is-inline highlighted">
                        <div className="is-relative is-inline ">
                            {0 != highlighted && highlighted <= project.version && (
                                <>
                                    <FontAwesomeIcon
                                        className={`mx-2 has-text-warning`}
                                        icon={faStarSolid}
                                    />
                                    <span className="tag is-light is-absolute">
                                        Aporte destacado - Recibido en
                                        ver. {highlighted}
                                    </span>
                                </>
                            )}
                        </div>
                        <div className="is-relative is-inline ">
                            {0 != resolved && resolved <= project.version && (
                                <>
                                    <FontAwesomeIcon
                                        className={`mx-2 has-text-success`}
                                        icon={faSolidCheckCircle}
                                    />
                                    <span className="tag is-light is-absolute">
                                        Aporte resuelto por un admin en ver. {resolved}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="is-flex">
                    {answerable && (
                        <>
                            <div
                                className="replies is-clickable"
                                onClick={handleComment}
                            >
                                {comment.repliesCount} Respuesta
                                {comment.repliesCount > 1 && "s"}
                                <FontAwesomeIcon
                                    color="grey"
                                    className="mx-2"
                                    icon={faMessage}
                                />
                            </div>
                            { isAdminOrModerator() && (
                                <div className="highlighted">
                                    {
                                        showHighlightedButton() &&
                                        <div className="is-inline is-clickable is-relative" onClick={handleHighlighted}>
                                            <span className={`tag ${highlighted === project.version ? "is-light" : "is-warning" }`}                                        >
                                                {highlighted === project.version ? "Quitar destacado" : "Destacar comentario"}
                                            </span>
                                            <FontAwesomeIcon className={`mx-2  ${ highlighted === project.version ? "has-text-warning" : "" }`} icon={ highlighted === project.version ? faStarSolid : faStar } />
                                        </div>
                                    }
                                    { showResolvedButton() && comment.article && (
                                        <div className="is-inline is-clickable is-relative" onClick={handleResolved} >
                                            <span className={`tag ${ resolved === project.version ? "is-light" : "is-success" }`}>
                                                {resolved === project.version ? "Quitar resuelto" : "Resolver comentario"}
                                            </span>
                                            <FontAwesomeIcon className={`mx-2  ${ resolved === project.version ? "has-text-success" : "" }`} icon={ resolved === project.version ? faSolidCheckCircle : faCheckCircle } />
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                    <div className="highlighted">
                        {canDeleteComment() && (
                            <div
                                className="is-inline is-clickable is-relative  "
                                onClick={handleDelete}
                            >
                                <span className="tag is-danger">
                                    Eliminar comentario
                                </span>
                                <FontAwesomeIcon
                                    className="mx-2"
                                    icon={faTrashAlt}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <CommentContent
                emoji={comment.user.country.emoji}
                username={comment.user.name}
                participatedInAssembly={comment.user.participatedInAssembly}
                createdAt={comment.createdAt}
                text={comment.text}
            />
            {commentSelected && (
                <RepliesModal
                    comment={commentSelected}
                    commentUrl={`${urlComment}/replies`}
                    active={commentSelected._id === comment._id}
                    project={project}
                    closeCommentModal={() => setCommentSelected(null)}
                    user={user}
                />
            )}
        </div>
    );
}