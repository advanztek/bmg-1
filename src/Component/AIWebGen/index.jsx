import React, { useState, useEffect } from 'react';
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
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Rating,
    Stack,
    useTheme,
    alpha
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Fluent UI Icons (using Material Icons as substitute since Fluent React Icons aren't available in this environment)
// You can replace these with actual Fluent icons from @fluentui/react-icons in your project
import {
    AutoAwesome as SparklesIcon,
    Code as CodeIcon,
    FlashOn as ZapIcon,
    Dashboard as LayoutIcon,
    Palette as PaletteIcon,
    Language as GlobeIcon,
    CheckCircle as CheckIcon,
    ArrowForward as ArrowRightIcon,
    Star as StarIcon,
    People as UsersIcon,
    Security as ShieldIcon,
    Rocket as RocketIcon,
    ChevronRight as ChevronRightIcon,
    Edit as EditIcon,
    Cloud as CloudIcon,
    Speed as SpeedIcon
} from '@mui/icons-material';

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
    position: 'relative',
    minHeight: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    overflow: 'hidden',
    background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.dark} 50%, ${theme.palette.background.default} 100%)`,
}));

const AnimatedBlob = styled(Box)(({ delay = 0 }) => ({
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(80px)',
    mixBlendMode: 'multiply',
    animation: `pulse 8s ease-in-out infinite`,
    animationDelay: `${delay}s`,
    '@keyframes pulse': {
        '0%, 100%': {
            opacity: 0.3,
            transform: 'scale(1) translateY(0)',
        },
        '50%': {
            opacity: 0.5,
            transform: 'scale(1.1) translateY(-20px)',
        },
    },
}));

const GradientText = styled(Typography)(({ theme }) => ({
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'inline-block',
}));

const FeatureCard = styled(Card)(({ theme, active }) => ({
    background: active
        ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.secondary.main, 0.2)} 100%)`
        : alpha(theme.palette.text.primary, 0.05),
    backdropFilter: 'blur(10px)',
    border: active
        ? `2px solid ${alpha(theme.palette.primary.main, 0.5)}`
        : `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
    borderRadius: theme.spacing(3),
    padding: theme.spacing(4),
    height: '100%',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    '&:hover': {
        transform: 'translateY(-12px)',
        border: `2px solid ${alpha(theme.palette.primary.main, 0.8)}`,
        boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.3)}`,
    },
}));

const PricingCard = styled(Card)(({ theme, popular }) => ({
    background: popular
        ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.3)} 0%, ${alpha(theme.palette.secondary.main, 0.3)} 100%)`
        : alpha(theme.palette.text.primary, 0.05),
    backdropFilter: 'blur(10px)',
    border: popular
        ? `2px solid ${theme.palette.primary.main}`
        : `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
    borderRadius: theme.spacing(3),
    padding: theme.spacing(4),
    height: '100%',
    position: 'relative',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        transform: 'translateY(-16px)',
        boxShadow: popular
            ? `0 25px 70px ${alpha(theme.palette.primary.main, 0.4)}`
            : `0 25px 70px ${alpha(theme.palette.text.primary, 0.1)}`,
    },
}));

const StyledButton = styled(Button)(({ theme, variant }) => ({
    borderRadius: '50px',
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: variant === 'contained' ? `0 10px 30px ${alpha(theme.palette.primary.main, 0.4)}` : 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: variant === 'contained' ? `0 15px 40px ${alpha(theme.palette.primary.main, 0.6)}` : 'none',
    },
}));

const StepCard = styled(Paper)(({ theme }) => ({
    background: alpha(theme.palette.text.primary, 0.05),
    backdropFilter: 'blur(10px)',
    border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
    borderRadius: theme.spacing(3),
    padding: theme.spacing(4),
    height: '100%',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: alpha(theme.palette.text.primary, 0.08),
        transform: 'translateY(-8px)',
    },
}));

const TestimonialCard = styled(Card)(({ theme }) => ({
    background: alpha(theme.palette.text.primary, 0.05),
    backdropFilter: 'blur(10px)',
    border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
    borderRadius: theme.spacing(3),
    padding: theme.spacing(4),
    height: '100%',
}));

