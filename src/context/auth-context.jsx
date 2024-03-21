"use client";
import {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import Cookies from 'js-cookie'
import { refreshToken } from "@/utils/post-data";
import { fetchUserMe } from "@/utils/get-data";
import { AUTH_TOKENS_KEY } from "@/utils/constants";


const AUTH_USER_INFO = "RES_USER"

export const AuthContext = createContext({
    loginContext: (authTokens) => { },
    logoutContext: () => { },
    refreshUser: () => { },
    isLoggedIn: false,
    authTokens: null,
});

export default function AuthContextProvider({ children }) {
    const authTokensInCookies = Cookies.get(AUTH_TOKENS_KEY);
    const userInLocalStorage =
        typeof window !== "undefined" &&
        window.localStorage.getItem(AUTH_USER_INFO);
    const [user, setUser] = useState(
        userInLocalStorage && authTokensInCookies === null
            ? null
            : JSON.parse(userInLocalStorage))

    useEffect(() => {
        if (authTokensInCookies) {
            refreshTokenContext()
            refreshUser()
        } else {
            window.localStorage.removeItem(AUTH_USER_INFO);
            setUser(null)

        }
    },[])

    const refreshUser = useCallback(async () => {
        try {
            const user = await fetchUserMe()
            setUser(user)
        } catch (err) {
            console.error(err);
            window.localStorage.removeItem(AUTH_USER_INFO);
            Cookies.remove(AUTH_TOKENS_KEY);
            setUser(null)
        }
    }, [])

    const refreshTokenContext = async () => {
        try {
            const response = await refreshToken()
            Cookies.set(AUTH_TOKENS_KEY, response.token, { expires: 2})
        } catch (err) {
            console.error(err);
            window.localStorage.removeItem(AUTH_USER_INFO);
            setUser(null)
            Cookies.remove(AUTH_TOKENS_KEY);
        }

    }


    const loginContext = useCallback(function (authInfo) {
        Cookies.set(AUTH_TOKENS_KEY, authInfo.token, { expires: 2});
        window.localStorage.setItem(AUTH_USER_INFO, JSON.stringify(authInfo.user));
        setUser(authInfo.user);
    }, []);

    const logoutContext = useCallback(function () {
        Cookies.remove(AUTH_TOKENS_KEY);
        window.localStorage.removeItem(AUTH_USER_INFO);
        setUser(null);
    }, []);

    const value = useMemo(
        () => ({
            loginContext,
            logoutContext,
            refreshUser,
            user,
        }),
        [loginContext, logoutContext, refreshUser, user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    return useContext(AuthContext);
}
