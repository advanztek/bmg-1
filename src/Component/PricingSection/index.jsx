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
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Switch,
    Divider,
    Avatar,
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

const PricingSection = () => {
    const theme = useTheme();
    const [billingPeriod, setBillingPeriod] = useState('monthly'); // 'monthly' or 'yearly'

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
            limitations: [
                'No priority support',
                'No custom branding',
                'Limited integrations',
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
            limitations: [],
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
            limitations: [],
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

    return (
        <Box sx={{ bgcolor: theme.palette.background.default, py: { xs: 8, md: 12 } }}>
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Chip
                        label="PRICING PLANS"
                        sx={{
                            bgcolor: `${theme.palette.primary.main}15`,
                            color: theme.palette.primary.main,
                            fontWeight: 700,
                            fontSize: '0.875rem',
                            mb: 2,
                            px: 2,
                        }}
                    />
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 800,
                            fontSize: { xs: '1.5rem', md: '2rem' },
                            color: theme.palette.text.heading,
                            mb: 2,
                            lineHeight: 1.2,
                        }}
                    >
                        Choose Your Perfect Plan
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: theme.palette.text.secondary,
                            mb: 4,
                            maxWidth: 600,
                            mx: 'auto',
                            fontWeight: 400,
                        }}
                    >
                        Start building amazing websites with AI. Upgrade or downgrade anytime.
                    </Typography>

                    {/* Billing Toggle */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                            mb: 2,
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: billingPeriod === 'monthly' ? 700 : 500,
                                color: billingPeriod === 'monthly' ? theme.palette.text.heading : theme.palette.text.secondary,
                            }}
                        >
                            Monthly
                        </Typography>
                        <Switch
                            checked={billingPeriod === 'yearly'}
                            onChange={(e) => setBillingPeriod(e.target.checked ? 'yearly' : 'monthly')}
                            sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                    color: theme.palette.primary.main,
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                    backgroundColor: theme.palette.primary.main,
                                },
                            }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: billingPeriod === 'yearly' ? 700 : 500,
                                    color: billingPeriod === 'yearly' ? theme.palette.text.heading : theme.palette.text.secondary,
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

                {/* Pricing Cards */}
                <Grid container spacing={3} sx={{ mb: 8 }}>
                    {plans.map((plan, index) => (
                        <Grid size={{xs:12, md:4}} key={index}>
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
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                                    boxShadow: plan.popular
                                        ? `0 20px 60px ${theme.palette.primary.main}30`
                                        : '0 4px 12px rgba(0,0,0,0.08)',
                                    '&:hover': {
                                        transform: plan.popular ? 'scale(1.05) translateY(-8px)' : 'translateY(-8px)',
                                        boxShadow: plan.popular
                                            ? `0 24px 80px ${theme.palette.primary.main}40`
                                            : `0 12px 32px ${plan.color}20`,
                                    },
                                }}
                            >
                                {/* Popular Badge */}
                                {plan.popular && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: -16,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            bgcolor: theme.palette.primary.main,
                                            color: theme.palette.primary.contrastText,
                                            px: 3,
                                            py: 0.75,
                                            borderRadius: 3,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            fontWeight: 700,
                                            fontSize: '0.6rem',
                                            boxShadow: `0 4px 16px ${theme.palette.primary.main}60`,
                                        }}
                                    >
                                        <Star24Filled style={{ fontSize: 16 }} />
                                        MOST POPULAR
                                    </Box>
                                )}

                                <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    {/* Icon */}
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

                                    {/* Plan Name */}
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

                                    {/* Price */}
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
                                                    display: 'block',
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

                                    {/* CTA Button */}
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
                                                    color: theme.palette.primary.contrastText,
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

                                    {/* Features List */}
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
        </Box>
    );
};

export default PricingSection;