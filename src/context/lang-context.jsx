'use client'
import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const LANGUAGE_INFO_COOKIE = 'RES_LANG'

export const LanguageProvider = ({ children }) => {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_INFO_COOKIE);
    const jsonStoredLanguage = storedLanguage && JSON.parse(storedLanguage);
    const [language, setLanguage] = useState(jsonStoredLanguage ? jsonStoredLanguage.language : 'es');

    const changeLanguage = (newLanguage) => {
        const switchLanguage = {
            language: newLanguage
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
