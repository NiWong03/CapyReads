import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { Container, Box, Grid } from '@mui/material';
import { keyframes } from '@mui/material';
import '../css/home.css';
import '../css/main.css';
import pathh2 from '../images/about.jpg';
import axios from 'axios';
import qs from 'qs';

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

function Home() {
  const [search, setSearch] = useState(""); // State for search input (not currently used)
  const [mangaList, setMangaList] = useState([]); // State to hold manga list

  useEffect(() => {
    fetchTopManga(); // Fetch manga on component mount
  }, []);

  // Set up Axios instance for API calls
  const axiosInstance = axios.create({
    baseURL: 'https://18.118.30.61/api', // Replace with your EC2 public IP
    headers: {
      'Content-Type': 'application/json',
      //'Accept': 'application/json',
    },
  });

const fetchTopManga = async () => {
  try {
    const res = await axiosInstance.get('/manga', {
      params: {
        'order[rating]': 'desc',
        limit: 20,
      },
      paramsSerializer: params => qs.stringify(params, { encode: false }), // Disable encoding
    });
    const mangaWithCovers = await fetchCovers(res.data.data);
    setMangaList(mangaWithCovers);
  } catch (error) {
    console.error("Error fetching top manga:", error);
  }
};

  

  // Function to fetch manga covers
  const fetchCovers = async (mangaList) => {
    return Promise.all(mangaList.map(async (manga) => {
      try {
        const res = await axiosInstance.get('/cover', {
          params: {
            manga: [manga.id],
            limit: 1,
          },
        });
        if (res.data.data && res.data.data.length > 0) {
          manga.coverFileName = res.data.data[0].attributes.fileName; // Assign cover file name
        }
        return manga; // Return the manga with cover
      } catch (error) {
        console.error(`Error fetching cover for manga ${manga.id}:`, error);
        return manga; // Return manga even if there's an error fetching the cover
      }
    }));
  };

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
      {/* Additional shapes omitted for brevity */}
      
      {/* Manga List Container */}
      <Container maxWidth="lg" sx={{ 
        position: 'relative', 
        zIndex: 1,
      }}>
        <Grid container spacing={2} justifyContent="center"> {/* Center the grid items */}
          {mangaList.map((manga) => (
            <Grid item xs={6} sm={4} md={2.4} key={manga.id}> {/* Adjust item sizes for responsiveness */}
              <Card 
                manga={manga} // Pass manga data to Card component
                style={{
                  transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                  zIndex: 3,
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
