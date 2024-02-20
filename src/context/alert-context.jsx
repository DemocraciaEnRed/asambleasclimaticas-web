'use client'
import { createContext, useCallback, useContext, useState } from 'react';

const AlertContext = createContext();

export const useAlert = () => {
    return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
    const [alerts, setAlerts] = useState(null);

    const addAlert = useCallback((message, type = 'info', time=5000) => {
        const newAlert = { message, type };
        setAlerts( newAlert);

        if ( time ) setTimeout(() => {removeAlert(null);}, time);
    });

    const removeAlert = (id) => {
        setAlerts(null);
    };

    return (
        <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
            {children}
        </AlertContext.Provider>
    );
};