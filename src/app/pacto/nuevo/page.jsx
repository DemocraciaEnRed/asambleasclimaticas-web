"use client"
import dynamic from 'next/dynamic'
import { useEffect, useState, useRef, createRef, useMemo } from "react"
// import { useAuth } from "@/context/auth-context"
import axiosServices from "@/utils/axios"
import { useRouter } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
// asterisk fa icon
import { faPlus, faAsterisk, faCaretRight, faPaperPlane, faEyeSlash, faSave } from "@fortawesome/free-solid-svg-icons";
import slugify from 'slugify'
import { InputMask } from '@react-input/mask';
import ArticleForm from '@/components/pacto/form/articleForm'

const EditorComp = dynamic(() => import('@/components/common/editor'), { ssr: false })

export default function NewProjectForm({}) {
  
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
  // const { push } = useRouter();
  // -------------------------------------
  // INITIALIZATIONS  
  const initialArticles = [
    {
      clientId: getRandomClientId(),
      test_es: '',
      test_pt: '',
    }
  ]
  const closedAtInitial = getYearMonthDayIn30Days()
  // const user = useAuth()
  // -------------------------------------
  // STATE AND REFS DECLARATIONS
  const [title_es, setTitle_es] = useState('')
  const [title_pt, setTitle_pt] = useState('')
  const [slug, setSlug] = useState('')
  const slugInput = useRef(null)
  const [coverUrl, setCoverUrl] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [stage, setStage] = useState('MX')
  const [about_es, setAbout_es] = useState(`
  # Hola! Todo bien?
  
  Proin tincidunt enim in felis aliquet, a ultricies purus bibendum. Quisque in ultrices lectus. Nulla at urna diam. Proin sodales lobortis libero eu facilisis.
  `)
  const [about_pt, setAbout_pt] = useState(`
  # oi! Tudo Bom?
  
  Quisque molestie dapibus libero non pellentesque. Vivamus quam arcu, dictum quis hendrerit eget, lobortis eu felis. Nulla felis velit, ornare ac porttitor ut, rhoncus eu ipsum. Donec auctor efficitur est vel congue.
  `)
  const about_es_ref = useRef(null)
  const about_pt_ref = useRef(null)
  const [articles, setArticles] = useState(initialArticles)
  const articlesRefs = useRef([])
  const [closedAt, setClosedAt] = useState(closedAtInitial)
  
  // -------------------------------------
  // HOOKS
  // -------------------------------------

  // useEffect(() => {
    
  //   // if there is no user, redirect to login
  //   if(!user) {
  //     push('/')
  //     return
  //   } else {

  //   }

  // },[user, push])
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
    // create a clientId for the new article
    const clientId = getRandomClientId();
    // Create a new ArticleForm reference
    setArticles([...articles, { clientId: clientId, text_es: '', text_pt: '' }]);
    // Create a new ref for the ArticleForm
    articlesRefs.current.push(createRef());
  }
  
  // function logArticlesOutput() {
  //   // for every ArticleForm that is dynamically added, get the output by calling getOutput from the ArticleForm component
  //   const output = articlesRefs.current.map((article) => {
  //     return article.getOutput();
  //   });
  //   console.log('Output:', output);
  // }
  // -------------------------------------
  // HANDLERS

  function handleTitle_es(e) {
    setTitle_es(e.target.value)
  }

  function handleFocusOutTitle_es(e) {
    setSlug(slugify(e.target.value, { lower: true, trim: true }))
  }

  function handleTitle_pt(e) {
    setTitle_pt(e.target.value)
  }

  function handleSlug(e) {
    setSlug(slugify(e.target.value, { lower: true, trim: true }))
  }

  function handleCoverUrl(e) {
    setCoverUrl(e.target.value)
  }

  function handleYoutubeUrl(e) {
    setYoutubeUrl(e.target.value)
  }

  function handleClosedAt(e) {
    setClosedAt(e.target.value)
  }

  function handleStage(e) {
    setStage(e.target.value)
  }

  function moveArticleUp(clientId) {
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
      coverUrl,
      youtubeUrl,
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
    // set up closedAt at the end of the day
    if(closedAt) {
      const closedAtAux = closedAt + ' 23:59:59'
      payload.closedAt = (new Date(closedAtAux)).toISOString()
    }
    if(isPublished) {
      payload.publishedAt = (new Date()).toISOString()
    }
    return payload
  }

  function handleSave() {
    const payload = makePayload(false)
    console.log(payload)
    submitProject(payload)
  }

  function handleSaveAndPublish() {
    const payload = makePayload(true)
    console.log(payload)
    submitProject(payload)
  }

  function submitProject(payload) {
    axiosServices.post('/projects', payload)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  return (
    <>
      <div className="section has-background-black has-text-white">
      <h1 className="title is-2 has-text-white"><FontAwesomeIcon icon={faPlus} /> <FontAwesomeIcon icon={faFile} />&nbsp;Proyecto Nuevo</h1>
        <p>Despues de crear el proyecto, el mismo quedara <u>oculto</u> hasta que lo publiques.</p>
        <p>Una vez publicado, el proyecto sera visible para todos los usuarios. Aseguresé de que el proyecto este listo para ser publicado.</p>
      </div>
      <div className="pacto-form section has-background-light">
        <div className="container is-fluid">
          {/* buttons, but they are disabled, its just decoration */}
          <h4 className="title is-4 mb-1"><FontAwesomeIcon icon={faCaretRight} /> Controles</h4>
          <p className="help">Se habilitarán una vez creado el proyecto</p>
          <div className="buttons mt-3">
            <button className="button is-black is-outlined" disabled><FontAwesomeIcon icon={faPaperPlane} />&nbsp;Publicar proyecto</button>
            <button className="button is-black is-outlined" disabled><FontAwesomeIcon icon={faEyeSlash} />&nbsp;Ocultar proyecto</button>
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
                    <input className={`input ${!isSlugValid && 'is-danger' }`} type="text" placeholder="Slug del proyecto" value={slug} onChange={handleSlug} />
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
          {/* Project Cover */}
          <div className="box">
            <h4 className="title is-4 mb-1"><FontAwesomeIcon icon={faCaretRight} /> Portada del proyecto</h4>
            <p><b>Note:</b> No se versiona la portada del proyecto.</p>
            <div className="columns my-1">
              <div className="column">
                <div className="field">
                  <label className="label">Portada</label>
                  <div className="control">
                    <input className="input" type="text" placeholder="Portada del proyecto" value={coverUrl} onChange={handleCoverUrl} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Project Youtube */}
          <div className="box">
            <h4 className="title is-4 mb-1"><FontAwesomeIcon icon={faCaretRight} /> Video de youtube</h4>
            <p><b>Note:</b> No se versiona el video de youtube.</p>
            <div className="columns my-1">
              <div className="column">
                <div className="field">
                  <label className="label">Video de youtube</label>
                  <div className="control">
                    <input className="input" type="text" placeholder="Video de youtube" value={youtubeUrl} onChange={handleYoutubeUrl} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Project Stage: MX or BR or CH or AR */}
          <div className="box">
            <h4 className="title is-4 mb-1"><FontAwesomeIcon icon={faCaretRight} /> Etapa del proyecto</h4>
            <p>Seleccione la etapa del proyecto.</p>
            <div className="columns my-1">
              <div className="column">
                <div className="field">
                  <label className="label">Etapa</label>
                  <div className="control">
                    <div className="select">
                      <select value={stage} onChange={handleStage}>
                        <option value="MX">MX</option>
                        <option value="BR">BR</option>
                        <option value="CH">CH</option>
                        <option value="AR">AR</option>
                      </select>
                    </div>
                  </div>
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
                  />
                );
              })}
            <div className="buttons">
              <button className="button is-black is-outlined is-fullwidth" onClick={addNewArticle}><FontAwesomeIcon icon={faPlus} />&nbsp;Agregar articulo</button>
            </div>
          </div>
          {/* Project Save */}
          <div className="box">
            <h4 className="title is-4 mb-1"><FontAwesomeIcon icon={faCaretRight} /> Guardar proyecto</h4>
            <p>Puede optar por <b>guardar</b> el proyecto como <b>borrador</b> para editarlo luego y publicarlo cuando este listo.</p>
            <p>O puede <b>guardar y publicar</b> el proyecto (el proyecto quedara visible para que los usuarios participen)</p>
            <div className="buttons mt-3">
              <button className="button is-black" onClick={handleSave}><FontAwesomeIcon icon={faSave} />&nbsp;Guardar borrador</button>
              <button className="button is-black" onClick={handleSaveAndPublish}><FontAwesomeIcon icon={faSave} />&nbsp;Guardar y&nbsp;<FontAwesomeIcon icon={faPaperPlane} />&nbsp;Publicar</button>
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

