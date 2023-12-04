import Link from "next/link";

export function ComoParticiparInfo() {
  return <section className='como-participar'>
    <h1>¿Cómo participar?</h1>
    <div className='static-info-wrapper-content'>
      <span>
        ¿QUÉ ES EL CONGRESO DE LA REPÚBLICA Y QUÉ FUNCIONES CUMPLE?
      </span>
      <p>
        "Colombia cuenta con un sistema legislativo bicameral conformado por un Senado y la Cámara de Representantes. Los congresistas son designados por un período de cuatro años que inicia y finaliza cada 20 de junio."
      </p>
      <span>
        ¿QUÉ DIFERENCIAS EXISTEN ENTRE EL SENADO Y LA CÁMARA?
      </span>
      <ul>
        <li>La forma como se eligen.</li>
        <li>Los temas o proyectos que conocen.</li>
        <li>Los altos funcionarios que se designan.</li>
      </ul>
      <span>
        Senado de la República:
      </span>
      <p>El Senado se elige con el voto en todo el territorio nacional y se compone por 108 senadores y senadoras, cuyas curules se distribuyen así: 100 electos por circunscripción nacional, dos por circunscripción especial indígena, cinco curules del partido resultado del Acuerdo de Paz y una curul para oposición.
        <br /><br />
        ENTRE SUS PRINCIPALES FUNCIONES:
        <ul>
          <li>
            Admitir las renuncias del Presidente y Vicepresidente de la República.
          </li>
          <li>
            Aprobar o no los ascensos militares.
          </li>
          <li>
            Conceder licencia al presidente para separarse temporalmente del cargo.
          </li>
          <li>
            Permitir el tránsito de tropas extranjeras por territorio nacional.
          </li>
          <li>
            Autorizar declaraciones de guerra del gobierno.

          </li>
          <li>
            Elegir a los magistrados de la Corte Constitucional y al Procurador General de la Nación.

          </li>
        </ul>
      </p>
      <span>
        Cámara de Representantes
      </span>
      <p>La Cámara de Representantes se elige por departamentos y por el Distrito Capital de Bogotá. Actualmente, son 172 representantes, 161 elegidos por voto popular,  cinco del partido resultado del Acuerdo de Paz, dos por representación afrodescendiente, una por representación indígena, una por colombianos en el exterior y una para la oposición.
        <br /><br />
        ENTRE SUS PRINCIPALES FUNCIONES:
        <ul>
          <li>
            Elegir al Defensor del Pueblo.
          </li>
          <li>
            Examinar y fenecer la cuenta general del Presupuesto y del tesoro que presente el Contralor.
          </li>
          <li>
            Acusar ante el Senado al presidente, magistrados de las altas cortes y al Fiscal General de la Nación, en caso de existir razones constitucionales y conocer denuncias y quejas que presente el Fiscal General de la Nación o particulares contra los funcionarios.
          </li>
          <li>
            Requerir el auxilio de otras autoridades para investigaciones y comisionar práctica de pruebas cuando sea necesario.
          </li>

        </ul>
      </p>
      <span>
      ¿CUÁL ES EL PROCEDIMIENTO PARA DISCUTIR Y APROBAR UNA LEY?
      </span>
      <ol>
        <li>Se presenta una iniciativa de ley</li>
        <li>La iniciativa se envía a una comisión para elaborar un primer informe para un primer debate</li>
        <li>Primer debate en comisión, si se aprueba en discusión pasa a segundo debate</li>
        <li>Ponencia en segundo debate</li>
        <li>Debate en plenaria frente a la totalidad de senadurías o representantes dependiendo de la cámara donde sea su discusión. Aquí se puede decidir si se rechaza, si se reenvía a una comisión o si se vota a favor. </li>
        <li>Si el proyecto se aprueba en la Cámara o el Senado, se envía al otro órgano legislativo (Cámara o Senado) para su discusión y aprobación.</li>
        <li>Aprobación presidencial. Una vez aprobada la iniciativa por ambas cámaras, se envía a la presidencia de la República para su aprobación o veto.</li>
      </ol>
    </div>
  </section>

}