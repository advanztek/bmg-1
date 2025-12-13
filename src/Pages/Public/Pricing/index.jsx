import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
    Chip,
    Switch,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    CheckmarkCircle24Filled,
    Sparkle24Regular,
    Crown24Regular,
    Rocket24Regular,
    Star24Filled,
    Flash24Regular,
    ShieldCheckmark24Regular,
    People24Regular,
    ArrowRight24Regular,
} from '@fluentui/react-icons';
import { FAQSection } from '../../../Component';

const PricingPage = () => {
    const theme = useTheme();
    const [billingPeriod, setBillingPeriod] = useState('monthly');

    const plans = [
        {
            name: 'Starter',
            icon: <Rocket24Regular />,
            subtitle: 'Perfect for individuals',
            monthlyPrice: 0,
            yearlyPrice: 0,
            description: 'Get started with basic AI features',
            features: [
                '10 AI generations per month',
                'Basic templates',
                'Standard support',
                'Export in HTML/CSS',
                'Community access',
            ],
            cta: 'Get Started Free',
            popular: false,
            color: theme.palette.text.secondary,
        },
        {
            name: 'Professional',
            icon: <Sparkle24Regular />,
            subtitle: 'For growing businesses',
            monthlyPrice: 29,
            yearlyPrice: 290,
            description: 'Unlock advanced AI capabilities',
            features: [
                '500 AI generations per month',
                'Premium templates',
                'Priority support',
                'Export in multiple formats',
                'Advanced customization',
                'API access',
                'Team collaboration (up to 5)',
                'Custom branding',
            ],
            cta: 'Start Free Trial',
            popular: true,
            color: theme.palette.primary.main,
        },
        {
            name: 'Enterprise',
            icon: <Crown24Regular />,
            subtitle: 'For large organizations',
            monthlyPrice: 99,
            yearlyPrice: 990,
            description: 'Complete AI solution with premium support',
            features: [
                'Unlimited AI generations',
                'All premium templates',
                'Dedicated account manager',
                'White-label solutions',
                'Advanced analytics',
                'Custom integrations',
                'Unlimited team members',
                'Priority feature requests',
                'SLA guarantee',
                'On-premise deployment option',
            ],
            cta: 'Contact Sales',
            popular: false,
            color: theme.palette.warning.main,
        },
    ];

    const features = [
        {
            icon: <Flash24Regular />,
            title: 'Lightning Fast',
            description: 'Generate websites in seconds with our optimized AI',
        },
        {
            icon: <ShieldCheckmark24Regular />,
            title: 'Secure & Reliable',
            description: 'Enterprise-grade security and 99.9% uptime',
        },
        {
            icon: <People24Regular />,
            title: 'Team Collaboration',
            description: 'Work together seamlessly with your team',
        },
    ];

    const faqs = [
        {
            question: 'Can I change plans later?',
            answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.',
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards, PayPal, and wire transfers for enterprise plans.',
        },
        {
            question: 'Is there a money-back guarantee?',
            answer: 'Yes! We offer a 30-day money-back guarantee on all paid plans. No questions asked.',
        },
        {
            question: 'Do you offer discounts for non-profits?',
            answer: 'Yes! Non-profits and educational institutions receive a 50% discount. Contact us for details.',
        },
    ];

    return (
        <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', mt: 3, pb: 8 }}>
            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                    py: { xs: 10, md: 12 },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '-50%',
                        right: '-20%',
                        width: '800px',
                        height: '800px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '50%',
                    },
                }}
            >
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Chip
                            label="PRICING PLANS"
                            sx={{
                                bgcolor: 'rgba(255, 255, 255, 0.2)',
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: '0.85rem',
                                mb: 3,
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                            }}
                        />
                        <Typography
                            variant="h1"
                            sx={{
                                fontWeight: 800,
                                fontSize: { xs: '1.5rem', md: '2.8rem' },
                                color: '#fff',
                                mb: 3,
                                lineHeight: 1.1,
                            }}
                        >
                            Choose Your Perfect Plan
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                mb: 4,
                                maxWidth: 600,
                                mx: 'auto',
                            }}
                        >
                            Start building amazing websites with AI. Upgrade or downgrade anytime.
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 2,
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: billingPeriod === 'monthly' ? 700 : 500,
                                    color: billingPeriod === 'monthly' ? '#fff' : 'rgba(255, 255, 255, 0.7)',
                                }}
                            >
                                Monthly
                            </Typography>
                            <Switch
                                checked={billingPeriod === 'yearly'}
                                onChange={(e) => setBillingPeriod(e.target.checked ? 'yearly' : 'monthly')}
                                sx={{
                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                        color: '#fff',
                                    },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                        backgroundColor: '#fff',
                                    },
                                }}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: billingPeriod === 'yearly' ? 700 : 500,
                                        color: billingPeriod === 'yearly' ? '#fff' : 'rgba(255, 255, 255, 0.7)',
                                    }}
                                >
                                    Yearly
                                </Typography>
                                <Chip
                                    label="Save 17%"
                                    size="small"
                                    sx={{
                                        bgcolor: theme.palette.success.main,
                                        color: '#fff',
                                        fontWeight: 700,
                                        height: 24,
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ mt: -6, position: 'relative', zIndex: 2 }}>
                <Grid container spacing={3}>
                    {plans.map((plan, index) => (
                        <Grid size={{ xs: 12, md: 4 }} key={index}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: 4,
                                    border: plan.popular
                                        ? `3px solid ${theme.palette.primary.main}`
                                        : `1px solid ${theme.palette.divider}`,
                                    position: 'relative',
                                    overflow: 'visible',
                                    bgcolor: theme.palette.background.paper,
                                    transition: 'all 0.4s ease',
                                    transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                                    boxShadow: plan.popular
                                        ? `0 20px 60px ${theme.palette.primary.main}30`
                                        : '0 4px 12px rgba(0,0,0,0.08)',
                                    '&:hover': {
                                        transform: plan.popular ? 'scale(1.05) translateY(-8px)' : 'translateY(-8px)',
                                        boxShadow: `0 24px 80px ${plan.color}20`,
                                    },
                                }}
                            >
                                {plan.popular && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: -16,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            bgcolor: theme.palette.primary.main,
                                            color: '#fff',
                                            px: 3,
                                            py: 0.75,
                                            borderRadius: 3,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            fontWeight: 700,
                                            fontSize: '0.7rem',
                                            boxShadow: `0 4px 16px ${theme.palette.primary.main}60`,
                                        }}
                                    >
                                        <Star24Filled style={{ fontSize: 16 }} />
                                        MOST POPULAR
                                    </Box>
                                )}

                                <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <Box
                                        sx={{
                                            width: 56,
                                            height: 56,
                                            borderRadius: 3,
                                            bgcolor: `${plan.color}15`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: plan.color,
                                            mb: 2,
                                        }}
                                    >
                                        {plan.icon}
                                    </Box>

                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 800,
                                            color: theme.palette.text.heading,
                                            mb: 0.5,
                                        }}
                                    >
                                        {plan.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            mb: 3,
                                        }}
                                    >
                                        {plan.subtitle}
                                    </Typography>

                                    <Box sx={{ mb: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
                                            <Typography
                                                variant="h2"
                                                sx={{
                                                    fontWeight: 900,
                                                    color: theme.palette.text.heading,
                                                    fontSize: '3rem',
                                                }}
                                            >
                                                ${billingPeriod === 'monthly' ? plan.monthlyPrice : Math.floor(plan.yearlyPrice / 12)}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    color: theme.palette.text.secondary,
                                                    ml: 1,
                                                    fontWeight: 600,
                                                }}
                                            >
                                                /month
                                            </Typography>
                                        </Box>
                                        {billingPeriod === 'yearly' && plan.yearlyPrice > 0 && (
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: theme.palette.text.secondary,
                                                }}
                                            >
                                                Billed ${plan.yearlyPrice} annually
                                            </Typography>
                                        )}
                                    </Box>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            mb: 3,
                                        }}
                                    >
                                        {plan.description}
                                    </Typography>

                                    <Button
                                        variant={plan.popular ? 'contained' : 'outlined'}
                                        fullWidth
                                        endIcon={<ArrowRight24Regular />}
                                        sx={{
                                            py: 1.5,
                                            mb: 3,
                                            borderRadius: 2,
                                            fontWeight: 700,
                                            fontSize: '1rem',
                                            textTransform: 'none',
                                            ...(plan.popular
                                                ? {
                                                    bgcolor: theme.palette.primary.main,
                                                    color: '#fff',
                                                    '&:hover': {
                                                        bgcolor: theme.palette.primary.dark,
                                                    },
                                                }
                                                : {
                                                    borderWidth: 2,
                                                    borderColor: theme.palette.divider,
                                                    color: theme.palette.text.primary,
                                                    '&:hover': {
                                                        borderWidth: 2,
                                                        borderColor: plan.color,
                                                        bgcolor: `${plan.color}08`,
                                                    },
                                                }),
                                        }}
                                    >
                                        {plan.cta}
                                    </Button>

                                    <Divider sx={{ mb: 3 }} />

                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontWeight: 700,
                                            color: theme.palette.text.heading,
                                            mb: 2,
                                            textTransform: 'uppercase',
                                            fontSize: '0.75rem',
                                            letterSpacing: 1,
                                        }}
                                    >
                                        What's Included
                                    </Typography>
                                    <List sx={{ flexGrow: 1 }}>
                                        {plan.features.map((feature, idx) => (
                                            <ListItem key={idx} sx={{ px: 0, py: 0.75 }}>
                                                <ListItemIcon sx={{ minWidth: 32 }}>
                                                    <CheckmarkCircle24Filled
                                                        style={{
                                                            color: plan.popular ? theme.palette.primary.main : theme.palette.success.main,
                                                            fontSize: 20,
                                                        }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={feature}
                                                    primaryTypographyProps={{
                                                        variant: 'body2',
                                                        sx: {
                                                            color: theme.palette.text.primary,
                                                            fontWeight: 500,
                                                        },
                                                    }}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Container maxWidth="lg" sx={{ py: { xs: 8, md: 14 } }}>
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 800,
                            color: theme.palette.text.heading,
                            mb: 2,
                        }}
                    >
                        Why Choose Our Platform?
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: theme.palette.text.secondary,
                        }}
                    >
                        Built for modern businesses and creators
                    </Typography>
                </Box>
                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid size={{ xs: 12, md: 4 }} key={index}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Box
                                    sx={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: '50%',
                                        bgcolor: theme.palette.background.paper,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mx: 'auto',
                                        mb: 2,
                                        color: theme.palette.primary.main,
                                        boxShadow: `0 4px 16px ${theme.palette.primary.main}20`,
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
                                    }}
                                >
                                    {feature.description}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Box sx={{ background: "linear-gradient(to bottom right, #F9FAFB, #EFF6FF, #EEF2FF)", }}>
                <Container maxWidth='md'>
                    <FAQSection />
                </Container>
            </Box>
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="body1"
                        sx={{
                            color: theme.palette.text.secondary,
                            mb: 2,
                        }}
                    >
                        Trusted by over 50,000+ businesses worldwide
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
                        {['99.9% Uptime', 'Money-back Guarantee', '24/7 Support', 'Cancel Anytime'].map((badge, idx) => (
                            <Chip
                                key={idx}
                                label={badge}
                                sx={{
                                    bgcolor: theme.palette.background.paper,
                                    border: `1px solid ${theme.palette.divider}`,
                                    fontWeight: 600,
                                    px: 2,
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default PricingPage;