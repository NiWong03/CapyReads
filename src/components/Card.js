import React from 'react'
import kawhi from '../image404/kawhi.jpg'

function Card({ manga }) {
  return (
    <div className="manga-card">
      {manga.coverFileName && (
        <img 
          src={`https://uploads.mangadex.org/covers/${manga.id}/${manga.coverFileName}.128.jpg`}
          alt={`Cover for ${manga.attributes.title.en}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = kawhi;
          }}
          width = "128"
          height = "128"
          style={{ objectFit: 'cover' }}

        />
      )}
      <h3>{manga.attributes.title.en}</h3>
    </div>
  )
}

export default Card