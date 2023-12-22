'use client'

import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'

import { store, persister } from ".";

export function Providers({ children }) {
    return <Provider store={store}>
            {children}

    </Provider>
}