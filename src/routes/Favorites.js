import React, { useContext, useEffect, useState } from 'react';
import { FavoritesContext } from '../context/FavoritesContext'; // Correct the path to FavoritesContext
import Card from '../components/Card'; // Correct the path to Card

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);
  const [mangaList, setMangaList] = useState([]);

  useEffect(() => {
    const fetchMangaDetails = async () => {
      const mangaDetails = await Promise.all(
        favorites.map(async (mangaId) => {
          const response = await fetch(`https://api.mangadex.org/manga/${mangaId}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch manga with ID: ${mangaId}`);
          }
          const data = await response.json();
          return data.data; // Return the manga data
        })
      );
      setMangaList(mangaDetails);
    };

    if (favorites.length > 0) {
      fetchMangaDetails();
    }
  }, [favorites]);

  if (mangaList.length === 0) {
    return <p style={{ marginLeft: '10px' }}>No favorites added yet.</p>; // Added marginLeft here
  }

  return (
    <div className="favorites-container">
      {mangaList.map(manga => (
        <Card key={manga.id} manga={manga} /> // Pass the complete manga object
      ))}
    </div>
  );
};

export default Favorites;
