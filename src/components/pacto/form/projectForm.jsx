"use client"

import dynamic from 'next/dynamic'
import { useEffect, useState, useRef, createRef, useMemo, Suspense } from "react"
import { useRouter } from "next/navigation"
import Link from 'next/link'
// import { useAuth } from "@/context/auth-context"
import axiosServices from "@/utils/axios"
// import { useRouter } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFile } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faAsterisk, faCaretRight, faPaperPlane, faEyeSlash, faSave, faTimes, faCheck, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import slugify from 'slugify'
import { InputMask } from '@react-input/mask';
import ArticleForm from '@/components/pacto/form/articleForm'
import projectFormUtils from '@/utils/projectForm'
import AuthorField from './authorField';
import { useAuthContext } from '@/context/auth-context'
import { adminFetchAuthors } from '@/utils/get-data'


const EditorComp = dynamic(() => import('@/components/common/editor'), { ssr: false })


export default function ProjectFormComponent({project, newVersion}) {
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
  const { user } = useAuthContext()
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
  let init_daysUntilClosed = 30
  let init_projectIsClosed = false
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
  const init_shortAbout_es = project ? project.shortAbout_es : projectFormUtils.getPlaceholderShortAboutEs()
  const init_shortAbout_pt = project ? project.shortAbout_pt : projectFormUtils.getPlaceholderShortAboutPt()
  const init_authorNotes_es = project && !newVersion ? project.authorNotes_es : ''
  const init_authorNotes_pt = project && !newVersion ? project.authorNotes_pt : ''
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

    // calculate init_daysUntilClosed (days until closed).
    // If closedAt is in the past, then daysUntilClosed is 0
    const today = new Date()
    const todayYear = today.getFullYear();
    const todayMonth = (today.getMonth() + 1).toString().padStart(2, '0');
    const todayDay = today.getDate().toString().padStart(2, '0');
    const todayString = `${todayYear}-${todayMonth}-${todayDay}`
    const todayDate = new Date(todayString)
    const diffTime = closedAtDate - todayDate
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    init_daysUntilClosed = diffDays < 0 ? 0 : diffDays

    // calculate init_projectIsClosed
    init_projectIsClosed = todayDate > closedAtDate
  }
  let init_author = null
  if(project && project.author) {
    init_author = {
      _id: project.author._id,
      name: project.author.name,
      country: project.author.country
    }
  }
  let init_publishedAt = project && project.publishedAt ? project.publishedAt : null
  let init_hidden = project && project.hidden ? project.hidden : false

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
  const [shortAbout_es, setShortAbout_es] = useState(init_shortAbout_es)
  const [shortAbout_pt, setShortAbout_pt] = useState(init_shortAbout_pt)
  const [about_es, setAbout_es] = useState(init_about_es)
  const [about_pt, setAbout_pt] = useState(init_about_pt)
  const [authorNotes_es, setAuthorNotes_es] = useState(init_authorNotes_es)
  const [authorNotes_pt, setAuthorNotes_pt] = useState(init_authorNotes_pt)
  const [author, setAuthor] = useState(init_author)
  const authorFieldRef = useRef(null)
  const about_es_ref = useRef(null)
  const about_pt_ref = useRef(null)
  const [articles, setArticles] = useState(init_articles)
  const articlesRefs = useRef([])
  const [closedAt, setClosedAt] = useState(init_closedAt)
  const [daysUntilClosed, setDaysUntilClosed] = useState(init_daysUntilClosed)
  const [publishNow, setPublishNow] = useState(false)
  const [hidden, setHidden] = useState(init_hidden)
  const [publishedAt, setPublishedAt] = useState(init_publishedAt)
  const [isLoading, setIsLoading] = useState(false)
  const [showErrorResponse, setShowErrorResponse] = useState(false)
  const [errorResponse, setErrorResponse] = useState(null)
  const [showControlSuccessMessage, setShowControlSuccessMessage] = useState(false)
  const [controlSuccessMessage, setControlSuccessMessage] = useState(null)
  const [showControlErrorMessage, setShowControlErrorMessage] = useState(false)
  const [controlErrorMessage, setControlErrorMessage] = useState(null)

  // -------------------------------------
  // HOOKS
  // -------------------------------------
  
  // useEffect(() => {
  //   async function getAuthors() {
  //     const authors = await adminFetchAuthors()
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
    if(mode === 'edit' && publishedAt && !newVersion) return
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

  const canEditAuthorNotes = function () {
    if(
      (mode === 'edit' && project && project.version > 1) // if you're editing a project and it's not the first version, then you can update the "current" author notes
      || (mode === 'edit' && newVersion) // if it's a new version, then you can update the "new" author notes for the new version)
    ) {
      return true
    }
    return false
  }()

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

  function handleShortAbout_es(e) {
    setShortAbout_es(e.target.value)
  }

  function handleShortAbout_pt(e) {
    setShortAbout_pt(e.target.value)
  }

  function handleAuthorNotes_es(e) {
    setAuthorNotes_es(e.target.value)
  }

  function handleAuthorNotes_pt(e) {
    setAuthorNotes_pt(e.target.value)
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
    const index = articles.findIndex((article) => article.clientId === clientId);
    const article = articles[index];
    if(mode === 'edit' && newVersion && article._id) {
      // if the article has an _id, then it's already been created
      // if during creating a new version this article was added, then
      // there is no need to mark it as deleted, just remove it from the array
      return
    }
    if(mode === 'edit' && !newVersion && publishedAt && article._id) {
      // if the project has been published, no way you can delete it.
      // if the project has already been created, then the article
      // will stay but it will be marked as deleted
      return
    }
    // in this mode "new", the article, if it's deleted, it's deleted forever
    // find the index of the article that needs to be moved
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
      shortAbout_es,
      shortAbout_pt,
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
    if(canEditAuthorNotes) {
      payload.authorNotes_es = authorNotes_es
      payload.authorNotes_pt = authorNotes_pt
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
    if(!validateProject()) {
      return
    }
    const publish = publishNow || false
    setIsLoading(true)
    const payload = makePayload(publish)
    console.log(payload)
    submitProject(payload)
  }

  function validateProject() {
    // title_es, title_pt, slug, stage, about_es, about_pt cannot be empty
    if(!title_es || !title_pt || !slug || !stage || !about_es || !about_pt, !shortAbout_es, !shortAbout_pt) {
      setErrorResponse('Los campos título, slug, etapa y resumen corto y resumen no pueden estar vacios')
      setShowErrorResponse(true)
      return false
    }
    // articles cannot be empty
    if(articles.length === 0) {
      setErrorResponse('Debe agregar al menos un artículo')
      setShowErrorResponse(true)
      return false
    }
    
    // // check if there are any articles that are empty
    // const emptyArticles = articles.filter(article => !article.text_es && !article.text_pt)
    // if(emptyArticles.length > 0) {
    //   setErrorResponse('Hay artículos vacios')
    //   setShowErrorResponse(true)
    //   return false
    // }

    return true
  }

  function submitProject(payload) {
    setErrorResponse(null)
    setShowErrorResponse(false)
    if(mode === 'edit' && !newVersion) {
      axiosServices.put(`/projects/${project._id}`, payload)
        .then(res => {
          router.push(`/pacto/${project._id}/editar/exito`)
        })
        .catch(err => {
          setShowErrorResponse(true)
          setErrorResponse(err.response.data)
          console.error(err)
        }).
        finally(() => {
          setIsLoading(false)
        })
      return
    }
    if(mode === 'edit' && newVersion) {
      axiosServices.post(`/projects/${project._id}/versions`, payload)
        .then(res => {
          router.push(`/pacto/${project._id}/nueva-version/exito`)
        })
        .catch(err => {
          setShowErrorResponse(true)
          setErrorResponse(err.response.data)
          console.error(err)
        }).
        finally(() => {
          setIsLoading(false)
        })
        return
    }
    // mode === 'new'
    axiosServices.post('/projects', payload)
    .then(res => {
      const projectId = res.data._id
      router.push(`/pacto/nuevo/exito?projectId=${projectId}`)
    })
    .catch(err => {
      setShowErrorResponse(true)
      setErrorResponse(err.response.data)
      console.error(err)
    }).
    finally(() => {
      setIsLoading(false)
    })
  }

  function publishProject(){
    if(mode !== 'edit'){
      // You can't publish a new during a new project edition
      return
    }
    if(newVersion) {
      // You can't publish the project during a new version edition
      return
    }
    setIsLoading(true)
    setControlErrorMessage(null)
    setControlSuccessMessage(null)
    setShowControlErrorMessage(false)
    setShowControlSuccessMessage(false)
    axiosServices.post(`/projects/${project._id}/publish`)
    .then(res => {
      setPublishedAt(res.data.publishedAt)
      setShowControlSuccessMessage(true)
      setControlSuccessMessage('El proyecto se ha publicado')
      setTimeout(() => {
        setShowControlSuccessMessage(false)
      }, 5000);
    }).catch(err => {
      setShowControlErrorMessage(true)
      setControlErrorMessage('Hubo un error al publicar el proyecto')
      setTimeout(() => {
        setShowControlErrorMessage(false)
      }, 5000);
      console.error(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  function toggleHidden() {
    if(mode !== 'edit') {
      // You can't hide a new project
      return
    }
    if(newVersion) {
      // You can't hide the project during a new version edition
      return
    }
    setIsLoading(true)
    setControlErrorMessage(null)
    setControlSuccessMessage(null)
    setShowControlErrorMessage(false)
    setShowControlSuccessMessage(false)
    axiosServices.post(`/projects/${project._id}/hide`)
    .then(res => {
      setHidden(res.data.hidden)
      if(res.data.hidden) {
        setControlSuccessMessage('El proyecto se ha ocultado')
      } else {
        setControlSuccessMessage('El proyecto es visible al público')        
      }
      setShowControlSuccessMessage(true)
      setTimeout(() => {
        setShowControlSuccessMessage(false)
      }, 5000);
    }).catch(err => {
      setControlErrorMessage('Hubo un error al ocultar el proyecto')
      setShowControlErrorMessage(true)
      setTimeout(() => {
        setShowControlErrorMessage(false)
      }, 5000);
      console.error(err)
    }).
    finally(() => {
      setIsLoading(false)
    })
  }

  function closeErrorMessage() {
    setShowErrorResponse(false)
    setErrorResponse(null)
  }

  function goToCreateNewVersion() {
    if(mode === 'new') {
      // Cant go to create a new version if you are creating a new project
      return
    }
    if(newVersion) {
      // Can't go to create a new version if you are already creating a new version
      return
    }
    router.push(`/pacto/${project._id}/nueva-version`)
  }

  return (
    <>
      {
        mode === 'edit' && !publishedAt && (
          <div className="notification is-warning py-2">
            <p><FontAwesomeIcon icon={faExclamationTriangle} />&nbsp;<b>Atención:</b> El proyecto se encuentra en modo <b>borrador</b> y aun no ha sido publicado. Para publicar el proyecto, haga click en el botón <b>Publicar proyecto</b>.</p>
          </div>
        )
      }
      {
        mode === 'edit' && publishedAt && hidden && (
          <div className="notification is-warning py-2">
            <p><FontAwesomeIcon icon={faEyeSlash} />&nbsp;<b>Atención:</b> El proyecto se encuentra <b>oculto</b>. Para que el proyecto sea visible, haga click en el botón <b>Mostrar proyecto</b>.</p>
          </div>
        )
      }
      {
        mode === 'edit' && init_projectIsClosed && !newVersion && (
          <div className="notification is-warning py-2">
            <p><FontAwesomeIcon icon={faExclamationTriangle} />&nbsp;<b>Atención:</b> El proyecto se encuentra <b>cerrado</b> para recibir nuevas contribuciones de los usuarios. Por lo tanto, no podrá editar los articulos del proyecto. Puede, en caso de que desee <u>extender la participación</u>, cambiar la fecha de cierre del proyecto.</p>
          </div>
        )
      }
      {
        mode === 'edit' && !newVersion && (<>
            <h4 className="title is-4 mb-4"><FontAwesomeIcon icon={faCaretRight} /> Panel de control del proyecto</h4>
            <div className="buttons my-2">
              {
                !publishedAt && (
                  <button className={`button is-black is-outlined ${isLoading && 'is-loading'}` } onClick={publishProject}><FontAwesomeIcon icon={faPaperPlane} />&nbsp;Publicar proyecto</button>
                )
              }
              {
                publishedAt && !hidden && (
                  <Link href={`/pacto/${project._id}/nueva-version`} className={`button is-link is-outlined ${isLoading && 'is-loading'}` } onClick={goToCreateNewVersion}><FontAwesomeIcon icon={faAsterisk} />&nbsp;Crear nueva versión</Link>
                )
              }
              {
                publishedAt && !hidden && (
                  <button className={`button is-black is-outlined ${isLoading && 'is-loading'}` } onClick={toggleHidden}><FontAwesomeIcon icon={faEyeSlash} />&nbsp;Ocultar proyecto</button>
                )
              }
              {
                publishedAt && hidden && (
                  <button className={`button is-black is-outlined ${isLoading && 'is-loading'}` } onClick={toggleHidden}><FontAwesomeIcon icon={faEye} />&nbsp;Mostrar proyecto</button>
                )
              }
            </div>
            {
              showControlSuccessMessage && (
                <p className="mt-2 mb-4 has-text-success"><FontAwesomeIcon icon={faCheck} />&nbsp;{controlSuccessMessage}</p>
              )
            }
            {
              showControlErrorMessage && (
                <p className="mt-2 mb-4 has-text-danger"><FontAwesomeIcon icon={faTimes} />&nbsp;{controlErrorMessage}</p>
              )
            }
          </>
        )
      }
      {/* If not published yet, says its a "draft" */}
      {
        mode === 'edit' && (
          <div className="box py-3">
            <div className="field is-grouped is-grouped-multiline">
              <div className="control">
                <div className="tags has-addons">
                  <span className="tag is-dark">Estado</span>
                  {
                    publishedAt ? (
                      <span className="tag is-light">Publicado</span>
                    ) : (
                      <span className="tag is-light">Borrador</span>
                    )
                  }
                </div>
              </div>
              {
                publishedAt && (
                  <div className="control">
                    <div className="tags has-addons">
                      <span className="tag is-dark">Visibilidad</span>
                      {
                        hidden ? (
                          <span className="tag is-light">Oculto</span>
                        ) : (
                          <span className="tag is-light">Visible</span>
                        )
                      }
                    </div>
                  </div>
                )
              }
              {
                publishedAt && (
                  <div className="control">
                    <div className="tags has-addons">
                      {/* Show if the project is closed or not */}
                      <span className="tag is-dark">Contribuciones</span>
                      {
                        init_projectIsClosed ? (
                          <span className="tag is-light">Cerrado</span>
                        ) : (
                          <span className="tag is-light">Abierto</span>
                        )
                      }
                    </div>
                  </div>
                )
              }
              {
                publishedAt && (
                  <div className="control">
                    <div className="tags has-addons">
                      <span className="tag is-dark">Días restantes</span>
                      <span className="tag is-light">{daysUntilClosed}</span>
                    </div>
                  </div>
                )
              }
              <div className="control">
                <div className="tags has-addons">
                  <span className="tag is-dark">Versión</span>
                  <span className="tag is-light">{project.version}</span>
                </div>
              </div>
            </div>
          </div>
        )
      }
      {/* Project Title */}
      <div className="box">
        <h4 className="title is-4 mb-1"><FontAwesomeIcon icon={faCaretRight} /> Título del proyecto</h4>
        <p><b>Note:</b> No se versiona el título del proyecto.</p>
        <div className="columns">
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
        <p><b><span className="has-text-danger">IMPORTANTE:</span></b> Defina un slug para la url del proyecto. El mismo será utilizado para generar la url del proyecto. Aunque se pueda editar, se recomienda no cambiar el slug una vez que el proyecto haya sido publicado.</p>
        <div className="columns">
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
        <div className="columns">
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
        <div className="columns">
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
      {/* Project Stage: MX or BR or CH or AR */}
      <div className="box">
        <h4 className="title is-4 mb-1"><FontAwesomeIcon icon={faCaretRight} /> Etapa del proyecto</h4>
        <p>Seleccione la etapa del proyecto.</p>
        <div className="field mt-2">
          <div className="control">
            <div className="select">
              <select value={stage} onChange={handleStage}>
                <option value="BR">BR - Brasil</option>
                <option value="AR">AR - Argentina</option>
                <option value="CO">CO - Colombia</option>
                <option value="MX">MX - México</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* Project Short About */}
      <div className="box">
        <h4 className="title is-4 mb-1"><FontAwesomeIcon icon={faCaretRight} /> Resumen corto del proyecto</h4>
        <p>Escriba un resumen corto del proyecto para las tarjetas de presentación en la pagina de inicio. Este campo no se versiona.</p>
        <div className="columns is-multiline is-mobile mt-1">
          <div className="column is-12-mobile is-12-tablet is-6-desktop is-6-widescreen is-6-fullhd">
            <div className="field">
              <label className="label">Español</label>
              <div className="control">
                <textarea className="textarea" placeholder="Resumen corto en español" value={shortAbout_es} onChange={handleShortAbout_es} rows={2}></textarea>
              </div>
            </div>
          </div>
          <div className="column is-12-mobile is-12-tablet is-6-desktop is-6-widescreen is-6-fullhd">
            <div className="field">
              <label className="label">Portugués</label>
              <div className="control">
                <textarea className="textarea" placeholder="Resumen corto en portugués" value={shortAbout_pt} onChange={handleShortAbout_pt} rows={2}></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
     
      {/* Project About */}
      <div className="box">
        <div className="content">
        <h4 className="title is-4 mb-2"><FontAwesomeIcon icon={faCaretRight} /> Resumen del proyecto</h4>
        <p>Escriba un resumen del proyecto. Este campo se versiona y guarda en el historial de versiones. Durante una version activa, puede editarlo, pero una vez que se cree una nueva versión, la misma se guardara en el historial.</p>
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
      {/* Project Articles */}
      <div className="box">
        <h4 className="title is-4 mb-1"><FontAwesomeIcon icon={faCaretRight} /> Articulos del proyecto</h4>
        {
          mode === 'new' && <p>Ingrese los articulos del proyecto. Puede agregar, editar o quitar los articulos que desee. Si guarda el proyecto en modo borrador, podrá seguir agregando, editando o quitando los articulos. Una vez que el proyecto sea publicado, podrá editarlos si quisiere pero <b>no borrarlos</b>.</p>
        }
        {
          mode === 'edit' && !newVersion && !publishedAt && (
            <p>Como el proyecto se encuentra en modo borrador, puede editar, agregar o quitar los articulos que desee. Una vez que el proyecto sea publicado, podrá editarlos si quisiere pero <b>no borrarlos</b>.</p>
          )
        }
        {
          mode === 'edit' && !newVersion && publishedAt && (
            <>
              <p className="mb-2">El proyecto se encuentra <b><u>publicado</u></b>. No puede borrar los articulos. Pero puede editarlos o cambiar de orden si lo quisiere. El guardado <b><u>no creará</u></b> una <u>nueva versión</u>.</p>
              <div className="notification is-warning py-2 px-4">
                Considere realizar modificaciones <b><u>minimas</u></b> y de <b><u>ortografía</u></b>. Recomendamos que si pretende realizar cambios mayores, cree una nueva versión del proyecto para mantener el historial de los articulos entre versiones.
              </div>
            </>

          )
        }
        {
          mode === 'edit' && newVersion && (
            <>
              <p className="">Puede crear, reordenar, editar o quitar los articulos que desee.</p>
              <p className="">Los articulos que modifique mantendrán sus comentarios, likes y respuestas. Los comentarios destacados en esta versión serán visibles en el historial de versiones.</p>
              <p className="">Si elimina un articulo, el mismo no conformará parte de la nueva versión, pero se podrá ver en la versión anterior.</p>


            </>
          )
        }
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
                newVersion={newVersion}
                published={publishedAt}
              />
            );
          })}
          {
            (mode === 'new' || (mode === 'edit' && !publishedAt) || (mode === 'edit' && publishedAt && newVersion)) && (
              <div className="buttons">
                <button className="button is-black is-outlined is-fullwidth" disabled={isLoading} onClick={addNewArticle}><FontAwesomeIcon icon={faPlus} />&nbsp;Agregar articulo</button>
              </div>
            )
          }
      </div>
       {/* Author Notes */}
       {
        canEditAuthorNotes && (
          <div className="box">
            <h4 className="title is-4 mb-1"><FontAwesomeIcon icon={faCaretRight} /> Notas del autor sobre la versión</h4>
            <p>Utilice este campo de texto para introducir de forma breve que cambios ha realizado en esta versión del proyecto.</p>
            {
              mode === 'edit' && newVersion && (
                <>
                <p className="has-text-link mt-4"><b><span className="has-text-danger">IMPORTANTE:</span></b> El texto se enviará a los usuarios como parte de la notificación.</p>
                </>
                )
            }
            <div className="columns is-multiline is-mobile mt-1">
              <div className="column is-12-mobile is-12-tablet is-6-desktop is-6-widescreen is-6-fullhd">
                <div className="field">
                  <label className="label">Español</label>
                  <div className="control">
                    <textarea className="textarea" placeholder="Resumen corto en español" value={authorNotes_es} onChange={handleAuthorNotes_es} rows={10}></textarea>
                  </div>
                </div>
              </div>
              <div className="column is-12-mobile is-12-tablet is-6-desktop is-6-widescreen is-6-fullhd">
                <div className="field">
                  <label className="label">Portugués</label>
                  <div className="control">
                    <textarea className="textarea" placeholder="Resumen corto en portugués" value={authorNotes_pt} onChange={handleAuthorNotes_pt} rows={10}></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
      {/* Project Save */}
      <div className="box">
        {/* Error message */}
        {
          showErrorResponse && (
            <div className="message is-danger">
              <div className="message-header">
                <p>Error</p>
                <button className="delete" aria-label="delete" onClick={closeErrorMessage}></button>
              </div>
              <div className="message-body">
                Hubo un error al guardar el proyecto. El servidor respondio con el siguiente mensaje: <br />
                <pre>
                  {JSON.stringify(errorResponse, null, 2)}
                </pre>
              </div>
            </div>
          )
        }
        <h4 className="title is-4 mb-1"><FontAwesomeIcon icon={faCaretRight} /> Guardar proyecto</h4>
        {
          mode === 'new' && (
            <p>Puede optar por <b>Guardar</b> el proyecto como <b>borrador</b> para editarlo luego y publicarlo más adelante.</p>
          )
        }
        {
          mode === 'edit' && !newVersion && (
            <p>Al guardar el proyecto, los cambios pasarán a formar parte de la versión actual del proyecto.</p>
          )
        }
        {
          mode === 'edit' && newVersion && (
            <>
              <p>Al guardar el proyecto, se creará la nueva versión y se anexará la version pasada al historial.</p>
              <p className="has-text-link mt-4"><b><span className="has-text-danger">IMPORTANTE:</span></b> Se enviará a todos los usuarios una notificación de la nueva versión.</p>
            </>
          )
        }
        {
          !publishedAt && mode == 'new' && (
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