import React, { createContext, useState, useEffect } from "react";
export const Context = createContext(null);

export const AppContext = ({ children }) => {
    const [accessToken, setAccessToken] = useState(sessionStorage.access_token || null);
    const [urlAPI] = useState('http://127.0.0.1:5000')
    const [logged, setLogged] = useState(false);
    const [user, setUser] = useState(null);

    const [actions] = useState({
        checkSession: async () => {
            if (sessionStorage?.getItem('access_token')) {
                try {
                    const response = await fetch(`${urlAPI}/session`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
                        }
                    })
                    const data = await response.json();
                    console.log(data?.message)
                    setUser(data?.user);
                    setAccessToken(sessionStorage.getItem('access_token'));
                    setLogged(true);
                } catch (error) {
                    console.error(error)
                }
            }
        },
        login: async (credentials) => {
            try {
                const response = await fetch(`${urlAPI}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credentials)
                });
                const data = await response.json();
                console.log(data?.message)
                if (data?.data) {
                    sessionStorage.setItem('access_token', data?.data?.access_token);
                    setAccessToken(data?.data?.access_token);
                    setUser(data?.data?.user);
                    setLogged(true);
                }
            } catch (error) {
                console.error(error);
            }
        },
        register: async (credentials) => {
            try {
                const response = await fetch(`${urlAPI}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credentials)
                });
                const data = await response.json();
                console.log(data?.message)
                if (data?.data) {
                    sessionStorage.setItem('access_token', data?.data?.access_token);
                    setAccessToken(data?.data?.access_token);
                    setUser(data?.data?.user);
                    setLogged(true);
                }
            } catch (error) {
                console.error(error);
            }
        },
        changePassword: async (passwords) => {
            try {
                const response = await fetch(`${urlAPI}/password`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify(passwords)
                });
                const data = await response.json();
                console.log(data?.message)
                return data?.status;
            } catch (error) {
                console.error(error);
            }
        },
        logout: async () => {
            setAccessToken(null);
            setLogged(false);
            setUser(null);
            sessionStorage?.removeItem('access_token');
        }
    });

    useEffect(() => {
        actions.checkSession();
    }, []);

    return (
        <Context.Provider value={{ accessToken, user, actions, logged }}>
            {children}
        </Context.Provider>
    );
};