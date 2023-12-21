"use client"

import dynamic from 'next/dynamic'
import { useEffect, useState, useRef, createRef, useMemo } from "react"
import { useRouter } from "next/navigation"

// import { useAuth } from "@/context/auth-context"
import axiosServices from "@/utils/axios"
// import { useRouter } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faAsterisk, faCaretRight, faPaperPlane, faEyeSlash, faSave } from "@fortawesome/free-solid-svg-icons";
import slugify from 'slugify'
import { InputMask } from '@react-input/mask';
import ArticleForm from '@/components/pacto/form/articleForm'
import projectFormUtils from '@/utils/projectForm'
import { useSelector } from 'react-redux';
import AuthorField from './authorField';

const EditorComp = dynamic(() => import('@/components/common/editor'), { ssr: false })

export default function ProjectFormComponent({project}) {
  // UTILITY FUNCTIONS FOR INITIALIZATION
  // Utility function to generate a random clientId
  const getRandomClientId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  const getYearMonthDayIn30Days = () => {
    // add leading zero to month and day
    const date = new Date();
    date.setDate(date.getDate() + 30);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`
  }
  // -------------------------------------
  // INITIALIZATIONS
  const router = useRouter()  
  const mode = project ? 'edit' : 'new'
  const { user } = useSelector(state => state.auth)
  const userIsAdmin = user && user.role === 'admin'
  let init_articles = [
    {
      clientId: getRandomClientId(),
      test_es: '',
      test_pt: '',
    }
  ]
  // const user = useAuth()
  // const { push } = useRouter();
  let init_closedAt = getYearMonthDayIn30Days()
  // -------------------------------------
  // INITIALIZATIONS FOR EDIT MODE
  const init_title_es = project ? project.title_es : ''
  const init_title_pt = project ? project.title_pt : ''
  const init_slug = project ? project.slug : ''
  const init_coverUrl = project && project.coverUrl ? project.coverUrl : ''
  const init_youtubeUrl = project && project.youtubeUrl ? project.youtubeUrl : ''
  const youtubeIdMatch = project && project.youtubeUrl ? project.youtubeUrl.match(/https:\/\/www.youtube.com\/embed\/(.*)/) : ''
  const init_youtubeId = youtubeIdMatch && youtubeIdMatch[1] ? youtubeIdMatch[1] : ''
  const init_stage = project ? project.stage : 'MX'
  const init_about_es = project ? project.about_es : projectFormUtils.getPlaceholderAboutEs()
  const init_about_pt = project ? project.about_pt : projectFormUtils.getPlaceholderAboutPt()
  if(project && project.articles){
    init_articles = project.articles.map(article => {
      return {
        _id: article._id,
        clientId: getRandomClientId(),
        text_es: article.text_es,
        text_pt: article.text_pt,
      }
    })
  }
  if(project && project.closedAt) {
    const closedAtDate = new Date(project.closedAt)
    const year = closedAtDate.getFullYear();
    const month = (closedAtDate.getMonth() + 1).toString().padStart(2, '0');
    const day = closedAtDate.getDate().toString().padStart(2, '0');
    init_closedAt = `${year}-${month}-${day}`
  }
  let init_author = null
  if(project && project.author) {
    init_author = {
      _id: project.author._id,
      name: project.author.name,
      country: project.author.country
    }
  }
  let init_publishedAt = project.publishedAt ? project.publishedAt : null

  // -------------------------------------
  // STATE AND REFS DECLARATIONS
  const [title_es, setTitle_es] = useState(init_title_es)
  const [title_pt, setTitle_pt] = useState(init_title_pt)
  const [slug, setSlug] = useState(init_slug)
  const slugInput = useRef(null)
  const [coverUrl, setCoverUrl] = useState(init_coverUrl)
  const [youtubeUrl, setYoutubeUrl] = useState(init_youtubeUrl)
  const [youtubeId, setYoutubeId] = useState(init_youtubeId)
  const [stage, setStage] = useState(init_stage)
  const [about_es, setAbout_es] = useState(init_about_es)
  const [about_pt, setAbout_pt] = useState(init_about_pt)
  const [author, setAuthor] = useState(init_author)
  const authorFieldRef = useRef(null)
  const about_es_ref = useRef(null)
  const about_pt_ref = useRef(null)
  const [articles, setArticles] = useState(init_articles)
  const articlesRefs = useRef([])
  const [closedAt, setClosedAt] = useState(init_closedAt)
  const [publishNow, setPublishNow] = useState(false)
  const [publishedAt, setPublishedAt] = useState(init_publishedAt)
  const [isLoading, setIsLoading] = useState(false)

  

  // -------------------------------------
  // HOOKS
  // -------------------------------------
  
  // useEffect(() => {
  //   async function getAuthors() {
  //     const authors = await axiosServices.get('/admin/users/authors')
  //     console.log(authors.data)
  //     return authors.data
  //   }

  //   getAuthors()
  // })

  // -------------------------------------
  // COMPUTED PROPERTIES
  // -------------------------------------
  const isSlugValid = useMemo(() => {
    if (slug === '') return false
    if (slug.indexOf(' ') !== -1) return false
    const slugPattern = /^[a-zA-Z0-9_-]+$/;
    return slugPattern.test(slug)
  }, [slug])
  const isClosedAtValid = useMemo(() => {
    if (closedAt === '') return false
    const closedAtPattern = /^\d{4}-\d{2}-\d{2}$/;
    const patternValid = closedAtPattern.test(closedAt)
    // check if date is valid
    const date = new Date(closedAt)
    const dateValid = date instanceof Date && !isNaN(date)
    return patternValid && dateValid
  }, [closedAt])
  // -------------------------------------
  // METHODS
  // -------------------------------------
  function addNewArticle() {
    if(mode === 'edit' && publishedAt) return
    // create a clientId for the new article
    const clientId = getRandomClientId();
    // Create a new ArticleForm reference
    setArticles([...articles, { clientId: clientId, text_es: '', text_pt: '' }]);
    // Create a new ref for the ArticleForm
    articlesRefs.current.push(createRef());
  }

  // -------------------------------------
  // HANDLERS
  // -------------------------------------
  const slugifyOptions = {
    lower: true,
    replacement: '-',
  }
  function handleTitle_es(e) {
    setTitle_es(e.target.value)
  }

  function handleFocusOutTitle_es(e) {
    if(slug) return
    setSlug(slugify(e.target.value, slugifyOptions))
  }

  function handleTitle_pt(e) {
    setTitle_pt(e.target.value)
  }

  function handleSlug(e) {
    setSlug(e.target.value) 
  }

  function handleFocusOutSlug(e) {
    setSlug(slugify(e.target.value, slugifyOptions))
  }

  function handleCoverUrl(e) {
    setCoverUrl(e.target.value)
  }

  function handleYoutubeUrl(e) {
    setYoutubeUrl(e.target.value)
  }

  function handlePublishNow(e) {
    setPublishNow(e.target.checked)
  }

  function handleFocusOutYoutubeUrl(e) {
    // regex (youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))
    const youtubeUrl = e.target.value
    if(!youtubeUrl) {
      setYoutubeId('')
      return
    }
    const youtubeId = youtubeUrl.match(/(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/)
    setYoutubeId(youtubeId[3])
  }

  function handleClosedAt(e) {
    setClosedAt(e.target.value)
  }

  function handleStage(e) {
    setStage(e.target.value)
  }

  function moveArticleUp(clientId) {
    //if(mode === 'edit') return
    // find the index of the article that needs to be moved
    const index = articles.findIndex((article) => article.clientId === clientId);
    // if the article is the first one, do nothing
    if (index === 0) return;
    // get the article that needs to be moved
    const article = articles[index];
    // update the text_es and text_pt with the current markdown
    article.text_es = articlesRefs.current[index].getCurrentTextEs();
    article.text_pt = articlesRefs.current[index].getCurrentTextPt();
    const articleDeleted = articlesRefs.current[index].getCurrentDeleted();
    if(articleDeleted) {
      article.deleted = true
    }
    // get the article that is above the article that needs to be moved
    const articleAbove = articles[index - 1];
    // update the text_es and text_pt with the current markdown
    articleAbove.text_es = articlesRefs.current[index - 1].getCurrentTextEs();
    articleAbove.text_pt = articlesRefs.current[index - 1].getCurrentTextPt();
    const articleAboveDeleted = articlesRefs.current[index - 1].getCurrentDeleted();
    if(articleAboveDeleted) {
      articleAbove.deleted = true
    }
    // swap the articles in the articles array
    articles[index] = articleAbove;
    articles[index - 1] = article;
    // update the state
    setArticles([...articles]);
  }

  function moveArticleDown(clientId) {
    // if(mode === 'edit') return
    // find the index of the article that needs to be moved
    const index = articles.findIndex((article) => article.clientId === clientId);
    // if the article is the last one, do nothing
    if (index === articles.length - 1) return;
    // get the article that needs to be moved
    const article = articles[index];
    // update the text_es and text_pt with the current markdown
    article.text_es = articlesRefs.current[index].getCurrentTextEs();
    article.text_pt = articlesRefs.current[index].getCurrentTextPt();
    const articleDeleted = articlesRefs.current[index].getCurrentDeleted();
    if(articleDeleted) {
      article.deleted = true
    }
    // get the article that is below the article that needs to be moved
    const articleBelow = articles[index + 1];
    // update the text_es and text_pt with the current markdown
    articleBelow.text_es = articlesRefs.current[index + 1].getCurrentTextEs();
    articleBelow.text_pt = articlesRefs.current[index + 1].getCurrentTextPt();
    const articleBelowDeleted = articlesRefs.current[index + 1].getCurrentDeleted();
    if(articleBelowDeleted) {
      articleBelow.deleted = true
    }
    // swap the articles in the articles array
    articles[index] = articleBelow;
    articles[index + 1] = article;
    // update the state
    setArticles([...articles]);
  }

  function toggleArticleDeleted(clientId) {
    if(mode === 'edit') {
      // if the project has been published, no way you can delete it.
      // if the project has already been created, then the article
      // will stay but it will be marked as deleted
      return
    }
    // in this mode "new", the article, if it's deleted, it's deleted forever
    // find the index of the article that needs to be moved
    const index = articles.findIndex((article) => article.clientId === clientId);
    // remove the ref from the articlesRefs array
    const article = articles[index];
    // remove the article from the articles array
    articles.splice(index, 1);
    // update the state
    setArticles([...articles]);
    // remove the ref from the articlesRefs array
    articlesRefs.current.splice(index, 1);
  }

  function makePayload(isPublished) {
    const payload = {
      title_es,
      title_pt,
      slug,
      stage,
      about_es: about_es_ref.current.getMarkdown(),
      about_pt: about_pt_ref.current.getMarkdown(),
      articles: articles.map((article, index) => {
        const articleClientId = article.clientId
        const articleRef = articlesRefs.current.find(article => article.clientId === articleClientId)
        const articlePayload = articleRef.getOutput()
        articlePayload.position = index + 1
        return articlePayload
      })
    }
    if(coverUrl) {
      payload.coverUrl = coverUrl
    }
    if(youtubeId) {
      payload.youtubeUrl = `https://www.youtube.com/embed/${youtubeId}`
    }
    // set up closedAt at the end of the day
    if(closedAt) {
      const closedAtAux = closedAt + ' 23:59:59'
      payload.closedAt = (new Date(closedAtAux)).toISOString()
    }
    if(isPublished) {
      payload.publishedAt = (new Date()).toISOString()
    }
    if(authorFieldRef.current) {
      const selectedAuthor = authorFieldRef.current.getAuthor()
      if(selectedAuthor) {
        payload.author = selectedAuthor._id
      }
    }
    return payload
  }

  function handleSave() {
    const publish = publishNow || false
    setIsLoading(true)
    const payload = makePayload(publish)
    console.log(payload)
    submitProject(payload)
  }

  function submitProject(payload) {
    if(mode === 'edit') {
      axiosServices.put(`/projects/${project._id}`, payload)
        .then(res => {
          router.push(`/pacto/${project._id}/editar/exito`)
        })
        .catch(err => {
          console.error(err)
        }).
        finally(() => {
          setIsLoading(false)
        })
      return
    }
    axiosServices.post('/projects', payload)
      .then(res => {
        router.push('/pacto/nuevo/exito')
      })
      .catch(err => {
        console.error(err)
      }).
      finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      {/* buttons, but they are disabled, its just decoration */}
      {
        mode === 'edit' && publishedAt && (<>
            <h4 className="title is-4 mb-1"><FontAwesomeIcon icon={faCaretRight} /> Controles</h4>
            <p className="help">Se habilitarán una vez creado el proyecto</p>
            <div className="buttons mt-3">
              <button className="button is-black is-outlined" disabled><FontAwesomeIcon icon={faPaperPlane} />&nbsp;Publicar proyecto</button>
              <button className="button is-black is-outlined" disabled><FontAwesomeIcon icon={faEyeSlash} />&nbsp;Ocultar proyecto</button>
            </div>
          </>
        )
      }
      {/* If not published yet, says its a "draft" */}
      <div className="box py-3">
        <div className="field is-grouped is-grouped-multiline">
          <div className="control">
            <div className="tags has-addons">
              <span className="tag is-dark">Estado</span>
              {
                publishedAt ? (
                  <span className="tag is-success">Publicado</span>
                ) : (
                  <span className="tag is-light">Borrador</span>
                )
              }
            </div>
          </div>
          {
            !publishedAt && (
              <div className="control">
                <div className="tags has-addons">
                  <span className="tag is-dark">Visibilidad</span>
                  {
                    project.hidden ? (
                      <span className="tag is-light">Oculto</span>
                    ) : (
                      <span className="tag is-success">Visible</span>
                    )
                  }
                </div>
              </div>
            )
          }
          <div className="control">
            <div className="tags has-addons">
              <span className="tag is-dark">Versión</span>
              <span className="tag is-link">{project.version}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Project Title */}
      <div className="box">
        <h4 className="title is-4 mb-1"><FontAwesomeIcon icon={faCaretRight} /> Título del proyecto</h4>
        <p><b>Note:</b> No se versiona el título del proyecto.</p>
        <div className="columns my-1">
          <div className="column">
            <div className="field">
              <label className="label">Español</label>
              <div className="control">
                <input className="input" type="text" placeholder="Título en español" value={title_es} onChange={handleTitle_es} onBlur={handleFocusOutTitle_es} />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Portugués</label>
              <div className="control">
                <input className="input" type="text" placeholder="Título en portugués" value={title_pt} onChange={handleTitle_pt} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Project Slug */}
      <div className="box">
        <h4 className="title is-4 mb-1"><FontAwesomeIcon icon={faCaretRight} /> Slug del proyecto</h4>
        <p><b><span className="has-text-danger">IMPORTANTE:</span></b> Defina un slug para la url del proyecto. El mismo será utilizado para generar la url del proyecto. Aunque se pueda editar, se recomienda no cambiar el slug una vez que el proyecto este publicado.</p>
        <div className="columns my-1">
          <div className="column">
            <div className="field">
              <label className="label">Slug</label>
              <div className="control">
                <input className={`input ${!isSlugValid && 'is-danger' }`} type="text" placeholder="Slug del proyecto" value={slug} onChange={handleSlug} onBlur={handleFocusOutSlug} />
              </div>
              {
                !isSlugValid && (
                  <p className="help is-danger"><FontAwesomeIcon icon={faAsterisk} /> El slug no puede estar vacio ni contener espacios. Caracteres permitidos: <code>a-z</code>, <code>A-Z</code>, <code>0-9</code>, <code>_</code> y <code>-</code></p>
                )
              }
              <p className="help">Url del proyecto: https://resurgentes.org/pacto/{slug}</p>
            </div>
          </div>
        </div>
      </div>
      {
        userIsAdmin && (
          <AuthorField author={author} ref={authorFieldRef} />
        )
      }
      {/* Project Cover */}
      <div className="box">
        <div className="columns my-1">
          <div className="column">
            <h4 className="title is-4 mb-1"><FontAwesomeIcon icon={faCaretRight} /> Imagen de portada del proyecto</h4>
            <p><b>Note:</b> No se versiona la imagen de portada del proyecto.</p>
            <div className="field mt-2">
              <label className="label">Portada</label>
              <div className="control">
                <input className="input" type="text" placeholder="Portada del proyecto" value={coverUrl} onChange={handleCoverUrl} />
              </div>
            </div>
          </div>
          {
            coverUrl && (
              <div className="column is-narrow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coverUrl} alt="Cover portada" className="image mx-auto" style={{maxHeight: '200px', maxWidth: '200px', borderRadius: '5px'}}/>
              </div>
            )

          }
        </div>
      </div>
      {/* Project Youtube */}
      <div className="box">
        <div className="columns my-1">
          <div className="column">
            <h4 className="title is-4 mb-1"><FontAwesomeIcon icon={faCaretRight} /> Video de youtube</h4>
            <p><b>Note:</b> No se versiona el video de youtube.</p>
            <div className="field mt-2">
              <label className="label">Video de youtube</label>
              <div className="control">
                <input className="input" type="text" placeholder="Video de youtube" value={youtubeUrl} onChange={handleYoutubeUrl} onBlur={handleFocusOutYoutubeUrl} />
              </div>
            </div>
          </div>
          {
            youtubeId && (
              <div className="column is-2">
                <div className="video-wrapper">
                  <iframe width="100%" height="auto" src={`https://www.youtube.com/embed/${youtubeId}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                </div>
              </div>
            )
          }
        </div>
      </div>
      {/* Project Stage: MX or BR or CH or AR */}
      <div className="box">
        <h4 className="title is-4 mb-1"><FontAwesomeIcon icon={faCaretRight} /> Etapa del proyecto</h4>
        <p>Seleccione la etapa del proyecto.</p>
        <div className="field mt-2">
          <div className="control">
            <div className="select">
              <select value={stage} onChange={handleStage}>
                <option value="MX">MX - México</option>
                <option value="BR">BR - Brasil</option>
                <option value="CH">CH - Chile</option>
                <option value="AR">AR - Argentina</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* Project About */}
      <div className="box">
        <div className="content">
        <h4 className="title is-4 mb-2"><FontAwesomeIcon icon={faCaretRight} /> Acerca del proyecto</h4>
        <p>Ingrese la introducción delproyecto. El campo se versiona y guarda en el historial de versiones. Durante una version se puede editar, pero una vez que se cree una nueva versión, la misma no se puede editar.</p>
        </div>

        <div className="columns is-multiline is-mobile">
          <div className="column is-12-mobile is-12-tablet is-6-desktop is-6-widescreen is-6-fullhd">
            <EditorComp editorRef={about_es_ref} markdown={about_es} es />
          </div>
          <div className="column is-12-mobile is-12-tablet is-6-desktop is-6-widescreen is-6-fullhd">
            <EditorComp editorRef={about_pt_ref} markdown={about_pt} pt />
          </div>
        </div>
      </div>
      {/* Project Closed At */}
      <div className="box">
        <h4 className="title is-4 mb-1"><FontAwesomeIcon icon={faCaretRight} /> Cierre del proyecto</h4>
        <p>Ingrese la fecha de cierre del proyecto. Si no se ingresa una fecha, el proyecto no se cerrará.</p>
        <div className="field">
          <label className="label">Fecha de cierre</label>
          <div className="control">
            <InputMask mask="yyyy-mm-dd" showMask separate 
            replacement={{ d: /\d/, m: /\d/, y: /\d/ }} 
            ref={slugInput} className="input" value={closedAt} onChange={handleClosedAt} />
          </div>
          {
            !isClosedAtValid && (
              <p className="help is-danger"><FontAwesomeIcon icon={faAsterisk} /> La fecha debe tener el formato <code>yyyy-mm-dd</code> y ser una fecha real</p>
            )
          }
        </div>
      </div>
      {/* Project Articles */}
      <div className="box">
        <h4 className="title is-4 mb-1"><FontAwesomeIcon icon={faCaretRight} /> Articulos del proyecto</h4>
        <p>Ingrese los articulos del proyecto.</p>
        <hr />
        {/* Articles Forms dynamically added */}
          {articles.map((article, index) => {
            if(!article) return null
            return (
              <ArticleForm
                key={article.clientId}
                article={article}
                ref={(el) => (articlesRefs.current[index] = el)}
                moveArticleUp={moveArticleUp}
                moveArticleDown={moveArticleDown}
                toggleArticleDeleted={toggleArticleDeleted}
                mode={mode}
                published={publishedAt}
              />
            );
          })}
          {
            (mode === 'new' || (mode === 'edit' && !publishedAt)) && (
              <div className="buttons">
                <button className="button is-black is-outlined is-fullwidth" disabled={isLoading} onClick={addNewArticle}><FontAwesomeIcon icon={faPlus} />&nbsp;Agregar articulo</button>
              </div>
            )
          }
      </div>
      {/* Project Save */}
      <div className="box">
        <h4 className="title is-4 mb-1"><FontAwesomeIcon icon={faCaretRight} /> Guardar proyecto</h4>
        {
          mode === 'new' && (
            <p>Puede optar por <b>Guardar</b> el proyecto como <b>borrador</b> para editarlo luego y publicarlo más adelante.</p>
          )
        }
        {
          mode === 'edit' && (
              <p>Al guardar el proyecto, los cambios pasarán a formar parte de la versión actual del proyecto.</p>
          )
        }
        {
          !publishedAt && (
            <>
              <p>Tambien puede <b>Guardar y publicar</b> el proyecto (el proyecto quedara visible para que los usuarios participen)</p>
              <div className="field my-3">
                <div className="control">
                  <label className="checkbox">
                    <input type="checkbox" checked={publishNow} onChange={handlePublishNow} />
                    &nbsp;Publicar proyecto ahora
                  </label>
                </div>
              </div>
            </>
          )
        }
        <div className="buttons is-right mt-3">
          <button className={`button is-black ${isLoading && 'is-loading'}`} disabled={isLoading} onClick={handleSave}><FontAwesomeIcon icon={faSave} />&nbsp;Guardar</button>
        </div>
      </div>
    </>
  )
}