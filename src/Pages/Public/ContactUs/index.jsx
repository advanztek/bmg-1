import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Grid,
    Chip,
    Avatar,
    InputAdornment,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    Mail24Regular,
    Phone24Regular,
    Location24Regular,
    Send24Regular,
    Clock24Regular,
    ChatHelp24Regular,
    Person24Regular,
    BuildingRetail24Regular,
} from '@fluentui/react-icons';

const ContactUsPage = () => {
    const theme = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const contactMethods = [
        {
            icon: <Mail24Regular />,
            title: 'Email Us',
            primary: 'support@bmg.com',
            secondary: 'We\'ll respond within 24 hours',
            color: theme.palette.primary.main,
        },
        {
            icon: <Phone24Regular />,
            title: 'Call Us',
            primary: '+1 (555) 123-4567',
            secondary: 'Mon-Fri from 9am to 6pm',
            color: theme.palette.success.main,
        },
        {
            icon: <Location24Regular />,
            title: 'Visit Us',
            primary: '123 Marketing Street',
            secondary: 'San Francisco, CA 94102',
            color: theme.palette.warning.main,
        },
        {
            icon: <ChatHelp24Regular />,
            title: 'Live Chat',
            primary: 'Chat with our team',
            secondary: 'Available 24/7',
            color: theme.palette.secondary.main,
        },
    ];

    const faqs = [
        {
            question: 'What are your business hours?',
            answer: 'We\'re available Monday to Friday, 9am to 6pm PST. Our support team responds to emails within 24 hours.',
        },
        {
            question: 'How quickly can I expect a response?',
            answer: 'We typically respond to all inquiries within 24 hours during business days.',
        },
        {
            question: 'Do you offer phone support?',
            answer: 'Yes! Our phone support is available for premium and enterprise customers during business hours.',
        },
    ];

    return (
        <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', mt: 1 }}>
            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                    py: { xs: 8, md: 12 },
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
                            label="GET IN TOUCH"
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
                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                                color: '#fff',
                                mb: 3,
                                lineHeight: 1.1,
                            }}
                        >
                            Contact Us
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                mb: 2,
                                maxWidth: 700,
                                mx: 'auto',
                                lineHeight: 1.6,
                            }}
                        >
                            Have a question or need assistance? We're here to help!
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                maxWidth: 600,
                                mx: 'auto',
                            }}
                        >
                            Our dedicated support team is ready to assist you with any questions or concerns.
                        </Typography>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ mt: -6, mb: 8, position: 'relative', zIndex: 2 }}>
                <Grid container spacing={3}>
                    {contactMethods.map((method, index) => (
                        <Grid size={{ xs:12, sm:6, md:3 }} key={index}>
                            <Card
                                sx={{
                                    height: '100%',
                                    p: 3,
                                    textAlign: 'center',
                                    bgcolor: theme.palette.background.paper,
                                    border: `1px solid ${theme.palette.divider}`,
                                    borderRadius: 3,
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: `0 12px 32px ${method.color}20`,
                                        borderColor: method.color,
                                        '& .icon-box': {
                                            bgcolor: method.color,
                                            color: '#fff',
                                            transform: 'scale(1.1) rotate(5deg)',
                                        },
                                    },
                                }}
                            >
                                <Box
                                    className="icon-box"
                                    sx={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: '50%',
                                        bgcolor: `${method.color}15`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mx: 'auto',
                                        mb: 2,
                                        color: method.color,
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    {method.icon}
                                </Box>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 700,
                                        color: theme.palette.text.heading,
                                        mb: 1,
                                    }}
                                >
                                    {method.title}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: theme.palette.text.primary,
                                        fontWeight: 600,
                                        mb: 0.5,
                                    }}
                                >
                                    {method.primary}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                    }}
                                >
                                    {method.secondary}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Container maxWidth="lg" sx={{ py: 2 }}>
                <Grid container spacing={3}>
                    <Grid size={{ xs:12, md:7 }}>
                        <Card
                            sx={{
                                p: { xs: 3, md: 5 },
                                borderRadius: 4,
                                bgcolor: theme.palette.background.paper,
                                border: `1px solid ${theme.palette.divider}`,
                                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 800,
                                    color: theme.palette.text.heading,
                                    mb: 2,
                                }}
                            >
                                Send us a Message
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    mb: 4,
                                }}
                            >
                                Fill out the form below and we'll get back to you as soon as possible.
                            </Typography>

                            <Box component="form" onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid size={{ xs:12, sm:6, }} >
                                        <TextField
                                            fullWidth
                                            required
                                            name="name"
                                            label="Full Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Person24Regular style={{ color: theme.palette.text.secondary }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs:12, sm:6, }}>
                                        <TextField
                                            fullWidth
                                            required
                                            name="email"
                                            label="Email Address"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Mail24Regular style={{ color: theme.palette.text.secondary }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs:12, sm:6, }}>
                                        <TextField
                                            fullWidth
                                            name="phone"
                                            label="Phone Number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Phone24Regular style={{ color: theme.palette.text.secondary }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs:12, sm:6, }}>
                                        <TextField
                                            fullWidth
                                            name="company"
                                            label="Company Name"
                                            value={formData.company}
                                            onChange={handleChange}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <BuildingRetail24Regular style={{ color: theme.palette.text.secondary }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs:12, }}>
                                        <TextField
                                            fullWidth
                                            required
                                            name="subject"
                                            label="Subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid size={{ xs:12, }}>
                                        <TextField
                                            fullWidth
                                            required
                                            name="message"
                                            label="Message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell us how we can help you..."
                                        />
                                    </Grid>
                                    <Grid size={{ xs:12,}}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            fullWidth
                                            endIcon={<Send24Regular />}
                                            sx={{
                                                bgcolor: theme.palette.primary.main,
                                                color: theme.palette.primary.contrastText,
                                                py: 1.8,
                                                fontSize: '1.125rem',
                                                fontWeight: 700,
                                                borderRadius: 2,
                                                textTransform: 'none',
                                                boxShadow: `0 8px 24px ${theme.palette.primary.main}40`,
                                                '&:hover': {
                                                    bgcolor: theme.palette.primary.bg,
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: `0 12px 32px ${theme.palette.primary.main}60`,
                                                },
                                                transition: 'all 0.3s ease',
                                            }}
                                        >
                                            Send Message
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Card>
                    </Grid>

                    <Grid size={{ xs:12, md:5 }}>
                        <Card
                            sx={{
                                p: 4,
                                mb: 3,
                                borderRadius: 3,
                                bgcolor: theme.palette.background.paper,
                                border: `1px solid ${theme.palette.divider}`,
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
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
                                    <Clock24Regular style={{ fontSize: 24 }} />
                                </Box>
                                <Box>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            color: theme.palette.text.heading,
                                            mb: 1,
                                        }}
                                    >
                                        Office Hours
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            mb: 1,
                                        }}
                                    >
                                        Monday - Friday: 9:00 AM - 6:00 PM PST
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                        }}
                                    >
                                        Saturday - Sunday: Closed
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>

                        <Card
                            sx={{
                                mb: 3,
                                borderRadius: 3,
                                overflow: 'hidden',
                                border: `1px solid ${theme.palette.divider}`,
                            }}
                        >
                            <Box
                                sx={{
                                    height: 250,
                                    bgcolor: theme.palette.primary.lightBg,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundImage: 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=400&fit=crop)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: `linear-gradient(to bottom, transparent, ${theme.palette.primary.main}90)`,
                                    },
                                }}
                            >
                                <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                                    <Location24Regular style={{ fontSize: 48, color: '#fff', marginBottom: 8 }} />
                                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
                                        San Francisco, CA
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>

                        <Card
                            sx={{
                                p: 4,
                                borderRadius: 3,
                                bgcolor: theme.palette.background.paper,
                                border: `1px solid ${theme.palette.divider}`,
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    color: theme.palette.text.heading,
                                    mb: 3,
                                }}
                            >
                                Quick Questions?
                            </Typography>
                            {faqs.map((faq, index) => (
                                <Box key={index} sx={{ mb: 2 }}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontWeight: 700,
                                            color: theme.palette.text.heading,
                                            mb: 0.5,
                                        }}
                                    >
                                        {faq.question}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        {faq.answer}
                                    </Typography>
                                </Box>
                            ))}
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default ContactUsPage;