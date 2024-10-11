import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Star from '@mui/icons-material/Star'; 
import StarBorder from '@mui/icons-material/StarBorder'; 
import { FavoritesContext } from '../context/FavoritesContext'; 
import '../css/MangaContent.css';
import path4 from '../images/about.jpg'; 
import axios from 'axios';

function MangaDetail() {
  const { id } = useParams();
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  
  const [manga, setManga] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDescription, setShowDescription] = useState(false);
  
  const sliderRef = useRef(null);
  const pageRefs = useRef([]);
  
  const axiosInstance = axios.create({
    baseURL: 'http://18.118.30.61:3000/api',
    headers: {
      'Content-Type': 'application/json',
      //'Accept': 'application/json',
    },
  });

  const fetchMangaDetails = useCallback(async () => {
    try {
      const mangaRes = await axiosInstance.get(`/manga/${id}`);
      setManga(mangaRes.data.data);
  
      const chaptersRes = await axiosInstance.get(`/manga/${id}/feed`, {
        params: {
          translatedLanguage: ['en'], // Keep it necessary
          'order[chapter]': 'asc',
          limit: 500,
        },
      });
      setChapters(chaptersRes.data.data);
  
      if (chaptersRes.data.data.length > 0) {
        setSelectedChapter(chaptersRes.data.data[0]);
      }
    } catch (error) {
      console.error("Error fetching manga details:", error);
    }
  }, [id]);
  

  const fetchChapterPages = async (chapterId) => {
    try {
      const pagesRes = await axiosInstance.get(`/at-home/server/${chapterId}`);
      const { baseUrl, chapter } = pagesRes.data;
      const pageFilenames = chapter.data;

      const pageUrls = pageFilenames.map(filename => 
        `${baseUrl}/data/${chapter.hash}/${filename}`
      );
      setPages(pageUrls);
    } catch (error) {
      console.error("Error fetching chapter pages:", error);
    }
  };

  useEffect(() => {
    fetchMangaDetails();
  }, [fetchMangaDetails]);

  useEffect(() => {
    if (selectedChapter) {
      fetchChapterPages(selectedChapter.id);
    }
  }, [selectedChapter]);

  const handleChapterChange = (e) => {
    const chapter = chapters.find(c => c.id === e.target.value);
    setSelectedChapter(chapter);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    const page = Math.max(1, Math.min(newPage, pages.length));
    setCurrentPage(page);
    pageRefs.current[page - 1]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSliderChange = (e) => {
    handlePageChange(Number(e.target.value));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pageIndex = pageRefs.current.findIndex(ref => ref === entry.target);
            if (pageIndex !== -1) {
              setCurrentPage(pageIndex + 1);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const currentPageRefs = pageRefs.current;

    currentPageRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentPageRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [pages]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.value = currentPage;
    }
  }, [currentPage]);

  if (!manga || !selectedChapter) {
    return (
      <div style={{ color: 'white', padding: '0 16px' }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'normal', 
            fontSize: { xs: '1.2rem', sm: '1rem' }, 
            marginTop: '20px' 
          }}
        >
          Loading... if manga does not load, it may not be available in English
        </Typography>
      </div>
    );
  }

  const isFavorited = favorites.includes(manga.id);

  return (
    <Box
      sx={{
        backgroundImage: `url(${path4})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        padding: '20px',
        color: 'white',
        position: 'relative',
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
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1>{manga.attributes.title.en}</h1>
          <span onClick={() => toggleFavorite(manga)} style={{ cursor: 'pointer' }}>
            {isFavorited ? <Star sx={{ color: 'yellow' }} /> : <StarBorder sx={{ color: 'gray' }} />}
          </span>
        </div>
      
        {manga.attributes.description && (
          <div className="description-container">
            <button 
              className="description-toggle"
              onClick={() => setShowDescription(!showDescription)}
            >
              {showDescription ? 'Hide Description' : 'Show Description'}
            </button>
            {showDescription && <p className="manga-description">{manga.attributes.description.en}</p>}
          </div>
        )}
      
        <div className="chapter-select">
          <select value={selectedChapter.id} onChange={handleChapterChange}>
            {chapters.map((chapter) => (
              <option key={chapter.id} value={chapter.id}>
                Chapter {chapter.attributes.chapter}: {chapter.attributes.title}
              </option>
            ))}
          </select>
        </div>

        <h2>Chapter {selectedChapter.attributes.chapter}: {selectedChapter.attributes.title}</h2>
        
        <div className="chapter-pages">
          {pages.map((pageUrl, index) => (
            <div 
              key={index} 
              className="page-container"
              ref={el => pageRefs.current[index] = el}
            >
              <img 
                src={pageUrl}
                alt={`Page ${index + 1}`}
                onError={(e) => {
                  console.error(`Failed to load image: ${e.target.src}`);
                  e.target.src = 'path/to/fallback/image.jpg'; 
                }}
              />
            </div>
          ))}
        </div>
        
        <div className="page-navigation">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>{currentPage} / {pages.length}</span>
          <input
            type="range"
            min="1"
            max={pages.length}
            value={currentPage}
            onChange={handleSliderChange}
            ref={sliderRef}
          />
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pages.length}
          >
            Next
          </button>
          <button onClick={() => handlePageChange(1)}>
            Back to Top
          </button>
        </div>
      </Box>
    </Box>
  );
}

export default MangaDetail;