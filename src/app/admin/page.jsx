'use client'
import { useRouter, redirect } from "next/navigation"
import { useAuthContext } from "@/context/auth-context";

export default function AdminHomePage({ params }) {
  // get the user from store
  const { user } = useAuthContext()  // redirect if user is not logged in
  // redirect if user is not admin or author
  if (user && user.role !== 'admin') {
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