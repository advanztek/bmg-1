import React from 'react';
import { Box, Container, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    CheckmarkCircle24Filled,
    ArrowRight24Regular,
    Flash24Regular,
    ShieldCheckmark24Regular,
    Lightbulb24Regular,
} from '@fluentui/react-icons';

const FeatureSection = () => {
    const theme = useTheme();

    const features = [
        {
            icon: <Flash24Regular />,
            title: 'Seamless Integration',
            description: 'Plug into your existing tools without headache. API-first design for developers and teams.',
        },
        {
            icon: <ShieldCheckmark24Regular />,
            title: '99.9% Uptime',
            description: 'Enterprise-grade reliability. Your services run smoothly, 24/7, with proactive monitoring.',
        },
        {
            icon: <Lightbulb24Regular />,
            title: 'AI-Powered Customization',
            description: 'Tailor experiences with intelligent algorithms. Personalization at scale for every user.',
        },
    ];

    return (
        <Box
            sx={{
                position: 'relative',
                overflow: 'hidden',
                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                py: { xs: 6, md: 10 },
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-50%',
                    left: '-20%',
                    width: '600px',
                    height: '600px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '50%',
                    animation: 'float 20s ease-in-out infinite',
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-30%',
                    right: '-10%',
                    width: '400px',
                    height: '400px',
                    background: 'rgba(255, 255, 255, 0.03)',
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
                    <Grid size={{ xs:12, md:6 }} xs={12} md={6}>
                        <Box sx={{ mb: { xs: 4, md: 0 } }}>
                            <Typography
                                variant="h2"
                                sx={{
                                    fontWeight: 800,
                                    fontSize: { xs: '2rem', md: '2.75rem' },
                                    color: '#fff',
                                    mb: 2,
                                    lineHeight: 1.2,
                                }}
                            >
                                Get things Done with Ease
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.85)',
                                    mb: 4,
                                    fontSize: '1.05rem',
                                    lineHeight: 1.6,
                                }}
                            >
                                Struggling to stand out in a crowded digital landscape?
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                                {features.map((feature, index) => (
                                    <Card
                                        key={index}
                                        sx={{
                                            bgcolor: 'rgba(255, 255, 255, 0.98)',
                                            backdropFilter: 'blur(20px)',
                                            borderRadius: 3,
                                            border: 'none',
                                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                            transform: 'translateX(0)',
                                            '&:hover': {
                                                transform: 'translateX(8px)',
                                                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.18)',
                                                bgcolor: '#fff',
                                            },
                                        }}
                                    >
                                        <CardContent sx={{ p: 3 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                                <Box
                                                    sx={{
                                                        width: 44,
                                                        height: 44,
                                                        borderRadius: '12px',
                                                        bgcolor: `${theme.palette.primary.main}15`,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: theme.palette.primary.main,
                                                        flexShrink: 0,
                                                        transition: 'all 0.3s ease',
                                                        '.MuiCard-root:hover &': {
                                                            bgcolor: theme.palette.primary.main,
                                                            color: '#fff',
                                                            transform: 'rotate(10deg) scale(1.1)',
                                                        },
                                                    }}
                                                >
                                                    {feature.icon}
                                                </Box>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontWeight: 700,
                                                            color: theme.palette.text.heading,
                                                            mb: 0.5,
                                                            fontSize: '1.125rem',
                                                        }}
                                                    >
                                                        {feature.title}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: theme.palette.text.secondary,
                                                            lineHeight: 1.6,
                                                            fontSize: '0.95rem',
                                                        }}
                                                    >
                                                        {feature.description}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        </Box>
                    </Grid>

                    <Grid size={{ xs:12, md:6 }}>
                        <Box
                            sx={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {/* Decorative Background Element */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: '30px',
                                    transform: 'rotate(6deg)',
                                    transition: 'transform 0.3s ease',
                                }}
                            />

                            {/* Main Image Card */}
                            <Box
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                    maxWidth: 500,
                                    transform: 'rotate(-3deg)',
                                    transition: 'all 0.4s ease',
                                    '&:hover': {
                                        transform: 'rotate(0deg) scale(1.02)',
                                    },
                                }}
                            >
                                <Card
                                    sx={{
                                        borderRadius: 4,
                                        overflow: 'hidden',
                                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                                        border: '8px solid rgba(255, 255, 255, 0.95)',
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=800&fit=crop"
                                        alt="Person using phone"
                                        sx={{
                                            width: '100%',
                                            height: 'auto',
                                            display: 'block',
                                        }}
                                    />
                                </Card>

                                {/* Floating CTA Button */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 30,
                                        right: -20,
                                        animation: 'bounce 2s ease-in-out infinite',
                                        '@keyframes bounce': {
                                            '0%, 100%': { transform: 'translateY(0)' },
                                            '50%': { transform: 'translateY(-10px)' },
                                        },
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        endIcon={<ArrowRight24Regular />}
                                        sx={{
                                            bgcolor: theme.palette.warning.main,
                                            color: theme.palette.warning.contrastText,
                                            px: 4,
                                            py: 1.8,
                                            fontSize: '1.05rem',
                                            fontWeight: 700,
                                            borderRadius: 3,
                                            textTransform: 'none',
                                            boxShadow: `0 8px 24px ${theme.palette.warning.main}60`,
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                bgcolor: theme.palette.warning.dark,
                                                boxShadow: `0 12px 32px ${theme.palette.warning.main}80`,
                                                transform: 'translateY(-2px)',
                                            },
                                        }}
                                    >
                                        Learn More
                                    </Button>
                                </Box>
                            </Box>

                            {/* Decorative Floating Elements */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 40,
                                    left: -20,
                                    width: 100,
                                    height: 100,
                                    borderRadius: '50%',
                                    bgcolor: 'rgba(255, 255, 255, 0.15)',
                                    backdropFilter: 'blur(10px)',
                                    display: { xs: 'none', md: 'flex' },
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    animation: 'float 3s ease-in-out infinite',
                                }}
                            >
                                <CheckmarkCircle24Filled style={{ fontSize: 40, color: '#fff' }} />
                            </Box>

                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 60,
                                    left: 20,
                                    px: 2.5,
                                    py: 1.5,
                                    borderRadius: 3,
                                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(10px)',
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                                    display: { xs: 'none', md: 'block' },
                                    animation: 'float 4s ease-in-out infinite 1s',
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        fontWeight: 600,
                                        display: 'block',
                                        mb: 0.5,
                                    }}
                                >
                                    Success Rate
                                </Typography>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 800,
                                        color: theme.palette.primary.main,
                                    }}
                                >
                                    99.9%
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default FeatureSection;