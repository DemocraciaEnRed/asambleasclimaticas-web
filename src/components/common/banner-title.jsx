import Logo from "./logo"

const BannerTitle = ({ urlAction, title, subtitle, image, actionClick, textButton }) =>
  <div className='hero is-fullheight banner-title is-flex is-justify-content-center is-align-items-center is-flex-direction-column'
    style={{ backgroundImage: `url('${image}')` }}>
    <Logo color='#FFFFFF' widthLogo='50%' />
    <div className="my-5 has-text-centered">
      <p className='has-text-centered has-text-white is-uppercase '>{title}</p>
      <p className="has-text-weight-light is-size-5 has-text-white ">{subtitle}</p>
    </div>
    {textButton && <button onClick={actionClick} className="button is-white is-rounded px-6 is-uppercase">{textButton}</button>}
  </div>

export default BannerTitle