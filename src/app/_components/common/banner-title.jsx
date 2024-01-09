import Link from "next/link"
import Logo from "./logo"

const BannerTitle = ({ urlAction, title, subtitle, image, linkButton, textButton }) => {
  return (<div className='hero is-fullheight banner-title is-flex is-justify-content-center is-align-items-flex-start is-flex-direction-column is-relative pt-0'
    style={{ backgroundImage: `url('${image}')` }}>
    <div className="is-overlay"></div>
    <div className="content">

      <Logo color='#2B1B18' />
      <div className="my-3">
        <p className=' title has-text-brown-dark is-uppercase has-text-weight-bold mb-3 is-size-1 is-size-3-touch'>{title}</p>
        <p className="has-text-weight-light has-text-brown-dark has-text-weight-bold is-size-4 is-size-5-touch">{subtitle}</p>
      </div>
    </div>
    {textButton && linkButton && <Link href={linkButton} className="button is-white is-rounded px-6 is-uppercase">{textButton}</Link>}
  </div>)
}

export default BannerTitle