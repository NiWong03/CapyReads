import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from './Card';

function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const searchQuery = new URLSearchParams(location.search).get('q');
    if (searchQuery) {
      searchManga(searchQuery);
    }
  }, [location.search]);

  const searchManga = async (query) => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.mangadex.org/manga?title=${query}&limit=20`);
      const resData = await res.json();
      
      if (resData.data.length === 0) {
        console.log('No results found');
        setSearchResults([]);
      } else {
        const mangaWithCovers = await fetchCovers(resData.data);
        setSearchResults(mangaWithCovers);
      }
    } catch (error) {
      console.error("Error searching manga:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCovers = async (mangaList) => {
    return Promise.all(mangaList.map(async (manga) => {
      try {
        const coverRes = await fetch(`https://api.mangadex.org/cover?manga[]=${manga.id}&limit=1`);
        const coverData = await coverRes.json();
        if (coverData.data && coverData.data.length > 0) {
          manga.coverFileName = coverData.data[0].attributes.fileName;
        }
        return manga;
      } catch (error) {
        console.error(`Error fetching cover for manga ${manga.id}:`, error);
        return manga;
      }
    }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="manga-rows">
      {searchResults.length === 0 ? (
        <p>No results found</p>
      ) : (
        searchResults.map(manga => <Card key={manga.id} manga={manga} />)
      )}
    </div>
  );
}

export default Search;