export default function AIWebGeneratorHome() {
    const [activeFeature, setActiveFeature] = useState(0);
    const theme = useTheme();

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % 6);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const features = [
        {
            icon: <SparklesIcon sx={{ fontSize: 40 }} />,
            title: "AI-Powered Design",
            desc: "Intelligent algorithms create stunning, unique designs tailored to your brand identity and vision"
        },
        {
            icon: <CodeIcon sx={{ fontSize: 40 }} />,
            title: "Clean Code Generation",
            desc: "Production-ready HTML, CSS, and JavaScript generated instantly with industry best practices"
        },
        {
            icon: <ZapIcon sx={{ fontSize: 40 }} />,
            title: "Lightning Fast",
            desc: "Generate complete, fully-functional websites in seconds, not days or weeks"
        },
        {
            icon: <LayoutIcon sx={{ fontSize: 40 }} />,
            title: "Responsive Layouts",
            desc: "Perfect display across all devices - desktop, tablet, and mobile automatically optimized"
        },
        {
            icon: <PaletteIcon sx={{ fontSize: 40 }} />,
            title: "Customizable Themes",
            desc: "Endless color schemes, typography combinations, and design variations at your fingertips"
        },
        {
            icon: <GlobeIcon sx={{ fontSize: 40 }} />,
            title: "SEO Optimized",
            desc: "Built-in best practices for maximum search engine visibility and performance"
        }
    ];

    const plans = [
        {
            name: "Starter",
            price: "Free",
            period: "",
            features: [
                "5 websites per month",
                "Basic templates library",
                "Standard support",
                "Export code",
                "Community access"
            ],
            popular: false
        },
        {
            name: "Professional",
            price: "$29",
            period: "/month",
            features: [
                "Unlimited websites",
                "Premium templates",
                "Priority support",
                "Advanced customization",
                "Custom domains",
                "Analytics dashboard",
                "API access"
            ],
            popular: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            period: "",
            features: [
                "Everything in Pro",
                "White-label solution",
                "Dedicated account manager",
                "SLA guarantee",
                "Custom integrations",
                "Advanced security",
                "Team collaboration"
            ],
            popular: false
        }
    ];

    const steps = [
        {
            number: "1",
            icon: <EditIcon sx={{ fontSize: 40 }} />,
            title: "Describe Your Vision",
            desc: "Tell our AI what kind of website you need using simple, natural language"
        },
        {
            number: "2",
            icon: <SparklesIcon sx={{ fontSize: 40 }} />,
            title: "AI Generates Design",
            desc: "Watch as intelligent algorithms create your perfect website in real-time"
        },
        {
            number: "3",
            icon: <PaletteIcon sx={{ fontSize: 40 }} />,
            title: "Customize & Refine",
            desc: "Make it uniquely yours with our intuitive drag-and-drop editor"
        },
        {
            number: "4",
            icon: <RocketIcon sx={{ fontSize: 40 }} />,
            title: "Launch & Share",
            desc: "Deploy your website instantly to the world with one click"
        }
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Freelance Designer",
            avatar: "SJ",
            rating: 5,
            text: "This tool has revolutionized my workflow. I can now deliver professional websites to clients in a fraction of the time. The AI understands design principles better than I expected!"
        },
        {
            name: "Michael Chen",
            role: "Startup Founder",
            avatar: "MC",
            rating: 5,
            text: "As a non-technical founder, I was able to create a stunning landing page for my startup in minutes. The quality is indistinguishable from what I'd pay thousands for."
        },
        {
            name: "Emma Rodriguez",
            role: "Marketing Manager",
            avatar: "ER",
            rating: 5,
            text: "We've created over 50 campaign landing pages this quarter. The speed and consistency are unmatched. It's become an essential part of our marketing stack."
        }
    ];

    return (
        <Box sx={{ position: 'relative', color: theme.palette.text.primary }}>
            {/* Animated Background Blobs */}
            <AnimatedBlob
                delay={0}
                sx={{
                    top: '20%',
                    left: '20%',
                    width: '500px',
                    height: '500px',
                    background: alpha(theme.palette.primary.main, 0.4),
                }}
            />
            <AnimatedBlob
                delay={2}
                sx={{
                    top: '30%',
                    right: '20%',
                    width: '450px',
                    height: '450px',
                    background: alpha(theme.palette.info.main, 0.4),
                }}
            />
            <AnimatedBlob
                delay={4}
                sx={{
                    bottom: '20%',
                    left: '35%',
                    width: '480px',
                    height: '480px',
                    background: alpha(theme.palette.secondary.main, 0.4),
                }}
            />

            {/* Hero Section */}
            <HeroSection>
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        {/* Badge */}
                        <Chip
                            icon={<StarIcon sx={{ color: `${theme.palette.warning.main} !important` }} />}
                            label="Trusted by 50,000+ creators worldwide"
                            sx={{
                                mb: 4,
                                background: alpha(theme.palette.primary.main, 0.2),
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                                color: theme.palette.text.primary,
                                backdropFilter: 'blur(10px)',
                                fontSize: '14px',
                                padding: '20px 8px',
                            }}
                        />

                        {/* Main Heading */}
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: { xs: '2.5rem', md: '4.5rem', lg: '5.5rem' },
                                fontWeight: 800,
                                mb: 3,
                                lineHeight: 1.1,
                            }}
                        >
                            Create Stunning Websites<br />
                            <GradientText variant="h1" component="span" sx={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
                                In Seconds, Not Days
                            </GradientText>
                        </Typography>

                        {/* Subtitle */}
                        <Typography
                            variant="h5"
                            sx={{
                                fontSize: { xs: '1.1rem', md: '1.4rem' },
                                color: theme.palette.text.secondary,
                                mb: 5,
                                maxWidth: '800px',
                                mx: 'auto',
                                lineHeight: 1.6,
                            }}
                        >
                            Harness the power of AI to generate professional, responsive websites instantly.
                            No coding required, unlimited creativity unleashed.
                        </Typography>

                        {/* CTA Buttons */}
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={2}
                            justifyContent="center"
                            sx={{ mb: 8 }}
                        >
                            <StyledButton
                                variant="contained"
                                size="large"
                                endIcon={<ArrowRightIcon />}
                                sx={{
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                    '&:hover': {
                                        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                                    },
                                }}
                            >
                                Start Creating Free
                            </StyledButton>
                            <StyledButton
                                variant="outlined"
                                size="large"
                                endIcon={<ChevronRightIcon />}
                                sx={{
                                    borderColor: alpha(theme.palette.text.primary, 0.3),
                                    color: theme.palette.text.primary,
                                    '&:hover': {
                                        borderColor: theme.palette.primary.main,
                                        background: alpha(theme.palette.primary.main, 0.1),
                                    },
                                }}
                            >
                                Watch Demo
                            </StyledButton>
                        </Stack>

                        {/* Stats */}
                        <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: '900px', mx: 'auto' }}>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <Box>
                                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                                        50K+
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                                        Active Users
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <Box>
                                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                                        1M+
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                                        Websites Created
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <Box>
                                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                                        4.9/5
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                                        User Rating
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </HeroSection>

            {/* Features Section */}
            <Box sx={{ py: 12, position: 'relative', zIndex: 10 }} id="features">
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Chip
                            label="FEATURES"
                            sx={{
                                mb: 2,
                                background: alpha(theme.palette.primary.main, 0.2),
                                color: theme.palette.primary.main,
                                fontWeight: 600,
                            }}
                        />
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: '2rem', md: '3rem' },
                                fontWeight: 800,
                                mb: 2,
                            }}
                        >
                            Everything You Need to Build
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: theme.palette.text.secondary,
                                maxWidth: '700px',
                                mx: 'auto',
                            }}
                        >
                            Powerful features designed to streamline your web development process
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                                <FeatureCard active={activeFeature === index}>
                                    <CardContent sx={{ p: 0 }}>
                                        <Box
                                            sx={{
                                                width: 70,
                                                height: 70,
                                                borderRadius: '16px',
                                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mb: 3,
                                                color: theme.palette.primary.contrastText,
                                            }}
                                        >
                                            {feature.icon}
                                        </Box>
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontWeight: 700,
                                                mb: 2,
                                            }}
                                        >
                                            {feature.title}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: theme.palette.text.secondary,
                                                lineHeight: 1.7,
                                            }}
                                        >
                                            {feature.desc}
                                        </Typography>
                                    </CardContent>
                                </FeatureCard>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* How It Works Section */}
            <Box sx={{ py: 12, position: 'relative', zIndex: 10 }} id="how-it-works">
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Chip
                            label="HOW IT WORKS"
                            sx={{
                                mb: 2,
                                background: alpha(theme.palette.primary.main, 0.2),
                                color: theme.palette.primary.main,
                                fontWeight: 600,
                            }}
                        />
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: '2rem', md: '3rem' },
                                fontWeight: 800,
                                mb: 2,
                            }}
                        >
                            Four Simple Steps to Success
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: theme.palette.text.secondary,
                                maxWidth: '700px',
                                mx: 'auto',
                            }}
                        >
                            From concept to launch in minutes, not months
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {steps.map((step, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                                <StepCard elevation={0}>
                                    <Box
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: '50%',
                                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mb: 3,
                                            fontSize: '28px',
                                            fontWeight: 800,
                                            color: theme.palette.primary.contrastText,
                                        }}
                                    >
                                        {step.number}
                                    </Box>
                                    <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
                                        {step.icon}
                                    </Box>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            mb: 2,
                                        }}
                                    >
                                        {step.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        {step.desc}
                                    </Typography>
                                </StepCard>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Pricing Section */}
            <Box sx={{ py: 12, position: 'relative', zIndex: 10 }} id="pricing">
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Chip
                            label="PRICING"
                            sx={{
                                mb: 2,
                                background: alpha(theme.palette.primary.main, 0.2),
                                color: theme.palette.primary.main,
                                fontWeight: 600,
                            }}
                        />
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: '2rem', md: '3rem' },
                                fontWeight: 800,
                                mb: 2,
                            }}
                        >
                            Choose Your Perfect Plan
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: theme.palette.text.secondary,
                                maxWidth: '700px',
                                mx: 'auto',
                            }}
                        >
                            Flexible pricing for individuals, teams, and enterprises
                        </Typography>
                    </Box>

                    <Grid container spacing={4} alignItems="stretch">
                        {plans.map((plan, index) => (
                            <Grid size={{ xs: 12, md: 4 }} key={index}>
                                <PricingCard popular={plan.popular}>
                                    {plan.popular && (
                                        <Chip
                                            label="MOST POPULAR"
                                            sx={{
                                                position: 'absolute',
                                                top: 20,
                                                right: 20,
                                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                                color: theme.palette.primary.contrastText,
                                                fontWeight: 700,
                                                fontSize: '11px',
                                            }}
                                        />
                                    )}
                                    <CardContent sx={{ p: 0 }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                mb: 1,
                                                color: theme.palette.text.secondary,
                                            }}
                                        >
                                            {plan.name}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 3 }}>
                                            <Typography
                                                variant="h2"
                                                sx={{
                                                    fontWeight: 800,
                                                    fontSize: '3rem',
                                                }}
                                            >
                                                {plan.price}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    color: theme.palette.text.disabled,
                                                    ml: 1,
                                                }}
                                            >
                                                {plan.period}
                                            </Typography>
                                        </Box>

                                        <List sx={{ mb: 4 }}>
                                            {plan.features.map((feature, idx) => (
                                                <ListItem key={idx} sx={{ px: 0, py: 1 }}>
                                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                                        <CheckIcon sx={{ color: theme.palette.primary.main }} />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={feature}
                                                        sx={{
                                                            '& .MuiListItemText-primary': {
                                                                color: theme.palette.text.primary,
                                                                fontSize: '15px',
                                                            },
                                                        }}
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>

                                        <StyledButton
                                            variant={plan.popular ? 'contained' : 'outlined'}
                                            fullWidth
                                            size="large"
                                            sx={{
                                                background: plan.popular
                                                    ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
                                                    : 'transparent',
                                                borderColor: plan.popular ? 'transparent' : alpha(theme.palette.text.primary, 0.3),
                                                '&:hover': {
                                                    background: plan.popular
                                                        ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`
                                                        : alpha(theme.palette.primary.main, 0.1),
                                                    borderColor: theme.palette.primary.main,
                                                },
                                            }}
                                        >
                                            Get Started
                                        </StyledButton>
                                    </CardContent>
                                </PricingCard>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Testimonials Section */}
            <Box sx={{ py: 12, position: 'relative', zIndex: 10 }} id="testimonials">
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Chip
                            label="TESTIMONIALS"
                            sx={{
                                mb: 2,
                                background: alpha(theme.palette.primary.main, 0.2),
                                color: theme.palette.primary.main,
                                fontWeight: 600,
                            }}
                        />
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: '2rem', md: '3rem' },
                                fontWeight: 800,
                                mb: 2,
                            }}
                        >
                            Loved by Creators Worldwide
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: theme.palette.text.secondary,
                                maxWidth: '700px',
                                mx: 'auto',
                            }}
                        >
                            See what our users have to say about their experience
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {testimonials.map((testimonial, index) => (
                            <Grid size={{ xs: 12, md: 4 }} key={index}>
                                <TestimonialCard>
                                    <CardContent>
                                        <Rating
                                            value={testimonial.rating}
                                            readOnly
                                            sx={{
                                                mb: 2,
                                                '& .MuiRating-iconFilled': {
                                                    color: theme.palette.warning.main,
                                                },
                                            }}
                                        />
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: theme.palette.text.primary,
                                                mb: 3,
                                                lineHeight: 1.7,
                                                fontStyle: 'italic',
                                            }}
                                        >
                                            "{testimonial.text}"
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar
                                                sx={{
                                                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                                    width: 50,
                                                    height: 50,
                                                    fontWeight: 700,
                                                }}
                                            >
                                                {testimonial.avatar}
                                            </Avatar>
                                            <Box>
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    {testimonial.name}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: theme.palette.text.disabled,
                                                    }}
                                                >
                                                    {testimonial.role}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </TestimonialCard>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

        </Box>
    );
}