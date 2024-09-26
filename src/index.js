import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext'; // Ensure this path is correct
import Header from './components/Header';
import Home from './routes/Home';
import MangaDetail from './components/MangaContent';
import About from './routes/About';
import Search from './components/Search';
import RecentlyAdded from './routes/RecentlyAdded';
import './css/main.css';
import Favorites from './routes/Favorites'; // Import the Favorites component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <FavoritesProvider> {/* Wrap your app with the FavoritesProvider */}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manga/:id" element={<MangaDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recently-added" element={<RecentlyAdded />} />
          <Route path="/favorites" element={<Favorites />} /> {/* Add this route */}
        </Routes>
      </FavoritesProvider>
    </Router>
  </React.StrictMode>
);