import React, { createContext, useState, useEffect } from "react";
export const Context = createContext(null);

export const AppContext = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [logged, setLogged] = useState(false);
    const [user, setUser] = useState(null);

    const [actions] = useState({
        checkSession: async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
                    }
                })
            } catch (error) {
                console.error(error)
            }
        },
        login: async (credentials) => {
            try {
                const response = await fetch('http://127.0.0.1:5000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credentials)
                });
                const data = await response.json();
                console.log(data)
                sessionStorage.setItem('access_token', data?.data?.access_token);
                setAccessToken(data?.data?.access_token);
                setUser(data?.data?.user);
                setLogged(true);
            } catch (error) {
                console.error(error);
            }
        }
    });

    return (
        <Context.Provider value={{ accessToken, user, actions }}>
            {children}
        </Context.Provider>
    );
};