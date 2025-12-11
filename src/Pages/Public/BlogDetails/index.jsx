import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Chip,
    Avatar,
    Button,
    Card,
    CardMedia,
    CardContent,
    Divider,
    IconButton,
    TextField,
    Grid,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    ArrowLeft24Regular,
    Heart24Regular,
    Heart24Filled,
    Share24Regular,
    Bookmark24Regular,
    Bookmark24Filled,
    Calendar24Regular,
    Clock24Regular,
    Eye24Regular,
    ThumbLike24Regular,
    Comment24Regular,
    Send24Regular,
} from '@fluentui/react-icons';

const BlogDetailPage = () => {
    const theme = useTheme();
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [comment, setComment] = useState('');

    const article = {
        title: 'AI: Revolution of Human Existence',
        subtitle: 'Exploring how artificial intelligence is reshaping our world and redefining what it means to be human in the digital age',
        category: 'Technology',
        author: {
            name: 'Sarah Johnson',
            avatar: 'https://i.pravatar.cc/150?img=5',
            role: 'Senior Tech Writer',
            bio: 'Tech enthusiast and AI researcher with 10+ years of experience',
        },
        publishedDate: 'December 5, 2024',
        readTime: '8 min read',
        views: '12.5K',
        likes: 342,
        comments: 45,
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop',
        tags: ['AI', 'Technology', 'Future', 'Innovation', 'Machine Learning'],
    };

    const relatedArticles = [
        {
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
            category: 'Tech',
            title: 'The Future of Quantum Computing',
            readTime: '5 min read',
        },
        {
            image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
            category: 'Innovation',
            title: 'Blockchain Beyond Cryptocurrency',
            readTime: '7 min read',
        },
        {
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
            category: 'AI',
            title: 'Neural Networks Explained Simply',
            readTime: '6 min read',
        },
    ];

    const comments = [
        {
            author: 'John Doe',
            avatar: 'https://i.pravatar.cc/150?img=12',
            time: '2 hours ago',
            text: 'Excellent article! The insights on AI ethics were particularly thought-provoking.',
            likes: 12,
        },
        {
            author: 'Emma Wilson',
            avatar: 'https://i.pravatar.cc/150?img=9',
            time: '5 hours ago',
            text: 'This is exactly what I needed to understand the current state of AI. Thank you!',
            likes: 8,
        },
        {
            author: 'Michael Chen',
            avatar: 'https://i.pravatar.cc/150?img=15',
            time: '1 day ago',
            text: 'Great perspective on how AI is transforming industries. Looking forward to more content like this.',
            likes: 15,
        },
    ];

    return (
        <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', mt: 8 }}>
            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    height: { xs: '400px', md: '300px' },
                    background: `linear-gradient(to bottom, transparent 0%, ${theme.palette.background.default} 100%)`,
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url(${article.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `linear-gradient(to bottom, transparent 0%, ${theme.palette.background.default} 90%)`,
                        },
                    }}
                />
            </Box>

            <Container maxWidth="md" sx={{ position: 'relative', mt: -20, zIndex: 1 }}>
                {/* Back Button */}
                <Button
                    startIcon={<ArrowLeft24Regular />}
                    sx={{
                        mb: 3,
                        color: theme.palette.text.primary,
                        fontWeight: 600,
                        '&:hover': {
                            bgcolor: theme.palette.background.paper,
                        },
                    }}
                >
                    Back to Blog
                </Button>

                {/* Article Header */}
                <Box sx={{ mb: 4 }}>
                    <Chip
                        label={article.category}
                        sx={{
                            bgcolor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            fontWeight: 700,
                            fontSize: '0.875rem',
                            mb: 2,
                        }}
                    />
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 800,
                            color: theme.palette.text.heading,
                            mb: 2,
                            fontSize: { xs: '2rem', md: '3rem' },
                            lineHeight: 1.2,
                        }}
                    >
                        {article.title}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: theme.palette.text.secondary,
                            fontWeight: 400,
                            mb: 3,
                            lineHeight: 1.6,
                        }}
                    >
                        {article.subtitle}
                    </Typography>

                    {/* Meta Info */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: 3,
                            py: 3,
                            borderTop: `1px solid ${theme.palette.divider}`,
                            borderBottom: `1px solid ${theme.palette.divider}`,
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Calendar24Regular style={{ color: theme.palette.text.secondary }} />
                            <Typography variant="body2" color="text.secondary">
                                {article.publishedDate}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Clock24Regular style={{ color: theme.palette.text.secondary }} />
                            <Typography variant="body2" color="text.secondary">
                                {article.readTime}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Eye24Regular style={{ color: theme.palette.text.secondary }} />
                            <Typography variant="body2" color="text.secondary">
                                {article.views} views
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Author Info */}
                <Card
                    sx={{
                        mb: 4,
                        p: 3,
                        bgcolor: theme.palette.background.paper,
                        borderRadius: 3,
                        border: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                            src={article.author.avatar}
                            sx={{
                                width: 64,
                                height: 64,
                                border: `3px solid ${theme.palette.primary.main}`,
                            }}
                        />
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.heading }}>
                                {article.author.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 0.5 }}>
                                {article.author.role}
                            </Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                {article.author.bio}
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                borderRadius: 2,
                                px: 3,
                                '&:hover': {
                                    bgcolor: theme.palette.primary.dark,
                                },
                            }}
                        >
                            Follow
                        </Button>
                    </Box>
                </Card>

                {/* Article Content */}
                <Box
                    sx={{
                        mb: 6,
                        '& p': {
                            fontSize: '1.125rem',
                            lineHeight: 1.8,
                            color: theme.palette.text.primary,
                            mb: 3,
                        },
                        '& h3': {
                            fontSize: '1.75rem',
                            fontWeight: 700,
                            color: theme.palette.text.heading,
                            mt: 5,
                            mb: 2,
                        },
                        '& h4': {
                            fontSize: '1.5rem',
                            fontWeight: 600,
                            color: theme.palette.text.heading,
                            mt: 4,
                            mb: 2,
                        },
                    }}
                >
                    <Typography variant="body1" paragraph>
                        Artificial Intelligence has transcended from science fiction to become an integral part of our daily lives. From the moment we wake up to check our AI-curated news feed to the personalized recommendations we receive throughout the day, AI is fundamentally reshaping how we interact with technology and each other.
                    </Typography>

                    <Typography variant="body1" paragraph>
                        The revolution isn't just about smart assistants or automated processes—it's about a fundamental shift in how we approach problem-solving, creativity, and decision-making. Machine learning algorithms now detect diseases earlier than human doctors, create art that moves us emotionally, and write code that powers the applications we use every day.
                    </Typography>

                    <Typography variant="h3">The Transformation of Industries</Typography>

                    <Typography variant="body1" paragraph>
                        Every industry is experiencing the ripple effects of AI adoption. Healthcare providers use AI to analyze medical images with unprecedented accuracy. Financial institutions leverage machine learning to detect fraud patterns that would be impossible for humans to spot. Manufacturing plants employ AI-powered robots that work alongside humans, enhancing productivity and safety.
                    </Typography>

                    <Box
                        sx={{
                            my: 4,
                            p: 3,
                            bgcolor: theme.palette.primary.lightBg,
                            borderLeft: `4px solid ${theme.palette.primary.main}`,
                            borderRadius: 2,
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontStyle: 'italic',
                                color: theme.palette.text.heading,
                                fontWeight: 600,
                            }}
                        >
                            "AI is not about replacing human intelligence—it's about augmenting it, enhancing our capabilities, and freeing us to focus on what makes us uniquely human."
                        </Typography>
                    </Box>

                    <Typography variant="h3">Ethical Considerations</Typography>

                    <Typography variant="body1" paragraph>
                        As AI systems become more sophisticated, we must grapple with complex ethical questions. How do we ensure AI algorithms are fair and unbiased? What happens to privacy in a world where AI can analyze vast amounts of personal data? How do we maintain human agency and decision-making authority in increasingly automated systems?
                    </Typography>

                    <Typography variant="body1" paragraph>
                        These aren't just theoretical concerns—they're real challenges that require immediate attention from technologists, policymakers, and society at large. The decisions we make today about AI governance and ethics will shape the future for generations to come.
                    </Typography>

                    <Typography variant="h3">Looking Ahead</Typography>

                    <Typography variant="body1" paragraph>
                        The future of AI is both exciting and uncertain. As models become more powerful and accessible, we're likely to see even more transformative applications emerge. From personalized education that adapts to each student's learning style to climate models that help us combat global warming, AI has the potential to address some of humanity's greatest challenges.
                    </Typography>

                    <Typography variant="body1" paragraph>
                        However, realizing this potential requires a thoughtful, inclusive approach. We must ensure that AI development benefits all of humanity, not just a privileged few. This means investing in AI literacy, creating robust regulatory frameworks, and fostering international cooperation on AI standards and safety.
                    </Typography>
                </Box>

                {/* Tags */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.heading, mb: 2 }}>
                        Tags
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {article.tags.map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag}
                                variant="outlined"
                                sx={{
                                    borderColor: theme.palette.divider,
                                    '&:hover': {
                                        bgcolor: theme.palette.primary.lightBg,
                                        borderColor: theme.palette.primary.main,
                                    },
                                }}
                            />
                        ))}
                    </Box>
                </Box>

                {/* Engagement Actions */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 3,
                        bgcolor: theme.palette.background.paper,
                        borderRadius: 3,
                        border: `1px solid ${theme.palette.divider}`,
                        mb: 4,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton
                            onClick={() => setLiked(!liked)}
                            sx={{
                                color: liked ? theme.palette.error.main : theme.palette.text.secondary,
                                '&:hover': {
                                    bgcolor: `${theme.palette.error.main}10`,
                                },
                            }}
                        >
                            {liked ? <Heart24Filled /> : <Heart24Regular />}
                        </IconButton>
                        <Typography variant="body2" color="text.secondary">
                            {article.likes + (liked ? 1 : 0)}
                        </Typography>

                        <IconButton
                            sx={{
                                color: theme.palette.text.secondary,
                                ml: 2,
                                '&:hover': {
                                    bgcolor: `${theme.palette.primary.main}10`,
                                },
                            }}
                        >
                            <Comment24Regular />
                        </IconButton>
                        <Typography variant="body2" color="text.secondary">
                            {article.comments}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                            onClick={() => setBookmarked(!bookmarked)}
                            sx={{
                                color: bookmarked ? theme.palette.warning.main : theme.palette.text.secondary,
                                '&:hover': {
                                    bgcolor: `${theme.palette.warning.main}10`,
                                },
                            }}
                        >
                            {bookmarked ? <Bookmark24Filled /> : <Bookmark24Regular />}
                        </IconButton>
                        <IconButton
                            sx={{
                                color: theme.palette.text.secondary,
                                '&:hover': {
                                    bgcolor: `${theme.palette.primary.main}10`,
                                },
                            }}
                        >
                            <Share24Regular />
                        </IconButton>
                    </Box>
                </Box>

                <Divider sx={{ my: 6 }} />

                {/* Comments Section */}
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.heading, mb: 3 }}>
                        Comments ({article.comments})
                    </Typography>

                    {/* Add Comment */}
                    <Box
                        sx={{
                            mb: 4,
                            p: 3,
                            bgcolor: theme.palette.background.paper,
                            borderRadius: 3,
                            border: `1px solid ${theme.palette.divider}`,
                        }}
                    > 
                     
                        <TextField
                            fullWidth
                            multiline
                            // rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            sx={{
                                mb: 2,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                },
                            }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="contained"
                                endIcon={<Send24Regular />}
                                sx={{
                                    bgcolor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                    borderRadius: 2,
                                    px: 3,
                                    '&:hover': {
                                        bgcolor: theme.palette.primary.dark,
                                    },
                                }}
                            >
                                Post Comment
                            </Button>
                        </Box>
                    </Box>

                    {/* Comments List */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {comments.map((commentItem, index) => (
                            <Box
                                key={index}
                                sx={{
                                    p: 3,
                                    bgcolor: theme.palette.background.paper,
                                    borderRadius: 3,
                                    border: `1px solid ${theme.palette.divider}`,
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                    <Avatar src={commentItem.avatar} sx={{ width: 40, height: 40 }} />
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.text.heading }}>
                                                {commentItem.author}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {commentItem.time}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" sx={{ color: theme.palette.text.primary, mb: 2 }}>
                                            {commentItem.text}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <IconButton
                                                size="small"
                                                sx={{
                                                    color: theme.palette.text.secondary,
                                                    '&:hover': {
                                                        color: theme.palette.primary.main,
                                                    },
                                                }}
                                            >
                                                <ThumbLike24Regular />
                                            </IconButton>
                                            <Typography variant="caption" color="text.secondary">
                                                {commentItem.likes}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>

                <Divider sx={{ my: 6 }} />

                <Box sx={{ mb: 8 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.heading, mb: 3 }}>
                        Related Articles
                    </Typography>
                    <Grid container spacing={2}>
                        {relatedArticles.map((relatedArticle, index) => (
                            <Grid size={{xs:12, md:4 }} key={index}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        borderRadius: 3,
                                        border: `1px solid ${theme.palette.divider}`,
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: `0 12px 24px ${theme.palette.primary.main}20`,
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="180"
                                        image={relatedArticle.image}
                                        alt={relatedArticle.title}
                                    />
                                    <CardContent>
                                        <Chip
                                            label={relatedArticle.category}
                                            size="small"
                                            sx={{
                                                mb: 1,
                                                bgcolor: theme.palette.primary.lightBg,
                                                color: theme.palette.primary.main,
                                            }}
                                        />
                                        <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.heading, mb: 1 }}>
                                            {relatedArticle.title}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {relatedArticle.readTime}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default BlogDetailPage;