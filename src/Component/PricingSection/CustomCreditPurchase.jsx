import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Stack,
    Avatar,
    Paper,
    Fade,
    Zoom,
    Grid,
    Chip,
    InputAdornment,
    Tooltip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    AttachMoney,
    LocalOffer,
    ShoppingCart,
    TrendingUp,
    Info,
    Bolt,
} from '@mui/icons-material';
import { calculatePrice, CREDIT_RATE } from '../Subscriptions/constants';

const CustomCreditPurchase = ({ customCredits, setCustomCredits, onPurchase, processing }) => {
    const theme = useTheme();
    const credits = parseInt(customCredits) || 0;
    const totalPrice = credits > 0 ? calculatePrice(credits) : 0;
    const pricePerCredit = CREDIT_RATE;

    const handlePurchaseClick = () => {
        if (credits > 0) {
            onPurchase(credits, totalPrice);
        }
    };

    return (
        <Box sx={{ mb: 6 }}>
            <Card
                elevation={4}
                sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: `1px solid ${theme.palette.divider}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: `0 8px 32px rgba(102, 126, 234, 0.15)`,
                        transform: 'translateY(-2px)',
                    },
                }}
            >
                {/* Header Section */}
                <Box
                    sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        p: 3,
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 60%)',
                        },
                    }}
                >
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
                        <Avatar
                            sx={{
                                bgcolor: 'rgba(255, 255, 255, 0.25)',
                                backdropFilter: 'blur(10px)',
                                width: 56,
                                height: 56,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            }}
                        >
                            <Bolt sx={{ color: 'white', fontSize: 28 }} />
                        </Avatar>
                        <Box flex={1}>
                            <Typography variant="h5" fontWeight={700} color="white" sx={{ mb: 0.5 }}>
                                Custom Credit Package
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.95)' }}>
                                Build your own package with exactly the credits you need
                            </Typography>
                        </Box>
                        <Chip
                            label="Flexible"
                            size="small"
                            sx={{
                                bgcolor: 'rgba(255, 255, 255, 0.25)',
                                color: 'white',
                                fontWeight: 600,
                                backdropFilter: 'blur(10px)',
                                display: { xs: 'none', sm: 'flex' },
                            }}
                        />
                    </Stack>
                </Box>

                <CardContent sx={{ p: 4 }}>
                    <Grid container spacing={3}>
                        {/* Input Section */}
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 700,
                                        color: theme.palette.text.primary,
                                        mb: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    Enter Credit Amount
                                    <Tooltip title="Minimum 1 credit. No maximum limit." arrow>
                                        <Info sx={{ fontSize: 16, color: theme.palette.text.secondary }} />
                                    </Tooltip>
                                </Typography>
                                <TextField
                                    label="Number of Credits"
                                    type="number"
                                    value={customCredits}
                                    onChange={(e) => setCustomCredits(e.target.value)}
                                    placeholder="e.g., 100"
                                    fullWidth
                                    InputProps={{
                                        inputProps: { min: 1, step: 1 },
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LocalOffer color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            fontSize: '1.1rem',
                                            fontWeight: 600,
                                            '&.Mui-focused': {
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderWidth: 2,
                                                },
                                            },
                                        },
                                    }}
                                />
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        display: 'block',
                                        mt: 1,
                                        fontWeight: 500,
                                    }}
                                >
                                    Rate: GH₵{pricePerCredit} per credit
                                </Typography>

                                {/* Quick Select Options */}
                                <Box sx={{ mt: 3 }}>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            display: 'block',
                                            mb: 1,
                                            fontWeight: 600,
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        Quick Select
                                    </Typography>
                                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                        {[50, 100, 250, 500].map((amount) => (
                                            <Chip
                                                key={amount}
                                                label={`${amount}`}
                                                onClick={() => setCustomCredits(amount.toString())}
                                                sx={{
                                                    cursor: 'pointer',
                                                    fontWeight: 600,
                                                    bgcolor:
                                                        parseInt(customCredits) === amount
                                                            ? theme.palette.primary.main
                                                            : `${theme.palette.primary.main}10`,
                                                    color:
                                                        parseInt(customCredits) === amount
                                                            ? theme.palette.primary.contrastText
                                                            : theme.palette.primary.main,
                                                    '&:hover': {
                                                        bgcolor:
                                                            parseInt(customCredits) === amount
                                                                ? theme.palette.primary.dark
                                                                : `${theme.palette.primary.main}20`,
                                                    },
                                                }}
                                            />
                                        ))}
                                    </Stack>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Summary Section */}
                        <Grid item xs={12} md={6}>
                            {credits > 0 ? (
                                <Fade in={true}>
                                    <Box>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontWeight: 700,
                                                color: theme.palette.text.primary,
                                                mb: 2,
                                            }}
                                        >
                                            Purchase Summary
                                        </Typography>
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 3,
                                                background: 'linear-gradient(135deg, #667eea08 0%, #764ba208 100%)',
                                                border: '2px solid',
                                                borderColor: 'primary.main',
                                                borderRadius: 3,
                                            }}
                                        >
                                            <Stack spacing={2.5}>
                                                {/* Credits */}
                                                <Stack
                                                    direction="row"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                >
                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                        <LocalOffer
                                                            sx={{ fontSize: 18, color: theme.palette.text.secondary }}
                                                        />
                                                        <Typography variant="body2" color="text.secondary" fontWeight={600}>
                                                            Total Credits
                                                        </Typography>
                                                    </Stack>
                                                    <Typography variant="h6" fontWeight={700}>
                                                        {credits.toLocaleString()}
                                                    </Typography>
                                                </Stack>

                                                {/* Unit Price */}
                                                <Stack
                                                    direction="row"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                >
                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                        <TrendingUp
                                                            sx={{ fontSize: 18, color: theme.palette.text.secondary }}
                                                        />
                                                        <Typography variant="body2" color="text.secondary" fontWeight={600}>
                                                            Unit Price
                                                        </Typography>
                                                    </Stack>
                                                    <Typography variant="body1" fontWeight={600}>
                                                        GH₵{pricePerCredit}
                                                    </Typography>
                                                </Stack>

                                                <Box
                                                    sx={{
                                                        height: '1px',
                                                        bgcolor: theme.palette.divider,
                                                        my: 1,
                                                    }}
                                                />

                                                {/* Total Price */}
                                                <Stack
                                                    direction="row"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                >
                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                        <AttachMoney
                                                            sx={{ fontSize: 18, color: theme.palette.primary.main }}
                                                        />
                                                        <Typography
                                                            variant="body1"
                                                            color="text.primary"
                                                            fontWeight={700}
                                                        >
                                                            Total Price
                                                        </Typography>
                                                    </Stack>
                                                    <Typography variant="h4" fontWeight={800} color="primary.main">
                                                        GH₵{totalPrice}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </Paper>

                                        {/* Purchase Button */}
                                        <Zoom in={true} style={{ transitionDelay: '100ms' }}>
                                            <Button
                                                variant="contained"
                                                size="large"
                                                fullWidth
                                                onClick={handlePurchaseClick}
                                                disabled={processing}
                                                sx={{
                                                    mt: 3,
                                                    py: 1.75,
                                                    textTransform: 'none',
                                                    fontSize: '1.1rem',
                                                    fontWeight: 700,
                                                    borderRadius: 2,
                                                    boxShadow: `0 4px 16px ${theme.palette.primary.main}40`,
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    '&:hover': {
                                                        boxShadow: `0 6px 24px ${theme.palette.primary.main}60`,
                                                        transform: 'translateY(-2px)',
                                                    },
                                                    '&:disabled': {
                                                        background: theme.palette.action.disabledBackground,
                                                    },
                                                }}
                                                startIcon={<ShoppingCart />}
                                            >
                                                {processing ? 'Processing...' : 'Proceed to Checkout'}
                                            </Button>
                                        </Zoom>
                                    </Box>
                                </Fade>
                            ) : (
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 4,
                                        textAlign: 'center',
                                        bgcolor: `${theme.palette.primary.main}05`,
                                        borderRadius: 3,
                                        border: '1px dashed',
                                        borderColor: theme.palette.divider,
                                    }}
                                >
                                    <LocalOffer
                                        sx={{
                                            fontSize: 48,
                                            color: theme.palette.text.disabled,
                                            mb: 2,
                                        }}
                                    />
                                    <Typography variant="body1" color="text.secondary" fontWeight={500}>
                                        Enter the number of credits to see pricing details
                                    </Typography>
                                </Paper>
                            )}
                        </Grid>
                    </Grid>

                    {/* Info Banner */}
                    <Box
                        sx={{
                            mt: 3,
                            p: 2,
                            bgcolor: `${theme.palette.info.main}10`,
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: `${theme.palette.info.main}30`,
                        }}
                    >
                        <Stack direction="row" spacing={1.5} alignItems="flex-start">
                            <Info sx={{ fontSize: 20, color: theme.palette.info.main, mt: 0.2 }} />
                            <Box>
                                <Typography variant="body2" color="text.primary" fontWeight={600} sx={{ mb: 0.5 }}>
                                    Why Choose Custom Credits?
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                    • Purchase exactly what you need • Credits never expire • Instant activation • Use
                                    across all AI services
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default CustomCreditPurchase;