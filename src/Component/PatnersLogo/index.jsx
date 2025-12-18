import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const PartnersLogo = () => {
    const theme = useTheme();

    const partners = [
        {
            name: 'Marriott',
            logo: '/Illus/Img_1.png'
        },
        {
            name: 'McLaren',
            logo: '/Illus/Img_2.png',
        },
        {
            name: 'T-Mobile',
            logo: '/Illus/Img_3.png',
        },
        {
            name: 'New York Weekly',
            logo: '/Illus/Img_4.png',
        },
        {
            name: 'MSNBC',
            logo: '/Illus/Img_5.png',
        },
        {
            name: 'Yahoo News',
            logo: '/Illus/Img_6.png',
        },
    ];

    // Duplicate partners array for seamless loop
    const duplicatedPartners = [...partners, ...partners, ...partners];

    return (
        <Box
            sx={{
                bgcolor: theme.palette.primary.main,
                py: { xs: 0, md: 2 },
                borderTop: `1px solid rgba(255, 255, 255, 0.1)`,
                borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {/* Optional Header */}
            {/* <Container maxWidth="lg" sx={{ mb: 4 }}>
                <Typography
                    variant="h6"
                    sx={{
                        textAlign: 'center',
                        color: theme.palette.primary.contrastText,
                        fontWeight: 600,
                        opacity: 0.9,
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        fontSize: { xs: '0.875rem', md: '1rem' },
                    }}
                >
                    Trusted by Leading Brands
                </Typography>
            </Container> */}

            {/* Marquee Container */}
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before, &::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        width: { xs: '80px', md: '150px' },
                        height: '100%',
                        zIndex: 2,
                        pointerEvents: 'none',
                    },
                    '&::before': {
                        left: 0,
                        // background: `linear-gradient(to right, ${theme.palette.primary.main} 0%, transparent 100%)`,
                    },
                    '&::after': {
                        right: 0,
                        // background: `linear-gradient(to left, ${theme.palette.primary.main} 0%, transparent 100%)`,
                    },
                }}
            >
                {/* Floating Marquee */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: { xs: 6, sm: 8, md: 12 },
                        animation: 'scroll 25s linear infinite',
                        '&:hover': {
                            animationPlayState: 'paused',
                        },
                        '@keyframes scroll': {
                            '0%': {
                                transform: 'translateX(0)',
                            },
                            '100%': {
                                transform: 'translateX(-33.333%)',
                            },
                        },
                    }}
                >
                    {duplicatedPartners.map((partner, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: { xs: '120px', sm: '140px', md: '160px' },
                                height: { xs: '60px', sm: '70px', md: '80px' },
                                opacity: 0.8,
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                flexShrink: 0,
                                '&:hover': {
                                    // opacity: 1,
                                    transform: 'scale(1.1)',
                                },
                            }}
                        >
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                style={{
                                    height: 'auto',
                                    maxHeight: '100%',
                                    width: 'auto',
                                    maxWidth: '100%',
                                    objectFit: 'contain',
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Optional Stats Section */}
            {/* <Container maxWidth="lg" sx={{ mt: 6 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: { xs: 4, md: 8 },
                        flexWrap: 'wrap',
                    }}
                >
                    {[
                        { value: '500+', label: 'Brands Trust Us' },
                        { value: '50K+', label: 'Projects Delivered' },
                        { value: '98%', label: 'Client Satisfaction' },
                    ].map((stat, index) => (
                        <Box
                            key={index}
                            sx={{
                                textAlign: 'center',
                                opacity: 0.9,
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 800,
                                    color: theme.palette.primary.contrastText,
                                    mb: 0.5,
                                    fontSize: { xs: '1.5rem', md: '2rem' },
                                }}
                            >
                                {stat.value}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.primary.contrastText,
                                    opacity: 0.8,
                                    fontSize: { xs: '0.875rem', md: '1rem' },
                                }}
                            >
                                {stat.label}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Container> */}
        </Box>
    );
};

export default PartnersLogo;