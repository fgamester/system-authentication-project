import React, { createContext, useState, useEffect } from "react";
export const Context = createContext(null);

export const AppContext = ({ children }) => {

    return (
        <Context.Provider value={null}>
            {children}
        </Context.Provider>
    );
};