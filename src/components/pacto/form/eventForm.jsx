"use client"

import dynamic from 'next/dynamic'
import { useEffect, useState, useRef, createRef, useMemo, Suspense } from "react"
import { useRouter } from "next/navigation"
import Link from 'next/link'
import axiosServices from "@/utils/axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFile } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faAsterisk, faCaretRight, faPaperPlane, faEyeSlash, faSave, faTimes, faCheck, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import slugify from 'slugify'
import projectFormUtils from '@/utils/projectForm'
import { useAuthContext } from '@/context/auth-context'


export default function EventFormComponent({project}) {
  // INITIALIZATIONS
  const router = useRouter()  
  const { user } = useAuthContext()

  const init_title_es = event ? event.title_es : ''
  const init_title_pt = event ? event.title_pt : ''
  const init_text_es = event ? event.text_es : ''
  const init_text_pt = event ? event.text_pt : ''
  const init_date = event ? event.date : ''

  // -------------------------------------
  // STATE AND REFS DECLARATIONS
  const [title_es, setTitle_es] = useState(init_title_es)
  const [title_pt, setTitle_pt] = useState(init_title_pt)
  const [text_es, setText_es] = useState(init_text_es)
  const [text_pt, setText_pt] = useState(init_text_pt)
  const [date, setDate] = useState(init_date)
  
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [showErrorResponse, setShowErrorResponse] = useState(false)
  const [errorResponse, setErrorResponse] = useState(null)

  // -------------------------------------
  // HANDLE FUNCTIONS
  const handleTitle_esChange = (e) => {
    setTitle_es(e.target.value)
  }

  const handleTitle_ptChange = (e) => {
    setTitle_pt(e.target.value)
  }

  const handleText_esChange = (e) => {
    setText_es(e.target.value)
  }

  const handleText_ptChange = (e) => {
    setText_pt(e.target.value)
  }

  const handleDateChange = (e) => {
    // transform to ISO 8601
    setDate(e.target.value)
  }

  const handleSave = async () => {
    try {
      // Perform save operation here
      setIsLoading(true)
      console.log('Saving...')
      const payload = {
        title_es,
        title_pt,
        text_es,
        text_pt,
        date
      }
      console.log(payload)
      axiosServices.post(`/projects/${project._id}/events`, payload)
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
    } catch (error) {
      setErrorResponse(error.message)
      setShowErrorResponse(true)
    } finally {
      setIsLoading(false)
    }
  }

  const closeErrorMessage = () => {
    setShowErrorResponse(false)
    setErrorResponse(null)
  }

  return (
    <>
      {/* Project Title */}
      <div className="box">
        <h4 className="title is-4 mb-1"><FontAwesomeIcon icon={faCaretRight} /> Título del evento</h4>
        <p><b>Note:</b> No se versiona el título del proyecto.</p>
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Español</label>
              <div className="control">
                <input className="input" type="text" placeholder="Título en español" value={title_es} onChange={handleTitle_esChange}/>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Portugués</label>
              <div className="control">
                <input className="input" type="text" placeholder="Título en portugués" value={title_pt} onChange={handleTitle_ptChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Project Date Input */}
      <div className="box">
        <h4 className="title is-4 mb-1"><FontAwesomeIcon icon={faCaretRight} /> Fecha del evento</h4>
        <div className="field">
          <label className="label">Fecha (en -03:00 UTC - Horario Argentina)</label>
          <div className="control">
            <input className="input" type="date" value={date} onChange={handleDateChange} />
          </div>
        </div>
      </div>

      {/* Project Text */}
      <div className="box">
        <h4 className="title is-4 mb-1"><FontAwesomeIcon icon={faCaretRight} /> Texto del evento</h4>
        <p>Escriba el texto del evento en español y portugués a ser agregada a la hoja de ruta.</p>
        <div className="columns is-multiline is-mobile mt-1">
          <div className="column is-12-mobile is-12-tablet is-6-desktop is-6-widescreen is-6-fullhd">
            <div className="field">
              <label className="label">Español</label>
              <div className="control">
                <textarea className="textarea" placeholder="Texto en español" value={text_es} onChange={handleText_esChange} rows={8}></textarea>
              </div>
            </div>
          </div>
          <div className="column is-12-mobile is-12-tablet is-6-desktop is-6-widescreen is-6-fullhd">
            <div className="field">
              <label className="label">Portugués</label>
              <div className="control">
                <textarea className="textarea" placeholder="Texto en portugués" value={text_pt} onChange={handleText_ptChange} rows={8}></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="box">
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
        <div className="buttons is-right mt-3">
          <button className={`button is-black is-fullwidth ${isLoading && 'is-loading'}`} disabled={isLoading} onClick={handleSave}><FontAwesomeIcon icon={faSave} />&nbsp;Guardar</button>
        </div>
      </div>
    </>
  )

}