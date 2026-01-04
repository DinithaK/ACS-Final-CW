import { createContext, useState, useContext, useEffect } from 'react';

const FavouritesContext = createContext();

export const useFavourites = () => useContext(FavouritesContext);

export const FavouritesProvider = ({ children }) => {
    const [favourites, setFavourites] = useState(() => {
        // Load from local storage on initial render
        const saved = localStorage.getItem('favourites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }, [favourites]);

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
