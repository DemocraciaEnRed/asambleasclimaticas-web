"use client"
import dynamic from 'next/dynamic'
import { useEffect, useState, useRef, createRef } from "react"
// import { useAuth } from "@/context/auth-context"
import axiosServices from "@/utils/axios"
import { useRouter } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
// asterisk fa icon
import { faPlus, faAsterisk } from "@fortawesome/free-solid-svg-icons";

import ArticleForm from '@/components/pacto/form/articleForm'

const EditorComp = dynamic(() => import('@/components/common/editor'), { ssr: false })

export default function NewProjectForm({}) {
  
  // UTILITY FUNCTIONS FOR INITIALIZATION
  // Utility function to generate a random clientId
  const getRandomClientId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  // const { push } = useRouter();
  // -------------------------------------
  // INITIALIZATIONS  
  const initialArticles = [
    {
      clientId: getRandomClientId(),
      test_es: '',
      test_pt: '',
      position: 1
    }
  ]
  // const user = useAuth()
  // -------------------------------------
  // STATE AND REFS DECLARATIONS
  const [title_es, setTitle_es] = useState('')
  const [title_pt, setTitle_pt] = useState('')
  const [summary_es, setSummarSi,y_es] = useState('# Hola!')
  const [summary_pt, setSummary_pt] = useState('# oi!')
  const summary_es_ref = useRef(null)
  const summary_pt_ref = useRef(null)
  const [articles, setArticles] = useState(initialArticles)
  const articlesRefs = useRef([])
  const [lastArticlePosition, setLastArticlePosition] = useState(2)
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
  // METHODS

  function addNewArticle() {
    // create a clientId for the new article
    const clientId = getRandomClientId();
    // Create a new ArticleForm reference
    setArticles([...articles, { clientId: clientId, text_es: '', text_pt: '', position: lastArticlePosition }]);
    // Create a new ref for the ArticleForm
    articlesRefs.current.push(createRef());
  }
  
  function logArticlesOutput() {
    // for every ArticleForm that is dynamically added, get the output by calling getOutput from the ArticleForm component
    const output = articlesRefs.current.map((article) => {
      return article.getOutput();
    });
    console.log('Output:', output);
  
  }
  // -------------------------------------
  // HANDLERS

  function handleTitle_es(e) {
    setTitle_es(e.target.value)
  }

  function handleTitle_pt(e) {
    setTitle_pt(e.target.value)
  }
  
  return (
    <>
    <div className="section has-background-black has-text-white">
    <h1 className="title is-2 has-text-white"><FontAwesomeIcon icon={faPlus} /> <FontAwesomeIcon icon={faFile} />&nbsp;Proyecto nuevo</h1>
          <p>Despues de crear tu nuevo proyecto, el mismo quedara <u>oculto</u> hasta que lo publiques.</p>
          <p>Una vez publicado, el proyecto sera visible para todos los usuarios. Aseguresé de que el proyecto este listo para ser publicado.</p>
    </div>
    <div className="pacto-form section has-background-light">
      <div className="container is-fluid">
        <div className="box has-background-dark has-text-white">
          <h1 className="title is-2 has-text-white">Proyecto nuevo</h1>
          <p>Despues de crear tu nuevo proyecto, el mismo quedara <u>oculto</u> hasta que lo publiques.</p>
          <p>Una vez publicado, el proyecto sera visible para todos los usuarios. Aseguresé de que el proyecto este listo para ser publicado.</p>
        </div>
        <div className="box">
          <h4 className="title is-4 mb-1">Título del proyecto</h4>
          <p><b>Note:</b> No se versiona el título del proyecto.</p>
          <div className="columns my-1">
            <div className="column">
              <div className="field">
                <label className="label">Español</label>
                <div className="control">
                  <input className="input" type="text" placeholder="Título en español" value={title_es} onChange={handleTitle_es} />
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
        <div className="box">
          <div className="content">
          <h4 className="title is-4 mb-2">Acerca del proyecto</h4>
          <p>Ingrese la introducción delproyecto. El campo se versiona y guarda en el historial de versiones. Durante una version se puede editar, pero una vez que se cree una nueva versión, la misma no se puede editar.</p>
          </div>

          <div className="columns is-mobile">
            <div className="column is-12-tablet is-6-desktop">
              <EditorComp editorRef={summary_es_ref} markdown={summary_es} es />
            </div>
            <div className="column is-12-tablet is-6-desktop">
              <EditorComp editorRef={summary_pt_ref} markdown={summary_pt} pt />
            </div>
          </div>
        </div>
        <div className="box">
          <h4 className="title is-4 mb-1">Articulos del proyecto</h4>
          <p>Ingrese los articulos del proyecto.</p>
          <hr />
           {/* Articles Forms dynamically added */}
            {articles.map((article, index) => {
              return (
                <ArticleForm
                  key={article.clientId}
                  article={article}
                  ref={(el) => (articlesRefs.current[index] = el)}
                />
              );
            })}
          <hr />
          <div className="buttons">
            <button className="button is-primary" onClick={addNewArticle}>Agregar articulo</button>
            <button className="button is-primary" onClick={logArticlesOutput}>Print console</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

