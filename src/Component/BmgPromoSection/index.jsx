import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ArrowRight24Regular, Sparkle24Regular, TrophyRegular } from '@fluentui/react-icons';

const BMGPromoSection = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: 'relative',
                overflow: 'hidden',
                py: { xs: 6, md: 10 },
                mt: 8,
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-50%',
                    right: '-20%',
                    width: '600px',
                    height: '600px',
                    background: `radial-gradient(circle, ${theme.palette.primary.main}15 0%, transparent 70%)`,
                    borderRadius: '50%',
                    animation: 'float 20s ease-in-out infinite',
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-50%',
                    left: '-20%',
                    width: '500px',
                    height: '500px',
                    background: `radial-gradient(circle, ${theme.palette.primary.main}10 0%, transparent 70%)`,
                    borderRadius: '50%',
                    animation: 'float 15s ease-in-out infinite reverse',
                },
                '@keyframes float': {
                    '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
                    '50%': { transform: 'translate(30px, 30px) scale(1.1)' },
                },
            }}
        >
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid size={{xs:12, md:6 }}>
                        <Box sx={{ position: 'relative' }}>
                            {/* Decorative Badge */}
                            <Box
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    px: 2,
                                    py: 1,
                                    mb: 3,
                                    borderRadius: '50px',
                                    border: `1px solid ${theme.palette.primary.main}30`,
                                    backdropFilter: 'blur(10px)',
                                    animation: 'pulse 2s ease-in-out infinite',
                                    '@keyframes pulse': {
                                        '0%, 100%': { opacity: 1 },
                                        '50%': { opacity: 0.8 },
                                    },
                                }}
                            >
                                <Sparkle24Regular style={{ color: theme.palette.primary.main }} />
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: theme.palette.primary.main,
                                        fontWeight: 700,
                                        letterSpacing: '1px',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    AI-Powered Solution
                                </Typography>
                            </Box>

                            {/* Main Heading */}
                            <Typography
                                variant="h2"
                                sx={{
                                    fontWeight: 800,
                                    fontSize: { xs: '2rem', md: '2.75rem' },
                                    color: theme.palette.text.heading,
                                    mb: 2,
                                    lineHeight: 1.2,
                                }}
                            >
                                Find Best Marketing Strategies with AI Enhanced tool on BMG
                            </Typography>

                            {/* Description */}
                            <Typography
                                variant="body1"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    mb: 4,
                                    fontSize: '1.1rem',
                                    lineHeight: 1.7,
                                    maxWidth: '500px',
                                }}
                            >
                                Leverage cutting-edge AI technology to transform your marketing approach
                                and achieve unprecedented results with data-driven insights.
                            </Typography>

                            {/* Buttons */}
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    endIcon={<ArrowRight24Regular />}
                                    sx={{
                                        px: 4,
                                        py: 1,
                                        fontSize: '1rem',
                                        fontWeight: 700,
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        bgcolor: theme.palette.warning.main,
                                        color: theme.palette.warning.contrastText,
                                        boxShadow: `0 8px 24px ${theme.palette.warning.main}40`,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            bgcolor: theme.palette.warning.dark,
                                            boxShadow: `0 12px 32px ${theme.palette.warning.main}60`,
                                            transform: 'translateY(-2px)',
                                        },
                                    }}
                                >
                                    Explore Now
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        px: 4,
                                        py: 1,
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        borderWidth: '2px',
                                        borderColor: theme.palette.primary.main,
                                        color: theme.palette.primary.main,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            borderWidth: '2px',
                                            borderColor: theme.palette.primary.main,
                                            backgroundColor: `${theme.palette.primary.main}10`,
                                            transform: 'translateY(-2px)',
                                        },
                                    }}
                                >
                                    Learn More
                                </Button>
                            </Box>

                            {/* Stats */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 4,
                                    mt: 5,
                                    pt: 4,
                                    borderTop: `1px solid ${theme.palette.divider}`,
                                }}
                            >
                                {[
                                    { number: '50K+', label: 'Active Users' },
                                    { number: '95%', label: 'Success Rate' },
                                    { number: '24/7', label: 'AI Support' },
                                ].map((stat, index) => (
                                    <Box key={index}>
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                fontWeight: 800,
                                                color: theme.palette.primary.main,
                                                mb: 0.5,
                                            }}
                                        >
                                            {stat.number}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: theme.palette.text.secondary,
                                                fontWeight: 600,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                            }}
                                        >
                                            {stat.label}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Grid>

                    <Grid size={{xs:12, md:6 }} >
                        <Box
                            sx={{
                                position: 'relative',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: 2,
                                transform: { xs: 'scale(0.9)', md: 'scale(1)' },
                            }}
                        >
                            {/* BMG Logo Card */}
                            <Box
                                sx={{
                                    gridColumn: 'span 1',
                                    aspectRatio: '1',
                                    borderRadius: '20px',
                                    background: theme.palette.background.paper,
                                    padding: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                    border: `1px solid ${theme.palette.divider}`,
                                    transition: 'all 0.3s ease',
                                    animation: 'float 3s ease-in-out infinite',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: `0 16px 48px ${theme.palette.primary.main}30`,
                                    },
                                }}
                            >
                                <Typography variant="h4" sx={{ fontWeight: 800, color: theme.palette.primary.main }}>
                                    BMG
                                </Typography>
                            </Box>

                            {/* Tumbler Card */}
                            <Box
                                sx={{
                                    gridColumn: 'span 1',
                                    aspectRatio: '1',
                                    borderRadius: '20px',
                                    background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                                    overflow: 'hidden',
                                    boxShadow: '0 8px 32px rgba(37, 99, 235, 0.2)',
                                    transition: 'all 0.3s ease',
                                    animation: 'float 3s ease-in-out infinite 0.5s',
                                    '&:hover': {
                                        transform: 'translateY(-8px) rotate(5deg)',
                                        boxShadow: '0 16px 48px rgba(37, 99, 235, 0.3)',
                                    },
                                }}
                            >
                                <Box sx={{ p: 2, color: '#fff', fontSize: '0.7rem', fontWeight: 600 }}>Product</Box>
                            </Box>

                            {/* Bracelets Card */}
                            <Box
                                sx={{
                                    gridColumn: 'span 1',
                                    aspectRatio: '1',
                                    borderRadius: '20px',
                                    background: theme.palette.background.paper,
                                    overflow: 'hidden',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                    border: `1px solid ${theme.palette.divider}`,
                                    transition: 'all 0.3s ease',
                                    animation: 'float 3s ease-in-out infinite 1s',
                                    '&:hover': {
                                        transform: 'translateY(-8px) rotate(-5deg)',
                                        boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
                                    },
                                }}
                            >
                                <Box sx={{ p: 2, color: theme.palette.text.secondary, fontSize: '0.7rem', fontWeight: 600 }}>
                                    Accessories
                                </Box>
                            </Box>

                            {/* Speaker Card */}
                            <Box
                                sx={{
                                    gridColumn: 'span 1',
                                    aspectRatio: '1',
                                    borderRadius: '20px',
                                    background: theme.palette.background.paper,
                                    overflow: 'hidden',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                    border: `1px solid ${theme.palette.divider}`,
                                    transition: 'all 0.3s ease',
                                    animation: 'float 3s ease-in-out infinite 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
                                    },
                                }}
                            >
                                <Box sx={{ p: 2, color: theme.palette.text.secondary, fontSize: '0.7rem', fontWeight: 600 }}>
                                    Electronics
                                </Box>
                            </Box>

                            {/* Hoodies Card - Spans 2 columns */}
                            <Box
                                sx={{
                                    gridColumn: 'span 2',
                                    aspectRatio: '2/1',
                                    borderRadius: '20px',
                                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                    overflow: 'hidden',
                                    boxShadow: '0 8px 32px rgba(59, 130, 246, 0.2)',
                                    transition: 'all 0.3s ease',
                                    animation: 'float 3s ease-in-out infinite 0.7s',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 16px 48px rgba(59, 130, 246, 0.3)',
                                    },
                                }}
                            >
                                <Box sx={{ p: 2, color: '#fff', fontSize: '0.8rem', fontWeight: 600 }}>Apparel Collection</Box>
                            </Box>

                            {/* Floating Badge */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: -10,
                                    right: -10,
                                    width: 80,
                                    height: 80,
                                    borderRadius: '50%',
                                    background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: `0 8px 24px ${theme.palette.warning.main}60`,
                                    animation: 'rotate 10s linear infinite',
                                    '@keyframes rotate': {
                                        '0%': { transform: 'rotate(0deg)' },
                                        '100%': { transform: 'rotate(360deg)' },
                                    },
                                }}
                            >
                                <TrophyRegular style={{ color: '#fff', fontSize: '32px' }} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default BMGPromoSection;