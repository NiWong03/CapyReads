import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Star from '@mui/icons-material/Star'; // Import Star icon
import StarBorder from '@mui/icons-material/StarBorder'; // Import StarBorder icon
import Wombat from '../images/Wombat.jpg';
import { FavoritesContext } from '../context/FavoritesContext'; // Correct the path to FavoritesContext
import '../css/main.css';  // Import the main.css styles

function Card({ manga }) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext); // Access context

  const isFavorited = favorites.includes(manga.id); // Determine if the manga is favorited

  const handleToggleFavorite = (e) => {
    e.preventDefault(); // Prevents navigating to the manga details page when clicking the favorite icon
    toggleFavorite(manga); // Toggle favorite state using context function
  };

  return (
    <div className="manga-card-container" style={{ position: 'relative' }}>
      <Link to={`/manga/${manga.id}`} className="manga-card" style={{ textDecoration: 'none' }}>
        <img 
          src={manga.coverFileName 
            ? `http://18.118.30.61:3000/api/covers/${manga.id}/${manga.coverFileName}` // Use the proxy URL
            : Wombat
          }
          alt={`Cover for ${manga.attributes.title.en}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = Wombat; // Fallback image
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
          <span onClick={handleToggleFavorite} style={{ cursor: 'pointer', marginLeft: '10px' }}>
            {isFavorited ? (
              <Star sx={{ color: 'yellow' }} />
            ) : (
              <StarBorder sx={{ color: 'gray' }} />
            )}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default Card;
