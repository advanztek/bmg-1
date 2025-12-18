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

    return (
        <Box
            sx={{
                bgcolor:theme.palette.primary.main,
                py: { xs: 4, md: 1 },
                borderTop: `1px solid rgba(255, 255, 255, 0.1)`,
                borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: { xs: 4, sm: 5, md: 6 },
                        px: { xs: 2, sm: 4 },
                    }}
                >
                    {partners.map((partner, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 0.8,
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                // filter: 'brightness(0) invert(1)',
                                '&:hover': {
                                    opacity: 1,
                                    transform: 'scale(1.1)',
                                },
                            }}
                        >
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                style={{
                                    height: 'auto',
                                    maxHeight: index === 0 ? '50px' : index === 5 ? '140px' : '140px',
                                    width: 'auto',
                                    maxWidth: index === 3 ? '140px' : '140px',
                                    objectFit: 'contain',
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default PartnersLogo;