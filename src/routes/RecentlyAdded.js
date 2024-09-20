import React, { useState, useEffect, useCallback } from 'react';
import Card from '../components/Card';
import '../css/home.css';
import '../css/main.css';
import { Box, Container } from '@mui/material';
import path3 from '../images/about.jpg';

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
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        color: 'white',
        padding: 4,
        backgroundImage: `url(${path3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ 
        position: 'relative', 
        zIndex: 1,
      }}>
        <div className="manga-rows">
          {recentManga.map(manga => (
            <Card key={manga.id} manga={manga} />
          ))}
        </div>
      </Container>
    </Box>
  );
}

export default RecentlyAdded;
