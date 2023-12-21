import { useState, useEffect, useRef, forwardRef, useImperativeHandle} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretSquareUp, faSquareCaretDown, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import dynamic from 'next/dynamic'

const EditorComp = dynamic(() => import('@/components/common/editor'), { ssr: false })

const ArticleForm = forwardRef(({ article, moveArticleUp, moveArticleDown, toggleArticleDeleted, mode, published }, ref) => {
  const [articleId] = useState(article._id || null);
  const [text_es, setText_es] = useState(article.text_es || '');
  const [text_pt, setText_pt] = useState(article.text_pt || '');
  // const [position, setPosition] = useState(article.position || 1);
  const summary_es_ref = useRef(null);
  const summary_pt_ref = useRef(null);
  const [deleted, setDeleted] = useState(article.deleted || false);

  let canDelete = true
  if(mode === 'edit') {
    if(published) {
      canDelete = false
    }
  }
  
  useImperativeHandle(ref, () => ({
    clientId: article.clientId,
    getOutput() {
      const output = {
        clientId: article.clientId,
        text_es: summary_es_ref.current.getMarkdown(),
        text_pt: summary_pt_ref.current.getMarkdown(),
      }
      if(deleted) output.deleted = true
      if(articleId) output._id = articleId
      return output
    },
    getCurrentTextEs() {
      return summary_es_ref.current.getMarkdown()
    },
    getCurrentTextPt() {
      return summary_pt_ref.current.getMarkdown()
    },
    getCurrentDeleted() {
      return deleted
    }
  }));

  function clickArticleUp() {
    const text_es = summary_es_ref.current.getMarkdown()
    const text_pt = summary_pt_ref.current.getMarkdown()
    moveArticleUp(article.clientId, text_es, text_pt)
  }

  function clickArticleDown() {
    const text_es = summary_es_ref.current.getMarkdown()
    const text_pt = summary_pt_ref.current.getMarkdown()
    moveArticleDown(article.clientId, text_es, text_pt)
  }

  const toggleDeleted = () => {
    if(mode === 'edit') {
      if(published) {
        return
      }
    }
    toggleArticleDeleted(article.clientId)
    setDeleted(!deleted)
  }

  return (
    <div className='article-wrapper'>
      <div className='mb-4'>
        <div className="is-flex is-justify-content-space-between is-align-items-center is-justify-content-top">
          <h3 className="title is-5 mb-0">Artículo</h3>
          <div className="is-flex">
            <div className="is-clickable"><FontAwesomeIcon className="" icon={faCaretSquareUp} onClick={clickArticleUp}/></div>
            <div className="is-clickable ml-4"><FontAwesomeIcon className="" icon={faSquareCaretDown} onClick={clickArticleDown} /></div>
            {
              canDelete && <div className="is-clickable ml-4" onClick={toggleDeleted}><FontAwesomeIcon className="" icon={faTrashCan} /></div>
            }
          </div>
        </div>
      </div>
      {
        deleted && <div className="notification is-warning px-2 py-2">
          <p className="is-size-7">Este artículo será eliminado, puede deshacer esta acción si lo desea.</p>
        </div>
      }
      <div className={`columns is-multiline is-mobile ${deleted && 'marked-deleted'}`}>
        <div className="column is-12-mobile is-12-tablet is-6-desktop is-6-widescreen is-6-fullhd">
          <EditorComp editorRef={summary_es_ref} markdown={text_es} es />
        </div>
        <div className="column is-12-mobile is-12-tablet is-6-desktop is-6-widescreen is-6-fullhd">
          <EditorComp editorRef={summary_pt_ref} markdown={text_pt} pt />
        </div>
      </div>
      <hr />
    </div>
  )
})

ArticleForm.displayName = 'ArticleForm';

export default ArticleForm;
