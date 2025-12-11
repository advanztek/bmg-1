import React from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Card,
    CardMedia,
    CardContent,
    Chip,
    Grid,
    InputAdornment,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Search24Regular, ArrowRight24Regular, Mail24Regular, ArrowRight16Regular } from '@fluentui/react-icons';
import { bigStory, categoryPosts, latestPosts, popularGigs, trendingStories } from './data';
import { BMGPromoSection, CategoryTabs } from '../../../Component';

const BlogPage = () => {
    const theme = useTheme();

    return (
        <Box sx={{ background: theme.palette.primary.contrastText, minHeight: '100vh', mt: 8, }}>
            <CategoryTabs />
            <Box
                sx={{
                    background: theme.palette.primary.contrastText,
                    py: 8,
                }}
            >
                <Container maxWidth="sm">
                    <TextField
                        fullWidth
                        placeholder="Search for services"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment sx={{ pl: 2 }} position="start">
                                    <Search24Regular />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <Button
                                    variant="contained"
                                    sx={{
                                        px: 6,
                                        borderRadius: 2,
                                        py: 1.1,
                                        bgcolor: theme.palette.warning.main,
                                        '&:hover': { bgcolor: theme.palette.warning.dark },
                                        color: theme.palette.warning.contrastText,
                                    }}
                                >
                                    Search
                                </Button>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                bgcolor: theme.palette.background.paper,
                                borderRadius: 2,
                                border: `1px solid ${theme.palette.divider}`,
                                p: 0,
                                '& fieldset': { border: 'none' },
                            },
                        }}
                    />
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Box sx={{ mb: 8 }}>
                    <Typography variant="h2" color="text.heading" gutterBottom fontWeight={700}>
                        Find Trending Stories
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        Discover the latest insights and innovations shaping our world
                    </Typography>

                    <Typography variant="h5" color="text.heading" sx={{ mb: 3, fontWeight: 600 }}>
                        Big Story
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Card
                                sx={{
                                    height: '100%',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    // bgcolor: theme.palette.background.paper,
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="400"
                                    image={bigStory.image}
                                    alt={bigStory.title}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        background: `linear-gradient(to top, ${theme.palette.background.paper}, transparent)`,
                                        p: 3,
                                    }}
                                >
                                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                        <Chip
                                            label={bigStory.category}
                                            size="small"
                                            sx={{
                                                bgcolor: theme.palette.primary.main,
                                                color: theme.palette.primary.contrastText,
                                                fontWeight: 600,
                                            }}
                                        />
                                        <Chip label={bigStory.readTime} size="small" variant="outlined" />
                                    </Box>
                                    <Typography variant="h4" color="text.heading" gutterBottom fontWeight={700}>
                                        {bigStory.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        {bigStory.description}
                                    </Typography>
                                    <Button
                                        endIcon={<ArrowRight24Regular />}
                                        sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
                                    >
                                        Read more
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>

                        <Grid size={{ xs: 12, md: 5 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {trendingStories.map((story, index) => (
                                    <Card key={index} sx={{ display: 'flex', height: 120, border: `1px solid ${theme.palette.divider}`, boxShadow: 0 }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 160 }}
                                            image={story.image}
                                            alt={story.title}
                                        />
                                        <CardContent sx={{ flex: 1, py: 1.5, px: 2 }}>
                                            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                                <Chip label={story.category} size="small" sx={{ fontSize: '0.7rem' }} />
                                                <Chip label={story.readTime} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                                            </Box>
                                            <Typography variant="body1" color="text.heading" fontWeight={600} sx={{ mb: 1 }}>
                                                {story.title}
                                            </Typography>
                                            <Button
                                                size="small"
                                                endIcon={<ArrowRight16Regular />}
                                                sx={{ color: theme.palette.primary.main, p: 0.6, fontWeight: 700, minWidth: 'auto' }}
                                            >
                                                Read more
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ mb: 8 }}>
                    <Typography variant="h3" color="text.heading" gutterBottom fontWeight={700}>
                        Latest Blog Posts
                    </Typography>
                    <Grid container spacing={3} sx={{ mt: 2 }}>
                        {latestPosts.map((post, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, }} key={index}>
                                <Card sx={{ borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column', bgcolor: theme.palette.background.paper }}>
                                    <CardMedia component="img" height="200" image={post.image} alt={post.title} />
                                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                            <Chip label={post.category} size="small" sx={{ fontSize: '0.75rem' }} />
                                            <Chip label={post.readTime} size="small" variant="outlined" sx={{ fontSize: '0.75rem' }} />
                                        </Box>
                                        <Typography variant="h6" color="text.heading" gutterBottom fontWeight={600}>
                                            {post.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                                            {post.description}
                                        </Typography>
                                        <Button endIcon={<ArrowRight16Regular />} sx={{ color: theme.palette.primary.main, alignSelf: 'flex-start', p: 0.6 }}>
                                            Read more
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box sx={{ mb: 8 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Box>
                            <Typography variant="overline" color="text.secondary" fontWeight={600}>
                                Categories
                            </Typography>
                            <Typography variant="h3" color="text.heading" fontWeight={700}>
                                Marketing
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                Latest insights and strategies for modern marketing
                            </Typography>
                        </Box>
                        <Button variant="outlined" sx={{ borderRadius: 2 }}>
                            View all
                        </Button>
                    </Box>
                    <Grid container spacing={3}>
                        {categoryPosts.map((post, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3, }} key={index}>
                                <Card sx={{ borderRadius: 3, height: '100%', bgcolor: theme.palette.background.paper }}>
                                    <CardMedia component="img" height="200" image={post.image} alt={post.title} />
                                    <CardContent>
                                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                            <Chip label={post.category} size="small" />
                                            <Chip label={post.readTime} size="small" variant="outlined" />
                                        </Box>
                                        <Typography variant="h6" color="text.heading" gutterBottom fontWeight={600}>
                                            {post.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            {post.description}
                                        </Typography>
                                        <Button endIcon={<ArrowRight16Regular />} sx={{ color: theme.palette.primary.main, p: 0.6 }}>
                                            Read more
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box sx={{ mb: 8 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Box>
                            <Typography variant="h3" color="text.heading" gutterBottom fontWeight={700}>
                                Popular Gigs
                            </Typography>
                        </Box>
                        <Button variant="outlined" sx={{ borderRadius: 2 }}>
                            View all
                        </Button>
                    </Box>

                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        {popularGigs.map((gig, index) => (
                            <Grid size={{ xs: 6, sm: 4, md: 2, lg: 3, xl: 3 }} key={index}>
                                <Card
                                    sx={{
                                        position: 'relative',
                                        height: 350,
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        bgcolor: theme.palette.background.paper,
                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        '&:hover': {
                                            transform: 'translateY(-12px) scale(1.02)',
                                            boxShadow: theme.palette.mode === 'dark'
                                                ? '0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(144, 202, 249, 0.3)'
                                                : '0 20px 40px rgba(47, 49, 124, 0.2), 0 0 0 1px rgba(47, 49, 124, 0.1)',
                                            '& .card-image': {
                                                transform: 'scale(1.1)',
                                            },
                                            '& .overlay': {
                                                background: 'linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(47, 49, 124, 0.7))',
                                            },
                                            '& .category-chip': {
                                                transform: 'translateY(-5px)',
                                                backgroundColor: theme.palette.primary.main,
                                                color: theme.palette.primary.contrastText,
                                            },
                                            '& .label-text': {
                                                transform: 'translateX(10px)',
                                                color: theme.palette.primary.light,
                                            },
                                            '& .hover-icon': {
                                                opacity: 1,
                                                transform: 'translate(-50%, -50%) scale(1)',
                                            },
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="350"
                                        image={gig.image}
                                        alt={gig.label}
                                        className="card-image"
                                        sx={{
                                            objectFit: 'cover',
                                            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                        }}
                                    />

                                    {/* Hover Icon */}
                                    <Box
                                        className="hover-icon"
                                        sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%) scale(0)',
                                            opacity: 0,
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                            borderRadius: '50%',
                                            width: 60,
                                            height: 60,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                                        }}
                                    >
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                            <path d="M5 12h14M12 5l7 7-7 7"
                                                stroke={theme.palette.primary.main}
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </Box>

                                    <Box
                                        className="overlay"
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3))',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            p: 2,
                                            transition: 'background 0.4s ease',
                                        }}
                                    >
                                        <Box
                                            className="category-chip"
                                            sx={{
                                                display: 'inline-block',
                                                alignSelf: 'flex-start',
                                                px: 1.5,
                                                py: 0.5,
                                                borderRadius: '20px',
                                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                backdropFilter: 'blur(10px)',
                                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                                transition: 'all 0.3s ease',
                                            }}
                                        >
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: '#fff',
                                                    fontWeight: 600,
                                                    letterSpacing: '0.5px',
                                                }}
                                            >
                                                {gig.category}
                                            </Typography>
                                        </Box>

                                        <Box>
                                            <Typography
                                                variant="body2"
                                                className="label-text"
                                                sx={{
                                                    color: '#fff',
                                                    fontWeight: 700,
                                                    fontSize: '1.1rem',
                                                    transition: 'all 0.3s ease',
                                                    textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                                                }}
                                            >
                                                {gig.label}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    width: 0,
                                                    height: '3px',
                                                    backgroundColor: theme.palette.primary.light,
                                                    transition: 'width 0.4s ease',
                                                    mt: 1,
                                                    borderRadius: '2px',
                                                    '.MuiCard-root:hover &': {
                                                        width: '60px',
                                                    },
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box
                    sx={{
                        textAlign: 'center',
                        py: 8,
                        px: 3,
                        borderRadius: 4,
                        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.light} 100%)`,
                        border: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <Box
                        sx={{
                            width: 60,
                            height: 60,
                            bgcolor: theme.palette.primary.main,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 3,
                        }}
                    >
                        <Mail24Regular style={{ color: '#fff' }} />
                    </Box>
                    <Typography variant="h4" color="text.heading" gutterBottom fontWeight={700}>
                        Subscribe For The Latest Updates
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        Subscribe to newsletter and never miss the next post every week
                    </Typography>
                    <Box sx={{ maxWidth: 500, mx: 'auto' }}>
                        <TextField
                            fullWidth
                            placeholder="Enter your email"
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <Button
                                        variant="contained"
                                        sx={{
                                            bgcolor: theme.palette.warning.main,
                                            '&:hover': { bgcolor: theme.palette.warning.dark },
                                            color: theme.palette.warning.contrastText,
                                        }}
                                    >
                                        Subscribe
                                    </Button>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: theme.palette.background.paper,
                                    borderRadius: 3,
                                    '& fieldset': { border: 'none' },
                                },
                            }}
                        />
                    </Box>
                </Box>
                <BMGPromoSection /> 
            </Container>
        </Box>
    );
};

export default BlogPage;
