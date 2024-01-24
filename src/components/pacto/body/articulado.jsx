import Article from "./pacto/article";
import Comments from "./pacto/comments";


export default async function ArticuladoBody({ project, articles, comments }) {



    return <>
     <div className="articles-pacto">
        
        {articles.length > 0 && articles.map((article) => <Article key={article._id} project={project} article={article} />
        )}
    </div>
        <Comments project={project} comments={comments} />
    </>
}