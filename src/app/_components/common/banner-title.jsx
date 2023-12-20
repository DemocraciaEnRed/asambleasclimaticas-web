import Link from "next/link"
import Logo from "./logo"

const BannerTitle = ({ urlAction, title, subtitle, image, linkButton, textButton }) => {
  return (<div className='hero is-fullheight banner-title is-flex is-justify-content-center is-align-items-flex-start is-flex-direction-column is-relative'
    style={{ backgroundImage: `url('${image}')` }}>
    <div className="is-overlay"></div>
    <div className="w-75 content">

      <Logo color='#2B1B18' widthLogo='30%' />
      <div className="my-3">
        <p className=' title has-text-brown-dark is-uppercase mb-3'>{title}</p>
        <p className="has-text-weight-light is-size-4 has-text-brown-dark has-text-weight-bold ">{subtitle}</p>
      </div>
    </div>
    {textButton && linkButton && <Link href={linkButton} className="button is-white is-rounded px-6 is-uppercase">{textButton}</Link>}
  </div>)
}

export default BannerTitle