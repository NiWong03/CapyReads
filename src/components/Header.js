import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Box, Grid, InputBase, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import '../css/header.css';

// includes navbar, search bar, and page we're on

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
      setSearch(''); // Clear the search input after searching
    }
  };

  const menuItems = [
    { text: 'Home', link: '/' },
    { text: 'Github', link: 'https://github.com/NiWong03/MangadexReact' },
    { text: 'About', link: '/about' },
    { text: 'Recently Added', link: '/recently-added' }
  ];
  
  const list = () => (
    <List>
      {menuItems.map((item) => (
        <ListItem 
          button 
          key={item.text} 
          onClick={toggleDrawer(false)} 
          component={item.text === 'Github' ? 'a' : Link}
          to={item.text !== 'Github' ? item.link : undefined}
          href={item.text === 'Github' ? item.link : undefined}
          target={item.text === 'Github' ? '_blank' : undefined}
          rel={item.text === 'Github' ? 'noopener noreferrer' : undefined}
        >
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  const getHeaderText = () => {
    switch(location.pathname) {
      case '/':
        return 'Home';
      case '/about':
        return 'About';
      case '/recently-added':
        return 'Recently Added';
      default:
        return 'Home';
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1a0940' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ padding: '8px' }}
              >
                <MenuIcon sx={{ fontSize: '24px' }} />
              </IconButton>
            </Grid>
            <Grid item xs>
              <Box 
                component="form" 
                onSubmit={handleSearch} 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  backgroundColor: 'white', 
                  borderRadius: '20px',
                  width: '100%',
                  maxWidth: '600px',
                  margin: '0 auto',
                  overflow: 'hidden',
                  transition: 'background-color 0.3s, border 0.3s',
                  border: '2px solid transparent',
                  '&:focus-within': {
                    backgroundColor: '#3a1b6e',
                    border: '2px solid white',
                  },
                }}
              >
                <InputBase
                  placeholder="Search for manga"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  sx={{
                    ml: 2,
                    flex: 1,
                    '& .MuiInputBase-input': {
                      color: 'black',
                      padding: '8px 8px 8px 0',
                      transition: 'color 0.3s',
                      width: '100%',
                      '&::placeholder': {
                        color: 'black',
                        opacity: 0.7,
                      },
                    },
                    '&.Mui-focused .MuiInputBase-input': {
                      color: 'white',
                      '&::placeholder': {
                        color: 'white',
                        opacity: 0.7,
                      },
                    },
                  }}
                />
                <IconButton 
                  type="submit" 
                  sx={{ 
                    p: '10px', 
                    color: 'black',
                    transition: 'color 0.3s',
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                    '.Mui-focused &': {
                      color: 'white',
                    },
                  }} 
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid item>
              <Box component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="home-text">{getHeaderText()}</div>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </AppBar>
  );
}

export default Header;