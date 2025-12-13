import React from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    Chip,
    Button,
    Avatar,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    Rocket24Regular,
    PaintBrush24Regular,
    CheckmarkCircle24Filled,
    Lightbulb24Regular,
    DocumentText24Regular,
    Eye24Regular,
    ArrowRight24Regular,
    Play24Regular,
    Star24Filled,
    LightbulbRegular,
    PaintBrushRegular,
    EyeRegular,
    RocketRegular,
} from '@fluentui/react-icons';
import TestimonialsSlider from '../../../Component/TestimonialSlider';
import {testimonials} from './data';

const HowItWorksPage = () => {
    const theme = useTheme();

    const steps = [
        {
            number: '01',
            icon: <LightbulbRegular />,
            title: 'Describe Your Vision',
            description: 'Tell us about your project in simple terms. What kind of website do you need? Who is your target audience? What are your goals?',
            details: [
                'Share your business goals',
                'Describe your target audience',
                'List must-have features',
                'Set your preferred timeline',
            ],
            color: theme.palette.primary.main,
        },
        {
            number: '02',
            icon: <PaintBrushRegular />,
            title: 'AI Creates Magic',
            description: 'Our advanced AI analyzes your requirements and generates a custom website design tailored to your brand and industry.',
            details: [
                'AI analyzes your requirements',
                'Generates multiple design options',
                'Creates responsive layouts',
                'Optimizes for performance',
            ],
            color: theme.palette.warning.main,
        },
        {
            number: '03',
            icon: <EyeRegular />,
            title: 'Review & Customize',
            description: 'Preview your website and make adjustments. Fine-tune colors, fonts, layouts, and content until it\'s perfect.',
            details: [
                'Real-time preview',
                'Easy customization tools',
                'Unlimited revisions',
                'Mobile preview available',
            ],
            color: theme.palette.secondary.main,
        },
        {
            number: '04',
            icon: <RocketRegular />,
            title: 'Launch & Grow',
            description: 'Deploy your website with a single click. Our platform handles hosting, security, and updates automatically.',
            details: [
                'One-click deployment',
                'Free SSL certificate',
                'Automatic backups',
                'Built-in analytics',
            ],
            color: theme.palette.success.main,
        },
    ];

    const features = [
        {
            icon: <DocumentText24Regular />,
            title: 'Smart Content Generation',
            description: 'AI writes compelling copy based on your business and industry',
        },
        {
            icon: <PaintBrush24Regular />,
            title: 'Professional Design',
            description: 'Beautiful, modern designs that match your brand identity',
        },
        {
            icon: <CheckmarkCircle24Filled />,
            title: 'SEO Optimized',
            description: 'Built-in SEO best practices to help you rank higher',
        },
        {
            icon: <Rocket24Regular />,
            title: 'Lightning Fast',
            description: 'Optimized for speed and performance on all devices',
        },
    ];

    return (
        <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', mt: 5 }}>
            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                    py: { xs: 10, md: 8 },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '-50%',
                        right: '-20%',
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
                            label="SIMPLE PROCESS"
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
                                fontSize: { xs: '1.5rem', md: '2.8rem' },
                                color: '#fff',
                                mb: 3,
                                lineHeight: 1.1,
                            }}
                        >
                            How It Works
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                mb: 5,
                                maxWidth: 500,
                                mx: 'auto',
                                lineHeight: 1.6,
                            }}
                        >
                            From idea to launch in 4 simple steps. No coding required, no complexity.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<Play24Regular />}
                            sx={{
                                bgcolor: theme.palette.warning.main,
                                color: theme.palette.warning.contrastText,
                                px: 3,
                                py: 1.2,
                                fontSize: '1rem',
                                fontWeight: 600,
                                borderRadius: 2,
                                textTransform: 'none',
                                boxShadow: `0 8px 32px ${theme.palette.warning.main}60`,
                                '&:hover': {
                                    bgcolor: theme.palette.warning.light,
                                    transform: 'translateY(-2px)',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Watch Demo Video
                        </Button>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
                {steps.map((step, index) => (
                    <Box key={index} sx={{ mb: 8 }}>
                        <Grid container spacing={6} alignItems="center" direction={index % 2 === 0 ? 'row' : 'row-reverse'}>
                            <Grid size={{ xs:12, md:6 }}>
                                <Box sx={{ mb: 2 }}>
                                    <Typography
                                        variant="h2"
                                        sx={{
                                            fontWeight: 900,
                                            fontSize: '5rem',
                                            color: `${step.color}20`,
                                            lineHeight: 1,
                                            mb: -2,
                                        }}
                                    >
                                        {step.number}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <Box
                                        sx={{
                                            width: 56,
                                            height: 56,
                                            borderRadius: 3,
                                            bgcolor: `${step.color}15`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: step.color,
                                        }}
                                    >
                                        {step.icon}
                                    </Box>
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            fontWeight: 800,
                                            color: theme.palette.text.heading,
                                        }}
                                    >
                                        {step.title}
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        mb: 3,
                                        fontSize: '1.125rem',
                                        lineHeight: 1.8,
                                    }}
                                >
                                    {step.description}
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                    {step.details.map((detail, idx) => (
                                        <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <CheckmarkCircle24Filled style={{ color: step.color, fontSize: 24, flexShrink: 0 }} />
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: theme.palette.text.primary,
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {detail}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Grid>

                            <Grid size={{ xs:12, md:6 }}>
                                <Card
                                    sx={{
                                        borderRadius: 4,
                                        overflow: 'hidden',
                                        boxShadow: `0 20px 60px ${step.color}30`,
                                        border: `2px solid ${step.color}30`,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: `0 24px 80px ${step.color}40`,
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            height: 350,
                                            background: `linear-gradient(135deg, ${step.color}15 0%, ${step.color}05 100%)`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                fontSize: '8rem',
                                                opacity: 0.3,
                                                animation: 'pulse 2s ease-in-out infinite',
                                                '@keyframes pulse': {
                                                    '0%, 100%': { transform: 'scale(1)', opacity: 0.3 },
                                                    '50%': { transform: 'scale(1.1)', opacity: 0.5 },
                                                },
                                            }}
                                        >
                                            {React.cloneElement(step.icon, { style: { fontSize: '8rem', color: step.color } })}
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                ))}
            </Container>

            <Box
                sx={{
                    bgcolor: theme.palette.background.paper,
                    py: { xs: 8, md: 12 },
                    borderTop: `1px solid ${theme.palette.divider}`,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                }}
            >
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 800,
                                color: theme.palette.text.heading,
                                mb: 2,
                            }}
                        >
                            Powerful Features Built In
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: theme.palette.text.secondary,
                                maxWidth: 600,
                                mx: 'auto',
                            }}
                        >
                            Everything you need to create a stunning website
                        </Typography>
                    </Box>
                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid size={{ xs:12, sm:6, md:3 }} key={index}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        p: 3,
                                        textAlign: 'center',
                                        bgcolor: theme.palette.background.default,
                                        border: `1px solid ${theme.palette.divider}`,
                                        borderRadius: 3,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: `0 12px 32px ${theme.palette.primary.main}20`,
                                            borderColor: theme.palette.primary.main,
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 64,
                                            height: 64,
                                            borderRadius: '50%',
                                            bgcolor: `${theme.palette.primary.main}15`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mx: 'auto',
                                            mb: 2,
                                            color: theme.palette.primary.main,
                                        }}
                                    >
                                        {feature.icon}
                                    </Box>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            color: theme.palette.text.heading,
                                            mb: 1,
                                        }}
                                    >
                                        {feature.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        {feature.description}
                                    </Typography>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
         <TestimonialsSlider testimonials={testimonials}/>
        </Box>
    );
};

export default HowItWorksPage;