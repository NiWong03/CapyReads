import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';  // Import the Header component
import Home from './routes/Home';
import MangaDetail from './components/MangaContent';
import About from './routes/About';
import Search from './components/Search'; // Import the new Search component
import RecentlyAdded from './routes/RecentlyAdded'; // Import RecentlyAdded
import './css/main.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Header />  {/* Add the Header component here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manga/:id" element={<MangaDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} /> {/* Add this new route */}
        <Route path="/recently-added" element={<RecentlyAdded />} /> {/* Add this route */}
      </Routes>
    </Router>
  </React.StrictMode>
);