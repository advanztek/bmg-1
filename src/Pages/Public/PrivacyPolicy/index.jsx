import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    Shield24Regular,
    CheckmarkCircle24Filled,
    ChevronDown24Regular,
    Eye24Regular,
    People24Regular,
    Database24Regular,
    DocumentText24Regular,
    Mail24Regular,
    LockClosed24Regular,
} from '@fluentui/react-icons';

const PrivacyPolicyPage = () => {
    const theme = useTheme();
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const sections = [
        {
            id: 'panel1',
            icon: <DocumentText24Regular />,
            title: 'Information We Collect',
            content: [
                {
                    subtitle: 'Personal Information',
                    text: 'We collect information that you provide directly to us, including your name, email address, phone number, company name, and payment information when you register for our services.',
                },
                {
                    subtitle: 'Usage Information',
                    text: 'We automatically collect information about how you use our services, including your IP address, browser type, device information, pages visited, and time spent on our platform.',
                },
                {
                    subtitle: 'Cookies and Tracking',
                    text: 'We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and improve our services. You can control cookie preferences through your browser settings.',
                },
            ],
        },
        {
            id: 'panel2',
            icon: <Database24Regular />,
            title: 'How We Use Your Information',
            content: [
                {
                    subtitle: 'Service Delivery',
                    text: 'We use your information to provide, maintain, and improve our services, process transactions, and send you technical notices and support messages.',
                },
                {
                    subtitle: 'Communication',
                    text: 'We may use your contact information to send you marketing communications, newsletters, and updates about our services. You can opt-out at any time.',
                },
                {
                    subtitle: 'Analytics and Improvement',
                    text: 'We analyze usage data to understand how users interact with our platform, identify trends, and make improvements to enhance user experience.',
                },
            ],
        },
        {
            id: 'panel3',
            icon: <People24Regular />,
            title: 'Information Sharing',
            content: [
                {
                    subtitle: 'Service Providers',
                    text: 'We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, and customer support.',
                },
                {
                    subtitle: 'Legal Requirements',
                    text: 'We may disclose your information if required by law, legal process, or government request, or to protect the rights, property, or safety of BMG, our users, or others.',
                },
                {
                    subtitle: 'Business Transfers',
                    text: 'In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.',
                },
            ],
        },
        {
            id: 'panel4',
            icon: <LockClosed24Regular />,
            title: 'Data Security',
            content: [
                {
                    subtitle: 'Security Measures',
                    text: 'We implement industry-standard security measures to protect your information, including encryption, secure servers, and regular security audits.',
                },
                {
                    subtitle: 'Access Controls',
                    text: 'We restrict access to your personal information to employees and contractors who need to know that information to operate, develop, or improve our services.',
                },
                {
                    subtitle: 'Data Retention',
                    text: 'We retain your information for as long as necessary to provide our services and comply with legal obligations. You may request deletion of your data at any time.',
                },
            ],
        },
        {
            id: 'panel5',
            icon: <Eye24Regular />,
            title: 'Your Rights',
            content: [
                {
                    subtitle: 'Access and Correction',
                    text: 'You have the right to access, update, or correct your personal information at any time through your account settings.',
                },
                {
                    subtitle: 'Data Portability',
                    text: 'You can request a copy of your data in a structured, machine-readable format.',
                },
                {
                    subtitle: 'Deletion',
                    text: 'You have the right to request deletion of your personal information, subject to certain legal exceptions.',
                },
                {
                    subtitle: 'Opt-Out',
                    text: 'You can opt-out of marketing communications at any time by clicking the unsubscribe link in our emails or updating your communication preferences.',
                },
            ],
        },
    ];

    const highlights = [
        'We never sell your personal information to third parties',
        'Your data is encrypted both in transit and at rest',
        'You have full control over your privacy settings',
        'We comply with GDPR, CCPA, and other privacy regulations',
    ];

    return (
        <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', mt: 4 }}>
            {/* Hero Section */}
            <Box
                sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                    py: { xs: 8, md: 8 },
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
                }}
            >
                <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                bgcolor: 'rgba(255, 255, 255, 0.2)',
                                backdropFilter: 'blur(10px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 3,
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                            }}
                        >
                            <Shield24Regular style={{ fontSize: 40, color: '#fff' }} />
                        </Box>
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 900,
                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                                color: '#fff',
                                mb: 2,
                            }}
                        >
                            Privacy Policy
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                mb: 3,
                            }}
                        >
                            Your privacy is our priority. Learn how we protect and use your data.
                        </Typography>
                        <Chip
                            label="Last Updated: December 10, 2024"
                            sx={{
                                bgcolor: 'rgba(255, 255, 255, 0.2)',
                                color: '#fff',
                                fontWeight: 600,
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                            }}
                        />
                    </Box>
                </Container>
            </Box>

            {/* Key Highlights */}
            <Container maxWidth="lg" sx={{ mt: -6, mb: 8, position: 'relative', zIndex: 2 }}>
                <Card
                    sx={{
                        borderRadius: 4,
                        bgcolor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                    }}
                >
                    <CardContent sx={{ p: 4 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                color: theme.palette.text.heading,
                                mb: 3,
                                textAlign: 'center',
                            }}
                        >
                            Our Privacy Commitment
                        </Typography>
                        <List>
                            {highlights.map((highlight, index) => (
                                <ListItem key={index} sx={{ px: 0 }}>
                                    <ListItemIcon>
                                        <CheckmarkCircle24Filled
                                            style={{
                                                color: theme.palette.success.main,
                                                fontSize: 24,
                                            }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={highlight}
                                        primaryTypographyProps={{
                                            variant: 'body1',
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
            </Container>

            {/* Main Content */}
            <Container maxWidth="md" sx={{ pb: 8 }}>
                <Box sx={{ mb: 6 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            color: theme.palette.text.heading,
                            mb: 2,
                        }}
                    >
                        Introduction
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: theme.palette.text.secondary,
                            lineHeight: 1.8,
                            fontSize: '1.05rem',
                        }}
                    >
                        At BMG (Best Marketing Gigs), we take your privacy seriously. This Privacy Policy explains how we collect,
                        use, disclose, and safeguard your information when you use our services. Please read this privacy policy
                        carefully. If you do not agree with the terms of this privacy policy, please do not access our services.
                    </Typography>
                </Box>

                {/* Accordion Sections */}
                {sections.map((section) => (
                    <Accordion
                        key={section.id}
                        expanded={expanded === section.id}
                        onChange={handleChange(section.id)}
                        sx={{
                            mb: 2,
                            borderRadius: 3,
                            bgcolor: theme.palette.background.paper,
                            border: `1px solid ${theme.palette.divider}`,
                            '&:before': { display: 'none' },
                            boxShadow: 'none',
                            '&.Mui-expanded': {
                                boxShadow: `0 8px 24px ${theme.palette.primary.main}15`,
                                borderColor: theme.palette.primary.main,
                            },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ChevronDown24Regular style={{ color: theme.palette.primary.main }} />}
                            sx={{
                                px: 3,
                                py: 2,
                                '& .MuiAccordionSummary-content': {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 2,
                                    bgcolor: `${theme.palette.primary.main}15`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: theme.palette.primary.main,
                                }}
                            >
                                {section.icon}
                            </Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    color: theme.palette.text.heading,
                                }}
                            >
                                {section.title}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: 3, pb: 3 }}>
                            {section.content.map((item, index) => (
                                <Box key={index} sx={{ mb: 3 }}>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontWeight: 700,
                                            color: theme.palette.text.heading,
                                            mb: 1,
                                        }}
                                    >
                                        {item.subtitle}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.8,
                                        }}
                                    >
                                        {item.text}
                                    </Typography>
                                </Box>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                ))}

                {/* Contact Section */}
                <Card
                    sx={{
                        mt: 6,
                        p: 4,
                        borderRadius: 4,
                        bgcolor: theme.palette.primary.lightBg,
                        border: `1px solid ${theme.palette.primary.main}30`,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Box
                            sx={{
                                width: 56,
                                height: 56,
                                borderRadius: 2,
                                bgcolor: theme.palette.primary.main,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                            }}
                        >
                            <Mail24Regular style={{ fontSize: 28 }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    color: theme.palette.text.heading,
                                    mb: 1,
                                }}
                            >
                                Questions About Privacy?
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    mb: 2,
                                    lineHeight: 1.7,
                                }}
                            >
                                If you have any questions or concerns about this Privacy Policy or our data practices,
                                please don't hesitate to contact our privacy team.
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    px: 3,
                                    '&:hover': {
                                        bgcolor: theme.palette.primary.dark,
                                    },
                                }}
                            >
                                Contact Privacy Team
                            </Button>
                        </Box>
                    </Box>
                </Card>

                {/* Additional Information */}
                <Box sx={{ mt: 6, p: 3, bgcolor: theme.palette.background.paper, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: theme.palette.text.heading,
                            mb: 2,
                        }}
                    >
                        Changes to This Privacy Policy
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: theme.palette.text.secondary,
                            lineHeight: 1.8,
                        }}
                    >
                        We may update this Privacy Policy from time to time to reflect changes in our practices or for
                        other operational, legal, or regulatory reasons. We will notify you of any material changes by
                        posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage
                        you to review this Privacy Policy periodically to stay informed about how we protect your information.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default PrivacyPolicyPage;