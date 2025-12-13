
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
    Eye24Regular,
} from '@fluentui/react-icons';
import { resourcesData } from './data';


const categories = ['All', 'Business Strategy', 'Finance', 'Marketing', 'Product', 'Legal', 'HR & Operations'];
const types = ['All', 'Guide', 'Video Course', 'Toolkit', 'Framework', 'Playbook'];

const Resources = ({ onSelectResource }) => {
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedType, setSelectedType] = useState('All');
    const [showFilters, setShowFilters] = useState(false);

    const filteredResources = resourcesData.filter(resource => {
        const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
        const matchesType = selectedType === 'All' || resource.type === selectedType;
        return matchesSearch && matchesCategory && matchesType;
    });

    const getTypeIcon = (type) => {
        switch (type) {
            case 'Guide': return <BookOpen24Regular />;
            case 'Video Course': return <Video24Regular />;
            case 'Toolkit': return <Document24Regular />;
            case 'Framework': return <BookOpen24Regular />;
            case 'Playbook': return <Document24Regular />;
            default: return <BookOpen24Regular />;
        }
    };

    return (
        <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
       
            <Box sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                py: { xs: 8, md: 10 },
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-50%',
                    right: '-20%',
                    width: '600px',
                    height: '600px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '50%',
                },
            }}>
                <Container maxWidth="lg">
                    <Typography variant="h2" sx={{ color: '#fff', fontWeight: 800, mb: 2, fontSize: { xs: '2.5rem', md: '2.5rem' } }}>
                        Resource Library
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#fff', opacity: 0.95, maxWidth: 600, mb: 5, fontSize: '1.25rem' }}>
                        Expert guides, tools, and frameworks to accelerate your business growth
                    </Typography>

                    {/* Search Bar */}
                    <TextField
                        fullWidth
                        placeholder="Search resources..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{
                            maxWidth: 600,
                            bgcolor: theme.palette.background.paper,
                            borderRadius: 2,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { border: 'none' },
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search24Regular />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Container>
            </Box>

            {/* Filters Section */}
            <Paper sx={{ position: 'sticky', top: 0, zIndex: 10, boxShadow: 2 }}>
                <Container maxWidth="lg" sx={{ py: 2.5 }}>
                    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                        <Button
                            onClick={() => setShowFilters(!showFilters)}
                            startIcon={<Filter24Regular />}
                            sx={{
                                bgcolor: theme.palette.primary.lightBg,
                                color: theme.palette.primary.main,
                                fontWeight: 600,
                                textTransform: 'none',
                                px: 3,
                                '&:hover': { bgcolor: theme.palette.primary.lightBg }
                            }}
                        >
                            Filters
                        </Button>

                        {/* Category Pills */}
                        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ flex: 1 }}>
                            {categories.map((category) => (
                                <Chip
                                    key={category}
                                    label={category}
                                    onClick={() => setSelectedCategory(category)}
                                    sx={{
                                        bgcolor: selectedCategory === category ? theme.palette.primary.main : 'transparent',
                                        color: selectedCategory === category ? theme.palette.primary.contrastText : theme.palette.text.primary,
                                        border: `2px solid ${selectedCategory === category ? theme.palette.primary.main : theme.palette.accent.lightBlue}`,
                                        fontWeight: 500,
                                        '&:hover': {
                                            bgcolor: selectedCategory === category ? theme.palette.primary.dark : theme.palette.primary.lightBg
                                        }
                                    }}
                                />
                            ))}
                        </Stack>
                    </Stack>

                    {/* Extended Filters */}
                    {showFilters && (
                        <Box sx={{ mt: 3, pt: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, color: theme.palette.text.secondary }}>
                                RESOURCE TYPE
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                                {types.map((type) => (
                                    <Chip
                                        key={type}
                                        label={type}
                                        onClick={() => setSelectedType(type)}
                                        sx={{
                                            bgcolor: selectedType === type ? theme.palette.secondary.main : theme.palette.background.default,
                                            color: selectedType === type ? theme.palette.secondary.contrastText : theme.palette.text.primary,
                                            fontWeight: 500
                                        }}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    )}
                </Container>
            </Paper>

            {/* Resources Grid */}
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                        {filteredResources.length} resources found
                    </Typography>
                </Box>

                <Grid container spacing={3.5}>
                    {filteredResources.map((resource) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={resource.id}>
                            <Card
                                onClick={() => onSelectResource(resource)}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    border: `1px solid ${theme.palette.accent.lightBlue}`,
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: `0 12px 32px ${theme.palette.primary.main}26`
                                    }
                                }}
                            >
                                {/* Image */}
                                <Box sx={{ position: 'relative', paddingTop: '56.25%', overflow: 'hidden' }}>
                                    <Box
                                        component="img"
                                        src={resource.image}
                                        alt={resource.title}
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                    <Chip
                                        icon={getTypeIcon(resource.type)}
                                        label={resource.type}
                                        sx={{
                                            position: 'absolute',
                                            top: 16,
                                            left: 16,
                                            bgcolor: theme.palette.background.paper,
                                            fontWeight: 600,
                                            boxShadow: 2
                                        }}
                                    />
                                </Box>

                                {/* Content */}
                                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <Chip
                                        label={resource.category}
                                        size="small"
                                        sx={{
                                            bgcolor: theme.palette.accent.lightBlue,
                                            color: theme.palette.primary.main,
                                            fontWeight: 600,
                                            mb: 1.5,
                                            width: 'fit-content'
                                        }}
                                    />

                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: theme.palette.text.heading }}>
                                        {resource.title}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, flexGrow: 1 }}>
                                        {resource.description}
                                    </Typography>

                                    {/* Meta Info */}
                                    <Stack direction="row" spacing={2} sx={{ mb: 2.5 }}>
                                        <Stack direction="row" spacing={0.5} alignItems="center">
                                            <Clock24Regular style={{ fontSize: '1rem' }} />
                                            <Typography variant="caption">{resource.readTime}</Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={0.5} alignItems="center">
                                            <ArrowDownload24Regular style={{ fontSize: '1rem' }} />
                                            <Typography variant="caption">{resource.downloads.toLocaleString()}</Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={0.5} alignItems="center">
                                            <Eye24Regular style={{ fontSize: '1rem' }} />
                                            <Typography variant="caption">{resource.views.toLocaleString()}</Typography>
                                        </Stack>
                                    </Stack>

                                    {/* Author & Date */}
                                    <Divider sx={{ mb: 2 }} />
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.lightBg }}>
                                                <Person24Regular style={{ color: theme.palette.primary.main }} />
                                            </Avatar>
                                            <Typography variant="body2" fontWeight={500}>
                                                {resource.author}
                                            </Typography>
                                        </Stack>
                                        <ChevronRight24Regular style={{ color: theme.palette.primary.main }} />
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Resources