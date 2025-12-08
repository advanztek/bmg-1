import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    CardMedia,
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

const services = [
    {
        id: 1,
        title: 'MARTECH SETUP',
        description: 'Marketing technology solutions',
        icon: BrainCircuit24Regular,
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        image: '/Images/Img_4.jpg'
    },
    {
        id: 2,
        title: 'GRAPHIC DESIGN',
        description: 'Creative visual solutions',
        icon: DesignIdeas24Regular,
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Cdefs%3E%3ClinearGradient id="g2" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23FF6B6B;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23FF8E53;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23g2)" width="300" height="200"/%3E%3Crect x="80" y="50" width="140" height="100" fill="white" opacity="0.9" rx="8"/%3E%3Ctext x="150" y="110" font-family="Arial" font-size="18" fill="%23FF6B6B" text-anchor="middle" font-weight="bold"%3EDESIGN%3C/text%3E%3C/svg%3E'
    },
    {
        id: 3,
        title: 'ANIMATION',
        description: 'Motion graphics & animation',
        icon: VideoClip24Regular,
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Cdefs%3E%3ClinearGradient id="g3" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23a855f7;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23ec4899;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23g3)" width="300" height="200"/%3E%3Cpolygon points="100,60 100,140 180,100" fill="white" opacity="0.9"/%3E%3C/svg%3E'
    },
    {
        id: 4,
        title: 'PROGRAMMING',
        description: 'Software development',
        icon: Code24Regular,
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Cdefs%3E%3ClinearGradient id="g4" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%233b82f6;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%2310b981;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23g4)" width="300" height="200"/%3E%3Crect x="50" y="40" width="80" height="50" fill="white" opacity="0.9" rx="4"/%3E%3Crect x="170" y="40" width="80" height="50" fill="white" opacity="0.9" rx="4"/%3E%3Crect x="50" y="110" width="80" height="50" fill="white" opacity="0.9" rx="4"/%3E%3Crect x="170" y="110" width="80" height="50" fill="white" opacity="0.9" rx="4"/%3E%3C/svg%3E'
    },
    {
        id: 5,
        title: 'DIGITAL MARKETING',
        description: 'Online marketing strategies',
        icon: Megaphone24Regular,
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Cdefs%3E%3ClinearGradient id="g5" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23f59e0b;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23ef4444;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23g5)" width="300" height="200"/%3E%3Ccircle cx="150" cy="100" r="50" fill="white" opacity="0.9"/%3E%3Ctext x="150" y="110" font-family="Arial" font-size="24" fill="%23f59e0b" text-anchor="middle" font-weight="bold"%3EAds%3C/text%3E%3C/svg%3E'
    },
    {
        id: 6,
        title: 'CONTENT DEVELOPMENT',
        description: 'Content creation & strategy',
        icon: DocumentText24Regular,
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Cdefs%3E%3ClinearGradient id="g6" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%238b5cf6;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%236366f1;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23g6)" width="300" height="200"/%3E%3Crect x="70" y="40" width="160" height="120" fill="white" opacity="0.9" rx="8"/%3E%3Ctext x="150" y="105" font-family="Arial" font-size="16" fill="%238b5cf6" text-anchor="middle" font-weight="bold"%3ECOPY%3C/text%3E%3Ctext x="150" y="125" font-family="Arial" font-size="16" fill="%238b5cf6" text-anchor="middle" font-weight="bold"%3EWRITING%3C/text%3E%3C/svg%3E'
    },
    {
        id: 7,
        title: 'VIDEO PRODUCTION',
        description: 'Professional video services',
        icon: GlobeVideo28Regular,
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Cdefs%3E%3ClinearGradient id="g7" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%2306b6d4;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%230284c7;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23g7)" width="300" height="200"/%3E%3Crect x="60" y="50" width="180" height="100" fill="white" opacity="0.9" rx="8"/%3E%3Cpolygon points="120,80 120,120 160,100" fill="%2306b6d4"/%3E%3C/svg%3E'
    },
    {
        id: 8,
        title: 'PAID ADS',
        description: 'Advertising campaigns',
        icon: Speaker224Regular,
        gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Cdefs%3E%3ClinearGradient id="g8" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%2314b8a6;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%2306b6d4;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23g8)" width="300" height="200"/%3E%3Ccircle cx="80" cy="100" r="35" fill="%23ef4444" opacity="0.9"/%3E%3Cpolygon points="150,70 180,100 150,130" fill="white" opacity="0.9"/%3E%3Crect x="190" y="85" width="40" height="30" fill="white" opacity="0.9" rx="4"/%3E%3C/svg%3E'
    }
];

export default function ServiceCategoryExplorer() {
    const [page, setPage] = useState(1);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const itemsPerPage = 8;
    const totalPages = Math.ceil(services.length / itemsPerPage);

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const displayedServices = services.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            py: 6
        }}>
            <Container maxWidth="lg">
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            mb: 2,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontSize: { xs: '2rem', md: '3rem' }
                        }}
                    >
                        Explore Category
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#64748b',
                            fontWeight: 500,
                            fontSize: { xs: '1rem', md: '1.25rem' }
                        }}
                    >
                        Popular services people are buying right now!
                    </Typography>
                </Box>

                <Grid container spacing={3} sx={{ mb: 6 }}>
                    {displayedServices.map((service) => {
                        const IconComponent = service.icon;
                        return (
                            <Grid size={{ xs:12, sm:6, md:3 }} key={service.id}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease-in-out',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                                        }
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            paddingTop: '66.67%',
                                            background: service.gradient,
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={service.image}
                                            alt={service.title}
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 16,
                                                right: 16,
                                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                                borderRadius: '50%',
                                                width: 48,
                                                height: 48,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                            }}
                                        >
                                            <IconComponent style={{ fontSize: 24, color: '#667eea' }} />
                                        </Box>
                                    </Box>

                                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 700,
                                                mb: 1,
                                                fontSize: '0.9rem',
                                                letterSpacing: '0.5px',
                                                color: '#1e293b'
                                            }}
                                        >
                                            {service.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: '#64748b',
                                                fontSize: '0.85rem',
                                                mb: 2
                                            }}
                                        >
                                            {service.description}
                                        </Typography>

                                        <Button
                                            fullWidth
                                            variant="contained"
                                            endIcon={<ChevronRight20Regular />}
                                            sx={{
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                color: 'white',
                                                textTransform: 'none',
                                                fontWeight: 600,
                                                py: 1.5,
                                                borderRadius: 2,
                                                fontSize: '0.9rem',
                                                boxShadow: '0 4px 14px rgba(102, 126, 234, 0.4)',
                                                '&:hover': {
                                                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                                                    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.5)',
                                                    transform: 'scale(1.02)'
                                                },
                                                transition: 'all 0.3s ease'
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

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        size={isMobile ? 'medium' : 'large'}
                        sx={{
                            '& .MuiPaginationItem-root': {
                                fontWeight: 600,
                                fontSize: '1rem',
                                '&.Mui-selected': {
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                                    }
                                }
                            }
                        }}
                    />
                </Box>
            </Container>
        </Box>
    );
}