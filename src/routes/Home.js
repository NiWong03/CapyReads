import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import '../css/home.css';
import '../css/main.css'

function Home() {
  const [search, SetSearch] = useState("");
  const [mangaList, setMangaList] = useState([]);


  useEffect(() => {
    fetchTopManga();
  }, []);



  const fetchTopManga = async () => {
    try {
      const res = await fetch(`https://api.mangadex.org/manga?order[rating]=desc&limit=20`);
      const resData = await res.json();
      const mangaWithCovers = await fetchCovers(resData.data);
      setMangaList(mangaWithCovers);
    } catch (error) {
      console.error("Error fetching top manga:", error);
    }
  };

  const searchManga = async (query) => {
    try {
      const res = await fetch(`https://api.mangadex.org/manga?title=${query}&limit=20`);
      const resData = await res.json();
      
      if (resData.data.length === 0) {
        console.log('No results found');
        setMangaList([]);
        return;
      }

      const mangaWithCovers = await fetchCovers(resData.data);
      setMangaList(mangaWithCovers);
    } catch (error) {
      console.error("Error searching manga:", error);
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





  return (
      <div className="manga-rows">
        {mangaList.map((manga) => (
          <Card 
            key={manga.id} 
            manga={manga}
            style={{
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
            }}
          />
        ))}
      </div>
  );
}

export default Home;