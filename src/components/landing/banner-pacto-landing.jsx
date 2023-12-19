

export default function BannerPactoLanding() {

    return (<div className="banner-interciudad has-background-cream p-6" id="banner-interciudad">
        <h1 className="has-text-centered is-size-2"> Pacto Inter-Ciudad</h1>
        <div className="has-text-centered py-5">
            <img src="/images/image-pacto-interciudad.png" alt="pacto inter-ciudad" />

        </div>
        <div className="w-75 my-5 mx-auto">
            <p>El <strong>pacto</strong> es un instrumento de incidencia pública construido de manera colaborativa donde personas y ciudades definen una visión estratégica para afrontar la crisis climática desde América Latina para el mundo.</p>

            <p className="py-3 has-text-weight-bold">Cómo funciona:</p>
            <ol className="px-6">
                <li>
                    Durante su proceso de deliberación, cada Asamblea decide por lo menos 4 propuestas de principios para el pacto.
                </li>
                <li>
                    Las propuestas se publican en la plataforma para recibir contribuciones, aportes, y comentarios de la ciudadanía en general, que deberá registrarse con nombre y ciudad para participar del debate y determinación de los principios del pacto.
                </li>
                <li>
                    Durante el proceso de participación, se generan versiones actualizadas y mejoradas del Pacto Inter-ciudades, gracias a las contribuciones y aportes de las personas.
                </li>
                <li>
                    Se genera un documento final y se pone a consideración de las personas para su validación final.
                </li>
            </ol>
        </div>
    </div>)
}