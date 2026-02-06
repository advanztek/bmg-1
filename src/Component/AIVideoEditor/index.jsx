/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    Grid,
    Chip,
    Avatar,
    Stack,
    useTheme,
    alpha
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import {
    VideoLibrary as VideoIcon,
    AutoFixHigh as MagicIcon,
    ContentCut as CutIcon,
    Tune as TuneIcon,
    GraphicEq as AudioIcon,
    TextFields as TextIcon,
    ArrowForward as ArrowRightIcon,
    Check as CheckIcon,
    Star as StarIcon,
    PlayCircle as PlayIcon,
    Timeline as TimelineIcon,
    Brush as BrushIcon,
    FilterVintage as FilterIcon,
    Animation as AnimationIcon
} from '@mui/icons-material';
import ConsultantForm from '../ConsultantForm';
import FAQSection from '../FAQ';
import PricingSection from '../PricingSection';
import { useGetAllFAQ } from '../../Hooks/general';

// Keyframe Animations
const waveAnimation = keyframes`
    0%, 100% { transform: scaleY(0.5); }
    50% { transform: scaleY(1); }
`;

const slideShow = keyframes`
    0%, 100% { opacity: 0; transform: translateX(-20px); }
    10%, 90% { opacity: 1; transform: translateX(0); }
`;

const float = keyframes`
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
`;

const fadeInUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(40px);
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
        background: `
            linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 50%),
            linear-gradient(225deg, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 50%)
        `,
        pointerEvents: 'none'
    }
}));

const VideoTimeline = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80%',
    height: '100px',
    background: alpha(theme.palette.background.paper, 0.8),
    backdropFilter: 'blur(20px)',
    border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
    opacity: 0.6
}));

const TimelineClip = styled(Box)(({ theme, width, delay }) => ({
    height: '60px',
    width: width,
    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.6)} 0%, ${alpha(theme.palette.secondary.main, 0.6)} 100%)`,
    borderRadius: theme.spacing(1),
    border: `2px solid ${alpha(theme.palette.primary.main, 0.8)}`,
    position: 'relative',
    animation: `${slideShow} 8s ease-in-out infinite`,
    animationDelay: `${delay}s`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px'
}));

const GradientText = styled(Typography)(({ theme }) => ({
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'inline-block',
    fontWeight: 900
}));

const FeatureCard = styled(Card)(({ theme }) => ({
    background: alpha(theme.palette.background.paper, 0.6),
    backdropFilter: 'blur(20px)',
    border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
    borderRadius: theme.spacing(3),
    padding: theme.spacing(4),
    height: '100%',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
        transform: 'translateY(-10px)',
        border: `1px solid ${theme.palette.primary.main}`,
        boxShadow: `0 25px 70px ${alpha(theme.palette.primary.main, 0.3)}`,
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        transform: 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.4s ease'
    },
    '&:hover::after': {
        transform: 'scaleX(1)'
    }
}));

const VideoPreviewBox = styled(Box)(({ theme }) => ({
    background: alpha(theme.palette.background.paper, 0.8),
    backdropFilter: 'blur(10px)',
    border: `2px solid ${alpha(theme.palette.text.primary, 0.1)}`,
    borderRadius: theme.spacing(3),
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        border: `2px solid ${theme.palette.primary.main}`,
        boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.4)}`
    }
}));

