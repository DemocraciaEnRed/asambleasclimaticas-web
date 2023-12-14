import { useState, useEffect, useRef, forwardRef, useImperativeHandle} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretSquareUp, faSquareCaretDown, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import dynamic from 'next/dynamic'

const EditorComp = dynamic(() => import('@/components/common/editor'), { ssr: false })

const ArticleForm = forwardRef(({ article, moveUpArticle, moveDownArticle, deleteArticle }, ref) => {
  const [articleId] = useState(article._id || null);
  const [text_es, setText_es] = useState(article.text_es || '');
  const [text_pt, setText_pt] = useState(article.text_pt || '');
  const [position, setPosition] = useState(article.position || 1);
  const summary_es_ref = useRef(null);
  const summary_pt_ref = useRef(null);
  const [deleted, setDeleted] = useState(false);

  useImperativeHandle(ref, () => ({
    getOutput() {
      const output = {
        clientId: article.clientId,
        text_es: summary_es_ref.current.getMarkdown(),
        text_pt: summary_pt_ref.current.getMarkdown(),
        position: position,
      }
      if(deleted) output.deleted = true
      if(articleId) output.articleId = articleId
      return output
    }
  }));

  const handlePositionInput = (e) => {
    setPosition(e.target.value)
  }

  const toggleDeleted = () => {
    setDeleted(!deleted)
  }

  return (
    <div className='article-wrapper'>
      <div className='mb-4'>
        <div className="is-flex is-justify-content-space-between is-align-items-center is-justify-content-top">
          <h3 className="title is-5 mb-0">Artículo</h3>
          <div className="is-flex">
            <div className="is-clickable"><FontAwesomeIcon className="" icon={faCaretSquareUp} /></div>
            <div className="is-clickable mx-4"><FontAwesomeIcon className="" icon={faSquareCaretDown} /></div>
            <div className="is-clickable" onClick={toggleDeleted}><FontAwesomeIcon className="" icon={faTrashCan} /></div>
          </div>
        </div>
      </div>
      {
        deleted && <div className="notification is-warning px-2 py-2">
          <p class="is-size-7">Este artículo será eliminado, puede deshacer esta acción si lo desea.</p>
        </div>
      }
      <div className={`columns is-mobile ${deleted && 'marked-deleted'}`}>
        <div className="column is-12-tablet is-6-desktop">
          <EditorComp editorRef={summary_es_ref} markdown={text_es} es />
        </div>
        <div className="column is-12-tablet is-6-desktop">
          <EditorComp editorRef={summary_pt_ref} markdown={text_pt} pt />
        </div>
      </div>
    </div>
  )
})

ArticleForm.displayName = 'ArticleForm';

export default ArticleForm;
