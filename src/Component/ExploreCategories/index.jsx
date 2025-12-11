import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    Grid,
    Pagination,
    useTheme,
    useMediaQuery
} from '@mui/material';

import {
    ChevronRight20Regular,
    BrainCircuit24Regular,
    DesignIdeas24Regular,
    VideoClip24Regular,
    Code24Regular,
    Megaphone24Regular,
    DocumentText24Regular,
    GlobeVideo28Regular,
    Speaker224Regular
} from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';

const services = [
    {
        id: 1,
        title: "MARTECH SETUP",
        description: "Marketing technology solutions",
        icon: BrainCircuit24Regular,
        image: "/Images/cat_1.png"
    },
    {
        id: 2,
        title: "GRAPHIC DESIGN",
        description: "Creative visual solutions",
        icon: DesignIdeas24Regular,
        image: "/Images/cat_2.jpg"
    },
    {
        id: 3,
        title: "ANIMATION",
        description: "Motion graphics & an5imation",
        icon: VideoClip24Regular,
        image: "/Images/cat_3.jpg"
    },
    {
        id: 4,
        title: "PROGRAMMING",
        description: "Software development",
        icon: Code24Regular,
        image: "/Images/cat_4.png"
    },
    {
        id: 5,
        title: "DIGITAL MARKETING",
        description: "Online marketing strategies",
        icon: Megaphone24Regular,
        image: "/Images/cat_5.png"
    },
    {
        id: 6,
        title: "CONTENT DEVELOPMENT",
        description: "Content creation & strategy",
        icon: DocumentText24Regular,
        image: "/Images/cat_6.png"
    },
    {
        id: 7,
        title: "VIDEO PRODUCTION",
        description: "Professional video services",
        icon: GlobeVideo28Regular,
        image: "/Images/cat_7.png"
    },
    {
        id: 8,
        title: "PAID ADS",
        description: "Advertising campaigns",
        icon: Speaker224Regular,
        image: "/Images/cat_8.png"
    }
];

export default function ServiceCategoryExplorer() {
    const [page, setPage] = useState(1);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const itemsPerPage = 8;
    const totalPages = Math.ceil(services.length / itemsPerPage);
    const displayed = services.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                py: 6,
                background: theme.palette.background.default
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ mb: 6, textAlign: "center" }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            mb: 2,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Explore Category
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            color: theme.palette.text.secondary,
                            fontWeight: 500
                        }}
                    >
                        Popular services people are buying right now!
                    </Typography>
                </Box>

                {/* GRID */}
                <Grid container spacing={3}>
                    {displayed.map((service) => {
                        const Icon = service.icon;
                        return (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={service.id}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        borderRadius: 3,
                                        display: "flex",
                                        flexDirection: "column",
                                        backgroundColor: theme.palette.background.paper,
                                        transition: "all 0.3s ease",
                                        boxShadow: theme.shadows[3],
                                        "&:hover": {
                                            transform: "translateY(-6px)",
                                            boxShadow: theme.shadows[10]
                                        }
                                    }}
                                >
                                    {/* IMAGE HEADER */}
                                    <Box
                                        sx={{
                                            position: "relative",
                                            height: 180,
                                            backgroundImage: `url(${service.image})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            borderTopLeftRadius: 12,
                                            borderTopRightRadius: 12
                                        }}
                                    >
                                        {/* ICON */}
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: 16,
                                                right: 16,
                                                width: 48,
                                                height: 48,
                                                borderRadius: "50%",
                                                backgroundColor: theme.palette.background.paper,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                boxShadow: theme.shadows[4]
                                            }}
                                        >
                                            <Icon style={{ fontSize: 24, color: theme.palette.primary.main }} />
                                        </Box>
                                    </Box>

                                    {/* CONTENT */}
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 700,
                                                mb: 1,
                                                color: theme.palette.text.primary
                                            }}
                                        >
                                            {service.title}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: theme.palette.text.secondary,
                                                mb: 2
                                            }}
                                        >
                                            {service.description}
                                        </Typography>

                                        <Button
                                            variant="contained"
                                            fullWidth
                                            onClick={() => navigate('/service')}
                                            endIcon={<ChevronRight20Regular />}
                                            sx={{
                                                py: 1.4,
                                                fontWeight: 600,
                                                textTransform: "none",
                                                borderRadius: 2,
                                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                                "&:hover": {
                                                    background: `linear-gradient(135deg, ${theme.palette.primary.bg}, ${theme.palette.primary.main})`
                                                }
                                            }}
                                        >
                                            Explore Service
                                        </Button>
                                    </CardContent>

                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>

                {/* PAGINATION */}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(e, val) => setPage(val)}
                        size={isMobile ? "medium" : "large"}
                        sx={{
                            "& .MuiPaginationItem-root": {
                                fontWeight: 600,
                                "&.Mui-selected": {
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                    color: theme.palette.primary.contrastText
                                }
                            }
                        }}
                    />
                </Box>

            </Container>
        </Box>
    );
}
