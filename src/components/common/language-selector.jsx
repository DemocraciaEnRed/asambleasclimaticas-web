'use client'
import { useAuthContext } from "@/context/auth-context"
import { dispatch } from "@/store"
import { handleLanguage } from "@/store/reducers/language"
import { useEffect } from "react"
import { useSelector } from "react-redux"

const LanguageSelector = ({color}) => {
    const { user } = useAuthContext()
    const {language, switched} = useSelector((state)=>state.language)

    useEffect(()=>{
        if (user) {
            if (!switched && user.lang !== language) dispatch(handleLanguage(user.lang))
        }else{
            if(!switched) dispatch(handleLanguage(navigator.language.split("-")[0] || navigator.userLanguage.split("-")[0]))
        }
    },[])
    return (<div className="language-selector p-3">   
        <p className="px-3">Idioma</p>
        <div className={`language-selector-buttons my-3 border-color-${color}`} > 
            <button className={`button is-rounded ${language === 'es' ? `is-${color} has-text-white` : `has-text-${color}`}`} onClick={()=>dispatch(handleLanguage('es'))}>Español</button>
            <button className={`button is-rounded ${language === 'pt' ? `is-${color} has-text-white` : `has-text-${color}`}`} onClick={()=>dispatch(handleLanguage('pt'))}>Portugués</button>
        </div>
    </div>)
}

export default LanguageSelector