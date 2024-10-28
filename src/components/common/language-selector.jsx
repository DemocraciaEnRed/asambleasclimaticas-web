'use client'
import { useAuthContext } from "@/context/auth-context"
import { useLanguage } from "@/context/lang-context"
import { useEffect } from "react"


export default function LanguageSelector() {

    const { user } = useAuthContext()
    const { language, changeLanguage } = useLanguage()

    useEffect(() => {
        if (user) {
            changeLanguage(user.lang)
        }
    }, [])

    return (<div className="language-selector p-3">
        <p className="px-3">Idioma</p>
        <div className={`language-selector-buttons my-3 border-color-pink`} >
            <button className={`button is-rounded ${language === 'es' ? 'is-pink has-text-white' : 'has-text-pink'}`} onClick={() => changeLanguage('es')}>Español</button>
            <button className={`button is-rounded ${language === 'pt' ? 'is-pink has-text-white' : 'has-text-pink'}`} onClick={() => changeLanguage('pt')}>Português</button>
        </div>
    </div>)
}