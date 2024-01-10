'use client'
import { dispatch } from "@/store"
import { handleLanguage } from "@/store/reducers/language"
import { useEffect } from "react"
import { useSelector } from "react-redux"

const LanguageSelector = () => {
    const { user } = useSelector((state) => state.auth)
    const {language, switched} = useSelector((state)=>state.language)

    useEffect(()=>{
        if (user) {
            if (!switched && user.lang !== language) dispatch(handleLanguage(user.lang))
        }else{
            if(!switched) dispatch(handleLanguage(navigator.language.split("-")[0] || navigator.userLanguage.split("-")[0]))
        }
    },[])
    return (<div className="language-selector">   
        Cambiar idioma maximas
        <div className="language-selector-buttons my-3"> 
            <button className={`button is-rounded ${language === 'es' ? 'is-pink has-text-white' :'has-text-pink'}`} onClick={()=>dispatch(handleLanguage('es'))}>Español</button>
            <button className={`button is-rounded ${language === 'pt' ? 'is-pink has-text-white' :'has-text-pink'}`} onClick={()=>dispatch(handleLanguage('pt'))}>Portugués</button>
        </div>
    </div>)
}

export default LanguageSelector