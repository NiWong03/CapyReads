import React from 'react';
import { Typography, Container, Box, Grid} from '@mui/material';
import { keyframes } from '@mui/material';
import pathh2 from '../images/about.jpg';
import logo from '../images/logo.png';

// Define the floating animation for the logo
const float = keyframes`
  0% { transform: translateY(0px) scale(3); }
  50% { transform: translateY(-20px) scale(3); }
  100% { transform: translateY(0px) scale(3); }
`;

// Define animations for geometric shapes
const floatShape1 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(50px, 50px) rotate(90deg); }
  50% { transform: translate(100px, 0) rotate(180deg); }
  75% { transform: translate(50px, -50px) rotate(270deg); }
`;

const floatShape2 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(-50px, 100px) rotate(120deg); }
  66% { transform: translate(50px, 50px) rotate(240deg); }
`;

// New animation for rotating shapes
const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

function About() {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        color: 'white',
        padding: 4,
        backgroundImage: `url(${pathh2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 0,
        },
      }}
    >
      {/* Floating shapes */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '100px',
          height: '100px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '20%',
          animation: `${floatShape1} 20s infinite linear`,
          zIndex: 1,
        }}
      />
      {/*circle*/}
      <Box
        sx={{
          position: 'absolute',
          top: '38%',
          right: '40%',
          width: '150px',
          height: '150px',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          animation: `${floatShape2} 25s infinite linear`,
          zIndex: 1,
        }}
      />
      {/*Square*/}
      <Box
        sx={{
          position: 'absolute',
          top: '5%',
          right: '7%',
          width: '80px',
          height: '80px',
          border: '2px solid rgba(255, 255, 255, 0.15)', // Add border
          backgroundColor: 'transparent', // Remove background color
          transform: 'rotate(45deg)',
          animation: `${floatShape1} 18s infinite linear reverse`,
          zIndex: 1,
        }}
      />

      {/* Triangle */}
      <Box
        sx={{
          position: 'absolute',
          top: '5%',
          left: '55%',
          width: 0,
          height: 0,
          borderLeft: '50px solid transparent',
          borderRight: '50px solid transparent',
          borderBottom: '86px solid rgba(255, 255, 255, 0.1)',
          animation: `${floatShape2} 22s infinite linear`,
          zIndex: 1,
        }}
      />

      {/* Triangle */}
      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          right: '15%',
          width: 0,
          height: 0,
          borderLeft: '50px solid transparent',
          borderRight: '50px solid transparent',
          borderBottom: '86px solid rgba(255, 255, 255, 0.1)',
          animation: `${floatShape2} 22s infinite linear`,
          zIndex: 1,
        }}
      />
            {/* Triangle */}
            <Box
        sx={{
          position: 'absolute',
          top: '35%',
          left: '11%',
          width: 0,
          height: 0,
          borderLeft: '75px solid transparent',
          borderRight: '75px solid transparent',
          borderBottom: '129px solid rgba(255, 255, 255, 0.1)',
          animation: `${floatShape2} 22s infinite linear`,
          zIndex: 1,
        }}
      />

      {/* Plus sign */}
      <Box
        sx={{
          position: 'absolute',
          top: '25%',
          right: '35%',
          width: '60px',
          height: '60px',
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
          '&::before': {
            top: '0',
            left: '40%',
            width: '20%',
            height: '100%',
          },
          '&::after': {
            top: '40%',
            left: '0',
            width: '100%',
            height: '20%',
          },
          animation: `${rotate} 15s infinite linear`,
          zIndex: 1,
        }}
      />

      {/* X sign */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '80%',
          left: '25%',
          width: '70px',
          height: '70px',
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '2px', // Thickness of the X lines
            top: '50%',
            left: '0',
            backgroundColor: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          },
          '&::before': {
            transform: 'translateY(-50%) rotate(45deg)',
          },
          '&::after': {
            transform: 'translateY(-50%) rotate(-45deg)',
          },
          animation: `${floatShape1} 23s infinite linear`,
          zIndex: 1,
        }}
      />

        <Container
          maxWidth="xl"
          sx={{
            position: 'relative',
            zIndex: 2,
            marginTop: { xs: '22vh', sm: '22vh', md: '10vh', lg: '5vh' }, // Add larger margin for smaller screens
          }}
        >

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7} sx={{ 
            paddingLeft: { md: '10%' }, // Add left padding on medium and larger screens
            marginLeft: { md: '5%' }, // Move the entire text block to the right
          }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Welcome to CapyReads!
            </Typography>
            <Typography variant="body1" paragraph>
              CapyReads is a responsive web application designed to enhance your manga reading experience. 
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
              This project was created by <a href="https://www.linkedin.com/in/nicholas-wong-110b2b231/" target="_blank" rel="noopener noreferrer" style={{color: '#e0d0ff'}}>Nicholas Wong</a>{' '}
              and <a href="https://www.linkedin.com/in/debora-choi-759b221a9/" target="_blank" rel="noopener noreferrer" style={{color: '#e0d0ff'}}>Debora Choi</a>.
            </Typography>
            </Grid>
          <Grid item xs={12} md={5} sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: { xs: 'auto', md: '80vh' },
            overflow: 'hidden',
          }}>
            <Box sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              animation: `${float} 6s ease-in-out infinite`,
              transformOrigin: 'center center',
              marginRight: '-5%',
            }}>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Logo */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '8%', sm: '5%', md: '20%' },
          right: { xs: '37%', sm: '37%', md: '14%' },
          transform: 'translateY(-50%)',
          width: { 
            xs: '80px', 
            sm: '150px', 
            md: '200px', 
            lg: '200px',
            xl: '250px'
          },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          animation: `${float} 6s ease-in-out infinite`,
          zIndex: 3,
          '@media (min-width: 1000px)': { 
            width: '150px',
            height: '150px',
          }
        }}
      >
        <img 
          src={logo} 
          alt="CapyReads Logo" 
          style={{ 
            width: '100%', // Use 100% to ensure it fits the Box
            height: '100%', // Use 100% to make it fill the Box
            objectFit: 'contain',
          }} 
        />
      </Box>
    </Box>
  );
}
export default About;
