"use client"
import { redirect, useSearchParams } from "next/navigation"

import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default function VerifyNoticePage({}) {

  return (
    <>
      <div className="hero is-fullheight is-bold is-warning">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-2"><FontAwesomeIcon icon={faEnvelope} /><br/>Por favor, verificá tu email</h1>
            <h2 className="subtitle">Tu sesión ha sido cerrada. Por favor, verificá tu nuevo email antes de volver a ingresar</h2>
            <Link href="/"
              className="button is-dark is-rounded"
            ><FontAwesomeIcon icon={faHome} />&nbsp;Ir al inicio</Link>
          </div>
        </div>
      </div>
    </>
  )
}