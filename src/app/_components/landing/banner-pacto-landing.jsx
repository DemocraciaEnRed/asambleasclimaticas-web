

export default function BannerPactoLanding({ description }) {

    return (<div className="banner-interciudad has-background-cream " id="banner-interciudad">
        <h1 className="has-text-centered is-size-2"> Pacto Inter-Ciudad</h1>
        {/* <div className="has-text-centered py-5">
            <img src="/images/image-pacto-interciudad.png" alt="pacto inter-ciudad" />

        </div> */}
        <div className="content my-5 mx-auto" dangerouslySetInnerHTML={{ __html: description }}>

        </div>
    </div>)
}