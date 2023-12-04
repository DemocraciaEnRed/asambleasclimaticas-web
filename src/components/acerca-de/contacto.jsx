import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLaptop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";


export function ContantInfo() {
    return <section className='contacto'>
    <h1>Contacto</h1>
    <div className='static-info-wrapper-content'>
      <p>       
        ¿Perteneces a una organización de la sociedad civil o movimiento social? Agendemos una llamada para activar tu propuesta en COLECTIVA
      </p>
     
      <button class="my-3 button is-rounded is-black is-uppercase px-6">Conoce más</button>
      <div className="link-section">
        <h2>Escríbenos tus comentario</h2>
          <Link target="_blank" href="https://www.artemisas.org/"><FontAwesomeIcon icon={faLaptop} /><p>https://www.artemisas.org/</p></Link>
          <Link target="_blank" href="mailto:organizacionartemisas@gmail.com"><FontAwesomeIcon icon={faEnvelope} /><p>organizacionartemisas@gmail.com</p></Link>
        <h2>Redes Sociales</h2>
          <Link target="_blank" href="https://instagram.com/organizacionartemisas?igshid=YmMyMTA2M2Y="><FontAwesomeIcon icon={faInstagram} /><p>https://instagram.com/organizacionartemisas	</p></Link>
          <Link target="_blank" href="https://twitter.com/Artemisas_org"><FontAwesomeIcon icon={faTwitter} /><p>@Artemisas_org</p></Link>
          <Link target="_blank" href="https://www.facebook.com/OrganizacionArtemisas/"><FontAwesomeIcon icon={faFacebook} /><p>https://www.facebook.com/OrganizacionArtemisas/</p></Link>

      </div>
    </div>
  </section>
    
}