import { createContext, useState, useContext, useEffect } from 'react';

const FavouritesContext = createContext();

export const useFavourites = () => useContext(FavouritesContext);

export const FavouritesProvider = ({ children }) => {
    const [favourites, setFavourites] = useState([]);

    const addFavourite = (property) => {
        setFavourites((prev) => {
            if (prev.find(p => p.id === property.id)) return prev;
            return [...prev, property];
        });
    };

    const removeFavourite = (propertyId) => {
        setFavourites((prev) => prev.filter(p => p.id !== propertyId));
    };

    const clearFavourites = () => {
        setFavourites([]);
    };

    const isFavourite = (propertyId) => {
        return favourites.some(p => p.id === propertyId);
    };

    return (
        <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite, clearFavourites, isFavourite }}>
            {children}
        </FavouritesContext.Provider>
    );
};
