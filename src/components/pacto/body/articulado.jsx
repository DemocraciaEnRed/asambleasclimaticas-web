import { faThumbsDown, faThumbsUp, faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Remark } from "react-remark";
import Article from "./pacto/article";
import Comments from "./pacto/comments";
import { fetchProjectArticle, fetchProjectComment } from "@/utils/get-data";

export default async function ArticuladoBody({ project }) {

    const [articles, comments] = await Promise.all([
        fetchProjectArticle(project._id),
        fetchProjectComment(project._id)
    ])

    return <>
     <div className="articles-pacto">
        
        {articles.length > 0 && articles.map((article) => <Article key={article._id} project={project} article={article} />
        )}
    </div>
        <Comments project={project} comments={comments} />
    </>
}