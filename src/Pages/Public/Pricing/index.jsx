import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Chip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    CheckmarkCircle24Filled,
    Flash24Regular,
    ShieldCheckmark24Regular,
    People24Regular,
} from '@fluentui/react-icons';
import { FAQSection, PricingSection } from '../../../Component';
import { useGetAllFAQ } from '../../../Hooks/general';

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

const PricingPage = () => {
    const theme = useTheme();
    const { data: faqs, loading: faqLoading } = useGetAllFAQ()

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
                            label="PAY-AS-YOU-GO CREDITS"
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
                            Purchase Credits, Pay Only for What You Use
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                mb: 4,
                                maxWidth: 700,
                                mx: 'auto',
                            }}
                        >
                            No subscriptions, no recurring fees. Buy credits once and use them whenever you need.
                            Credits never expire and work across all AI services.
                        </Typography>

                        {/* Key Benefits Chips */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 2,
                                flexWrap: 'wrap',
                                mt: 4,
                            }}
                        >
                            {[
                                { icon: <CheckmarkCircle24Filled />, text: 'No Expiration' },
                                { icon: <Flash24Regular />, text: 'Instant Activation' },
                                { icon: <ShieldCheckmark24Regular />, text: 'Secure Payment' },
                            ].map((item, index) => (
                                <Chip
                                    key={index}
                                    icon={item.icon}
                                    label={item.text}
                                    sx={{
                                        bgcolor: 'rgba(255, 255, 255, 0.15)',
                                        color: '#fff',
                                        fontWeight: 600,
                                        fontSize: '0.9rem',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        py: 2.5,
                                        '& .MuiChip-icon': {
                                            color: '#fff',
                                            fontSize: 20,
                                        },
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ mt: -6, position: 'relative', zIndex: 2 }}>
                <PricingSection />
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
                        <Grid item xs={12} md={4} key={index}>
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
                    <FAQSection data={faqs} loading={faqLoading} />
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
                        {['99.9% Uptime', 'Money-back Guarantee', '24/7 Support', 'Flexible Credits'].map((badge, idx) => (
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