import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
} from '@mui/material';


const AuthSlider = () => {

    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            title: 'Join Expert Community of Digital Business Solutions',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
        },
        {
            title: 'Collaborate with Industry Leaders',
            description: 'Connect and share ideas with professionals in the digital business space.',
        },
        {
            title: 'Access Premium Resources',
            description: 'Get exclusive access to tools and resources for your business growth.',
        },
    ];

    return (
        <>

            <Box sx={{maxWidth: 500, width: '100%', textAlign: 'center' }}>
                <Typography
                    variant="h3"
                    sx={{
                        color: 'white',
                        fontWeight: 700,
                        mb: 2,
                        fontSize: { xs: '1.75rem', md: '2.5rem' },
                    }}
                >
                    BMG
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        color: 'white',
                        mb: 4,
                        fontWeight: 500,
                        fontSize: { xs: '1rem', md: '1.25rem' },
                    }}
                >
                    {slides[currentSlide].title}
                </Typography>

                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        mb: 3,
                    }}
                >
                    <Box
                     component='img'
                        src='/Images/auth.jpg'
                        sx={{
                           width: '100%',
                           borderRadius: 2,
                        }}
                    />
                </Paper>

                <Typography
                    variant="body2"
                    sx={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        mb: 3,
                        fontSize: { xs: '0.875rem', md: '1rem' },
                    }}
                >
                    {slides[currentSlide].description}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    {slides.map((_, index) => (
                        <Box
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            sx={{
                                width: index === currentSlide ? 24 : 8,
                                height: 8,
                                borderRadius: 4,
                                background: index === currentSlide ? 'white' : 'rgba(255, 255, 255, 0.5)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </>
    )
}

export default AuthSlider
