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
    TrendingUp as TrendingUpIcon,
    Psychology as BrainIcon,
    Assessment as ChartIcon,
    Lightbulb as IdeaIcon,
    AccountTree as NetworkIcon,
    Speed as SpeedIcon,
    ArrowForward as ArrowRightIcon,
    Check as CheckIcon,
    Star as StarIcon,
    Business as BusinessIcon,
    Timeline as TimelineIcon,
    Insights as InsightsIcon,
    Analytics as AnalyticsIcon,
    Flag as FlagIcon,
    Groups as GroupsIcon
} from '@mui/icons-material';
import ConsultantForm from '../ConsultantForm';
import FAQSection from '../FAQ';

// Keyframe Animations
const dataFlow = keyframes`
    0% { transform: translateX(-100%); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateX(100%); opacity: 0; }
`;

const chartGrow = keyframes`
    from { transform: scaleY(0); }
    to { transform: scaleY(1); }
`;

const pulse = keyframes`
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
`;

const float = keyframes`
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
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
            radial-gradient(circle at 20% 30%, ${alpha(theme.palette.primary.main, 0.12)} 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, ${alpha(theme.palette.info.main, 0.12)} 0%, transparent 50%)
        `,
        pointerEvents: 'none'
    }
}));

const DataViz = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    right: '5%',
    transform: 'translateY(-50%)',
    width: '300px',
    height: '300px',
    opacity: 0.15,
    pointerEvents: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    justifyContent: 'center'
}));

