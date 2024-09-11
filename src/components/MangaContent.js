import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/MangaContent.css';

function MangaDetail() {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [pages, setPages] = useState([]);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    fetchMangaDetails();
  }, [id]);

  useEffect(() => {
    if (selectedChapter) {
      fetchChapterPages(selectedChapter.id);
    }
  }, [selectedChapter]);

  const fetchMangaDetails = async () => {
    try {
      const mangaRes = await fetch(`https://api.mangadex.org/manga/${id}`);
      const mangaData = await mangaRes.json();
      setManga(mangaData.data);

      // Fetch all chapters
      const chaptersRes = await fetch(`https://api.mangadex.org/manga/${id}/feed?translatedLanguage[]=en&order[chapter]=asc&limit=500`);
      const chaptersData = await chaptersRes.json();
      setChapters(chaptersData.data);

      // Set the first chapter as selected
      if (chaptersData.data.length > 0) {
        setSelectedChapter(chaptersData.data[0]);
      }
    } catch (error) {
      console.error("Error fetching manga details:", error);
    }
  };

  const fetchChapterPages = async (chapterId) => {
    try {
      const pagesRes = await fetch(`https://api.mangadex.org/at-home/server/${chapterId}`);
      const pagesData = await pagesRes.json();
      const baseUrl = pagesData.baseUrl;
      const chapterHash = pagesData.chapter.hash;
      const pageFilenames = pagesData.chapter.data;
      
      const pageUrls = pageFilenames.map(filename => 
        `${baseUrl}/data/${chapterHash}/${filename}`
      );
      setPages(pageUrls);
    } catch (error) {
      console.error("Error fetching chapter pages:", error);
    }
  };

  const handleChapterChange = (e) => {
    const chapter = chapters.find(c => c.id === e.target.value);
    setSelectedChapter(chapter);
  };

  if (!manga || !selectedChapter) return <div>Loading...</div>;

  return (
    <div className="manga-detail">
      <h1>{manga.attributes.title.en}</h1>
      
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
          <div key={index} className="page-container">
            <img 
              src={pageUrl}
              alt={`Page ${index + 1}`}
              onError={(e) => {
                console.error(`Failed to load image: ${e.target.src}`);
                e.target.src = 'path/to/fallback/image.jpg'; // Add a fallback image
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MangaDetail;