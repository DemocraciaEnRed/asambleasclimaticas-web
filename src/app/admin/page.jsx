'use client'
import { useRouter, redirect } from "next/navigation"
import { useAuthContext } from "@/context/auth-context";

export default function AdminHomePage({ params }) {

  return (
    <>
      <div className="">
        <h1 className="title is-3">Panel de administración</h1>
        <p>Seleccione una opción del menú lateral</p>
      </div>
    </>
  )
}