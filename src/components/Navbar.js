import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Box, Grid, InputBase } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

function Navbar({ HandleSearch, search, SetSearch }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = ['Home','Github', 'About', 'Recently Added'];

  const list = () => (
    <List>
      {menuItems.map((text) => (
        <ListItem button key={text} onClick={toggleDrawer(false)}>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1a0940' }}>
      <Toolbar>
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
              onSubmit={HandleSearch} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                backgroundColor: 'white', 
                borderRadius: '20px', // Increased border radius for more rounded edges
                width: '300px',
                maxWidth: '100%',
                overflow: 'hidden', // Ensure content doesn't overflow rounded corners
                transition: 'background-color 0.3s, border 0.3s',
                border: '2px solid transparent', // Transparent border by default
                '&:focus-within': {
                  backgroundColor: '#3a1b6e', // Darker purple color when focused
                  border: '2px solid white', // White border when focused
                },
                '@media (max-width:600px)': {
                  width: '100%',
                },
              }}
            >
              <InputBase
                placeholder="Search for manga"
                value={search}
                onChange={(e) => SetSearch(e.target.value)}
                sx={{
                  ml: 2, // Increased left margin for better text alignment
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
                    color: 'white', // Change text color to white when focused
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
                    color: 'white', // Change icon color to white when focused
                  },
                }} 
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item>
            <Box className="home-text-container">
              <div className="home-text">Home</div>
            </Box>
          </Grid>
        </Grid>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;