const DataBar = styled(Box)(({ theme, height, delay }) => ({
    height: height,
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.info.main} 100%)`,
    borderRadius: theme.spacing(1),
    animation: `${chartGrow} 1s ease forwards`,
    animationDelay: `${delay}s`,
    transformOrigin: 'bottom',
    transform: 'scaleY(0)'
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
    position: 'relative',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        transform: 'translateY(-10px)',
        border: `1px solid ${theme.palette.primary.main}`,
        boxShadow: `0 25px 70px ${alpha(theme.palette.primary.main, 0.25)}`,
    },
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        transform: 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.4s ease'
    },
    '&:hover::before': {
        transform: 'scaleX(1)'
    }
}));

const MetricCard = styled(Box)(({ theme }) => ({
    background: alpha(theme.palette.background.paper, 0.8),
    backdropFilter: 'blur(10px)',
    border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3),
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
        transform: 'translateY(-8px)',
        border: `1px solid ${theme.palette.primary.main}`,
        boxShadow: `0 15px 40px ${alpha(theme.palette.primary.main, 0.3)}`
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

const InsightBox = styled(Box)(({ theme, delay }) => ({
    background: alpha(theme.palette.background.paper, 0.6),
    backdropFilter: 'blur(10px)',
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
    animation: `${float} ${3 + delay * 0.5}s ease-in-out infinite`,
    animationDelay: `${delay * 0.3}s`
}));

export default function AIBusinessStrategyHome() {
    const theme = useTheme();
    const [activeMetric, setActiveMetric] = useState(0);

    const metrics = [
        { value: '45%', label: 'Revenue Growth', icon: <TrendingUpIcon /> },
        { value: '10x', label: 'ROI Increase', icon: <ChartIcon /> },
        { value: '80%', label: 'Time Saved', icon: <SpeedIcon /> },
        { value: '95%', label: 'Success Rate', icon: <FlagIcon /> }
    ];

    const features = [
        {
            icon: <BrainIcon sx={{ fontSize: 48 }} />,
            title: 'AI-Powered Insights',
            description: 'Deep learning algorithms analyze market trends, competitors, and opportunities to provide actionable intelligence'
        },
        {
            icon: <ChartIcon sx={{ fontSize: 48 }} />,
            title: 'Data-Driven Strategies',
            description: 'Make confident decisions backed by comprehensive data analysis and predictive modeling'
        },
        {
            icon: <TimelineIcon sx={{ fontSize: 48 }} />,
            title: 'Growth Forecasting',
            description: 'Accurate projections of market dynamics, revenue potential, and strategic opportunities'
        },
        {
            icon: <NetworkIcon sx={{ fontSize: 48 }} />,
            title: 'Strategic Roadmaps',
            description: 'Clear, actionable plans with milestones, KPIs, and resource allocation recommendations'
        },
        {
            icon: <InsightsIcon sx={{ fontSize: 48 }} />,
            title: 'Competitive Analysis',
            description: 'Deep dive into competitor strategies, market positioning, and differentiation opportunities'
        },
        {
            icon: <IdeaIcon sx={{ fontSize: 48 }} />,
            title: 'Innovation Planning',
            description: 'Identify emerging trends, disruptive technologies, and innovation opportunities'
        }
    ];

    const plans = [
        {
            name: 'Startup',
            price: '99',
            period: '/month',
            features: [
                '5 strategic analyses',
                'Basic market insights',
                'Quarterly reports',
                'Email support',
                'Core AI features'
            ],
            featured: false
        },
        {
            name: 'Growth',
            price: '299',
            period: '/month',
            features: [
                'Unlimited analyses',
                'Advanced insights',
                'Monthly reports',
                'Priority support',
                'Full AI capabilities',
                'Custom dashboards',
                'Team collaboration',
                'API access'
            ],
            featured: true
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            period: '',
            features: [
                'Everything in Growth',
                'Dedicated strategist',
                'Custom AI training',
                'White-label solution',
                'SLA guarantee',
                'Advanced integrations',
                'Executive workshops'
            ],
            featured: false
        }
    ];

    const insights = [
        { icon: '📊', text: 'Market Analysis' },
        { icon: '💡', text: 'Innovation' },
        { icon: '🎯', text: 'Goal Setting' },
        { icon: '📈', text: 'Growth Plan' },
        { icon: '🔍', text: 'Research' },
        { icon: '⚡', text: 'Execution' }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveMetric((prev) => (prev + 1) % metrics.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box sx={{ background: theme.palette.background.default, color: theme.palette.text.primary }}>
            {/* Hero Section */}
            <HeroSection>
                <DataViz sx={{ display: { xs: 'none', lg: 'flex' } }}>
                    {[60, 80, 45, 90, 70, 85, 55].map((height, idx) => (
                        <DataBar key={idx} height={`${height}%`} delay={idx * 0.1} />
                    ))}
                </DataViz>

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, py: { xs: 8, md: 12 } }}>
                    <Grid container spacing={6} alignItems="center">
                        <Grid size={{ xs:12, md:6 }}>
                            <Box sx={{ animation: `${fadeInUp} 1s ease forwards` }}>
                                <Chip
                                    icon={<BusinessIcon sx={{ fontSize: 18, color: `${theme.palette.primary.main} !important` }} />}
                                    label="Trusted by 5,000+ businesses worldwide"
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
                                    Strategic Business
                                    <br />
                                    <GradientText variant="h1" component="span" sx={{ fontSize: 'inherit' }}>
                                        Intelligence
                                    </GradientText>
                                    <br />
                                    Powered by AI
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
                                    Transform your business with AI-driven strategic insights. Make smarter decisions, 
                                    accelerate growth, and stay ahead of the competition.
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
                                        Get Strategic Analysis
                                    </StyledButton>
                                    <StyledButton
                                        variant="outlined"
                                        size="large"
                                        startIcon={<AnalyticsIcon />}
                                        sx={{
                                            borderColor: alpha(theme.palette.text.primary, 0.3),
                                            color: theme.palette.text.primary,
                                            '&:hover': {
                                                borderColor: theme.palette.primary.main,
                                                background: alpha(theme.palette.primary.main, 0.1)
                                            }
                                        }}
                                    >
                                        View Case Studies
                                    </StyledButton>
                                </Stack>

                                <Grid container spacing={3}>
                                    {[
                                        { value: '5K+', label: 'Companies' },
                                        { value: '$2.5B', label: 'Value Created' },
                                        { value: '10x', label: 'Avg ROI' }
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

                        <Grid size={{ xs:12, md:6 }}>
                            <Box sx={{ position: 'relative' }}>
                                {/* Key Metrics Grid */}
                                <Grid container spacing={2}>
                                    {metrics.map((metric, idx) => (
                                        <Grid size={{ xs:6 }} key={idx}>
                                            <MetricCard
                                                sx={{
                                                    animation: activeMetric === idx ? `${pulse} 2s ease infinite` : 'none',
                                                    border: activeMetric === idx 
                                                        ? `2px solid ${theme.palette.primary.main}` 
                                                        : `1px solid ${alpha(theme.palette.text.primary, 0.1)}`
                                                }}
                                            >
                                                <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
                                                    {metric.icon}
                                                </Box>
                                                <Typography variant="h3" sx={{ fontWeight: 900, mb: 1 }}>
                                                    {metric.value}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}>
                                                    {metric.label}
                                                </Typography>
                                            </MetricCard>
                                        </Grid>
                                    ))}
                                </Grid>

                                {/* Floating Insight Boxes */}
                                <Box sx={{ mt: 3 }}>
                                    <Grid container spacing={1.5}>
                                        {insights.map((insight, idx) => (
                                            <Grid size={{ xs:4 }} key={idx}>
                                                <InsightBox delay={idx}>
                                                    <Typography variant="body2" sx={{ fontSize: '1.5rem', textAlign: 'center', mb: 0.5 }}>
                                                        {insight.icon}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', fontWeight: 600 }}>
                                                        {insight.text}
                                                    </Typography>
                                                </InsightBox>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </HeroSection>

            {/* Features Section */}
            <Box sx={{ py: { xs: 10, md: 16 }, position: 'relative' }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 10 }}>
                        <Chip
                            label="CAPABILITIES"
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
                            Comprehensive Strategic Intelligence
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
                            Advanced AI tools designed to transform how you strategize and execute
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid size={{ xs:12, sm:6,  md:4 }} key={index}>
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
                            label="PROCESS"
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
                            Strategic Success in 4 Phases
                        </Typography>
                    </Box>

                    <Grid container spacing={6}>
                        {[
                            {
                                phase: '01',
                                icon: <AnalyticsIcon sx={{ fontSize: 50 }} />,
                                title: 'Data Collection',
                                desc: 'AI gathers comprehensive market, competitor, and internal business data'
                            },
                            {
                                phase: '02',
                                icon: <BrainIcon sx={{ fontSize: 50 }} />,
                                title: 'AI Analysis',
                                desc: 'Deep learning algorithms identify patterns, opportunities, and threats'
                            },
                            {
                                phase: '03',
                                icon: <NetworkIcon sx={{ fontSize: 50 }} />,
                                title: 'Strategy Development',
                                desc: 'Generate actionable strategies with clear roadmaps and milestones'
                            },
                            {
                                phase: '04',
                                icon: <TrendingUpIcon sx={{ fontSize: 50 }} />,
                                title: 'Execution & Growth',
                                desc: 'Implement strategies with continuous monitoring and optimization'
                            }
                        ].map((step, index) => (
                            <Grid size={{ xs:12,sm:6, md:3 }} key={index}>
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
                                        {step.phase}
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

            {/* Pricing Section */}
            <Box sx={{ py: { xs: 10, md: 16 } }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 10 }}>
                        <Chip
                            label="PRICING"
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
                            Investment That Drives Returns
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
                            Scalable solutions for startups, growth companies, and enterprises
                        </Typography>
                    </Box>

                    <Grid container spacing={4} alignItems="stretch">
                        {plans.map((plan, index) => (
                            <Grid size={{ xs:12, md:4, }} key={index}>
                                <PricingCard featured={plan.featured}>
                                    {plan.featured && (
                                        <Chip
                                            label="RECOMMENDED"
                                            sx={{
                                                position: 'absolute',
                                                top: 20,
                                                right: 20,
                                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                                color: theme.palette.primary.contrastText,
                                                fontWeight: 700,
                                                fontSize: '11px',
                                                letterSpacing: '0.5px'
                                            }}
                                        />
                                    )}
                                    
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: theme.palette.text.secondary }}>
                                        {plan.name}
                                    </Typography>
                                    
                                    <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 4 }}>
                                        <Typography variant="h2" sx={{ fontWeight: 900, fontSize: '3.5rem' }}>
                                            {plan.price === 'Custom' ? plan.price : `$${plan.price}`}
                                        </Typography>
                                        {plan.period && (
                                            <Typography variant="body1" sx={{ color: theme.palette.text.disabled, ml: 1 }}>
                                                {plan.period}
                                            </Typography>
                                        )}
                                    </Box>

                                    <Box sx={{ mb: 4 }}>
                                        {plan.features.map((feature, idx) => (
                                            <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <CheckIcon sx={{ color: theme.palette.primary.main, mr: 2, fontSize: 20 }} />
                                                <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                                                    {feature}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>

                                    <StyledButton
                                        variant={plan.featured ? 'contained' : 'outlined'}
                                        fullWidth
                                        size="large"
                                        sx={{
                                            background: plan.featured
                                                ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
                                                : 'transparent',
                                            color: plan.featured ? theme.palette.primary.contrastText : theme.palette.text.primary,
                                            borderColor: plan.featured ? 'transparent' : alpha(theme.palette.text.primary, 0.3),
                                            '&:hover': {
                                                background: plan.featured
                                                    ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`
                                                    : alpha(theme.palette.primary.main, 0.1),
                                                borderColor: theme.palette.primary.main
                                            }
                                        }}
                                    >
                                        {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                                    </StyledButton>
                                </PricingCard>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
            <ConsultantForm />
            <FAQSection/>
        </Box>
    );
}