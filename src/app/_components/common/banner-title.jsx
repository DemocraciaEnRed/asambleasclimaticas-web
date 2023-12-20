import Logo from "./logo"

const BannerTitle = ({ urlAction, title, subtitle, image, actionClick, textButton }) =>
  <div className='hero is-fullheight banner-title is-flex is-justify-content-center is-align-items-flex-start is-flex-direction-column'
    style={{ backgroundImage: `url('${image}')` }}>
    <div className="w-75">

      <Logo color='#2B1B18' widthLogo='30%' />
      <div className="my-5">
        <p className=' is-size-1 has-text-brown has-text-weight-bold is-uppercase '>{title}</p>
        <p className="has-text-weight-light is-size-4 has-text-brown ">{subtitle}</p>
      </div>
    </div>
    {textButton && <button onClick={actionClick} className="button is-white is-rounded px-6 is-uppercase">{textButton}</button>}
  </div>

export default BannerTitle