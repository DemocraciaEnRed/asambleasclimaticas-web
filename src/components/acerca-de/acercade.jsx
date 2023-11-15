import Link from "next/link";

const alianzas = ['extituto', 'der', 'delibera', 'sur']

export function AcercaDeInfo() {
    return <section className='acerca-de'>
    <h1>acerca de</h1>
    <div className='static-info-wrapper-content'>
      <span>
      Sobre el proyecto
      </span>
      <p>
      Latinoamerica apuesta por un nuevo modelo económico. Un modelo post-carbono, que integre la creación de valor económico, social y ambiental. Buscamos nuevas estrategias de desarrollo local basadas en la innovación, la colaboración y la creatividad, con modelos de producción y de consumo que reduzcan-reutilicen-reciclen-reparen-regeneren.
      <br/><br/>
      Agua, el aire, los rios , el suelo y los ecosistemas no son recursos. La diversidad biológica garantiza la calidad de vida humana. Nuestro bienestar depende de los servicios ambientales que nos brindan los ecosistemas abundantes, sanos y diversos y deben ser sujetos de derechos..
      </p>
      <span>
        Alianzas
      </span>
      
      <div className="logos-wrapper">
        {alianzas.map((alianza,idx) => <img key={idx} src={`images/logos/${alianza}.png`} alt="" />)}
      </div>
     
    </div>
  </section>
    
}