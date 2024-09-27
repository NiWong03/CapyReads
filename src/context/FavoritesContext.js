import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // Load favorites from localStorage or initialize as an empty array
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const toggleFavorite = (manga) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.includes(manga.id)
        ? prevFavorites.filter((id) => id !== manga.id) // Remove from favorites
        : [...prevFavorites, manga.id]; // Add to favorites

      // Save the updated favorites to localStorage
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};