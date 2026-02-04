/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
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
    Stack,
    useTheme,
    alpha,
    IconButton
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import {
    PlayArrow as PlayIcon,
    Movie as MovieIcon,
    AutoAwesome as SparklesIcon,
    Speed as SpeedIcon,
    HighQuality as HdIcon,
    Palette as PaletteIcon,
    ArrowForward as ArrowRightIcon,
    Check as CheckIcon,
    Close as CloseIcon,
    Star as StarIcon,
    PhotoCamera as CameraIcon,
    Videocam as VideocamIcon,
    Edit as EditIcon
} from '@mui/icons-material';
import FAQSection from '../FAQ';
import ConsultantForm from '../ConsultantForm';
import PricingSection from '../PricingSection';
import { useGetAllFAQ } from '../../Hooks/general';

// Keyframe Animations
const float = keyframes`
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(2deg); }
`;

const fadeInUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.background.default,
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at 20% 50%, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 50%),
                     radial-gradient(circle at 80% 80%, ${alpha(theme.palette.secondary.main, 0.15)} 0%, transparent 50%)`,
        pointerEvents: 'none'
    }
}));

const GradientText = styled(Typography)(({ theme }) => ({
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'inline-block',
    fontWeight: 800
}));

const VideoPreviewCard = styled(Card)(({ theme }) => ({
    position: 'relative',
    background: alpha(theme.palette.background.paper, 0.6),
    backdropFilter: 'blur(20px)',
    border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
    borderRadius: theme.spacing(3),
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        transform: 'translateY(-8px) scale(1.02)',
        boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.3)}`,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.4)}`
    },
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
        opacity: 0,
        transition: 'opacity 0.4s ease',
    },
    '&:hover::before': {
        opacity: 1
    }
}));

const FeatureBox = styled(Box)(({ theme }) => ({
    background: alpha(theme.palette.background.paper, 0.5),
    backdropFilter: 'blur(10px)',
    border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
    transition: 'all 0.3s ease',
    '&:hover': {
        background: alpha(theme.palette.background.paper, 0.7),
        borderColor: theme.palette.primary.main,
        transform: 'translateY(-4px)',
    }
}));

const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: '50px',
    padding: '16px 40px',
    fontSize: '16px',
    fontWeight: 700,
    textTransform: 'none',
    letterSpacing: '0.5px',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: `linear-gradient(90deg, transparent, ${alpha('#fff', 0.3)}, transparent)`,
        transition: 'left 0.5s ease'
    },
    '&:hover::before': {
        left: '100%'
    }
}));

const PlayButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 80,
    height: 80,
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    color: theme.palette.primary.contrastText,
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translate(-50%, -50%) scale(1.1)',
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
    },
    '& .MuiSvgIcon-root': {
        fontSize: 40
    }
}));

const StatBox = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    animation: `${fadeInUp} 0.8s ease forwards`,
    opacity: 0,
    '&:nth-of-type(1)': { animationDelay: '0.1s' },
    '&:nth-of-type(2)': { animationDelay: '0.2s' },
    '&:nth-of-type(3)': { animationDelay: '0.3s' },
    '&:nth-of-type(4)': { animationDelay: '0.4s' }
}));

export default function AIVideoGeneratorHome() {
    const theme = useTheme();
    const [hoveredVideo, setHoveredVideo] = useState(null);
    const { data: faqs, loading: faqLoading } = useGetAllFAQ()

    const videoExamples = [
        { id: 1, title: 'Product Showcase', duration: '0:30', thumbnail: '🎬' },
        { id: 2, title: 'Brand Story', duration: '1:00', thumbnail: '🎥' },
        { id: 3, title: 'Social Media Ad', duration: '0:15', thumbnail: '📱' },
        { id: 4, title: 'Tutorial Video', duration: '2:30', thumbnail: '🎓' }
    ];

    const features = [
        {
            icon: <SparklesIcon sx={{ fontSize: 48 }} />,
            title: 'AI-Powered Magic',
            description: 'Transform text into stunning video content with advanced AI that understands narrative, pacing, and visual storytelling'
        },
        {
            icon: <SpeedIcon sx={{ fontSize: 48 }} />,
            title: 'Lightning Fast',
            description: 'Generate professional videos in minutes, not hours. From concept to final render at unprecedented speed'
        },
        {
            icon: <HdIcon sx={{ fontSize: 48 }} />,
            title: '4K Quality',
            description: 'Crystal-clear output in up to 4K resolution with cinematic color grading and professional-grade rendering'
        },
        {
            icon: <PaletteIcon sx={{ fontSize: 48 }} />,
            title: 'Full Customization',
            description: 'Fine-tune every aspect - styles, transitions, effects, music, voiceover, and timing to match your vision'
        }
    ];

    const testimonials = [
        {
            name: 'Alex Rivera',
            role: 'Marketing Director',
            company: 'TechFlow Inc',
            avatar: 'AR',
            rating: 5,
            text: 'This tool has revolutionized our content production. We went from spending weeks on video creation to generating multiple high-quality videos daily.'
        },
        {
            name: 'Jordan Kim',
            role: 'Content Creator',
            company: 'Independent',
            avatar: 'JK',
            rating: 5,
            text: 'As a solo creator, this AI is like having an entire production team. The quality is incredible and my audience engagement has tripled.'
        },
        {
            name: 'Morgan Foster',
            role: 'Creative Director',
            company: 'Pulse Media',
            avatar: 'MF',
            rating: 5,
            text: 'The creative possibilities are endless. We\'ve used it for everything from social campaigns to full product launches. Game-changing technology.'
        }
    ];

    return (
        <Box sx={{ background: theme.palette.background.default, color: theme.palette.text.primary }}>
            {/* Hero Section */}
            <HeroSection>
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, py: { xs: 8, md: 12 } }}>
                    <Grid container spacing={6} alignItems="center">
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box sx={{ animation: `${fadeInUp} 1s ease forwards` }}>
                                {/* Badge */}
                                <Chip
                                    icon={<StarIcon sx={{ fontSize: 20, color: `${theme.palette.warning.main} !important` }} />}
                                    label="Over 500,000 videos created"
                                    sx={{
                                        mb: 3,
                                        background: alpha(theme.palette.primary.main, 0.15),
                                        border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                                        color: theme.palette.text.primary,
                                        fontWeight: 600,
                                        fontSize: '14px',
                                        py: 2.5,
                                        backdropFilter: 'blur(10px)'
                                    }}
                                />

                                {/* Heading */}
                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
                                        fontWeight: 900,
                                        lineHeight: 1.1,
                                        mb: 3,
                                        letterSpacing: '-0.02em'
                                    }}
                                >
                                    Create Cinematic
                                    <br />
                                    <GradientText variant="h1" component="span" sx={{ fontSize: 'inherit' }}>
                                        AI Videos
                                    </GradientText>
                                    <br />
                                    in Minutes
                                </Typography>

                                {/* Subtitle */}
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: { xs: '1.1rem', md: '1.3rem' },
                                        color: theme.palette.text.secondary,
                                        mb: 5,
                                        lineHeight: 1.7,
                                        maxWidth: '540px'
                                    }}
                                >
                                    Transform your ideas into stunning video content with the power of advanced AI.
                                    No cameras, no editing skills required.
                                </Typography>

                                {/* CTA Buttons */}
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 6 }}>
                                    <StyledButton
                                        variant="contained"
                                        size="large"
                                        endIcon={<ArrowRightIcon />}
                                        sx={{
                                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                            color: theme.palette.primary.contrastText,
                                            boxShadow: `0 10px 40px ${alpha(theme.palette.primary.main, 0.4)}`,
                                            '&:hover': {
                                                boxShadow: `0 15px 50px ${alpha(theme.palette.primary.main, 0.6)}`,
                                            }
                                        }}
                                    >
                                        Start Creating Free
                                    </StyledButton>
                                    <StyledButton
                                        variant="outlined"
                                        size="large"
                                        startIcon={<PlayIcon />}
                                        sx={{
                                            borderColor: alpha(theme.palette.text.primary, 0.3),
                                            color: theme.palette.text.primary,
                                            '&:hover': {
                                                borderColor: theme.palette.primary.main,
                                                background: alpha(theme.palette.primary.main, 0.1)
                                            }
                                        }}
                                    >
                                        Watch Demo
                                    </StyledButton>
                                </Stack>

                                {/* Quick Stats */}
                                <Grid container spacing={4}>
                                    <Grid item xs={4}>
                                        <StatBox>
                                            <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                                                500K+
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                                Videos Created
                                            </Typography>
                                        </StatBox>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <StatBox>
                                            <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                                                4K
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                                Max Quality
                                            </Typography>
                                        </StatBox>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <StatBox>
                                            <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                                                3 Min
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                                Avg. Generation
                                            </Typography>
                                        </StatBox>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box sx={{ position: 'relative' }}>
                                <Grid container spacing={2}>
                                    {videoExamples.map((video, index) => (
                                        <Grid size={{ xs: 6 }} key={video.id}>
                                            <VideoPreviewCard
                                                onMouseEnter={() => setHoveredVideo(video.id)}
                                                onMouseLeave={() => setHoveredVideo(null)}
                                                sx={{
                                                    animation: `${float} ${3 + index * 0.5}s ease-in-out infinite`,
                                                    animationDelay: `${index * 0.2}s`
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        aspectRatio: '16/9',
                                                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.3)} 0%, ${alpha(theme.palette.secondary.main, 0.3)} 100%)`,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '4rem',
                                                        position: 'relative'
                                                    }}
                                                >
                                                    {video.thumbnail}
                                                    {hoveredVideo === video.id && (
                                                        <PlayButton>
                                                            <PlayIcon />
                                                        </PlayButton>
                                                    )}
                                                </Box>
                                                <CardContent>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                                                        {video.title}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                                                        {video.duration}
                                                    </Typography>
                                                </CardContent>
                                            </VideoPreviewCard>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </HeroSection>

            <Box sx={{ py: { xs: 10, md: 16 }, position: 'relative' }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 10 }}>
                        <Chip
                            label="POWERFUL FEATURES"
                            sx={{
                                mb: 2,
                                background: alpha(theme.palette.primary.main, 0.15),
                                color: theme.palette.primary.main,
                                fontWeight: 700,
                                letterSpacing: '1px'
                            }}
                        />
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: '2rem', md: '3.5rem' },
                                fontWeight: 900,
                                mb: 2,
                                letterSpacing: '-0.02em'
                            }}
                        >
                            Everything You Need to Create
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: theme.palette.text.secondary,
                                maxWidth: '700px',
                                mx: 'auto',
                                fontSize: '1.1rem'
                            }}
                        >
                            Professional video creation tools powered by cutting-edge artificial intelligence
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid size={{ xs: 12, sm: 6 }} key={index}>
                                <FeatureBox>
                                    <Box
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: '20px',
                                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mb: 3,
                                            color: theme.palette.primary.contrastText
                                        }}
                                    >
                                        {feature.icon}
                                    </Box>
                                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: theme.palette.text.secondary, lineHeight: 1.8 }}>
                                        {feature.description}
                                    </Typography>
                                </FeatureBox>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* How It Works */}
            <Box sx={{ py: { xs: 10, md: 16 }, background: alpha(theme.palette.primary.main, 0.03) }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 10 }}>
                        <Chip
                            label="SIMPLE PROCESS"
                            sx={{
                                mb: 2,
                                background: alpha(theme.palette.primary.main, 0.15),
                                color: theme.palette.primary.main,
                                fontWeight: 700,
                                letterSpacing: '1px'
                            }}
                        />
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: '2rem', md: '3.5rem' },
                                fontWeight: 900,
                                mb: 2,
                                letterSpacing: '-0.02em'
                            }}
                        >
                            From Idea to Video in 3 Steps
                        </Typography>
                    </Box>

                    <Grid container spacing={6}>
                        {[
                            {
                                step: '01',
                                icon: <EditIcon sx={{ fontSize: 50 }} />,
                                title: 'Describe Your Vision',
                                desc: 'Simply type what you want to create. Our AI understands context, tone, and style.'
                            },
                            {
                                step: '02',
                                icon: <SparklesIcon sx={{ fontSize: 50 }} />,
                                title: 'AI Generates Magic',
                                desc: 'Watch as advanced AI creates your video with perfect pacing, visuals, and transitions.'
                            },
                            {
                                step: '03',
                                icon: <MovieIcon sx={{ fontSize: 50 }} />,
                                title: 'Export & Share',
                                desc: 'Download in any format or share directly to social media. It\'s that simple.'
                            }
                        ].map((step, index) => (
                            <Grid size={{ xs: 12, md: 4 }} key={index}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography
                                        variant="h2"
                                        sx={{
                                            fontSize: '6rem',
                                            fontWeight: 900,
                                            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.3)} 0%, ${alpha(theme.palette.secondary.main, 0.3)} 100%)`,
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            mb: 2
                                        }}
                                    >
                                        {step.step}
                                    </Typography>
                                    <Box
                                        sx={{
                                            color: theme.palette.primary.main,
                                            mb: 3
                                        }}
                                    >
                                        {step.icon}
                                    </Box>
                                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
                                        {step.title}
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: theme.palette.text.secondary, lineHeight: 1.8 }}>
                                        {step.desc}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Pricing Section */}
            <Box sx={{ py: { xs: 10, md: 16 } }}>
                <Container maxWidth="lg">
                    <PricingSection />
                </Container>
            </Box>

            {/* Testimonials */}
            <Box sx={{ py: { xs: 10, md: 16 }, background: alpha(theme.palette.primary.main, 0.03) }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 10 }}>
                        <Chip
                            label="TESTIMONIALS"
                            sx={{
                                mb: 2,
                                background: alpha(theme.palette.primary.main, 0.15),
                                color: theme.palette.primary.main,
                                fontWeight: 700,
                                letterSpacing: '1px'
                            }}
                        />
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: '2rem', md: '3.5rem' },
                                fontWeight: 900,
                                mb: 2,
                                letterSpacing: '-0.02em'
                            }}
                        >
                            Trusted by Creators Worldwide
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {testimonials.map((testimonial, index) => (
                            <Grid size={{ xs: 12, md: 4 }} key={index}>
                                <Card
                                    sx={{
                                        background: alpha(theme.palette.background.paper, 0.5),
                                        backdropFilter: 'blur(20px)',
                                        border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
                                        borderRadius: 3,
                                        p: 4,
                                        height: '100%'
                                    }}
                                >
                                    <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <StarIcon key={i} sx={{ color: theme.palette.warning.main, fontSize: 20 }} />
                                        ))}
                                    </Box>

                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: theme.palette.text.primary,
                                            mb: 4,
                                            lineHeight: 1.8,
                                            fontStyle: 'italic'
                                        }}
                                    >
                                        "{testimonial.text}"
                                    </Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar
                                            sx={{
                                                width: 50,
                                                height: 50,
                                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                                fontWeight: 700
                                            }}
                                        >
                                            {testimonial.avatar}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                                {testimonial.name}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                                {testimonial.role}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: theme.palette.text.disabled }}>
                                                {testimonial.company}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* CTA Section */}
            <Box
                sx={{
                    py: { xs: 10, md: 16 },
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.secondary.main, 0.15)} 100%)`,
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <Container maxWidth="md">
                    <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: '2rem', md: '3.5rem' },
                                fontWeight: 900,
                                mb: 3,
                                letterSpacing: '-0.02em'
                            }}
                        >
                            Ready to Create Your First Video?
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: theme.palette.text.secondary,
                                mb: 5,
                                fontSize: '1.1rem',
                                lineHeight: 1.7
                            }}
                        >
                            Join thousands of creators who are already transforming their ideas into stunning videos with AI
                        </Typography>
                        <StyledButton
                            variant="contained"
                            size="large"
                            endIcon={<ArrowRightIcon />}
                            sx={{
                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                color: theme.palette.primary.contrastText,
                                boxShadow: `0 10px 40px ${alpha(theme.palette.primary.main, 0.4)}`,
                                px: 6,
                                py: 2,
                                fontSize: '18px',
                                '&:hover': {
                                    boxShadow: `0 15px 50px ${alpha(theme.palette.primary.main, 0.6)}`,
                                }
                            }}
                        >
                            Start Creating for Free
                        </StyledButton>
                    </Box>
                </Container>
            </Box>
            <ConsultantForm />
            <FAQSection data={faqs} loading={faqLoading} />
        </Box>
    );
}