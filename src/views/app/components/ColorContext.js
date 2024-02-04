import React, { createContext, useContext, useState } from 'react';

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
    const [color, setColor] = useState('#000fff'); // Valor inicial, puedes ajustarlo según tus necesidades

    const setRandomColor = (newColor) => {
        setColor(newColor);
    };

    return (
        <ColorContext.Provider value={{ color, setRandomColor }}>
            {children}
        </ColorContext.Provider>
    );
};

export const useColor = () => {
    return useContext(ColorContext);
};