'use client'
import { useAuthContext } from "@/context/auth-context"
import { useLanguage } from "@/context/lang-context"
import { useEffect } from "react"

const LanguageSelector = () => {
    const { user } = useAuthContext()

    const { language, switched, changeLanguage } = useLanguage()

    useEffect(() => {
        if (user) {
            changeLanguage(user.lang)
        } else {
            changeLanguage(navigator.language.split("-")[0] || navigator.userLanguage.split("-")[0])
        }
    }, [])
    return (<div className="language-selector p-3">
        <p className="px-3">Idioma</p>
        <div className={`language-selector-buttons my-3 border-color-pink`} >
            <button className={`button is-rounded ${language === 'es' ? 'is-pink has-text-white' : 'has-text-pink'}`} onClick={() => changeLanguage('es')}>Español</button>
            <button className={`button is-rounded ${language === 'pt' ? 'is-pink has-text-white' : 'has-text-pink'}`} onClick={() => changeLanguage('pt')}>Portugués</button>
        </div>
    </div>)
}

export default LanguageSelector