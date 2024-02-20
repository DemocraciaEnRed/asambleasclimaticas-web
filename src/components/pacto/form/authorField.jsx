"use client"
import { useEffect, useState, useMemo, forwardRef, useImperativeHandle } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight, faAsterisk, faCaretRight } from "@fortawesome/free-solid-svg-icons"
import { useAuthContext } from "@/context/auth-context"
import { adminFetchAuthors } from "@/utils/get-data"


const AuthorField = forwardRef(({ author }, ref) => {
  // STATE
  let prevAuthor = null
  if(author){
    prevAuthor = {
      _id: author._id,
      name: author.name,
      country: author.country
    }
  }
  const [selectedAuthor, setSelectedAuthor] = useState(prevAuthor)
  const [showList, setShowList] = useState(false)
  const [authorsList, setAuthorsList] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  // HOOkS
  useEffect(() => {

  })

  useImperativeHandle(ref, () => ({
    getAuthor() {
      return selectedAuthor
    }
  }));

  const { user } = useAuthContext()

  const authorValue = useMemo(() => {
    if (selectedAuthor == null) return `${user.country && user.country.emoji } ${user.name}`
    return `${selectedAuthor.country && selectedAuthor.country.emoji} ${selectedAuthor.name}`
  }, [selectedAuthor])

  async function fetchAuthors(page = 1, limit = 3) {
    try {
      const data  = await adminFetchAuthors(page, limit)
      console.log(data)
      setAuthorsList(data.users)
      setTotalPages(data.pages)
      setTotalItems(data.total)
      setPage(data.page)
    } catch (error) {
      console.log(error)
      setShowError(true)
      return null
    }
  }

  if (!user) {
    return null
  }
  const userIsAdmin = user.role === 'admin'
  if (!userIsAdmin) {
    return null
  }

  const mode = prevAuthor ? 'edit' : 'new'

  function showListAndFetchAuthors() {
    setShowList(true)
    fetchAuthors()
  }

  function selectAuthor(author) {
    const { _id, name, country } = author
    setSelectedAuthor({
      _id,
      name,
      country
    })
    setShowList(false)
  }

  function fetchNextPage() {
    if(page == totalPages) return;
    const nextPage = page + 1
    console.log(nextPage)
    fetchAuthors(nextPage)
  }

  function fetchPreviousPage() {
    if(page == 1) return;
    const previousPage = page - 1
    console.log(previousPage)
    fetchAuthors(previousPage)
  }

  function cancelSelectAuthor() {
    setSelectedAuthor(prevAuthor)
    setShowList(false)
  }

  return (
    <>
      <div className="box">
        <h4 className="title is-4 mb-1"><FontAwesomeIcon icon={faCaretRight} /> Autor del proyecto</h4>
        {
          mode === 'new' && userIsAdmin && (
            <p>Como usted es <b>Administrador</b>, puede elegir en ser el autor del proyecto o elegir a otro usuario con rol <u>autor</u></p>
          )
        }
        {
          !showList && (
            <>
              <div className="field">
                <div className="control">
                  <input className="input is-static" type="text" readOnly placeholder="Autor del proyecto" value={authorValue} />
                </div>
                <span className="help">Dado que no ha seleccionado un autor, usted sera el autor del proyecto.</span>
              </div>
              <button className="button is-primary is-small is-primary" onClick={showListAndFetchAuthors}>Elegir otro autor</button>
            </>
          )
        }
        {
          showList && (
            <div className="box border mb-0 mt-3">
              <p><i>Seleccione un usuario para que sea el autor del proyecto.</i></p>
              {
                showError && (
                  <div className="notification is-danger py-3">
                    <button className="delete" onClick={() => setShowError(false)}></button>
                    <p>Ha ocurrido un error al cargar los autores.</p>
                  </div>
                )
              }
              {
                authorsList.map(author => (
                  <div className="is-flex is-flex-direction-row  is-align-items-center is-justify-content-left my-2" key={author._id}>
                    <a className="button is-small is-black is-rounded is-outlined" onClick={() => selectAuthor(author)}>Seleccionar</a>
                    <div className="ml-3">
                      <p className="mb-0">{author.country && author.country.emoji} <b>{author.name}</b> - {author.email} - <i>{author.role}</i></p>
                    </div>
                  </div>
                ))
              }
              
              <nav className="pagination is-small" role="navigation" aria-label="pagination">
                <a className={`pagination-previous ${page == 1 && 'is-disabled'}`} onClick={fetchPreviousPage}><FontAwesomeIcon icon={faArrowLeft} /></a>
                <a className={`pagination-next ${page == totalPages && 'is-disabled'}`} onClick={fetchNextPage}><FontAwesomeIcon icon={faArrowRight} /></a>
                <a className={`pagination-next`} onClick={cancelSelectAuthor}>Reiniciar</a>
                <ul className="pagination-list">
                  <li>
                    <p>Página {page} de {totalPages} / Usuarios (admin y autores) en total: {totalItems}</p>
                  </li>
                </ul>
              </nav>
            </div>
          )
        }
      </div>
    </>
  )
})

AuthorField.displayName = 'AuthorField';

export default AuthorField;