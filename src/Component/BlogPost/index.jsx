import React from "react";
import {
    ArrowRight24Regular,
    ArrowTrending20Regular,
    ArrowTrending24Regular,
    CalendarLtr24Regular,
    Clock24Regular,
} from "@fluentui/react-icons";

import {
    Box,
    Typography,
    Button,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActionArea,
    Avatar,
    Stack,
    Container,
} from "@mui/material";

import { lightModeColors, darkModeColors } from "../../Config/color";
import { useNavigate } from "react-router-dom";

export default function BlogSection({ mode = "light" }) {
    const colors = mode === "dark" ? darkModeColors : lightModeColors;
    const navigate = useNavigate();

    const blogPosts = [
        {
            id: 1,
            title: "Brochure Design",
            description: "Nunc gravida semper tellus neque scelerisque eget tincidunt in.",
            image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop",
            category: "Design",
            readTime: "5 min read",
            date: "Nov 28, 2024",
            gradient: `linear-gradient(to right, ${colors.primary.main}, ${colors.secondary.main})`,
            trending: true,
        },
        {
            id: 2,
            title: "3D Design",
            description: "Phasellus venenatis massa bibendum posuere dictum tristique.",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
            category: "Creative",
            readTime: "7 min read",
            date: "Nov 25, 2024",
            gradient: `linear-gradient(to right, ${colors.secondary.main}, ${colors.accent.red})`,
            trending: false,
        },
        {
            id: 3,
            title: "Modelling",
            description: "Leo mollis fermentum praesent in condimentum id velit purus in.",
            image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&h=600&fit=crop",
            category: "3D Art",
            readTime: "6 min read",
            date: "Nov 22, 2024",
            gradient: `linear-gradient(to right, ${colors.warning.main}, ${colors.error.main})`,
            trending: true,
        },
        {
            id: 4,
            title: "Digital Marketing",
            description: "In sed bibendum metus pretium cursus tellus pharetra.",
            image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
            category: "Marketing",
            readTime: "8 min read",
            date: "Nov 20, 2024",
            gradient: `linear-gradient(to right, ${colors.info.main}, ${colors.primary.main})`,
            trending: false,
        },
    ];

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: `linear-gradient(to bottom right, ${colors.background.default}, ${colors.accent.lightBlue}, ${colors.background.paper})`,
                py: 10,
                px: 3,
            }}
        >
            <Container maxWidth="lg">
                <Box maxWidth="lg" mx="auto">

                    {/* Header */}
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                        <Box flex={1}>
                            <Typography variant="h3" fontWeight="bold" mb={1} color={colors.text.heading}>
                                Blog
                            </Typography>
                            <Typography variant="body1" color={colors.text.secondary} maxWidth="600px">
                                Bite-sized digital marketing services to sell more, acquire customers and grow your business.
                            </Typography>
                        </Box>

                        <Button
                            onClick={() => navigate('/blog')}
                            variant="contained"
                            endIcon={<ArrowRight24Regular />}
                            sx={{
                                backgroundColor: colors.warning.light,
                                color: colors.primary.contrastText,
                                borderRadius:2,
                                textTransform: "none",
                                px: 1.8,
                                py: 1.2,                                
                                boxShadow: 3,
                                border: `1px solid ${colors.divider}`,
                                "&:hover": {
                                    backgroundColor: colors.warning.main,
                                    boxShadow: 6,
                                    transform: "translateY(-3px)",
                                },
                                transition: "0.3s",
                            }}
                        >
                            More Articles
                        </Button>
                    </Box>

                    <Grid container spacing={2} mt={5}>
                        {blogPosts.map((post) => (
                            <Grid size={{ xs: 12, md: 6, lg: 3 }} key={post.id}>
                                <Card
                                    sx={{
                                        borderRadius: 4,
                                        overflow: "hidden",
                                        backgroundColor: colors.background.paper,
                                        boxShadow: 4,
                                        cursor: "pointer",
                                        position: "relative",
                                        transition: "0.4s",
                                        "&:hover": {
                                            boxShadow: 10,
                                            transform: "translateY(-6px)",
                                        },
                                    }}
                                >
                                    <CardActionArea>

                                        {/* Image */}
                                        <Box sx={{ position: "relative", height: 200 }}>
                                            <CardMedia
                                                component="img"
                                                src={post.image}
                                                alt={post.title}
                                                sx={{
                                                    height: "100%",
                                                    width: "100%",
                                                    transition: "0.6s",
                                                    "&:hover": { transform: "scale(1.1)" },
                                                }}
                                            />

                                            {/* Overlay */}
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    inset: 0,
                                                    background: post.gradient,
                                                    opacity: 0,
                                                    transition: "0.4s",
                                                    "&:hover": { opacity: 0.28 },
                                                }}
                                            />

                                            {/* Category */}
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    top: 12,
                                                    left: 12,
                                                    bgcolor: colors.background.paper,
                                                    px: 1.6,
                                                    py: 0.6,
                                                    borderRadius: "20px",
                                                    fontSize: "0.7rem",
                                                    fontWeight: "bold",
                                                    boxShadow: 3,
                                                    color: colors.text.primary,
                                                }}
                                            >
                                                {post.category}
                                            </Box>

                                            {/* Trending */}
                                            {post.trending && (
                                                <Box
                                                    sx={{
                                                        position: "absolute",
                                                        top: 12,
                                                        right: 12,
                                                        bgcolor: colors.warning.main,
                                                        px: 0.7,
                                                        py:0.4,
                                                        borderRadius: "50%",
                                                        boxShadow: 4,
                                                        animation: "pulse 1.5s infinite",
                                                        "@keyframes pulse": {
                                                            "0%": { transform: "scale(1)" },
                                                            "50%": { transform: "scale(1.15)" },
                                                            "100%": { transform: "scale(1)" },
                                                        },
                                                    }}
                                                >
                                                    <ArrowTrending20Regular style={{ color: colors.secondary.contrastText, fontSize: 18 }} />
                                                </Box>
                                            )}
                                        </Box>

                                        <CardContent>
                                            <Stack direction="row" spacing={2} mb={1}>

                                                <Stack direction="row" spacing={0.5} alignItems="center" sx={{ fontSize: 12, color: colors.text.secondary }}>
                                                    <CalendarLtr24Regular style={{ fontSize: 14 }} />
                                                    <span>{post.date}</span>
                                                </Stack>

                                                <Stack direction="row" spacing={0.5} alignItems="center" sx={{ fontSize: 12, color: colors.text.secondary }}>
                                                    <Clock24Regular style={{ fontSize: 14 }} />
                                                    <span>{post.readTime}</span>
                                                </Stack>
                                            </Stack>

                                            <Typography
                                                variant="h6"
                                                fontWeight="bold"
                                                sx={{
                                                    mb: 1,
                                                    color: colors.text.heading,
                                                    transition: "color 0.3s",
                                                    "&:hover": { color: colors.primary.main },
                                                }}
                                            >
                                                {post.title}
                                            </Typography>

                                            <Typography variant="body2" color={colors.text.secondary} sx={{ mb: 2 }}>
                                                {post.description}
                                            </Typography>

                                            <Button
                                                size="small"
                                                sx={{
                                                    color: colors.primary.main,
                                                    fontWeight: "bold",
                                                    textTransform: "none",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1,
                                                    "&:hover": { gap: 2 },
                                                    transition: "0.3s",
                                                }}
                                            >
                                                Read article <ArrowRight24Regular />
                                            </Button>
                                        </CardContent>
                                    </CardActionArea>

                                    <Box
                                        sx={{
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            height: 3,
                                            width: 0,
                                            background: post.gradient,
                                            transition: "0.4s",
                                            ".MuiCard-root:hover &": { width: "100%" },
                                        }}
                                    />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Box mt={10} textAlign="center">
                        <Box
                            sx={{
                                display: {xs: 'block', md:"inline-flex"},
                                alignItems: "center",
                                gap: 3,
                                bgcolor: colors.background.paper,
                                px: 5,
                                py: 3,
                                borderRadius: 4,
                                boxShadow: 5,
                            }}
                        >
                            <Stack direction="row" spacing={-1.5}>
                                {[1, 2, 3].map((i) => (
                                    <Avatar
                                        key={i}
                                        sx={{
                                            width: 38,
                                            height: 38,
                                            background: colors.primary.main,
                                            border: `2px solid ${colors.background.paper}`,
                                        }}
                                    />
                                ))}
                            </Stack>

                            <Box textAlign="left">
                                <Typography fontWeight="bold" fontSize={14} color={colors.text.heading}>
                                    Join 10,000+ readers
                                </Typography>
                                <Typography fontSize={12} color={colors.text.secondary}>
                                    Get weekly insights delivered
                                </Typography>
                            </Box>

                            <Button
                                variant="contained"
                                sx={{
                                    background:colors.primary.main,
                                    textTransform: "none",
                                    px: 4,
                                    py: 1,
                                    mt: { xs: 2, md: 0 },
                                    borderRadius: 2,
                                    fontWeight: "bold",
                                    color: colors.primary.contrastText,
                                    "&:hover": {
                                        background: colors.primary.bg,
                                    },
                                }}
                            >
                                Subscribe
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
