'use client'
import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const LANGUAGE_INFO_COOKIE = 'RES_LANG'

export const LanguageProvider = ({ children }) => {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_INFO_COOKIE);
    const jsonStoredLanguage = storedLanguage && JSON.parse(storedLanguage);
    const [language, setLanguage] = useState(jsonStoredLanguage ? jsonStoredLanguage.language : 'es');
    const [switched, setSwitched] = useState(jsonStoredLanguage ? jsonStoredLanguage.switched : false);

    const changeLanguage = (newLanguage) => {
        const switchLanguage = {
            switched: true,
            language: newLanguage
        }        
        window.localStorage.setItem(LANGUAGE_INFO_COOKIE, JSON.stringify(switchLanguage));
        setLanguage(newLanguage);
        setSwitched(true)
    };

    return (
        <LanguageContext.Provider value={{ language, switched, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    return useContext(LanguageContext);
};
