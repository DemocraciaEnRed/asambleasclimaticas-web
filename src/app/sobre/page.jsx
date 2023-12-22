import Image from "next/image";

const alianzas = ['labicpa', 'open-society', 'ned', 'artemisas', 'friedrich', 'der', 'corona']

export default function Acercade() {
    return (<section className='acerca-de'>
    <h1>acerca de</h1>
    <div className='static-info-wrapper-content'>
      <span  className="has-text-primary">
      ¿Qué es Resurgentes?
      </span>
      <p>       
        El país pide un cambio político que nos permita hacerle frente a la crisis económica, de desigualdad, climática y de futuro.
        <br /> <br />
        Hoy tenemos frente a nosotras la oportunidad de entrar al Congreso y que nunca sea un espacio cerrado, alejado, inalcanzable e impenetrable que tome en nuestro nombre las decisiones que afectan nuestra vida cotidiana.
        <br /> <br />
        Desde Artemisas creemos que no hay otra forma posible de construir el país que queremos sin que sea de manera COLECTIVA.
        <br /> <br />
        Colectiva es la primera plataforma feminista en Latinoamérica para discutir, construir y movilizarnos alrededor de las iniciativas que afectarán la vida de las  niñas, jóvenes, mujeres y personas #LGBTIQ+ de nuestro país.
      </p>
      <span  className="has-text-primary">
      ¿Qué son las asambleas y el pacto inter-ciudad?
      </span>
      <p>       
          El país pide un cambio político que nos permita hacerle frente a la crisis económica, de desigualdad, climática y de futuro.
          <br /> <br />
          Hoy tenemos frente a nosotras la oportunidad de entrar al Congreso y que nunca sea un espacio cerrado, alejado, inalcanzable e impenetrable que tome en nuestro nombre las decisiones que afectan nuestra vida cotidiana.
          <br /> <br />
          Desde Artemisas creemos que no hay otra forma posible de construir el país que queremos sin que sea de manera COLECTIVA.
          <br /> <br />
          Colectiva es la primera plataforma feminista en Latinoamérica para discutir, construir y movilizarnos alrededor de las iniciativas que afectarán la vida de las  niñas, jóvenes, mujeres y personas #LGBTIQ+ de nuestro país.
      </p>
      <span  className="has-text-primary">
      Alianzas / organizaciones participantes
      </span>
      <div className="logos-wrapper">
        {alianzas.map((alianza,idx) =><Image key={idx} src={`/images/logos/${alianza}.png`} alt={'logo ' + alianza} width={150} height={70}/> )}
      </div>
     
    </div>
  </section>)
}
