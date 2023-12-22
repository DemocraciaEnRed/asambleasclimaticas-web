
import AboutNavLinks from "@/components/acerca-de/about-nav-links";


export default function Layout({children}) {


    return (
        <div className="acerca-de-wrapper">
            <div className='banner-wrapper has-background-primary'></div>
            <div className='static-info-wrapper'>
                <AboutNavLinks/>
                {children}
            </div>
        </div>
    )
}
