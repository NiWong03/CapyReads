import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Box, Grid, InputBase, Container, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import '../css/header.css';
import logo from '../images/logo.png'; // Import the logo image
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
    { text: 'Recently Added', link: '/recently-added' },
    { text: 'My Favorites', link: '/favorites' },
    { text: 'About', link: '/about' },
    { text: 'Github', link: 'https://github.com/NiWong03/MangadexReact' }
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
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slight highlight on hover
            },
          }}
        >
          <ListItemText 
            primary={item.text} 
            primaryTypographyProps={{
              sx: { 
                fontFamily: 'Roboto, sans-serif',
                color: 'white', // Explicitly set text color to white
                fontSize: '1rem', // Adjust font size as needed
                fontWeight: 500, // Medium weight for better readability
              }
            }}
          />
        </ListItem>
      ))}
    </List>
  );

  const getHeaderContent = () => {
    if (location.pathname.includes('/manga/')) {
      return (
        <IconButton 
          onClick={() => navigate(-1)} // Back button functionality
          sx={{ 
            color: 'white'
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      );
    }

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
    <AppBar position="static" sx={{ 
      backgroundColor: 'rgba(19, 30, 49, 0.9)', // Dark blue with slight transparency
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img 
                  src={logo} 
                  alt="Logo" 
                  style={{ 
                    height: '40px',
                    marginRight: '5px',
                    objectFit: 'contain'
                  }} 
                />
                <Typography 
                  variant="h6"
                  component="div" 
                  sx={{ 
                    display: { xs: 'none', sm: 'block' },
                    fontWeight: 'bold',
                    letterSpacing: '1px'
                  }}
                >
                  MangaReact
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box 
                component="form" 
                onSubmit={handleSearch} 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  backgroundColor: 'white', 
                  borderRadius: '20px',
                  width: '100%',
                  maxWidth: '580px', // Reduced from 600px to 580px
                  margin: '0 auto',
                  overflow: 'hidden',
                  transition: 'background-color 0.3s, border 0.3s',
                  border: '2px solid transparent',
                  '&:focus-within': {
                    backgroundColor: '#0a2d5e',
                    border: '2px solid white',
                  },
                  height: '36px', // Reduced height
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
                      padding: '4px 8px 4px 0', // Reduced vertical padding
                      transition: 'color 0.3s',
                      width: '100%',
                      fontSize: '0.9rem', // Slightly smaller font size
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
                    p: '6px', // Reduced padding
                    color: 'black',
                    transition: 'color 0.3s',
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                    '.MuiInputBase-root.Mui-focused + &': {
                      color: 'white',
                    },
                  }} 
                  aria-label="search"
                >
                  <SearchIcon fontSize="small" /> {/* Use a smaller icon */}
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Box 
                sx={{ 
                  display: { xs: 'block', sm: 'flex' }, // Stack on small screens, flex on larger
                  flexDirection: getHeaderContent() === 'Recently Added' ? { xs: 'column', sm: 'row' } : 'row', // Column for 'Recently Added'
                  alignItems: 'center',
                  marginRight: getHeaderContent() === 'Recently Added' ? '-10px' : '0' // Move right if text is 'Recently Added'
                }}
              >
                <Typography 
                  variant="h6"
                  component="div" 
                  sx={{ 
                    fontWeight: 'normal',
                    letterSpacing: '1px',
                    fontSize: { 
                      xs: getHeaderContent() === 'Recently Added' ? '0.7rem' : '1rem', // Conditional font size for small screens
                      sm: getHeaderContent() === 'Recently Added' ? '1rem' : '1rem'
                    }
                  }} // Added missing closing bracket
                >
                  {getHeaderContent()}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
      <Drawer 
        anchor="left" 
        open={drawerOpen} 
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 250, // Increased width
            backgroundColor: 'rgba(19, 30, 49, 0.9)', // Match AppBar background
            color: 'white', // Set text color to white
          }
        }}
      >
        {list()}
      </Drawer>
    </AppBar>
  );
}

export default Header;