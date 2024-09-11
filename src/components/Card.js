import React from 'react';
import { Link } from 'react-router-dom';
import Wombat from '../images/Wombat.jpg';

function Card({ manga }) {
  return (
    <Link to={`/manga/${manga.id}`} className="manga-card">
      {manga.coverFileName && (
        <img 
          src={`https://uploads.mangadex.org/covers/${manga.id}/${manga.coverFileName}.128.jpg`}
          alt={`Cover for ${manga.attributes.title.en}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = Wombat;
          }}
          width="128"
          height="128"
          style={{ objectFit: 'cover' }}
        />
      )}
      <h3>{manga.attributes.title.en}</h3>
    </Link>
  );
}

export default Card;