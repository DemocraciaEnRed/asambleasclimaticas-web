import Link from "next/link"
import ImageRandom from "./image-random";

const BannerTitle = ({
    urlAction,
    title,
    subtitle,
    linkButton,
    textButton,
}) => {
    return (
        <div className="hero is-fullheight banner-title is-flex is-justify-content-center is-align-items-flex-start is-flex-direction-column is-relative pt-0 pb-4">
            <ImageRandom />
            <div className="is-overlay"></div>
            <div className="content">
                <img src="/images/logoSimple.svg" alt="" />
                <div className="my-3">
                    <h1 className=" title has-text-brown-dark is-uppercase has-text-weight-bold mb-3 is-size-1 is-size-3-touch">
                        {title}
                    </h1>
                    <h2 className="has-text-weight-light has-text-brown-dark has-text-weight-bold is-size-4 is-size-5-touch">
                        {subtitle}
                    </h2>
                </div>
            </div>
            {textButton && linkButton && (
                <Link
                    href={linkButton}
                    className="button is-white is-rounded px-6 is-uppercase"
                >
                    {textButton}
                </Link>
            )}
        </div>
    );
};

export default BannerTitle