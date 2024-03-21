"use client"
import { useState, useEffect, useRef } from "react"
import { useRouter, redirect, usePathname } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link'
import Image from 'next/image'
import axiosServices from "@/utils/axios";
import { faAngleDoubleRight, faCheck, faDownload, faExclamationTriangle, faPenClip, faShield, faSync, faTimes, faUserEdit, faUserShield } from "@fortawesome/free-solid-svg-icons";
import Emoji from "@/components/common/emoji";
import { faCheckCircle, faSave, faTimesCircle, faUser } from "@fortawesome/free-regular-svg-icons";
import { useAuthContext } from "@/context/auth-context";
import { useAlert } from "@/context/alert-context";

export default function AdminStatsPage({params}) {
  // get the user from store
  const { user } = useAuthContext()
  const { addAlert } = useAlert()
  
  // const userId = params.id
  const pathname = usePathname()
  const [statsData, setStatsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    fetchData()
  }
  , [])

  const isRouteActive = (path, strict = false) => {
    // check if pathname (string) contains or starts with path (string)
    if(strict) return pathname === path

    if (pathname.includes(path)) {
      return true
    }

    return false
  }

  async function fetchData() {
    try {
      const stats = await axiosServices.get(`/admin/stats`)
      setStatsData(stats.data)
      setIsLoading(false)
    } catch (err) {
      addAlert('Error al cargar estadisticas', 'error')
    }
  }
    
  if(isLoading) {
    return <div className="has-text-centered">
      <p>Cargando...</p>
      <progress className="progress is-small is-primary mt-3" max="100"></progress>
    </div>
  }

  return (
    <div>
      <h1 className="subtitle is-6 has-text-grey">(re)surgentes</h1>
      <h1 className="title is-3 mb-5">Estadisticas</h1>
      <hr />
      <h1 className="title is-5">Estadisticas de usuarios</h1>
      <table className="table is-fullwidth is-bordered is-narrow is-striped">
        <thead>
          <tr>
            <th>Dato</th>
            <th className="has-text-centered">Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>👤 Total de usuarios</td>
            <td className="has-text-centered">{statsData.users.totalUsers}</td>
          </tr>
          <tr>
            <td>🛡️ Total de administradores</td>
            <td className="has-text-centered">{statsData.users.totalAdmins}</td>
          </tr>
          <tr>
            <td>✍️ Total de autores</td>
            <td className="has-text-centered">{statsData.users.totalAuthors}</td>
          </tr>
          <tr>
            <td>✅ Total de usuarios verificados</td>
            <td className="has-text-centered">{statsData.users.totalVerified}</td>
          </tr>
          <tr>
            <td>❓ Total de usuarios no verificados</td>
            <td className="has-text-centered">{statsData.users.totalUnverified}</td>
          </tr>
          <tr>
            <td>🗑️ Total de usuarios eliminados</td>
            <td className="has-text-centered">{statsData.users.totalDeleted}</td>
          </tr>
          <tr>
            <td>Usuarios que ingresaron en los últimos <u>30 días</u></td>
            <td className="has-text-centered">{statsData.users.last30DaysLogins}</td>
          </tr>
          <tr>
            <td>Usuarios que ingresaron en los últimos <u>7 días</u></td>
            <td className="has-text-centered">{statsData.users.last7DaysLogins}</td>
          </tr>
        </tbody>
      </table>
      <h1 className="title is-5">Estadisticas transversal sobre proyectos</h1>
      <table className="table is-fullwidth is-bordered is-narrow is-striped">
        <thead>
          <tr>
            <th>Dato</th>
            <th className="has-text-centered">Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total de proyectos</td>
            <td className="has-text-centered">{statsData.projects.totalProjects}</td>
          </tr>
          <tr>
            <td>Total de artículos</td>
            <td className="has-text-centered">{statsData.projects.totalArticles}</td>
          </tr>
          <tr>
            <td>Total de proyectos publicados</td>
            <td className="has-text-centered">{statsData.projects.totalProjectsPublished}</td>
          </tr>
          <tr>
            <td>Total de proyectos NO publicados</td>
            <td className="has-text-centered">{statsData.projects.totalProjectsUnpublished}</td>
          </tr>
          <tr>
            <td>Total de proyectos cerrados</td>
            <td className="has-text-centered">{statsData.projects.totalProjectsClosed}</td>
          </tr>
          <tr>
            <td>Total de proyectos ocultos</td>
            <td className="has-text-centered">{statsData.projects.totalProjectsHidden}</td>
          </tr>
          <tr>
            <td>💬 Total de comentarios (proyectos + articulos)</td>
            <td className="has-text-centered">{statsData.projects.totalComments}</td>
          </tr>
          <tr>
            <td>💬 Total de comentarios generales en proyectos</td>
            <td className="has-text-centered">{statsData.projects.totalProjectComments}</td>
          </tr>
          <tr>
            <td>✅ Total de comentarios generales resueltos de proyectos</td>
            <td className="has-text-centered">{statsData.projects.totalProjectCommentsResolved}</td>
          </tr>
          <tr>
            <td>⭐ Total de comentarios generales destacados de proyectos</td>
            <td className="has-text-centered">{statsData.projects.totalProjectCommentsHighlighted}</td>
          </tr>
          <tr>
            <td>💬 Total de comentarios en artículos de proyetos</td>
            <td className="has-text-centered">{statsData.projects.totalProjectArticleComments}</td>
          </tr>
          <tr>
            <td>✅ Total de comentarios resueltos en artículos de proyectos</td>
            <td className="has-text-centered">{statsData.projects.totalProjectArticleCommentsResolved}</td>
          </tr>
          <tr>
            <td>⭐ Total de comentarios destacados en artículos de proyectos</td>
            <td className="has-text-centered">{statsData.projects.totalProjectArticleCommentsHighlighted}</td>
          </tr>
          <tr>
            <td>Total de 👍 <b>Me gusta</b> de proyectos</td>
            <td className="has-text-centered">{statsData.projects.totalProjectLikes}</td>
          </tr>
          <tr>
            <td>Total de 👎 <b>No me gusta</b> de proyectos</td>
            <td className="has-text-centered">{statsData.projects.totalProjectDislikes}</td>
          </tr>
          <tr>
            <td>Total de 👍 <b>Me gusta</b> de artículos</td>
            <td className="has-text-centered">{statsData.projects.totalArticleLikes}</td>
          </tr>
          <tr>
            <td>Total de 👎 <b>No me gusta</b> de artículos</td>
            <td className="has-text-centered">{statsData.projects.totalArticleDislikes}</td>
          </tr>
          <tr>
            <td>💬 Total de respuestas</td>
            <td className="has-text-centered">{statsData.projects.totalReplies}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
