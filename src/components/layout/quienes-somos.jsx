/* eslint-disable @next/next/no-img-element */
export default function QuienesSomos() {


  return (
      <>
      <div id="quienes-somos" className="quienes-somos-wrapper section">
        <div className="container">

          <h1 className="title is-1 has-text-centered">¿Quienes somos?</h1>
          {/* subtitle in portuguese */}
          <h5 className="subtitle is-5 has-text-centered">Quem somos?</h5>
          <br />
          <div className="columns is-centered is-vcentered is-mobile is-multiline">
              <div className="column is-4-desktop is-narrow-tablet is-12-mobile has-text-centered">
                <a href="https://democraciaenred.org/" target="_blank" rel="noreferrer">
                  <img style={{width: '100%', padding: '0 10px', maxWidth: 250, margin: '0 auto' }} src="https://democraciaenred.nyc3.digitaloceanspaces.com/projects/asambleasclimaticas/der-logo.png" alt="" />
                </a>
              </div>
              <div className="column is-4-desktop is-narrow-tablet is-12-mobile has-text-centered">
                <a href="https://deliberabrasil.org/" target="_blank" rel="noreferrer">
                  <img style={{width: '100%', padding: '0 10px', maxWidth: 250, margin: '0 auto' }} src="https://democraciaenred.nyc3.digitaloceanspaces.com/projects/asambleasclimaticas/delibera-logo.png" alt="" />
                </a>
              </div>
              <div className="column is-4-desktop is-narrow-tablet is-12-mobile has-text-centered">

                <img style={{width: '100%', padding: '0 10px', maxWidth: 250, margin: '0 auto' }} src="https://democraciaenred.nyc3.digitaloceanspaces.com/projects/asambleasclimaticas/extituto-logo.png" alt="" />
              </div>
              <div className="column is-4-desktop is-narrow-tablet is-12-mobile has-text-centered">
                <a href="https://surinstitute.com/" target="_blank" rel="noreferrer">
                  <img style={{width: '100%', padding: '0 10px', maxWidth: 250, margin: '0 auto' }} src="https://democraciaenred.nyc3.digitaloceanspaces.com/projects/asambleasclimaticas/sur-logo.png" alt="" />
                </a>
              </div>
              <div className="column is-4-desktop is-narrow-tablet is-12-mobile has-text-centered">
                <a href="https://ideemos.org/" target="_blank" rel="noreferrer">
                  <img style={{width: '100%', padding: '0 10px', maxWidth: 350, margin: '0 auto' }} src="https://democraciaenred.nyc3.digitaloceanspaces.com/projects/asambleasclimaticas/demos-logo.png" alt="" />
                </a>
              </div>
          </div>
        </div>
      </div>
      </>
  )

}