import React from 'react';
import { Link } from 'react-router-dom';
import Wombat from '../images/Wombat.jpg';
import '../css/main.css';  // Import the main.css styles

// inline styles so no css file needed

function Card({ manga }) {
  return (
    <Link to={`/manga/${manga.id}`} className="manga-card">
      <img 
        src={manga.coverFileName 
          ? `https://uploads.mangadex.org/covers/${manga.id}/${manga.coverFileName}`
          : Wombat
        }
        alt={`Cover for ${manga.attributes.title.en}`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = Wombat;
        }}
      />
      <h3>{manga.attributes.title.en}</h3>
    </Link>
  );
}

export default Card;