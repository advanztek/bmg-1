import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Card, CardContent, Grid, Chip, InputAdornment, Divider, Paper, Stepper, Step, StepLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Gift24Regular, Mail24Regular, Person24Regular, Money24Regular, CheckmarkCircle24Filled, Sparkle24Regular, ArrowRight24Regular, CheckmarkCircleFilled } from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';

const GiftVoucherPage = () => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [selectedAmount, setSelectedAmount] = useState('50');
    const [customAmount, setCustomAmount] = useState('');
    const [selectedDesign, setSelectedDesign] = useState('celebration');
    const [formData, setFormData] = useState({
        recipientName: '',
        recipientEmail: '',
        senderName: '',
        senderEmail: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Gift voucher data:', { ...formData, amount: customAmount || selectedAmount, design: selectedDesign });
    };

    const steps = ['Choose Amount', 'Personalize', 'Review & Purchase'];

    const amounts = [
        { value: '25', label: '$25', description: 'Starter' },
        { value: '50', label: '$50', description: 'Popular', popular: true },
        { value: '100', label: '$100', description: 'Pro' },
        { value: '250', label: '$250', description: 'Enterprise' },
    ];

    const designs = [
        { id: 'celebration', name: 'Celebration', emoji: '🎉', gradient: `linear-gradient(135deg, #ff9a56 0%, #ff6b35 100%)` },
        { id: 'professional', name: 'Professional', emoji: '💼', gradient: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)` },
        { id: 'birthday', name: 'Birthday', emoji: '🎂', gradient: `linear-gradient(135deg, #ec4899 0%, #be185d 100%)` },
        { id: 'thankyou', name: 'Thank You', emoji: '💝', gradient: `linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)` },
    ];

    const features = [
        'Valid for all BMG services and tools',
        'Never expires - use whenever ready',
        'Instant delivery via email',
        'Fully transferable to anyone',
        'Custom amounts available',
        'Multiple design themes',
    ];

    return (
        <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
            <Box sx={{
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
            }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        {/* Left Content */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="h2" sx={{ color: '#fff', fontWeight: 800, mb: 3, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
                                Empowering dreams through{' '}
                                <Box component="span" sx={{ color: '#ffd700' }}>Gifting</Box>
                            </Typography>
                            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', mb: 1, lineHeight: 1.6 }}>
                                How do you support a friend starting a business enterprise?
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2, fontStyle: 'italic' }}>
                                Send them some small coins for internet data? It lacks the grandeur their dreams deserve
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4, fontStyle: 'italic' }}>
                                Share their business flyer on Facebook? Decent effort, but let's elevate it to the extraordinary with a BMG "Support a Business" Gift Voucher
                            </Typography>
                            <Button
                                variant="contained"
                                endIcon={<ArrowRight24Regular />}
                                sx={{
                                    bgcolor: theme.palette.warning.dark,
                                    color: '#fff',
                                    px: 3,
                                    py: 1.1,
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    boxShadow: '0 8px 32px rgba(255, 107, 53, 0.4)',
                                    '&:hover': {
                                        bgcolor:  theme.palette.warning.main,
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 12px 40px rgba(255, 107, 53, 0.5)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                                onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
                            >
                                Gift Voucher
                            </Button>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box sx={{ position: 'relative', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {/* Main Gift Box */}
                                <Box sx={{ position: 'relative', width: 200, height: 200 }}>
                                    {/* Gift Box Base */}
                                    <Box sx={{
                                        width: 200,
                                        height: 200,
                                        bgcolor: '#ff6b35',
                                        borderRadius: 3,
                                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '5rem',
                                    }}>
                                        🎁
                                    </Box>

                                    {/* Ribbon Horizontal */}
                                    <Box sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: -20,
                                        right: -20,
                                        height: 30,
                                        bgcolor: '#ffd700',
                                        transform: 'translateY(-50%)',
                                        zIndex: 1,
                                    }} />

                                    {/* Ribbon Vertical */}
                                    <Box sx={{
                                        position: 'absolute',
                                        left: '50%',
                                        top: -20,
                                        bottom: -20,
                                        width: 30,
                                        bgcolor: '#ffd700',
                                        transform: 'translateX(-50%)',
                                        zIndex: 1,
                                    }} />

                                    {/* Bow */}
                                    <Box sx={{
                                        position: 'absolute',
                                        top: -30,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        fontSize: '4rem',
                                        zIndex: 2,
                                    }}>
                                        🎀
                                    </Box>

                                    {/* Floating Sparkles */}
                                    {[...Array(6)].map((_, i) => (
                                        <Box
                                            key={i}
                                            sx={{
                                                position: 'absolute',
                                                fontSize: '2rem',
                                                animation: 'float 3s ease-in-out infinite',
                                                animationDelay: `${i * 0.5}s`,
                                                top: `${Math.random() * 100}%`,
                                                left: `${Math.random() * 100}%`,
                                                '@keyframes float': {
                                                    '0%, 100%': { transform: 'translateY(0px)' },
                                                    '50%': { transform: 'translateY(-20px)' },
                                                },
                                            }}
                                        >
                                            ✨
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Why Choose Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 700, mb: 2 }}>
                    Why Choose BMG Gift Vouchers?
                </Typography>
                <Typography variant="h6" sx={{ textAlign: 'center', color: 'text.secondary', mb: 6 }}>
                    The perfect way to empower entrepreneurs and support their business dreams
                </Typography>

                <Grid container spacing={2}>
                    {features.map((feature, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                            <Card sx={{ height: '100%', p: 5, textAlign: 'center', border: '2px solid', borderColor: 'divider', boxShadow: 'none' }}>
                                <CheckmarkCircleFilled style={{ color: theme.palette.primary.main, fontSize: '2.5rem' }} />
                                <Typography variant="body1" sx={{ mt: 2, fontWeight: 500 }}>
                                    {feature}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 700, mb: 2 }}>
                    Create Your Gift Voucher
                </Typography>
                <Typography variant="h6" sx={{ textAlign: 'center', color: 'text.secondary', mb: 6 }}>
                    Follow these simple steps to send the perfect gift
                </Typography>

                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 7 }}>
                        <Paper sx={{ p: 4, borderRadius: 3 }}>
                            {/* Stepper */}
                            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>

                            {/* Form Section */}
                            <Box component="form" onSubmit={handleSubmit}>
                                {/* Step 1: Amount */}
                                {activeStep === 0 && (
                                    <Box>
                                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                                            Select Amount
                                        </Typography>
                                        <Grid container spacing={2} sx={{ mb: 3 }}>
                                            {amounts.map((amount) => (
                                                <Grid size={{ xs: 6, sm: 3 }} key={amount.value}>
                                                    <Card
                                                        onClick={() => {
                                                            setSelectedAmount(amount.value);
                                                            setCustomAmount('');
                                                        }}
                                                        sx={{
                                                            p: 3,
                                                            textAlign: 'center',
                                                            cursor: 'pointer',
                                                            border: `2px solid ${selectedAmount === amount.value && !customAmount ? theme.palette.primary.main : theme.palette.divider}`,
                                                            bgcolor: selectedAmount === amount.value && !customAmount ? `${theme.palette.primary.main}08` : 'transparent',
                                                            borderRadius: 3,
                                                            position: 'relative',
                                                            transition: 'all 0.3s ease',
                                                            '&:hover': {
                                                                borderColor: theme.palette.primary.main,
                                                                transform: 'scale(1.05)',
                                                            },
                                                        }}
                                                    >
                                                        {amount.popular && (
                                                            <Chip
                                                                label="Popular"
                                                                size="small"
                                                                sx={{
                                                                    position: 'absolute',
                                                                    top: -12,
                                                                    right: 8,
                                                                    bgcolor: theme.palette.primary.main,
                                                                    color: '#fff',
                                                                }}
                                                            />
                                                        )}
                                                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                                                            {amount.label}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {amount.description}
                                                        </Typography>
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>

                                        <TextField
                                            fullWidth
                                            type="number"
                                            value={customAmount}
                                            onChange={(e) => {
                                                setCustomAmount(e.target.value);
                                                setSelectedAmount('');
                                            }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Money24Regular />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            placeholder="Enter custom amount (min $10)"
                                        />
                                    </Box>
                                )}

                                {/* Step 2: Personalize */}
                                {activeStep === 1 && (
                                    <Box>
                                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                                            Personalize Your Gift
                                        </Typography>

                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                                            Choose Design
                                        </Typography>
                                        <Grid container spacing={2} sx={{ mb: 3 }}>
                                            {designs.map((design) => (
                                                <Grid size={{ xs: 6, sm: 3 }} key={design.id}>
                                                    <Card
                                                        onClick={() => setSelectedDesign(design.id)}
                                                        sx={{
                                                            cursor: 'pointer',
                                                            border: `2px solid ${selectedDesign === design.id ? theme.palette.primary.main : theme.palette.divider}`,
                                                            borderRadius: 3,
                                                            overflow: 'hidden',
                                                            transition: 'all 0.3s ease',
                                                            '&:hover': {
                                                                borderColor: theme.palette.primary.main,
                                                                transform: 'scale(1.05)',
                                                            },
                                                        }}
                                                    >
                                                        <Box sx={{ background: design.gradient, p: 3, textAlign: 'center' }}>
                                                            <Typography sx={{ fontSize: '3rem' }}>{design.emoji}</Typography>
                                                        </Box>
                                                        <Typography variant="body2" sx={{ textAlign: 'center', py: 1, fontWeight: 500 }}>
                                                            {design.name}
                                                        </Typography>
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>

                                        <Divider sx={{ my: 3 }} />

                                        <Grid container spacing={2}>
                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <TextField
                                                    fullWidth
                                                    required
                                                    name="recipientName"
                                                    label="Recipient Name"
                                                    value={formData.recipientName}
                                                    onChange={handleChange}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <Person24Regular />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <TextField
                                                    fullWidth
                                                    required
                                                    type="email"
                                                    name="recipientEmail"
                                                    label="Recipient Email"
                                                    value={formData.recipientEmail}
                                                    onChange={handleChange}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <Mail24Regular />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <TextField
                                                    fullWidth
                                                    required
                                                    name="senderName"
                                                    label="Your Name"
                                                    value={formData.senderName}
                                                    onChange={handleChange}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <Person24Regular />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <TextField
                                                    fullWidth
                                                    required
                                                    type="email"
                                                    name="senderEmail"
                                                    label="Your Email"
                                                    value={formData.senderEmail}
                                                    onChange={handleChange}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <Mail24Regular />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12 }} >
                                                <TextField
                                                    fullWidth
                                                    name="message"
                                                    label="Personal Message (Optional)"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    placeholder="Add a personal message to your gift..."
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                )}

                                {activeStep === 2 && (
                                    <Box>
                                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                                            Review & Purchase
                                        </Typography>

                                        <Card sx={{ p: 3, bgcolor: '#f5f5f5', mb: 3 }}>
                                            <Grid container spacing={2}>
                                                <Grid size={{ xs: 12 }}>
                                                    <Typography variant="subtitle2" color="text.secondary">Amount:</Typography>
                                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                        ${customAmount || selectedAmount}
                                                    </Typography>
                                                </Grid>
                                                <Grid size={{ xs: 12 }}>
                                                    <Typography variant="subtitle2" color="text.secondary">Design:</Typography>
                                                    <Typography variant="body1">
                                                        {designs.find(d => d.id === selectedDesign)?.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid size={{ xs: 12 }}>
                                                    <Typography variant="subtitle2" color="text.secondary">To:</Typography>
                                                    <Typography variant="body1">
                                                        {formData.recipientName} ({formData.recipientEmail})
                                                    </Typography>
                                                </Grid>
                                                <Grid size={{ xs: 12 }}>
                                                    <Typography variant="subtitle2" color="text.secondary">From:</Typography>
                                                    <Typography variant="body1">
                                                        {formData.senderName} ({formData.senderEmail})
                                                    </Typography>
                                                </Grid>
                                                {formData.message && (
                                                    <Grid size={{ xs: 12 }}>
                                                        <Typography variant="subtitle2" color="text.secondary">Message:</Typography>
                                                        <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                                                            "{formData.message}"
                                                        </Typography>
                                                    </Grid>
                                                )}
                                            </Grid>
                                        </Card>
                                    </Box>
                                )}

                                {/* Navigation Buttons */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ textTransform: 'none' }}
                                    >
                                        Back
                                    </Button>
                                    {activeStep === steps.length - 1 ? (
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            onClick={() => navigate('/checkout')}
                                            endIcon={<CheckmarkCircle24Filled />}
                                            sx={{
                                                bgcolor: theme.palette.primary.main,
                                                px: 4,
                                                py: 1.5,
                                                textTransform: 'none',
                                                fontWeight: 700,
                                                '&:hover': {
                                                    bgcolor: theme.palette.primary.dark,
                                                },
                                            }}
                                        >
                                            Complete Purchase
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            endIcon={<ArrowRight24Regular />}
                                            sx={{
                                                bgcolor: theme.palette.primary.main,
                                                px: 4,
                                                py: 1.5,
                                                textTransform: 'none',
                                                fontWeight: 700,
                                                '&:hover': {
                                                    bgcolor: theme.palette.primary.dark,
                                                },
                                            }}
                                        >
                                            Next
                                        </Button>
                                    )}
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Preview Section */}
                    <Grid size={{ xs: 12, md: 5 }} >
                        <Box sx={{ position: 'sticky', top: 20 }}>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                                Voucher Preview
                            </Typography>
                            <Card
                                sx={{
                                    background: designs.find(d => d.id === selectedDesign)?.gradient,
                                    border: 'none',
                                    minHeight: 350,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                                    p: 4,
                                    color: '#fff',
                                }}
                            >
                                <Box>
                                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                                        ${customAmount || selectedAmount}
                                    </Typography>
                                    <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
                                        BMG Gift Voucher
                                    </Typography>
                                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.3)', my: 3 }} />
                                    <Typography variant="body1" sx={{ mb: 1 }}>
                                        To: {formData.recipientName || 'Recipient Name'}
                                    </Typography>
                                    <Typography variant="body1">
                                        From: {formData.senderName || 'Your Name'}
                                    </Typography>
                                    {formData.message && (
                                        <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 2 }}>
                                            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                                                "{formData.message}"
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                                <Box sx={{ textAlign: 'center', mt: 3 }}>
                                    <Gift24Regular style={{ fontSize: '4rem' }} />
                                </Box>
                            </Card>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default GiftVoucherPage;