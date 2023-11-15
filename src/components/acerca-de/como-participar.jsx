import Link from "next/link";

export function ComoParticiparInfo() {
    return <section className='como-participar'>
    <h1>Cómo participar</h1>
    <div className='static-info-wrapper-content'>
      <span>
        ¿Cómo funciona?
      </span>
      <p>
        Las y los diputados suben <strong>propuestas y proyectos de ley</strong> para que puedan ser enriquecidos con aportes, comentarios y sugerencias
      </p>
      <span>
        ¿Qué es una <em>propuesta</em>?
      </span>
      <p>
        Una propuesta de ley es el <strong>estado anterior al proyecto de ley</strong>, es decir, antes de iniciado el trámite parlamentario.
      </p>
      <p>
        Las y los diputados analizarán los <strong>aportes</strong> realizados por la ciudadanía en la propuesta y a partir de esto realizarán los cambios que consideren necesarios para la versión final del texto.
      </p>
      <span>
        ¿Qué entendemos por aporte?
      </span>
      <p>
        A través de esta plataforma, la ciudadanía puede hacer <strong>comentarios generales</strong>, para dar su opinión o postura general sobre la propuesta de ley. Además, puede realizar aportes puntuales seleccionando una parte específica del texto y haciendo un <strong>aporte particular</strong>.
      </p>
      <p>
        Las y los diputados analizarán los <strong>aportes</strong>. En la medida en se realicen cambios a la propuesta original se generarán nuevas versiones de la propuesta. Así, las y los usuarios cuyos aportes fueran incorporados, serán colaboradores en la redacción de la propuesta final.
      </p>
      <p>
        Para más detalles sobre las funcionalidades básicas de esta plataforma descargue/consulte el <Link href='/static/files/congreso_manual_de_usuario.pdf'>Manual de usuario</Link>
      </p>
    </div>
  </section>
    
}