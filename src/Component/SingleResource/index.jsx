
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  InputAdornment,
  Divider,
  Avatar,
  IconButton,
  Paper,
  Stack
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  BookOpen24Regular,
  Video24Regular,
  Document24Regular,
  ArrowDownload24Regular,
  Clock24Regular,
  Search24Regular,
  Filter24Regular,
  ChevronRight24Regular,
  Calendar24Regular,
  Person24Regular,
  Share24Regular,
  BookmarkMultiple24Regular,
  Eye24Regular,
  ArrowLeft24Regular,
  Open24Regular,
  CheckmarkCircle24Filled
} from '@fluentui/react-icons';
import { resourcesData } from '../Resources/data';




const SingleResourcePage = ({ resource, onBack }) => {
    const theme = useTheme();
    const [isBookmarked, setIsBookmarked] = useState(false);

    return (
        <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
            {/* Hero Section with Image */}
            <Box sx={{ position: 'relative', height: 500, overflow: 'hidden' }}>
                <Box
                    component="img"
                    src={resource.image}
                    alt={resource.title}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <Box sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.75) 100%)'
                }} />

                {/* Content Overlay */}
                <Container maxWidth="lg" sx={{  position: 'absolute', bottom: 48, left: 0, right: 0 }}>
                    <Button
                        onClick={onBack}
                        startIcon={<ArrowLeft24Regular />}
                        sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.29)',
                            backdropFilter: 'blur(10px)',
                            color: '#fff',
                            fontWeight: 600,
                            textTransform: 'none',
                            mb: 3,
                            mr:2,
                            border: '1px solid rgba(255,255,255,0.2)',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' }
                        }}
                    >
                        Back to Resources
                    </Button>

                    <Chip
                        icon={resource.type === 'Video Course' ? <Video24Regular /> : <BookOpen24Regular />}
                        label={resource.type}
                        sx={{
                            bgcolor: 'rgba(235, 235, 235, 0.78)',
                            backdropFilter: 'blur(10px)',
                            color: '#fff',
                            fontWeight: 600,
                            paddingTop:2.5,
                            
                            paddingBottom:2.5,
                            mb: 2
                        }}
                    />

                    <Typography variant="h2" sx={{ fontWeight: 800, color: '#fff', mb: 2, textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
                        {resource.title}
                    </Typography>

                    <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.95)', mb: 3, textShadow: '0 1px 10px rgba(0,0,0,0.3)' }}>
                        {resource.description}
                    </Typography>

                    {/* Meta Info */}
                    <Stack direction="row" spacing={4} flexWrap="wrap">
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
                                <Person24Regular style={{ color: '#fff' }} />
                            </Avatar>
                            <Box>
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', display: 'block' }}>
                                    Author
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600 }}>
                                    {resource.author}
                                </Typography>
                            </Box>
                        </Stack>

                        <Stack direction="row" spacing={1} alignItems="center">
                            <Calendar24Regular style={{ color: '#fff', fontSize: '1.5rem' }} />
                            <Box>
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', display: 'block' }}>
                                    Published
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600 }}>
                                    {new Date(resource.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </Typography>
                            </Box>
                        </Stack>

                        <Stack direction="row" spacing={1} alignItems="center">
                            <Clock24Regular style={{ color: '#fff', fontSize: '1.5rem' }} />
                            <Box>
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', display: 'block' }}>
                                    Duration
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600 }}>
                                    {resource.readTime}
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Grid container spacing={6}>
                    <Grid size={{ xs:12, md:8 }} >
                        <Paper sx={{ p: 3, mb: 4, display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                            <Box>
                                <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                                    {resource.views.toLocaleString()}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">Views</Typography>
                            </Box>
                            <Divider orientation="vertical" flexItem />
                            <Box>
                                <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.success.main }}>
                                    {resource.downloads.toLocaleString()}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">Downloads</Typography>
                            </Box>
                            <Divider orientation="vertical" flexItem />
                            <Box>
                                <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.secondary.main }}>
                                    A+
                                </Typography>
                                <Typography variant="caption" color="text.secondary">Rating</Typography>
                            </Box>
                        </Paper>

                        {/* Introduction */}
                        <Paper sx={{
                            p: 4,
                            mb: 4,
                            bgcolor: theme.palette.primary.lightBg,
                            borderLeft: `4px solid ${theme.palette.primary.main}`
                        }}>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                                Overview
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                                {resource.content.intro}
                            </Typography>
                        </Paper>

                        {/* Content Sections */}
                        {resource.content.sections.map((section, index) => (
                            <Box key={index} sx={{ mb: 6 }}>
                                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2.5 }}>
                                    <Avatar sx={{
                                        bgcolor: theme.palette.primary.main,
                                        width: 40,
                                        height: 40,
                                        fontSize: '1.25rem',
                                        fontWeight: 700
                                    }}>
                                        {index + 1}
                                    </Avatar>
                                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                        {section.title}
                                    </Typography>
                                </Stack>
                                <Typography variant="body1" sx={{ lineHeight: 1.8, pl: 7 }}>
                                    {section.content}
                                </Typography>
                            </Box>
                        ))}

                        {/* Included Resources */}
                        <Paper sx={{ p: 4, mt: 6 }}>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                                What's Included
                            </Typography>
                            <Stack spacing={2}>
                                {resource.content.resources.map((item, index) => (
                                    <Stack key={index} direction="row" spacing={1.5} alignItems="center" sx={{
                                        p: 2,
                                        bgcolor: theme.palette.background.default,
                                        borderRadius: 2
                                    }}>
                                        <CheckmarkCircle24Filled style={{ color: theme.palette.success.main, fontSize: '1.5rem' }} />
                                        <Typography variant="body1" fontWeight={500}>
                                            {item}
                                        </Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </Paper>
                    </Grid>

                    <Grid size={{ xs:12, md:4 }} >
                        <Box sx={{ position: 'sticky', top: 24 }}>
                            {/* Action Card */}
                            <Paper sx={{ p: 3, mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                                    Get This Resource
                                </Typography>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    startIcon={<ArrowDownload24Regular />}
                                    sx={{
                                        bgcolor: theme.palette.primary.main,
                                        py: 1.5,
                                        mb: 2,
                                        textTransform: 'none',
                                        fontWeight: 700,
                                        fontSize: '1rem',
                                        '&:hover': { bgcolor: theme.palette.primary.dark }
                                    }}
                                >
                                    Download Now
                                </Button>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<BookmarkMultiple24Regular />}
                                    onClick={() => setIsBookmarked(!isBookmarked)}
                                    sx={{
                                        borderColor: theme.palette.primary.main,
                                        color: theme.palette.primary.main,
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        mb: 2,
                                        bgcolor: isBookmarked ? theme.palette.primary.lightBg : 'transparent'
                                    }}
                                >
                                    {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                                </Button>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<Share24Regular />}
                                    sx={{
                                        borderColor: theme.palette.primary.main,
                                        color: theme.palette.primary.main,
                                        textTransform: 'none',
                                        fontWeight: 600
                                    }}
                                >
                                    Share Resource
                                </Button>
                            </Paper>

                            {/* Resource Details Card */}
                            <Paper sx={{ p: 3, mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                                    Resource Details
                                </Typography>
                                <Stack spacing={2}>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                                            Category
                                        </Typography>
                                        <Chip
                                            label={resource.category}
                                            size="small"
                                            sx={{
                                                bgcolor: theme.palette.accent.lightBlue,
                                                color: theme.palette.primary.main,
                                                fontWeight: 600
                                            }}
                                        />
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                                            Format
                                        </Typography>
                                        <Typography variant="body2" fontWeight={500}>
                                            {resource.type}
                                        </Typography>
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                                            Last Updated
                                        </Typography>
                                        <Typography variant="body2" fontWeight={500}>
                                            {new Date(resource.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </Typography>
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                                            Downloads
                                        </Typography>
                                        <Typography variant="body2" fontWeight={500}>
                                            {resource.downloads.toLocaleString()} times
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Paper>

                            <Paper sx={{ p: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                                    Related Resources
                                </Typography>
                                <Stack spacing={2}>
                                    {resourcesData
                                        .filter(r => r.id !== resource.id && r.category === resource.category)
                                        .slice(0, 3)
                                        .map((related) => (
                                            <Box
                                                key={related.id}
                                                sx={{
                                                    p: 2,
                                                    bgcolor: theme.palette.background.default,
                                                    borderRadius: 2,
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                    '&:hover': {
                                                        bgcolor: theme.palette.primary.lightBg,
                                                        transform: 'translateX(4px)'
                                                    }
                                                }}
                                            >
                                                <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
                                                    {related.title}
                                                </Typography>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Typography variant="caption" color="text.secondary">
                                                        {related.type}
                                                    </Typography>
                                                    <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'text.secondary' }} />
                                                    <Typography variant="caption" color="text.secondary">
                                                        {related.readTime}
                                                    </Typography>
                                                </Stack>
                                            </Box>
                                        ))}
                                </Stack>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default SingleResourcePage;