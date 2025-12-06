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
} from "@mui/material";

import { lightModeColors, darkModeColors } from "../../Config/color";

export default function AIServicesShowcase({ mode = "light" }) {
    const colors = mode === "dark" ? darkModeColors : lightModeColors;

    const [activeService, setActiveService] = useState(0);

    const services = [
        {
            id: 0,
            name: "AI Video Generator",
            icon: <Video24Regular />,
            image:
                "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=600&fit=crop",
            gradient: `linear-gradient(to bottom right, ${colors.secondary.main}, ${colors.primary.main})`,
        },
        {
            id: 1,
            name: "AI Image Generator",
            icon: <Image24Regular />,
            image:
                "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
            gradient: `linear-gradient(to bottom right, ${colors.info.light}, ${colors.primary.main})`,
        },
        {
            id: 2,
            name: "AI Video Editor",
            icon: <VideoClip24Regular />,
            image:
                "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop",
            gradient: `linear-gradient(to bottom right, ${colors.warning.main}, ${colors.error.main})`,
        },
        {
            id: 3,
            name: "AI Biz Strategy",
            icon: <ChartMultiple24Regular />,
            image:
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
            gradient: `linear-gradient(to bottom right, ${colors.success.main}, ${colors.info.dark})`,
        },
        {
            id: 4,
            name: "AI Voice Generator",
            icon: <MicSparkle24Regular />,
            image:
                "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=800&h=600&fit=crop",
            gradient: `linear-gradient(to bottom right, ${colors.secondary.light}, ${colors.error.dark})`,
        },
        {
            id: 5,
            name: "AI Web Generator",
            icon: <Globe24Regular />,
            image:
                "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop",
            gradient: `linear-gradient(to bottom right, ${colors.primary.light}, ${colors.secondary.dark})`,
        },
    ];

    // ------- CARD POSITION LOGIC --------
    const getCardStyle = (index) => {
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

        const positions = [
            { x: "-120px", y: "-80px", scale: 0.7, rotate: -8, zIndex: 30 },
            { x: "100px", y: "-100px", scale: 0.65, rotate: 5, zIndex: 25 },
            { x: "-150px", y: "80px", scale: 0.6, rotate: -5, zIndex: 20 },
            { x: "120px", y: "100px", scale: 0.55, rotate: 8, zIndex: 15 },
            { x: "-80px", y: "120px", scale: 0.5, rotate: -3, zIndex: 10 },
        ];

        const relativeIndex =
            (index - activeService + services.length) % services.length;

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
                py: 8,
                backgroundImage:
                    "url('/Images/Wave.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                // backgroundAttachment: "fixed",
                // boxShadow: `inset 0 0 0 1000px rgba(0, 0, 0, 0.9)`,
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ maxWidth: "1400px", mx: "auto", px: 3 }}>

                    {/* HEADER */}
                    <Grid container alignItems="center" justifyContent="space-between" mb={6}>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Typography
                                variant="h3"
                                fontWeight={700}
                                mb={1}
                                color={colors.text.primary}
                            >
                                Unlock Infinite Possibilities with AI Precision
                            </Typography>
                            <Typography variant="body1" color={colors.text.primary}>
                                Have the world at your fingertips with BMG AI Service
                            </Typography>
                        </Grid>

                        {/* GET STARTED BUTTON */}
                        <Grid size={{ xs: 12, md: 4 }} mt={{ xs: 3, md: 0 }}>
                            <Button
                                variant="outlined"
                                sx={{
                                    px: 3,
                                    py: 1.2,
                                    fontWeight: 600,
                                    borderWidth: 2,
                                    borderRadius: 2,
                                    borderColor: colors.primary.main,
                                    color: colors.primary.main,
                                    "&:hover": {
                                        backgroundColor: colors.primary.main,
                                        color: colors.primary.contrastText,
                                    },
                                }}
                            >
                                Get Started Now
                            </Button>
                        </Grid>
                    </Grid>

                    {/* BODY CONTENT */}
                    <Grid container spacing={6}>

                        {/* LEFT CATEGORY BUTTONS */}
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Stack spacing={2}>
                                {services.map((service, index) => (
                                    <Button
                                        key={service.id}
                                        fullWidth
                                        startIcon={service.icon}
                                        onClick={() => setActiveService(index)}
                                        sx={{
                                            textTransform: "none",
                                            px: 3,
                                            py: 2,
                                            borderRadius: 3,
                                            fontWeight: 600,
                                            boxShadow: 2,
                                            bgcolor:
                                                activeService === index
                                                    ? colors.primary.main
                                                    : colors.background.paper,
                                            color:
                                                activeService === index
                                                    ? colors.primary.contrastText
                                                    : colors.primary.main,
                                            "&:hover": { boxShadow: 4 },
                                        }}
                                    >
                                        {service.name}
                                    </Button>
                                ))}
                            </Stack>
                        </Grid>

                        {/* RIGHT CARD STACK */}
                        <Grid size={{ xs: 12, md: 9 }}>
                            <Box
                                sx={{
                                    position: "relative",
                                    height: { xs: "450px", md: "600px" },
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
                                                transition: "0.7s ease",
                                                width: {
                                                    xs: "85%",
                                                    md:
                                                        index === activeService
                                                            ? "600px"
                                                            : "520px",
                                                },
                                                height: {
                                                    xs: "65%",
                                                    md:
                                                        index === activeService
                                                            ? "400px"
                                                            : "320px",
                                                },
                                                overflow: "hidden",
                                                borderRadius: 4,
                                                backgroundColor: colors.background.paper,
                                                ...style,
                                            }}
                                        >
                                            {/* TOP BAR (WINDOW DOTS) */}
                                            <Box sx={{ p: 2, display: "flex", gap: 1 }}>
                                                <Box
                                                    sx={{
                                                        width: 14,
                                                        height: 14,
                                                        borderRadius: "50%",
                                                        bgcolor: colors.error.main,
                                                    }}
                                                />
                                                <Box
                                                    sx={{
                                                        width: 14,
                                                        height: 14,
                                                        borderRadius: "50%",
                                                        bgcolor: colors.warning.main,
                                                    }}
                                                />
                                                <Box
                                                    sx={{
                                                        width: 14,
                                                        height: 14,
                                                        borderRadius: "50%",
                                                        bgcolor: colors.success.main,
                                                    }}
                                                />
                                            </Box>

                                            {/* IMAGE */}
                                            <Box
                                                sx={{
                                                    position: "relative",
                                                    width: "100%",
                                                    height: "100%",
                                                    mt: -3,
                                                }}
                                            >
                                                <img
                                                    src={service.image}
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
                                                            p: 3,
                                                            background:
                                                                "linear-gradient(to top, rgba(0,0,0,.8), transparent)",
                                                        }}
                                                    >
                                                        <Stack
                                                            direction="row"
                                                            spacing={2}
                                                            alignItems="center"
                                                        >
                                                            <Box
                                                                sx={{
                                                                    width: 60,
                                                                    height: 60,
                                                                    bgcolor:
                                                                        "rgba(255,255,255,0.25)",
                                                                    backdropFilter: "blur(6px)",
                                                                    borderRadius: 3,
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                }}
                                                            >
                                                                {service.icon}
                                                            </Box>

                                                            <Box>
                                                                <Typography variant="h6" color="white">
                                                                    {service.name}
                                                                </Typography>
                                                                <Typography variant="body2" color="white">
                                                                    Transform your ideas into reality
                                                                </Typography>
                                                            </Box>
                                                        </Stack>
                                                    </Box>
                                                )}

                                                {/* PLAY BUTTON (ONLY FOR VIDEO ITEMS) */}
                                                {(index === 0 || index === 2) &&
                                                    index === activeService && (
                                                        <IconButton
                                                            sx={{
                                                                position: "absolute",
                                                                top: "50%",
                                                                left: "50%",
                                                                transform:
                                                                    "translate(-50%, -50%)",
                                                                width: 80,
                                                                height: 80,
                                                                bgcolor:
                                                                    colors.background.paper,
                                                                color: colors.text.primary,
                                                                borderRadius: "50%",
                                                                boxShadow: 6,
                                                            }}
                                                        >
                                                            <Play24Filled />
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
