import Link from "next/link"
import Image from "next/image"


export default function BannerTitle({ title, subtitle, image, urlButton, textButton }) {

    return (<div className='hero is-fullheight banner-title is-flex is-justify-content-center is-align-items-center is-flex-direction-column'
        style={{ backgroundImage: `url('${image}')` }}>
        <div className="banner-content w-100 hero is-fullheight is-align-items-center is-justify-content-center">
            <Image
                width={0}
                height={0}
                sizes="100vw"
                src="/images/logoSimple.svg"
                alt="logo resurgentes" />
            <div className="my-5 has-text-centered">
                <h1 className='title has-text-centered has-text-white has-text-weight-bold is-uppercase mb-0'>{title}</h1>
                <h2 className=" has-text-white is-size-2 is-size-6-touch is-italic">{subtitle}</h2>
            </div>
            <div className="actions mx-auto">
                {textButton && urlButton && <Link href={urlButton} className="button is-white is-rounded px-6 is-uppercase w-100">{textButton}</Link>}
            </div>
        </div>
    </div>);
}