import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
    Chip,
    Avatar,
    IconButton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    Sparkle24Regular,
    Video24Regular,
    Image24Regular,
    Mic24Regular,
    DocumentText24Regular,
    ChartMultiple24Regular,
    ChevronLeft24Regular,
    ChevronRight24Regular,
} from '@fluentui/react-icons';
import { ConsultantForm, FAQSection, FeatureSection, PricingSection, TestimonialsSection } from '../../../Component';

const AISuitesPage = () => {
    const theme = useTheme();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const stats = [
        { value: '2.5M', label: 'Active Users', icon: '👥' },
        { value: '1M', label: 'Videos Generated', icon: '🎬' },
        { value: '2000+', label: 'Images Created', icon: '🖼️' },
        { value: '500K', label: 'Audio Files', icon: '🎵' },
    ];

    const aiTools = [
        {
            icon: <Mic24Regular />,
            title: 'AI Speech Generator',
            description: 'Harness machine learning for predictive analytics and automation. Transform data into actionable intelligence.',
            badge: '30+ tool',
            color: theme.palette.primary.main,
        },
        {
            icon: <Video24Regular />,
            title: 'AI Video Editor',
            description: 'Harness machine learning for predictive analytics and automation. Transform data into actionable intelligence.',
            badge: '30+ tool',
            color: theme.palette.primary.main,
        },
        {
            icon: <Image24Regular />,
            title: 'AI Image Generator',
            description: 'Harness machine learning for predictive analytics and automation. Transform data into actionable intelligence.',
            badge: '30+ tool',
            color: theme.palette.primary.main,
        },
        {
            icon: <Video24Regular />,
            title: 'AI Video Generator',
            description: 'Harness machine learning for predictive analytics and automation. Transform data into actionable intelligence.',
            badge: '30+ tool',
            color: theme.palette.primary.main,
        },
        {
            icon: <ChartMultiple24Regular />,
            title: 'AI Business Strategy Generator',
            description: 'Harness machine learning for predictive analytics and automation. Transform data into actionable intelligence.',
            badge: '30+ tool',
            color: theme.palette.primary.main,
        },
        {
            icon: <DocumentText24Regular />,
            title: 'AI Content Writer',
            description: 'Harness machine learning for predictive analytics and automation. Transform data into actionable intelligence.',
            badge: '30+ tool',
            color: theme.palette.primary.main,
        },
        {
            icon: <Sparkle24Regular />,
            title: 'AI Design Assistant',
            description: 'Harness machine learning for predictive analytics and automation. Transform data into actionable intelligence.',
            badge: '30+ tool',
            color: theme.palette.primary.main,
        },
        {
            icon: <Mic24Regular />,
            title: 'AI Voice Cloner',
            description: 'Harness machine learning for predictive analytics and automation. Transform data into actionable intelligence.',
            badge: '30+ tool',
            color: theme.palette.primary.main,
        },
    ];

    const totalPages = Math.ceil(aiTools.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedTools = aiTools.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.lightBg} 100%)`,
                    py: { xs: 8, md: 12 },
                    borderBottom: `1px solid ${theme.palette.divider}`,
                }}
            >
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                        <Typography
                            variant="h1"
                            sx={{
                                fontWeight: 900,
                                fontSize: { xs: '1.5rem', md: '2.5rem' },
                                color: theme.palette.text.heading,
                                mb: 2,
                                lineHeight: 1.1,
                            }}
                        >
                            Dream in Pixels, Speak in Waves
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: theme.palette.text.secondary,
                                mb: 4,
                                fontWeight: 500,
                            }}
                        >
                            AI-Powered: Videos That Captivate, Voices That Inspire.
                        </Typography>

                        <Box
                            sx={{
                                maxWidth: 900,
                                mx: 'auto',
                                mt: 6,
                                borderRadius: 4,
                                overflow: 'hidden',
                                boxShadow: `0 24px 80px ${theme.palette.primary.main}30`,
                                border: `1px solid ${theme.palette.divider}`,
                                transform: 'perspective(1000px) rotateX(5deg)',
                                transition: 'transform 0.5s ease',
                                '&:hover': {
                                    transform: 'perspective(1000px) rotateX(0deg)',
                                },
                            }}
                        >
                            <Box
                                component="img"
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop"
                                alt="Dashboard"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                }}
                            />
                        </Box>

                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: { xs: 150, md: 250 },
                                height: { xs: 150, md: 350 },
                                backgroundImage: 'url(https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=300&h=300&fit=crop)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                opacity: 0.3,
                                pointerEvents: 'none',
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                width: { xs: 150, md: 250 },
                                height: { xs: 150, md: 350 },
                                backgroundImage: 'url(https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=300&h=300&fit=crop)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                opacity: 0.3,
                                transform: 'scaleX(-1)',
                                pointerEvents: 'none',
                            }}
                        />
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 800,
                            fontSize: { xs: '2rem', md: '2rem' },
                            color: theme.palette.text.heading,
                            mb: 2,
                        }}
                    >
                        AI Creative Suites
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: theme.palette.text.secondary,
                            mb: 4,
                            maxWidth: 600,
                            mx: 'auto',
                        }}
                    >
                        Generate visuals and business strategies that convert.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            bgcolor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            px: 3,
                            py: 1.1,
                            fontSize: '1.125rem',
                            fontWeight: 700,
                            borderRadius: 2,
                            textTransform: 'none',
                            boxShadow: `0 8px 24px ${theme.palette.primary.main}40`,
                            '&:hover': {
                                bgcolor: theme.palette.primary.dark,
                                boxShadow: `0 12px 32px ${theme.palette.primary.main}60`,
                                transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Get Started Now
                    </Button>
                </Box>

                <Grid container spacing={3} sx={{ mb: 6 }}>
                    {displayedTools.map((tool, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                            <Card
                                sx={{
                                    height: '100%',
                                    borderRadius: 4,
                                    overflow: 'hidden',
                                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                                    border: 'none',
                                    position: 'relative',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&:hover': {
                                        transform: 'translateY(-12px)',
                                        boxShadow: `0 20px 60px ${theme.palette.primary.main}50`,
                                    },
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
                                        pointerEvents: 'none',
                                    },
                                }}
                            >
                                <CardContent sx={{ p: 4, position: 'relative' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                                        <Box
                                            sx={{
                                                width: 64,
                                                height: 64,
                                                borderRadius: 3,
                                                bgcolor: 'rgba(255, 255, 255, 0.2)',
                                                backdropFilter: 'blur(10px)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#fff',
                                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                            }}
                                        >
                                            {tool.icon}
                                        </Box>
                                        <Chip
                                            label={tool.badge}
                                            size="small"
                                            sx={{
                                                bgcolor: 'rgba(255, 255, 255, 0.95)',
                                                color: theme.palette.primary.main,
                                                fontWeight: 700,
                                                fontSize: '0.75rem',
                                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                            }}
                                        />
                                    </Box>

                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 800,
                                            color: '#fff',
                                            mb: 2,
                                            lineHeight: 1.3,
                                        }}
                                    >
                                        {tool.title}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.85)',
                                            mb: 3,
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        {tool.description}
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        fullWidth
                                        sx={{
                                            bgcolor: 'rgba(255, 255, 255, 0.95)',
                                            color: theme.palette.primary.main,
                                            py: 1.25,
                                            fontWeight: 700,
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            '&:hover': {
                                                bgcolor: '#fff',
                                                transform: 'scale(1.02)',
                                            },
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        Dive In
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 6 }}>
                    <IconButton
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        sx={{
                            bgcolor: theme.palette.background.paper,
                            border: `1px solid ${theme.palette.divider}`,
                            '&:hover': {
                                bgcolor: theme.palette.primary.lightBg,
                                borderColor: theme.palette.primary.main,
                            },
                            '&:disabled': {
                                opacity: 0.5,
                            },
                        }}
                    >
                        <ChevronLeft24Regular />
                    </IconButton>

                    {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        return (
                            <Button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                variant={currentPage === pageNumber ? 'contained' : 'outlined'}
                                sx={{
                                    minWidth: 44,
                                    height: 44,
                                    borderRadius: 2,
                                    fontWeight: 700,
                                    ...(currentPage === pageNumber
                                        ? {
                                            bgcolor: theme.palette.primary.main,
                                            color: theme.palette.primary.contrastText,
                                            '&:hover': {
                                                bgcolor: theme.palette.primary.dark,
                                            },
                                        }
                                        : {
                                            borderColor: theme.palette.divider,
                                            color: theme.palette.text.primary,
                                            '&:hover': {
                                                borderColor: theme.palette.primary.main,
                                                bgcolor: theme.palette.primary.lightBg,
                                            },
                                        }),
                                }}
                            >
                                {pageNumber}
                            </Button>
                        );
                    })}

                    <IconButton
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        sx={{
                            bgcolor: theme.palette.background.paper,
                            border: `1px solid ${theme.palette.divider}`,
                            '&:hover': {
                                bgcolor: theme.palette.primary.lightBg,
                                borderColor: theme.palette.primary.main,
                            },
                            '&:disabled': {
                                opacity: 0.5,
                            },
                        }}
                    >
                        <ChevronRight24Regular />
                    </IconButton>
                </Box>
            </Container>

            <Box
                sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                    py: 4,
                    borderTop: `1px solid ${theme.palette.divider}`,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        {stats.map((stat, index) => (
                            <Grid size={{ xs: 6, md: 3 }} key={index}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            fontWeight: 900,
                                            color: '#fff',
                                            mb: 0.5,
                                        }}
                                    >
                                        {stat.value}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.85)',
                                            fontWeight: 600,
                                        }}
                                    >
                                        {stat.label}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            <Box
                sx={{
                    width: '100%',
                    backgroundImage: `url('/Images/cat_8.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                    position: 'relative',
                    py: { xs: 10, md: 14 },

                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        bgcolor: 'rgba(0,0,0,0.8)',
                        zIndex: 0,
                    },
                }}
            >
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 800,
                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                                color: theme.palette.primary.contrastText,
                                mb: 3,
                            }}
                        >
                            One AI brain
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: theme.palette.primary.contrastText,
                                    display: 'inline',
                                    fontWeight: 600,
                                }}
                            >
                                Endless breakthroughs{' '}
                            </Typography>
                            <Chip
                                label="Optimize, Iterate, Dominate"
                                sx={{
                                    bgcolor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                    fontWeight: 700,
                                    fontSize: '0.875rem',
                                    height: 32,
                                }}
                            />
                        </Box>

                        <Typography
                            variant="body1"
                            sx={{
                                color: theme.palette.primary.contrastText,
                                mb: 5,
                                maxWidth: 600,
                                mx: 'auto',
                            }}
                        >
                            Craft pro-level images, videos, and business blueprints—instantly.
                        </Typography>

                        <Box
                            sx={{
                                position: 'relative',
                                height: 400,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 4,
                            }}
                        >
                            {[
                                { icon: <Image24Regular />, color: theme.palette.primary.dark, position: { top: '20%', left: '10%' }, delay: 0 },
                                { icon: <DocumentText24Regular />, color: theme.palette.warning.main, position: { top: '10%', left: '35%' }, delay: 0.5 },
                                { icon: <Video24Regular />, color: '#000', position: { top: '25%', right: '20%' }, delay: 1 },
                                { icon: <Sparkle24Regular />, color: theme.palette.warning.main, position: { top: '15%', right: '5%' }, delay: 1.5 },
                                { icon: <Mic24Regular />, color: theme.palette.primary.main, position: { bottom: '20%', right: '15%' }, delay: 2 },
                            ].map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        position: 'absolute',
                                        ...item.position,
                                        width: { xs: 80, md: 120 },
                                        height: { xs: 80, md: 120 },
                                        borderRadius: 4,
                                        bgcolor: item.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        fontSize: { xs: 32, md: 48 },
                                        transform: 'rotate(15deg)',
                                        boxShadow: `0 12px 40px ${item.color}40`,
                                        animation: `float 3s ease-in-out infinite ${item.delay}s`,
                                        '@keyframes float': {
                                            '0%, 100%': { transform: 'rotate(15deg) translateY(0)' },
                                            '50%': { transform: 'rotate(15deg) translateY(-20px)' },
                                        },
                                    }}
                                >
                                    {item.icon}
                                </Box>
                            ))}
                        </Box>

                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                bgcolor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                px: 5,
                                py: 1.8,
                                fontSize: '1.125rem',
                                fontWeight: 700,
                                borderRadius: 3,
                                textTransform: 'none',
                                boxShadow: `0 8px 24px ${theme.palette.primary.main}40`,
                                '&:hover': {
                                    bgcolor: theme.palette.primary.dark,
                                    boxShadow: `0 12px 32px ${theme.palette.primary.main}60`,
                                    transform: 'translateY(-2px)',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Start Now for Free
                        </Button>
                    </Box>
                </Container>
            </Box>
            <TestimonialsSection />
            <FeatureSection />
            <PricingSection />
            <ConsultantForm />
            <FAQSection />
        </Box>
    );
};

export default AISuitesPage;