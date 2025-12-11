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
    Alert,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    DocumentText24Regular,
    CheckmarkCircle24Filled,
    ChevronDown24Regular,
    Warning24Regular,
    Money24Regular,
    Prohibited24Regular,
    ShieldCheckmark24Regular,
    LinkSquare24Regular,
    Mail24Regular,
    ScaleFill24Regular,
} from '@fluentui/react-icons';

const TermsConditionsPage = () => {
    const theme = useTheme();
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const sections = [
        {
            id: 'panel1',
            icon: <CheckmarkCircle24Filled />,
            title: 'Acceptance of Terms',
            content: [
                {
                    subtitle: 'Agreement to Terms',
                    text: 'By accessing and using BMG\'s services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, you must not use our services.',
                },
                {
                    subtitle: 'Eligibility',
                    text: 'You must be at least 18 years old and have the legal capacity to enter into a binding agreement. By using our services, you represent and warrant that you meet these requirements.',
                },
                {
                    subtitle: 'Modifications',
                    text: 'We reserve the right to modify these terms at any time. We will notify you of significant changes via email or through our platform. Your continued use of our services after changes constitutes acceptance of the modified terms.',
                },
            ],
        },
        {
            id: 'panel2',
            icon: <ShieldCheckmark24Regular />,
            title: 'User Accounts',
            content: [
                {
                    subtitle: 'Account Creation',
                    text: 'To access certain features, you must create an account with accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials.',
                },
                {
                    subtitle: 'Account Security',
                    text: 'You must notify us immediately of any unauthorized use of your account. We are not liable for any loss or damage arising from your failure to protect your account information.',
                },
                {
                    subtitle: 'Account Termination',
                    text: 'We reserve the right to suspend or terminate your account at any time for violation of these terms, fraudulent activity, or other reasonable cause.',
                },
            ],
        },
        {
            id: 'panel3',
            icon: <Money24Regular />,
            title: 'Payments and Billing',
            content: [
                {
                    subtitle: 'Subscription Fees',
                    text: 'By subscribing to our paid services, you agree to pay all applicable fees as described on our pricing page. Fees are billed in advance on a recurring basis.',
                },
                {
                    subtitle: 'Payment Methods',
                    text: 'We accept major credit cards and other payment methods as indicated on our platform. You authorize us to charge your payment method for all fees incurred.',
                },
                {
                    subtitle: 'Refund Policy',
                    text: 'Refunds are provided within 30 days of purchase if you are not satisfied with our service. After 30 days, all fees are non-refundable except as required by law.',
                },
                {
                    subtitle: 'Price Changes',
                    text: 'We may change our pricing at any time. We will provide you with advance notice of price changes, and they will take effect at the start of your next billing cycle.',
                },
            ],
        },
        {
            id: 'panel4',
            icon: <Prohibited24Regular />,
            title: 'Prohibited Activities',
            content: [
                {
                    subtitle: 'Unauthorized Use',
                    text: 'You may not use our services for any illegal purpose or in violation of any laws. You may not attempt to gain unauthorized access to our systems or networks.',
                },
                {
                    subtitle: 'Content Restrictions',
                    text: 'You may not upload, post, or transmit any content that is illegal, harmful, threatening, abusive, harassing, defamatory, obscene, or otherwise objectionable.',
                },
                {
                    subtitle: 'System Interference',
                    text: 'You may not interfere with or disrupt the integrity or performance of our services, including introducing viruses, malware, or engaging in denial-of-service attacks.',
                },
                {
                    subtitle: 'Data Scraping',
                    text: 'You may not use automated systems or software to extract data from our services without our express written permission.',
                },
            ],
        },
        {
            id: 'panel5',
            icon: <ScaleFill24Regular />,
            title: 'Intellectual Property',
            content: [
                {
                    subtitle: 'Ownership',
                    text: 'All content, features, and functionality of our services, including text, graphics, logos, and software, are owned by BMG and protected by copyright, trademark, and other intellectual property laws.',
                },
                {
                    subtitle: 'License Grant',
                    text: 'Subject to these terms, we grant you a limited, non-exclusive, non-transferable license to access and use our services for your personal or business purposes.',
                },
                {
                    subtitle: 'User Content',
                    text: 'You retain ownership of content you create using our services. By using our platform, you grant us a license to use, store, and process your content to provide our services.',
                },
                {
                    subtitle: 'Trademarks',
                    text: 'BMG and our logos are trademarks of our company. You may not use our trademarks without our prior written consent.',
                },
            ],
        },
        {
            id: 'panel6',
            icon: <Warning24Regular />,
            title: 'Disclaimers and Limitations',
            content: [
                {
                    subtitle: 'Service Availability',
                    text: 'Our services are provided "as is" and "as available" without warranties of any kind. We do not guarantee that our services will be uninterrupted, error-free, or secure.',
                },
                {
                    subtitle: 'Limitation of Liability',
                    text: 'To the maximum extent permitted by law, BMG shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.',
                },
                {
                    subtitle: 'Third-Party Services',
                    text: 'Our services may contain links to third-party websites or services. We are not responsible for the content, accuracy, or practices of these third-party services.',
                },
                {
                    subtitle: 'Maximum Liability',
                    text: 'Our total liability to you for any claim arising from your use of our services shall not exceed the amount you paid us in the twelve months preceding the claim.',
                },
            ],
        },
        {
            id: 'panel7',
            icon: <LinkSquare24Regular />,
            title: 'Dispute Resolution',
            content: [
                {
                    subtitle: 'Governing Law',
                    text: 'These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which BMG operates, without regard to conflict of law principles.',
                },
                {
                    subtitle: 'Arbitration',
                    text: 'Any dispute arising from these terms or your use of our services shall be resolved through binding arbitration, except where prohibited by law.',
                },
                {
                    subtitle: 'Class Action Waiver',
                    text: 'You agree to resolve disputes with us on an individual basis and waive your right to participate in class actions or collective proceedings.',
                },
            ],
        },
    ];

    const keyPoints = [
        'You must be 18 or older to use our services',
        'All fees are billed in advance and are non-refundable after 30 days',
        'We reserve the right to terminate accounts that violate our terms',
        'You retain ownership of your content created on our platform',
    ];

    return (
        <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', mt: 1 }}>
          
            <Box
                sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                    py: { xs: 8, md: 12 },
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '-50%',
                        left: '-20%',
                        width: '600px',
                        height: '600px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '50%',
                    },
                }}
            >
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
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
                            <DocumentText24Regular style={{ fontSize: 40, color: '#fff' }} />
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
                            Terms & Conditions
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                mb: 3,
                            }}
                        >
                            Please read these terms carefully before using our services.
                        </Typography>
                        <Chip
                            label="Effective Date: December 10, 2024"
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

            {/* Important Notice */}
            <Container maxWidth="lg" sx={{ mt: -6, mb: 8, position: 'relative', zIndex: 2 }}>
                <Alert
                    severity="warning"
                    icon={<Warning24Regular style={{ fontSize: 24 }} />}
                    sx={{
                        borderRadius: 4,
                        bgcolor: theme.palette.background.paper,
                        border: `2px solid ${theme.palette.warning.main}`,
                        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                        '& .MuiAlert-icon': {
                            color: theme.palette.warning.main,
                        },
                        py: 2,
                    }}
                >
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: theme.palette.text.heading, mb: 1 }}>
                        Important Legal Agreement
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        By using BMG's services, you agree to be legally bound by these Terms and Conditions. 
                        Please read them carefully as they contain important information about your legal rights and obligations.
                    </Typography>
                </Alert>
            </Container>

            {/* Key Points */}
            <Container maxWidth="md" sx={{ mb: 8 }}>
                <Card
                    sx={{
                        borderRadius: 4,
                        bgcolor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
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
                            Key Points to Remember
                        </Typography>
                        <List>
                            {keyPoints.map((point, index) => (
                                <ListItem key={index} sx={{ px: 0 }}>
                                    <ListItemIcon>
                                        <CheckmarkCircle24Filled
                                            style={{
                                                color: theme.palette.primary.main,
                                                fontSize: 24,
                                            }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={point}
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
                        Welcome to BMG (Best Marketing Gigs). These Terms and Conditions ("Terms") govern your access to and 
                        use of our services, including our website, applications, and any related services provided by BMG. 
                        By accessing or using our services, you agree to comply with and be bound by these Terms. Please read 
                        them carefully before proceeding.
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
                                Questions About These Terms?
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    mb: 2,
                                    lineHeight: 1.7,
                                }}
                            >
                                If you have any questions about these Terms and Conditions, please contact our legal team. 
                                We're here to help clarify any concerns you may have.
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
                                Contact Legal Team
                            </Button>
                        </Box>
                    </Box>
                </Card>

                {/* Severability */}
                <Box sx={{ mt: 6, p: 3, bgcolor: theme.palette.background.paper, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: theme.palette.text.heading,
                            mb: 2,
                        }}
                    >
                        Severability and Entire Agreement
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: theme.palette.text.secondary,
                            lineHeight: 1.8,
                            mb: 2,
                        }}
                    >
                        If any provision of these Terms is found to be unenforceable or invalid, that provision will be 
                        limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in 
                        full force and effect.
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: theme.palette.text.secondary,
                            lineHeight: 1.8,
                        }}
                    >
                        These Terms constitute the entire agreement between you and BMG regarding your use of our services 
                        and supersede any prior agreements between you and BMG relating to your use of the services.
                    </Typography>
                </Box>

                {/* Acknowledgment */}
                <Card
                    sx={{
                        mt: 4,
                        p: 3,
                        bgcolor: `${theme.palette.success.main}10`,
                        border: `1px solid ${theme.palette.success.main}30`,
                        borderRadius: 3,
                    }}
                >
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <CheckmarkCircle24Filled style={{ color: theme.palette.success.main, fontSize: 24, flexShrink: 0 }} />
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.palette.text.secondary,
                                lineHeight: 1.8,
                            }}
                        >
                            By continuing to use BMG's services, you acknowledge that you have read, understood, and agree 
                            to be bound by these Terms and Conditions. Last updated: December 10, 2024.
                        </Typography>
                    </Box>
                </Card>
            </Container>
        </Box>
    );
};

export default TermsConditionsPage;