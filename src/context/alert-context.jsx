'use client'
import { createContext, useCallback, useContext, useState } from 'react';

const AlertContext = createContext();

export const useAlert = () => {
    return useContext(AlertContext);
};

let timeoutId = null

export const AlertProvider = ({ children }) => {
    const [alerts, setAlerts] = useState(null);

    const addAlert = useCallback((message, type = 'info', closable = true, time = 5000) => {
        const newAlert = { message, type, closable };
        setAlerts( newAlert);
        if (time) timeoutId = setTimeout(() => removeAlert(timeoutId), time)
    });

    const removeAlert = (id) => {
        setAlerts(null);
        clearTimeout(timeoutId);
        timeoutId = null
    };

    return (
        <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
            {children}
        </AlertContext.Provider>
    );
};