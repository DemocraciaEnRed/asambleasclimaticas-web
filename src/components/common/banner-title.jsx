import Logo from "./logo"

const BannerTitle = () => <div className='banner-title is-flex is-justify-content-center is-align-items-center is-flex-direction-column'>
    <Logo color='#FFFFFF' widthLogo='50%'/>
    <div className="my-5 has-text-centered">
      <p className='has-text-centered has-text-white is-uppercase '>Pacto Inter-ciudad</p>
      <p  className="has-text-weight-light is-italic is-size-7 has-text-white is-uppercase">*Pacto Intercidade</p>
    </div>
    <button className="button is-white is-rounded px-6">PARTICIPAR</button>
</div>

export default BannerTitle