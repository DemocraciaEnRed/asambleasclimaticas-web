'use client'
import { useState } from "react";

import Image from "next/image";
import { Remark } from "react-remark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";

import { toDislike, toLike } from "@/utils/post-data";
import ArticleModal from "./article-modal";
import { useLanguage } from "@/context/lang-context";

export default function Article({ project, article }) {
    const [likes, setLikes] = useState(article.likes);
    const [liked, setLiked] = useState(article.liked);
    const [disliked, setDisliked] = useState(article.disliked);
    const [dislikes, setDislikes] = useState(article.dislikes);
    const [showComments, setShowComments] = useState(false);
    const { language } = useLanguage();
    const handleLike = async () => {
        const resp = await toLike(
            `/projects/${project._id}/articles/${article._id}`
        );
        if (resp.status === 200) {
            setLikes(likes + 1);
            setLiked(!liked);
        }
        if (resp.type === "changed") {
            setDislikes(dislikes - 1);
            setDisliked(!disliked);
        }
        if (resp.type === "removed") {
            setLikes(likes - 1);
            setLiked(!liked);
        }
    };
    const handleDislike = async () => {
        const resp = await toDislike(
            `/projects/${project._id}/articles/${article._id}`
        );
        if (resp.status === 200) {
            setDislikes(dislikes + 1);
            setDisliked(!disliked);
        }
        if (resp.type === "changed") {
            setLikes(likes - 1);
            setLiked(!liked);
        }
        if (resp.type === "removed") {
            setDislikes(dislikes - 1);
            setDisliked(!disliked);
        }
    };

    const handleShowComments = () => {
        setShowComments(true);
    };

    return (
        <div className="columns mx-0 article my-4">
            <div className="column  is-11 is-12-touch">
                <div className={"card " + (article.notInteractive ? "card-article-title" : "card-article")}>
                    <div className="card-content is-size-5 columns mx-0">
                        <div className="content w-100 is-size-7-touch">
                            <Remark>
                                {language === "pt"
                                    ? article.text_pt
                                    : article.text_es}
                            </Remark>
                        </div>
                    </div>
                    {!article.notInteractive && <footer
                        className={`card-footer has-background-primary is-flex is-justify-content-space-between is-relative ${
                            project.version !== project.currentVersion
                                ? "disabled"
                                : ""
                        }`}
                    >
                        <div className="is-flex likes">
                            <button
                                disabled={
                                    project.version !== project.currentVersion
                                }
                                className={`button is-rounded is-size-6-tablet is-size-7-mobile ${
                                    liked
                                        ? "has-background-primary-dark has-text-white"
                                        : "is-white has-text-primary"
                                }`}
                                onClick={handleLike}
                            >
                                <Image
                                    src={`/icon/like.svg`}
                                    alt="like icon"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className="mr-1"
                                />
                                <p className="is-hidden-touch mr-1">Me gusta</p>
                                ({likes})
                            </button>
                            <button
                                disabled={
                                    project.version !== project.currentVersion
                                }
                                className={`button is-rounded is-size-6-tablet is-size-7-mobile ${
                                    disliked
                                        ? "has-background-primary-dark has-text-white"
                                        : "is-white has-text-primary"
                                }`}
                                onClick={handleDislike}
                            >
                                <Image
                                    src={`/icon/dislike.svg`}
                                    alt="like icon"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className="mr-1"
                                />
                                <p className="is-hidden-touch mr-1">
                                    No me gusta
                                </p>
                                ({dislikes})
                            </button>
                        </div>
                        <div className="is-flex is-align-items-center comments ">
                            <span
                                className="has-text-white is-clickable is-hidden-mobile"
                                onClick={handleShowComments}
                            >
                                {article.commentsCount} Comentarios
                            </span>
                            <button
                                disabled={
                                    project.version !== project.currentVersion
                                }
                                className="button is-white has-text-primary is-rounded is-size-6-tablet is-size-7-mobile"
                                onClick={handleShowComments}
                            >
                                <FontAwesomeIcon icon={faComment} /> Comentar
                            </button>
                        </div>
                    </footer>}
                </div>
            </div>
            {showComments && (
                <ArticleModal
                    article={article}
                    active={showComments}
                    closeCommentModal={() => setShowComments(false)}
                    likes={likes}
                    dislikes={dislikes}
                    liked={liked}
                    disliked={disliked}
                    handleDislike={handleDislike}
                    handleLike={handleLike}
                    project={project}
                />
            )}
        </div>
    );
}