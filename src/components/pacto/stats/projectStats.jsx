"use client"

import { useEffect, useState } from "react"

export default function ProjectStatsComponent({project, countries}) {
  // prop countries is an array of objects with _id, name, code, emoji, unicode, image, createdAt, updatedAt

  // 	"uniqueUsersWhoInteractedPerCountry": {
  // 	"DO": 4,
  // 	"SV": 1,
  // 	"PA": 2,
  // 	"CO": 1,
  // 	"UY": 1,
  // 	"PY": 3,
  // 	"BR": 3,
  // 	"GT": 1,
  // 	"NI": 1,
  // 	"MX": 1,
  // 	"AR": 1,
  // 	"HN": 1
  // },
  const uniqueUsersWhoInteractedPerCountrySortedByValue = {}
    
  Object.keys(project.stats.uniqueUsersWhoInteractedPerCountry)
  .sort((a,b) => {
    return project.stats.uniqueUsersWhoInteractedPerCountry[b]-project.stats.uniqueUsersWhoInteractedPerCountry[a]
  })
  .forEach((key) =>{
    uniqueUsersWhoInteractedPerCountrySortedByValue[key] = project.stats.uniqueUsersWhoInteractedPerCountry[key]
  })

  const uniqueUsersWhoInteractedPerCountrySortedByValueVersion = (uniqueUsersWhoInteractedPerCountry) => {
    const uniqueUsersWhoInteractedPerCountrySortedByValue = {}
    
    Object.keys(uniqueUsersWhoInteractedPerCountry)
    .sort((a,b) => {
      return uniqueUsersWhoInteractedPerCountry[b]-uniqueUsersWhoInteractedPerCountry[a]
    })
    .forEach((key) =>{
      uniqueUsersWhoInteractedPerCountrySortedByValue[key] = uniqueUsersWhoInteractedPerCountry[key]
    })
    return uniqueUsersWhoInteractedPerCountrySortedByValue
  }


  function getCountryProgress(countryCode, value) {
    // find the country using countryCode
    const country = countries.find(country => country.code === countryCode)

    return (
      <div className="country-progress column is-4" key={countryCode}>
        <div className="is-flex is-justify-content-space-between">
          <div className="mb-1">
          {country.emoji} {country.name}
          </div>
          <div className="country-progress__value">
          {value} de {project.stats.uniqueUsersWhoInteracted}
          </div>
        </div>
        <div className="country-progress__progress">
          <progress className="progress is-small is-primary" value={value} max={project.stats.uniqueUsersWhoInteracted}>{value} de {project.stats.uniqueUsersWhoInteracted}</progress>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="box">
        <h2 className="title is-3">Estadisticas actuales</h2>
        <h3 className="title is-5">Datos generales</h3>
        <table className="table is-narrow is-bordered is-fullwidth">
          <thead>
            <tr>
              <th>Estadistica</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Versión actual del proyecto</td>
              <td>{project.stats.version}</td>
            </tr>
            <tr>
              <td>
                <p>Cantidad de usuarios unicos que interactuaron de alguna forma con le proyecto</p>
                <p className="is-size-7 is-italic">Se valora como interacción desde comentar, responder, o dar un &quot; me gusta/no me gusta &quot; en un comentario, respuesta o like en un proyecto, comentario, respuesta o articulo.</p>
              </td>
              <td>{project.stats.uniqueUsersWhoInteracted}</td>
            </tr>
          </tbody>
        </table>
        <h3 className="title is-5">Cantidad de usuarios que interactuaron por paises</h3>
        <div className="columns is-multiline is-centered">
        {
          Object.keys(uniqueUsersWhoInteractedPerCountrySortedByValue).map(countryCode => {
            return getCountryProgress(countryCode, project.stats.uniqueUsersWhoInteractedPerCountry[countryCode])
          })
        }
        {
          Object.keys(uniqueUsersWhoInteractedPerCountrySortedByValue).length === 0 && <div className="column is-12">
            No hay datos de interacción por paises
          </div>
        }
        </div>
        <hr />
        {/* <h3 className="title is-5">Me gusta/No me gusta (Del proyecto)</h3>
        <h6 className="subtitle is-6 is-italic">Solamente son los me gusta/no me gusta <u>al proyecto</u>. No se suman los me gusta/no me gusta de articulos, comentarios (generales o en articulos) ni respuestas a comentarios</h6>
        <table className="table is-narrow is-bordered is-fullwidth">
          <thead>
            <tr>
              <th>Estadistica</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cantidad de 👍 <b>Me gusta</b> del proyecto</td>
              <td>{project.stats.likes}</td>
            </tr>
            <tr>
              <td>Cantidad de 👎 <b>No me gusta</b> del proyecto</td>
              <td>{project.stats.dislikes}</td>
            </tr>
          </tbody>
        </table>
        <hr /> */}
        <h3 className="title is-5">Comentarios generales</h3>
        <h6 className="subtitle is-6 is-italic">Se considera comentario general a un comentario no asociado a un articulo, sino a comentarios generales (de 1° nivel)</h6>
        <table className="table is-narrow is-bordered is-fullwidth">
          <thead>
            <tr>
              <th>Estadistica</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>💬 Cantidad de comentarios <u>generales</u> del proyecto</td>
              <td>{project.stats.comments}</td>
            </tr>
            <tr>
              <td>💬 Cantidad de 👍 <b>Me gusta</b> en comentarios <u>generales</u> del proyecto</td>
              <td>{project.stats.commentsLikes}</td>
            </tr>
            <tr>
              <td>💬 Cantidad de 👎 <b>No me gusta</b> en comentarios <u>generales</u> del proyecto</td>
              <td>{project.stats.commentsDislikes}</td>
            </tr>
            <tr>
              <td>💬 Comentarios 🆕 <b>creados</b> en la versión actual ({project.stats.version})</td>
              <td>{project.stats.commentsCreatedInVersion}</td>
            </tr>
            <tr>
              <td>💬 Comentarios ⭐ <b>destacados</b> en la versión actual ({project.stats.version})</td>
              <td>{project.stats.commentsHighlightedInVersion}</td>
            </tr>
            <tr>
              <td>💬 Comentarios ☑️ <b>resueltos</b> en la versión actual ({project.stats.version})</td>
              <td>{project.stats.commentsResolvedInVersion}</td>
            </tr>

          </tbody>
        </table>
        <hr />
        <h3 className="title is-5">Respuestas sobre comentarios generales</h3>
        <table className="table is-narrow is-bordered is-fullwidth">
          <thead>
            <tr>
              <th>Estadistica</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cantidad de respuestas en comentarios <u>generales</u> del proyecto</td>
              <td>{project.stats.commentsReplies}</td>
            </tr>
            <tr>
              <td>Cantidad de 👍 <b>Me gusta</b> en respuestas a comentarios <u>generales</u> del proyecto</td>
              <td>{project.stats.commentsRepliesLikes}</td>
            </tr>
            <tr>
              <td>Cantidad de 👎 <b>No me gusta</b> en respuestas a comentarios <u>generales</u> del proyecto</td>
              <td>{project.stats.commentsRepliesDislikes}</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <h3 className="title is-5">Articulos de la version actual</h3>
        { project.articles.map(article => (<div key={article._id}>
            <h4 className="title is-4">#{article.position} Artículo</h4>
            <table className="table is-narrow is-bordered is-fullwidth">
              <thead>
                <tr>
                  <th>Estadistica</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cantidad de 👍 <b>Me gusta</b> en el artículo</td>
                  <td>{article.likes}</td>
                </tr>
                <tr>
                  <td>Cantidad de 👎 <b>No me gusta</b> en el artículo</td>
                  <td>{article.dislikes}</td>
                </tr>
                <tr>
                  <td>Cantidad de 💬 comentarios en el artículo</td>
                  <td>{article.commentsCount}</td>
                </tr>
              </tbody>
            </table>
          </div>))
        }
      </div>
      {/* {
        "version": 1,
        "likes": 10,
        "dislikes": 10,
        "comments": 14,
        "commentsLikes": 47,
        "commentsDislikes": 34,
        "commentsReplies": 164,
        "commentsRepliesLikes": 7,
        "commentsRepliesDislikes": 10,
        "commentsCreatedInVersion": 14,
        "commentsHighlightedInVersion": 0,
        "commentsResolvedInVersion": 0,
        "uniqueUsersWhoInteracted": 20,
        "uniqueUsersWhoInteractedPerCountry": {
          "EC": 3,
          "HN": 2,
          "BR": 2,
          "CO": 1,
          "GT": 1,
          "AR": 1,
          "BO": 2,
          "CL": 2,
          "VE": 2,
          "MX": 1,
          "UY": 1,
          "CR": 1,
          "PE": 1
        },
        "_id": "663cffb622b6f364b4ac2200",
        "createdAt": "2024-05-09T16:54:14.929Z",
        "updatedAt": "2024-05-09T16:54:14.929Z"
      } */}
      
      {
        project.stats.versionsStats.map((versionStats) => <div className="box" key={`project-${project._id}-${versionStats.version}`}>
          <h2 className="title is-3">Estadisticas de la versión {versionStats.version}</h2>
          <h3 className="title is-5">Datos generales</h3>
          <table className="table is-narrow is-bordered is-fullwidth">
            <thead>
              <tr>
                <th>Estadistica</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Versión actual del proyecto</td>
                <td>{versionStats.version}</td>
              </tr>
              <tr>
                <td>
                  <p>Cantidad de usuarios unicos que interactuaron de alguna forma con le proyecto</p>
                  <p className="is-size-7 is-italic">Se valora como interacción desde comentar, responder, o dar un &quot; me gusta/no me gusta &quot; en un comentario, respuesta o like en un proyecto, comentario, respuesta o articulo.</p>
                </td>
                <td>{versionStats.uniqueUsersWhoInteracted}</td>
              </tr>
            </tbody>
          </table>
          <h3 className="title is-5">Cantidad de usuarios que interactuaron por paises</h3>
          <div className="columns is-multiline is-centered">
          {
            Object.keys(uniqueUsersWhoInteractedPerCountrySortedByValueVersion(versionStats.uniqueUsersWhoInteractedPerCountry)).map(countryCode => {
              return getCountryProgress(countryCode, versionStats.uniqueUsersWhoInteractedPerCountry[countryCode])
            })
          }
          {
            Object.keys(uniqueUsersWhoInteractedPerCountrySortedByValueVersion(versionStats.uniqueUsersWhoInteractedPerCountry)).length === 0 && <div className="column is-12">
              No hay datos de interacción por paises
            </div>
          }
          </div>
          <hr />
          <table className="table is-narrow is-bordered is-fullwidth">
            <thead>
              <tr>
                <th>Estadistica</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>Cantidad de usuarios unicos que interactuaron de alguna forma con le proyecto</p>
                  <p className="is-size-7 is-italic">Se valora como interacción desde comentar, responder, o dar un &quot; me gusta/no me gusta &quot; en un comentario, respuesta o like en un proyecto, comentario, respuesta o articulo.</p>
                </td>
                <td>{versionStats.uniqueUsersWhoInteracted}</td>
              </tr>
              <tr>
                <td>💬 Cantidad de comentarios <u>generales</u> del proyecto en la versión {versionStats.version}</td>
                <td>{versionStats.comments}</td>
              </tr>
              <tr>
                <td>💬 Cantidad de 👍 <b>Me gusta</b> en comentarios <u>generales</u> del proyecto en la versión {versionStats.version}</td>
                <td>{versionStats.commentsLikes}</td>
              </tr>
              <tr>
                <td>💬 Cantidad de 👎 <b>No me gusta</b> en comentarios <u>generales</u> del proyecto en la versión {versionStats.version}</td>
                <td>{versionStats.commentsDislikes}</td>
              </tr>
              <tr>
                <td>💬 Comentarios 🆕 <b>creados</b> en la versión {versionStats.version}</td>
                <td>{versionStats.commentsCreatedInVersion}</td>
              </tr>
              <tr>
                <td>💬 Comentarios ⭐ <b>destacados</b> en la versión {versionStats.version}</td>
                <td>{versionStats.commentsHighlightedInVersion}</td>
              </tr>
              <tr>
                <td>💬 Comentarios ☑️ <b>resueltos</b> en la versión {versionStats.version}</td>
                <td>{versionStats.commentsResolvedInVersion}</td>
              </tr>
            </tbody>
          </table>
          <hr />
          <h3 className="title is-5">Respuestas sobre comentarios generales</h3>
          <table className="table is-narrow is-bordered is-fullwidth">
            <thead>
              <tr>
                <th>Estadistica</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cantidad de respuestas en comentarios <u>generales</u> del proyecto</td>
                <td>{project.stats.commentsReplies}</td>
              </tr>
              <tr>
                <td>Cantidad de 👍 <b>Me gusta</b> en respuestas a comentarios <u>generales</u> del proyecto</td>
                <td>{project.stats.commentsRepliesLikes}</td>
              </tr>
              <tr>
                <td>Cantidad de 👎 <b>No me gusta</b> en respuestas a comentarios <u>generales</u> del proyecto</td>
                <td>{project.stats.commentsRepliesDislikes}</td>
              </tr>
            </tbody>
          </table>
        </div>
        )
      }
    </>
  )
}
