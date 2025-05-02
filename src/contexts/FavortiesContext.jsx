import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const FavoritesContext = createContext();

// Provider component
export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const addFavorite = (pokemonName) => {
        setFavorites((prevFavorites) => {
            const updatedFavorites = [...prevFavorites, pokemonName];
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            return updatedFavorites;
        });
    };

    const removeFavorite = (pokemonName) => {
        setFavorites((prevFavorites) => {
            const updatedFavorites = prevFavorites.filter(fav => fav !== pokemonName);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            return updatedFavorites;
        });
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);
