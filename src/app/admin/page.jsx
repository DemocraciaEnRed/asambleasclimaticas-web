"use client"
import { useState } from "react"
import { useRouter, redirect } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "@/context/auth-context";
import ProjectFormComponent from "@/components/pacto/form/projectForm";
import { useEffect } from "react";

export default function AdminHomePage({ params }) {
  // get the user from store
  const { user } = useAuthContext()  // redirect if user is not logged in
  // redirect if user is not admin or author
  if (user.role !== 'admin') {
    redirect('/')
  }

  return (
    <>
      <div className="">
        <h1 className="title is-3">Panel de administración</h1>
        <p>Seleccione una opción del menú lateral</p>
      </div>
    </>
  )
}