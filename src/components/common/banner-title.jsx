import Link from "next/link"
import Logo from "./logo"

const BannerTitle = ({title,subtitle,image, urlButton, textButton}) => 
<div className='hero is-fullheight banner-title is-flex is-justify-content-center is-align-items-center is-flex-direction-column' 
     style={{backgroundImage:`url('${image}')`}}>
      <div className="banner-content w-100 hero is-fullheight is-align-items-center is-justify-content-center">
    <img src="/images/logoSimple.svg" alt="" />
    <div className="my-5 has-text-centered">
      <p className='title has-text-centered has-text-white has-text-weight-bold is-uppercase mb-0'>{title}</p>
      <p  className=" has-text-white is-size-2 is-size-6-touch is-italic">{subtitle}</p>
    </div>
    <div className="actions mx-auto">
      {textButton && urlButton && <Link href={urlButton} className="button is-white is-rounded px-6 is-uppercase w-100">{textButton}</Link>}

    </div>

      </div>
</div>

export default BannerTitle