const PricingCard = styled(Box)(({ theme, featured }) => ({
    background: featured
        ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.secondary.main, 0.15)} 100%)`
        : alpha(theme.palette.background.paper, 0.5),
    backdropFilter: 'blur(20px)',
    border: featured
        ? `2px solid ${theme.palette.primary.main}`
        : `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
    borderRadius: theme.spacing(3),
    padding: theme.spacing(5),
    height: '100%',
    position: 'relative',
    transition: 'all 0.4s ease',
    '&:hover': {
        transform: featured ? 'translateY(-12px) scale(1.02)' : 'translateY(-8px)',
        boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.3)}`
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

const ToolIcon = styled(Box)(({ theme, delay }) => ({
    width: 60,
    height: 60,
    borderRadius: '50%',
    background: alpha(theme.palette.background.paper, 0.8),
    backdropFilter: 'blur(10px)',
    border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.main,
    animation: `${float} ${3 + delay * 0.5}s ease-in-out infinite`,
    animationDelay: `${delay * 0.2}s`
}));

export default function AIVideoEditorHome() {
    const { data: faqs, loading: faqLoading } = useGetAllFAQ()
    const theme = useTheme();
    const [activeFeature, setActiveFeature] = useState(0);

    const videoClips = [
        { emoji: '🎬', width: '20%' },
        { emoji: '🎥', width: '25%' },
        { emoji: '📹', width: '15%' },
        { emoji: '🎞️', width: '30%' }
    ];

    const features = [
        {
            icon: <MagicIcon sx={{ fontSize: 48 }} />,
            title: 'AI Auto-Edit',
            description: 'Intelligent scene detection and automatic editing that understands pacing, transitions, and story flow'
        },
        {
            icon: <CutIcon sx={{ fontSize: 48 }} />,
            title: 'Smart Trimming',
            description: 'Remove silences, awkward pauses, and filler words automatically with AI precision'
        },
        {
            icon: <FilterIcon sx={{ fontSize: 48 }} />,
            title: 'Professional Effects',
            description: 'Hollywood-grade color grading, filters, and visual effects applied with one click'
        },
        {
            icon: <TextIcon sx={{ fontSize: 48 }} />,
            title: 'Auto Captions',
            description: 'AI-generated subtitles and captions in 50+ languages with perfect timing'
        },
        {
            icon: <AudioIcon sx={{ fontSize: 48 }} />,
            title: 'Audio Enhancement',
            description: 'Professional audio mixing, noise reduction, and background music suggestions'
        },
        {
            icon: <AnimationIcon sx={{ fontSize: 48 }} />,
            title: 'Motion Graphics',
            description: 'Dynamic titles, lower thirds, and animated elements that elevate your content'
        }
    ];

    const editingTools = [
        { icon: <CutIcon />, label: 'Cut' },
        { icon: <BrushIcon />, label: 'Paint' },
        { icon: <FilterIcon />, label: 'Filter' },
        { icon: <TextIcon />, label: 'Text' },
        { icon: <AudioIcon />, label: 'Audio' },
        { icon: <TuneIcon />, label: 'Adjust' }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % features.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box sx={{ background: theme.palette.background.default, color: theme.palette.text.primary }}>
            {/* Hero Section */}
            <HeroSection>
                {/* Floating Tool Icons */}
                <Box sx={{ position: 'absolute', top: '20%', left: '10%', display: { xs: 'none', md: 'block' } }}>
                    <ToolIcon delay={0}>
                        <CutIcon sx={{ fontSize: 30 }} />
                    </ToolIcon>
                </Box>
                <Box sx={{ position: 'absolute', top: '30%', right: '15%', display: { xs: 'none', md: 'block' } }}>
                    <ToolIcon delay={1}>
                        <FilterIcon sx={{ fontSize: 30 }} />
                    </ToolIcon>
                </Box>
                <Box sx={{ position: 'absolute', bottom: '35%', right: '8%', display: { xs: 'none', md: 'block' } }}>
                    <ToolIcon delay={2}>
                        <TextIcon sx={{ fontSize: 30 }} />
                    </ToolIcon>
                </Box>

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, py: { xs: 8, md: 12 } }}>
                    <Grid container spacing={6} alignItems="center">
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box sx={{ animation: `${fadeInUp} 1s ease forwards` }}>
                                <Chip
                                    icon={<VideoIcon sx={{ fontSize: 18, color: `${theme.palette.primary.main} !important` }} />}
                                    label="Trusted by 250,000+ content creators"
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
                                    Edit Videos Like
                                    <br />
                                    <GradientText variant="h1" component="span" sx={{ fontSize: 'inherit' }}>
                                        A Pro Editor
                                    </GradientText>
                                    <br />
                                    With AI
                                </Typography>

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
                                    Professional video editing powered by AI. Cut hours of work into minutes with
                                    intelligent automation and creative tools.
                                </Typography>

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
                                        Start Editing Free
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
                                        Watch Tutorial
                                    </StyledButton>
                                </Stack>

                                <Grid container spacing={4}>
                                    {[
                                        { value: '250K+', label: 'Active Users' },
                                        { value: '5M+', label: 'Videos Edited' },
                                        { value: '10x', label: 'Faster Editing' }
                                    ].map((stat, idx) => (
                                        <Grid item xs={4} key={idx}>
                                            <Box sx={{ animation: `${fadeInUp} 0.8s ease forwards`, animationDelay: `${0.2 + idx * 0.1}s`, opacity: 0 }}>
                                                <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                                                    {stat.value}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                                    {stat.label}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box sx={{ position: 'relative' }}>
                                <VideoPreviewBox>
                                    <Box
                                        sx={{
                                            aspectRatio: '16/9',
                                            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.3)} 0%, ${alpha(theme.palette.secondary.main, 0.3)} 100%)`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative'
                                        }}
                                    >
                                        <PlayIcon sx={{ fontSize: 100, color: theme.palette.primary.main, opacity: 0.8 }} />

                                        {/* Audio Waveform Visualization */}
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                bottom: 20,
                                                left: 20,
                                                right: 20,
                                                height: 60,
                                                display: 'flex',
                                                gap: 0.5,
                                                alignItems: 'flex-end'
                                            }}
                                        >
                                            {[...Array(40)].map((_, i) => (
                                                <Box
                                                    key={i}
                                                    sx={{
                                                        flex: 1,
                                                        height: `${30 + Math.random() * 70}%`,
                                                        background: alpha(theme.palette.primary.main, 0.6),
                                                        borderRadius: '2px',
                                                        animation: `${waveAnimation} 1s ease-in-out infinite`,
                                                        animationDelay: `${i * 0.05}s`
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                </VideoPreviewBox>

                                {/* Tool Icons Grid */}
                                <Box sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        {editingTools.map((tool, idx) => (
                                            <Grid size={{ xs: 4 }} key={idx}>
                                                <Box
                                                    sx={{
                                                        background: alpha(theme.palette.background.paper, 0.6),
                                                        backdropFilter: 'blur(10px)',
                                                        border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
                                                        borderRadius: 2,
                                                        p: 2,
                                                        textAlign: 'center',
                                                        transition: 'all 0.3s ease',
                                                        cursor: 'pointer',
                                                        '&:hover': {
                                                            background: alpha(theme.palette.primary.main, 0.1),
                                                            border: `1px solid ${theme.palette.primary.main}`,
                                                            transform: 'translateY(-4px)'
                                                        }
                                                    }}
                                                >
                                                    <Box sx={{ color: theme.palette.primary.main, mb: 1 }}>
                                                        {tool.icon}
                                                    </Box>
                                                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                                        {tool.label}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>

                {/* Animated Timeline at Bottom */}
                <VideoTimeline sx={{ display: { xs: 'none', lg: 'flex' } }}>
                    {videoClips.map((clip, idx) => (
                        <TimelineClip key={idx} width={clip.width} delay={idx * 2}>
                            {clip.emoji}
                        </TimelineClip>
                    ))}
                </VideoTimeline>
            </HeroSection>

            {/* Features Section */}
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
                            Everything You Need to Create Stunning Videos
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
                            Professional editing tools enhanced with artificial intelligence
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                                <FeatureCard>
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
                                </FeatureCard>
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
                            label="SIMPLE WORKFLOW"
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
                            Edit Like a Pro in 3 Steps
                        </Typography>
                    </Box>

                    <Grid container spacing={6}>
                        {[
                            {
                                step: '01',
                                icon: <VideoIcon sx={{ fontSize: 50 }} />,
                                title: 'Upload Your Footage',
                                desc: 'Import videos from any source - camera, phone, or cloud storage'
                            },
                            {
                                step: '02',
                                icon: <MagicIcon sx={{ fontSize: 50 }} />,
                                title: 'Let AI Do the Work',
                                desc: 'AI analyzes and edits your video with professional techniques'
                            },
                            {
                                step: '03',
                                icon: <TimelineIcon sx={{ fontSize: 50 }} />,
                                title: 'Polish & Export',
                                desc: 'Fine-tune details and export in any format for any platform'
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
                                    <Box sx={{ color: theme.palette.primary.main, mb: 3 }}>
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

            <Box sx={{ py: { xs: 10, md: 16 } }}>
                <Container maxWidth="lg">
                    <PricingSection />
                </Container>
            </Box>
            <ConsultantForm />
            <FAQSection data={faqs} loading={faqLoading} />
        </Box>
    );
}