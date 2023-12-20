import { usePathname, useRouter } from "next/navigation";

export default function LangSwitch({ lang }) {
    const router = useRouter()
    const pathname = usePathname()

    const switchLang = (langToGo) => {
        const rutaActual = pathname;


        const routeWhitOutLang = '/' + rutaActual.split('/')[2] + rutaActual.split(pathname.split('/')[2])[1]
        if (pathname.split('/')[2]) {
            return router.push('/' + langToGo + routeWhitOutLang)
        }
        return router.push('/' + langToGo)
    }

    return (<div className="language-wrapper mr-3 w-25 has-text-right">
        <div className="dropdown is-hoverable ">
            <div className="dropdown-trigger">
                <button className="button is-uppercase has-text-white has-background-primary" aria-haspopup="true" aria-controls="dropdown-menu4">
                    <span>{lang === 'es' ? 'esp' : 'prt'}</span>
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                <div className="dropdown-content has-background-primary">
                    <div className="dropdown-item is-size-6 is-uppercase has-text-white has-text-centered p-0 is-clickable" onClick={() => switchLang(lang === 'es' ? 'pt' : 'es')}>
                        <p>{lang === 'es' ? 'prt' : 'esp'}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}