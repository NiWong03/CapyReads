import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import pathh2 from '../images/pathh2.png'; // Import the image

function About() {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', // Changed from 'center' to 'flex-start'
        color: 'white',
        padding: 4,
        backgroundImage: `url(${pathh2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the color and opacity as needed
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="md" sx={{ 
        position: 'relative', 
        zIndex: 1,
        marginTop: '10vh', // Add some top margin to move content up
      }}>
        <Typography variant="h2" component="h1" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to MangaReact, a responsive web application designed to enhance your manga reading experience. 
          Our app leverages the power of React and the extensive MangaDex API to bring you a seamless, user-friendly interface for discovering and enjoying your favorite manga.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Key Features:
        </Typography>
        <Box component="ul" sx={{ paddingLeft: 4 }}>
          <Typography component="li">
            Extensive Manga Library: Access thousands of titles from various genres.
          </Typography>
          <Typography component="li">
            User-Friendly Interface: Easy navigation and intuitive design for a smooth reading experience.
          </Typography>
          <Typography component="li">
            Search Functionality: Quickly find your favorite manga or discover new ones.
          </Typography>
          <Typography component="li">
            Responsive Design: Enjoy reading on any device - desktop, tablet, or mobile.
          </Typography>
        </Box>
        <Typography variant="body1" paragraph sx={{ marginTop: 2 }}>
          This project is open-source and built with love by manga enthusiasts. We're constantly working to improve and add new features to enhance your reading experience.
        </Typography>

        <Typography variant="body1" paragraph>
          For more information, feature requests, or to contribute to the project, please visit our <a href="https://github.com/NiWong03/MangadexReact" target="_blank" rel="noopener noreferrer" style={{color: '#e0d0ff'}}>GitHub repository</a>.
        </Typography>

        <Typography variant="body1" paragraph>
          Fun fact: The theme of this website was inspired by the path scenes in season 4 of Attack on Titan!
          {' '}<a href="https://youtu.be/O1mtWvW-954?si=7BigzSVhrx4CmH3w" target="_blank" rel="noopener noreferrer" style={{color: '#e0d0ff'}}>Watch here</a>
        </Typography>

        <Typography variant="body1" paragraph>
          This project was created by <a href="https://www.linkedin.com/in/nicholas-wong-110b2b231/" target="_blank" rel="noopener noreferrer" style={{color: '#e0d0ff'}}>Nicholas Wong</a>{' '}
          and <a href="https://www.linkedin.com/in/debora-choi-759b221a9/" target="_blank" rel="noopener noreferrer" style={{color: '#e0d0ff'}}>Debora Choi</a>.
        </Typography>
      </Container>
    </Box>
  );
}

export default About;
