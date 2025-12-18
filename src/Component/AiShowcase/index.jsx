import React, { useState } from "react";
import {
    Video24Regular,
    Image24Regular,
    VideoClip24Regular,
    ChartMultiple24Regular,
    MicSparkle24Regular,
    Globe24Regular,
    Play24Filled,
} from "@fluentui/react-icons";

import {
    Box,
    Typography,
    Button,
    Stack,
    Paper,
    IconButton,
    Grid,
    Container,
    useMediaQuery,
    useTheme,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function AIServicesShowcase({ mode = "light" }) {
    const [activeService, setActiveService] = useState(0);
    const navigate = useNavigate();
    const theme = useTheme();

    // Properly detect mobile screens using MUI's useMediaQuery
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleGetStarted = () => {
        navigate('/register');
    }

    const services = [
        {
            id: 0,
            name: "AI Video Generator",
            icon: <Video24Regular />,
            image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=600&fit=crop",
            gradient: `linear-gradient(to bottom right, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
        },
        {
            id: 1,
            name: "AI Image Generator",
            icon: <Image24Regular />,
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
            gradient: `linear-gradient(to bottom right, ${theme.palette.info.light}, ${theme.palette.primary.main})`,
        },
        {
            id: 2,
            name: "AI Video Editor",
            icon: <VideoClip24Regular />,
            image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop",
            gradient: `linear-gradient(to bottom right, ${theme.palette.warning.main}, ${theme.palette.error.main})`,
        },
        {
            id: 3,
            name: "AI Biz Strategy",
            icon: <ChartMultiple24Regular />,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
            gradient: `linear-gradient(to bottom right, ${theme.palette.success.main}, ${theme.palette.info.dark})`,
        },
        {
            id: 4,
            name: "AI Voice Generator",
            icon: <MicSparkle24Regular />,
            image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=800&h=600&fit=crop",
            gradient: `linear-gradient(to bottom right, ${theme.palette.secondary.light}, ${theme.palette.error.dark})`,
        },
        {
            id: 5,
            name: "AI Web Generator",
            icon: <Globe24Regular />,
            image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop",
            gradient: `linear-gradient(to bottom right, ${theme.palette.primary.light}, ${theme.palette.secondary.dark})`,
        },
    ];

    const getCardStyle = (index) => {
        // Active card always centered
        if (index === activeService) {
            return {
                zIndex: 50,
                transform: "scale(1)",
                opacity: 1,
                left: "50%",
                top: "50%",
                transformOrigin: "center",
                translate: "-50% -50%",
            };
        }

        // On mobile, hide all inactive cards
        if (isMobile) {
            return {
                display: "none",
            };
        }

        // Desktop: show stacked cards behind active one
        const positions = [
            { x: "-120px", y: "-80px", scale: 0.7, rotate: -8, zIndex: 30 },
            { x: "100px", y: "-100px", scale: 0.65, rotate: 5, zIndex: 25 },
            { x: "-150px", y: "80px", scale: 0.6, rotate: -5, zIndex: 20 },
            { x: "120px", y: "100px", scale: 0.55, rotate: 8, zIndex: 15 },
            { x: "-80px", y: "120px", scale: 0.5, rotate: -3, zIndex: 10 },
        ];

        const relativeIndex = (index - activeService + services.length) % services.length;
        if (relativeIndex === 0) return { display: "none" };

        const posIndex = Math.min(relativeIndex - 1, positions.length - 1);
        const pos = positions[posIndex];

        return {
            transform: `translate(${pos.x}, ${pos.y}) scale(${pos.scale}) rotate(${pos.rotate}deg)`,
            zIndex: pos.zIndex,
            opacity: 0.85,
        };
    };

    return (
        <Box
            sx={{
                py: { xs: 6, md: 8 },
                backgroundImage: "url('/Images/Wave.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Container  maxWidth="lg">
                <Box sx={{ maxWidth: "1400px", mx: "auto", px: { xs: 2, sm: 3 } }}>
                    {/* HEADER */}
                    <Grid data-aos='fade-down' container alignItems="center" justifyContent="space-between" mb={{ xs: 4, md: 6 }}>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Typography
                                variant="h1"
                                fontWeight={900}
                                mb={1}
                                color={theme.palette.text.primary}
                                sx={{
                                    fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3.9rem' }
                                }}
                            >
                                Unlock Infinite Possibilities with AI Precision
                            </Typography>
                            <Typography
                                variant="body1"
                                color={theme.palette.text.primary}
                                sx={{
                                    fontSize: { xs: '0.95rem', md: '2rem' }
                                }}
                            >
                                Have the world at your fingertips with BMG AI Service
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }} mt={{ xs: 3, md: 0 }}>
                            <Button
                                onClick={handleGetStarted}
                                variant="outlined"
                                fullWidth
                                sx={{
                                    px: 3,
                                    py: 2.2,
                                    fontWeight: 600,
                                    borderWidth: 2,
                                    borderRadius: 2,
                                    borderColor: theme.palette.primary.main,
                                    color: theme.palette.primary.main,
                                    "&:hover": {
                                        backgroundColor: theme.palette.primary.main,
                                        color: theme.palette.primary.contrastText,
                                        borderWidth: 2,
                                    },
                                }}
                            >
                                Get Started Now
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid data-aos='flip-down' container spacing={{ xs: 3, md: 6 }}>
                        {/* LEFT SIDEBAR - SERVICE BUTTONS */}
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Stack
                                spacing={2}
                                sx={{
                                    flexDirection: { xs: 'row', md: 'column' },
                                    overflowX: { xs: 'auto', md: 'visible' },
                                    overflowY: 'hidden',
                                    pb: { xs: 2, md: 0 },
                                    '&::-webkit-scrollbar': {
                                        height: '6px',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        backgroundColor: theme.palette.primary.main,
                                        borderRadius: '3px',
                                    },
                                }}
                            >
                                {services.map((service, index) => (
                                    <Button
                                        key={service.id}
                                        fullWidth
                                        startIcon={service.icon}
                                        onClick={() => setActiveService(index)}
                                        sx={{
                                            textTransform: "none",
                                            px: { xs: 2, md: 3 },
                                            py: 2,
                                            borderRadius: 3,
                                            fontWeight: 600,
                                            boxShadow: 2,
                                            minWidth: { xs: '200px', md: 'auto' },
                                            flexShrink: { xs: 0, md: 1 },
                                            whiteSpace: 'nowrap',
                                            bgcolor: activeService === index
                                                ? theme.palette.primary.main
                                                : theme.palette.background.paper,
                                            color: activeService === index
                                                ? theme.palette.primary.contrastText
                                                : theme.palette.primary.main,
                                            "&:hover": {
                                                boxShadow: 4,
                                                bgcolor: activeService === index
                                                    ? theme.palette.primary.dark
                                                    : theme.palette.primary.lightBg,
                                            },
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        {service.name}
                                    </Button>
                                ))}
                            </Stack>
                        </Grid>

                        {/* RIGHT SIDE - CARD SHOWCASE */}
                        <Grid size={{ xs: 12, md: 9 }}>
                            <Box
                                sx={{
                                    position: "relative",
                                    height: { xs: "400px", sm: "500px", md: "600px" },
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                {services.map((service, index) => {
                                    const style = getCardStyle(index);
                                    if (style.display === "none") return null;

                                    return (
                                        <Paper
                                            key={service.id}
                                            onClick={() => setActiveService(index)}
                                            sx={{
                                                position: "absolute",
                                                cursor: "pointer",
                                                transition: "all 0.7s ease",
                                                width: {
                                                    xs: "90%",
                                                    sm: "85%",
                                                    md: index === activeService ? "600px" : "520px",
                                                },
                                                height: {
                                                    xs: "85%",
                                                    sm: "75%",
                                                    md: index === activeService ? "400px" : "320px",
                                                },
                                                maxWidth: { xs: '400px', sm: '500px', md: 'none' },
                                                overflow: "hidden",
                                                borderRadius: 4,
                                                backgroundColor: theme.palette.background.paper,
                                                boxShadow: index === activeService ? 8 : 4,
                                                ...style,
                                            }}
                                        >
                                            {/* TOP BAR (WINDOW DOTS) */}
                                            <Box
                                                sx={{
                                                    p: { xs: 1.5, md: 2 },
                                                    display: "flex",
                                                    gap: 1
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: { xs: 10, md: 14 },
                                                        height: { xs: 10, md: 14 },
                                                        borderRadius: "50%",
                                                        bgcolor: theme.palette.error.main,
                                                    }}
                                                />
                                                <Box
                                                    sx={{
                                                        width: { xs: 10, md: 14 },
                                                        height: { xs: 10, md: 14 },
                                                        borderRadius: "50%",
                                                        bgcolor: theme.palette.warning.main,
                                                    }}
                                                />
                                                <Box
                                                    sx={{
                                                        width: { xs: 10, md: 14 },
                                                        height: { xs: 10, md: 14 },
                                                        borderRadius: "50%",
                                                        bgcolor: theme.palette.success.main,
                                                    }}
                                                />
                                            </Box>

                                            {/* IMAGE CONTAINER */}
                                            <Box
                                                sx={{
                                                    position: "relative",
                                                    width: "100%",
                                                    height: "100%",
                                                    mt: { xs: -2, md: -3 },
                                                }}
                                            >
                                                <img
                                                    src={service.image}
                                                    alt={service.name}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover",
                                                    }}
                                                />

                                                {/* COLOR OVERLAY */}
                                                <Box
                                                    sx={{
                                                        position: "absolute",
                                                        inset: 0,
                                                        background: service.gradient,
                                                        opacity: 0.25,
                                                        mixBlendMode: "overlay",
                                                    }}
                                                />

                                                {/* ACTIVE CARD INFORMATION */}
                                                {index === activeService && (
                                                    <Box
                                                        sx={{
                                                            position: "absolute",
                                                            bottom: 0,
                                                            left: 0,
                                                            right: 0,
                                                            p: { xs: 2, sm: 2.5, md: 3 },
                                                            background: "linear-gradient(to top, rgba(0,0,0,.85), transparent)",
                                                        }}
                                                    >
                                                        <Stack
                                                            direction="row"
                                                            spacing={{ xs: 1.5, md: 2 }}
                                                            alignItems="center"
                                                        >
                                                            <Box
                                                                sx={{
                                                                    width: { xs: 50, md: 60 },
                                                                    height: { xs: 50, md: 60 },
                                                                    bgcolor: "rgba(255,255,255,0.25)",
                                                                    backdropFilter: "blur(6px)",
                                                                    borderRadius: 3,
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    fontSize: { xs: '20px', md: '24px' },
                                                                    color: '#fff',
                                                                }}
                                                            >
                                                                {service.icon}
                                                            </Box>

                                                            <Box>
                                                                <Typography
                                                                    variant="h6"
                                                                    color="white"
                                                                    sx={{
                                                                        fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' }
                                                                    }}
                                                                >
                                                                    {service.name}
                                                                </Typography>
                                                                <Typography
                                                                    variant="body2"
                                                                    color="white"
                                                                    sx={{
                                                                        fontSize: { xs: '0.8rem', md: '0.875rem' }
                                                                    }}
                                                                >
                                                                    Transform your ideas into reality
                                                                </Typography>
                                                            </Box>
                                                        </Stack>
                                                    </Box>
                                                )}

                                                {/* PLAY BUTTON (ONLY FOR VIDEO ITEMS) */}
                                                {(index === 0 || index === 2) && index === activeService && (
                                                    <IconButton
                                                        sx={{
                                                            position: "absolute",
                                                            top: "50%",
                                                            left: "50%",
                                                            transform: "translate(-50%, -50%)",
                                                            width: { xs: 60, sm: 70, md: 80 },
                                                            height: { xs: 60, sm: 70, md: 80 },
                                                            bgcolor: theme.palette.background.paper,
                                                            color: theme.palette.text.primary,
                                                            borderRadius: "50%",
                                                            boxShadow: 6,
                                                            '&:hover': {
                                                                bgcolor: theme.palette.primary.main,
                                                                color: theme.palette.primary.contrastText,
                                                                transform: "translate(-50%, -50%) scale(1.1)",
                                                            },
                                                            transition: 'all 0.3s ease',
                                                        }}
                                                    >
                                                        <Play24Filled style={{ fontSize: { xs: 24, md: 28 } }} />
                                                    </IconButton>
                                                )}
                                            </Box>
                                        </Paper>
                                    );
                                })}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}