import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Wombat from '../images/Wombat.jpg';
import '../css/main.css';  // Import the main.css styles

function Card({ manga }) {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = (e) => {
    e.preventDefault(); // Prevents navigating to the manga details page when clicking the favorite icon
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="manga-card-container" style={{ position: 'relative' }}>
      <Link to={`/manga/${manga.id}`} className="manga-card" style={{ textDecoration: 'none' }}>
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
          style={{
            display: 'block',
            width: '100%',
            borderRadius: '10px',
          }}
        />
        {/* Title and Favorite Icon */}
        <div 
          className="manga-title-container" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            paddingTop: '10px',
          }}
        >
          <h3 style={{ margin: 0 }}>{manga.attributes.title.en}</h3>
          <FavoriteIcon
            onClick={toggleFavorite}
            style={{
              cursor: 'pointer',
              color: isFavorited ? 'white' : 'gray',
              fontSize: '24px',
              marginLeft: '10px',
            }}
          />
        </div>
      </Link>
    </div>
  );
}

export default Card;
