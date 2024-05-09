'use client'
import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const LANGUAGE_INFO_COOKIE = 'RES_LANG'

export const LanguageProvider = ({ children }) => {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_INFO_COOKIE);
    const jsonStoredLanguage = storedLanguage && JSON.parse(storedLanguage);
    function getNavigatorLanguage() {
        // If the language is any pt language, return pt, else return es
        return navigator.language.includes('pt') ? 'pt' : 'es';
    }
    const [language, setLanguage] = useState(jsonStoredLanguage ? jsonStoredLanguage.language : getNavigatorLanguage());

    const changeLanguage = (newLanguage) => {
        const switchLanguage = {
            language: newLanguage === 'pt' ? 'pt' : 'es'
        }
        window.localStorage.setItem(LANGUAGE_INFO_COOKIE, JSON.stringify(switchLanguage));
        setLanguage(newLanguage);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    return useContext(LanguageContext);
};
