import React, { useState, useEffect, useCallback } from 'react';
import Card from '../components/Card';
import '../css/home.css';
import '../css/main.css';

function RecentlyAdded() {
  const [recentManga, setRecentManga] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCovers = useCallback(async (mangaList) => {
    return Promise.all(mangaList.map(async (manga) => {
      const coverArt = manga.relationships.find(rel => rel.type === 'cover_art');
      if (coverArt) {
        manga.coverFileName = coverArt.attributes.fileName;
      }
      return manga;
    }));
  }, []);

  const fetchRecentManga = useCallback(async () => {
    try {
      const response = await fetch('https://api.mangadex.org/manga?order[createdAt]=desc&limit=20&includes[]=cover_art');
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      const mangaWithCovers = await fetchCovers(data.data);
      setRecentManga(mangaWithCovers);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching recent manga:', err);
      setError(err.message);
      setLoading(false);
    }
  }, [fetchCovers]);

  useEffect(() => {
    fetchRecentManga();
  }, [fetchRecentManga]);

  if (loading) return <div className="manga-description">Loading...</div>;
  if (error) return <div className="manga-description" style={{color: 'red'}}>{error}</div>;

  return (
    <div className="manga-rows">
      {recentManga.map(manga => (
        <Card key={manga.id} manga={manga} />
      ))}
    </div>
  );
}

export default RecentlyAdded;
