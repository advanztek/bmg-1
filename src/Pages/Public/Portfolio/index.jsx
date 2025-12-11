import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Grid,
    Chip,
    Button,
    Tabs,
    Tab,
    IconButton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    Eye24Regular,
    ArrowRight24Regular,
    Filter24Regular,
    Globe24Regular,
} from '@fluentui/react-icons';

const PortfolioPage = () => {
    const theme = useTheme();
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = ['All', 'E-commerce', 'Corporate', 'Portfolio', 'Blog', 'Landing Page'];

    const projects = [
        {
            id: 1,
            title: 'Modern E-commerce Store',
            category: 'E-commerce',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
            description: 'Full-featured online store with AI-powered product recommendations',
            tags: ['E-commerce', 'AI', 'Responsive'],
            stats: { views: '2.5K', likes: '342' },
        },
        {
            id: 2,
            title: 'Tech Startup Landing',
            category: 'Landing Page',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
            description: 'Bold and dynamic landing page for SaaS platform',
            tags: ['SaaS', 'Modern', 'Animation'],
            stats: { views: '3.2K', likes: '456' },
        },
        {
            id: 3,
            title: 'Creative Portfolio',
            category: 'Portfolio',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
            description: 'Stunning portfolio showcase for a digital artist',
            tags: ['Creative', 'Visual', 'Interactive'],
            stats: { views: '1.8K', likes: '289' },
        },
        {
            id: 4,
            title: 'Corporate Website',
            category: 'Corporate',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
            description: 'Professional website for a Fortune 500 company',
            tags: ['Corporate', 'Enterprise', 'Professional'],
            stats: { views: '4.1K', likes: '523' },
        },
        {
            id: 5,
            title: 'Fashion Blog',
            category: 'Blog',
            image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop',
            description: 'Elegant blog platform for fashion influencers',
            tags: ['Blog', 'Fashion', 'Lifestyle'],
            stats: { views: '5.6K', likes: '678' },
        },
        {
            id: 6,
            title: 'Restaurant Website',
            category: 'Landing Page',
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
            description: 'Appetizing website with online ordering system',
            tags: ['Restaurant', 'Booking', 'Menu'],
            stats: { views: '2.9K', likes: '412' },
        },
        {
            id: 7,
            title: 'Fitness App Landing',
            category: 'Landing Page',
            image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
            description: 'Energetic landing page for fitness application',
            tags: ['Fitness', 'Mobile App', 'Health'],
            stats: { views: '3.7K', likes: '501' },
        },
        {
            id: 8,
            title: 'Real Estate Platform',
            category: 'E-commerce',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
            description: 'Comprehensive real estate listing platform',
            tags: ['Real Estate', 'Search', 'Maps'],
            stats: { views: '4.8K', likes: '602' },
        },
        {
            id: 9,
            title: 'Photography Portfolio',
            category: 'Portfolio',
            image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop',
            description: 'Minimalist portfolio for professional photographer',
            tags: ['Photography', 'Gallery', 'Minimalist'],
            stats: { views: '6.2K', likes: '789' },
        },
    ];

    const filteredProjects = selectedCategory === 'all' 
        ? projects 
        : projects.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

    return (
        <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', mt:2 }}>

            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                    py: { xs: 10, md:9 },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '-50%',
                        left: '-20%',
                        width: '800px',
                        height: '800px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '50%',
                        animation: 'float 20s ease-in-out infinite',
                    },
                    '@keyframes float': {
                        '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
                        '50%': { transform: 'translate(30px, 30px) scale(1.1)' },
                    },
                }}
            >
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Chip
                            label="OUR WORK"
                            sx={{
                                bgcolor: 'rgba(255, 255, 255, 0.2)',
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: '0.875rem',
                                mb: 3,
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                            }}
                        />
                        <Typography
                            variant="h1"
                            sx={{
                                fontWeight: 900,
                                fontSize: { xs: '2.5rem', md: '2.8rem' },
                                color: '#fff',
                                mb: 3,
                                lineHeight: 1.1,
                            }}
                        >
                            Our Portfolio
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                mb: 2,
                                maxWidth: 700,
                                mx: 'auto',
                                lineHeight: 1.6,
                            }}
                        >
                            Explore stunning websites created with BMG's AI-powered platform
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                maxWidth: 600,
                                mx: 'auto',
                            }}
                        >
                            From e-commerce to portfolios, see what's possible with our technology
                        </Typography>
                    </Box>
                </Container>
            </Box>

            {/* Filter Tabs */}
            <Container maxWidth="lg" sx={{ mt: -4, position: 'relative', zIndex: 2, mb: 8 }}>
                <Card
                    sx={{
                        p: 2,
                        borderRadius: 3,
                        bgcolor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    }}
                >
                    <Tabs
                        value={selectedCategory}
                        onChange={(e, newValue) => setSelectedCategory(newValue)}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            '& .MuiTab-root': {
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '1rem',
                                minHeight: 48,
                                px: 3,
                            },
                            '& .Mui-selected': {
                                color: theme.palette.primary.main,
                            },
                        }}
                    >
                        {categories.map((category) => (
                            <Tab
                                key={category}
                                label={category}
                                value={category.toLowerCase()}
                            />
                        ))}
                    </Tabs>
                </Card>
            </Container>

            {/* Projects Grid */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Grid container spacing={4}>
                    {filteredProjects.map((project) => (
                        <Grid size={{ xs:12, sm:6, md:4 }} key={project.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    bgcolor: theme.palette.background.paper,
                                    border: `1px solid ${theme.palette.divider}`,
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        transform: 'translateY(-12px)',
                                        boxShadow: `0 20px 60px ${theme.palette.primary.main}20`,
                                        '& .project-image': {
                                            transform: 'scale(1.1)',
                                        },
                                        '& .overlay': {
                                            opacity: 1,
                                        },
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'relative',
                                        overflow: 'hidden',
                                        height: 250,
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={project.image}
                                        alt={project.title}
                                        className="project-image"
                                        sx={{
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.6s ease',
                                        }}
                                    />
                                    <Box
                                        className="overlay"
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: `linear-gradient(to bottom, transparent 0%, ${theme.palette.primary.main}90 100%)`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            opacity: 0,
                                            transition: 'opacity 0.3s ease',
                                        }}
                                    >
                                        <IconButton
                                            sx={{
                                                bgcolor: '#fff',
                                                width: 64,
                                                height: 64,
                                                '&:hover': {
                                                    bgcolor: '#fff',
                                                    transform: 'scale(1.1)',
                                                },
                                            }}
                                        >
                                            <Eye24Regular style={{ fontSize: 28, color: theme.palette.primary.main }} />
                                        </IconButton>
                                    </Box>
                                    <Chip
                                        label={project.category}
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            top: 16,
                                            right: 16,
                                            bgcolor: theme.palette.primary.main,
                                            color: theme.palette.primary.contrastText,
                                            fontWeight: 700,
                                            backdropFilter: 'blur(10px)',
                                        }}
                                    />
                                </Box>
                                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            color: theme.palette.text.heading,
                                            mb: 1,
                                        }}
                                    >
                                        {project.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            mb: 2,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        {project.description}
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                        {project.tags.map((tag, idx) => (
                                            <Chip
                                                key={idx}
                                                label={tag}
                                                size="small"
                                                variant="outlined"
                                                sx={{
                                                    fontSize: '0.7rem',
                                                    borderColor: theme.palette.divider,
                                                }}
                                            />
                                        ))}
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                                                👁️ {project.stats.views}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                                                ❤️ {project.stats.likes}
                                            </Typography>
                                        </Box>
                                        <Button
                                            size="small"
                                            endIcon={<Globe24Regular />}
                                            sx={{
                                                color: theme.palette.primary.main,
                                                textTransform: 'none',
                                                fontWeight: 600,
                                            }}
                                        >
                                            View
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Box
                sx={{
                    bgcolor: theme.palette.background.paper,
                    py: 8,
                    borderTop: `1px solid ${theme.palette.divider}`,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={4} sx={{ textAlign: 'center' }}>
                        {[
                            { number: '500+', label: 'Projects Completed' },
                            { number: '50K+', label: 'Happy Clients' },
                            { number: '98%', label: 'Satisfaction Rate' },
                            { number: '24/7', label: 'Support Available' },
                        ].map((stat, index) => (
                            <Grid size={{ xs:6, md:3 }} key={index}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontWeight: 900,
                                        color: theme.palette.primary.main,
                                        mb: 1,
                                    }}
                                >
                                    {stat.number}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        fontWeight: 600,
                                    }}
                                >
                                    {stat.label}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default PortfolioPage;