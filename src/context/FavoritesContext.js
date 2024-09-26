import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (manga) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(manga.id)) {
        return prevFavorites.filter((id) => id !== manga.id); // Remove from favorites
      } else {
        return [...prevFavorites, manga.id]; // Add to favorites
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};