import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Box,
    Stack,
    CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CheckmarkCircle24Filled, Star24Filled, ArrowRight24Regular } from '@fluentui/react-icons';
import {
    AttachMoney,
    CardGiftcard,
    TrendingUp,
    Stars,
    Diamond,
} from '@mui/icons-material';
import { calculateSavings, getPackageGradient } from '../Subscriptions/constants';

// Icon mapping for different packages
const getPackageIcon = (index) => {
    const icons = [
        <AttachMoney sx={{ fontSize: 28 }} />,
        <CardGiftcard sx={{ fontSize: 28 }} />,
        <TrendingUp sx={{ fontSize: 28 }} />,
        <Stars sx={{ fontSize: 28 }} />,
        <Diamond sx={{ fontSize: 28 }} />,
    ];
    return icons[index % icons.length];
};

const PricingCard = ({ pkg, index, isBestValue, onPurchase, processing }) => {
    const theme = useTheme();
    const gradientConfig = getPackageGradient(index);
    const savings = calculateSavings(pkg.credits, pkg.price);

    const features = [
        'Instant credit activation',
        'Never expires',
        'Use across all services',
        '24/7 priority support',
    ];

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
                border: isBestValue
                    ? `3px solid ${theme.palette.primary.main}`
                    : `1px solid ${theme.palette.divider}`,
                position: 'relative',
                overflow: 'visible',
                bgcolor: theme.palette.background.paper,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isBestValue ? 'scale(1.05)' : 'scale(1)',
                boxShadow: isBestValue
                    ? `0 20px 60px ${theme.palette.primary.main}30`
                    : '0 4px 12px rgba(0,0,0,0.08)',
                '&:hover': {
                    transform: isBestValue ? 'scale(1.05) translateY(-8px)' : 'translateY(-8px)',
                    boxShadow: isBestValue
                        ? `0 24px 80px ${theme.palette.primary.main}40`
                        : `0 12px 32px ${gradientConfig.color}20`,
                },
            }}
        >
            {/* Popular Badge */}
            {isBestValue && (
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
                        fontSize: '0.75rem',
                        boxShadow: `0 4px 16px ${theme.palette.primary.main}60`,
                    }}
                >
                    <Star24Filled style={{ fontSize: 16 }} />
                    BEST VALUE
                </Box>
            )}

            {/* Savings Badge */}
            {savings > 0 && (
                <Chip
                    label={`Save ${savings}%`}
                    color="error"
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: isBestValue ? 20 : 16,
                        right: 16,
                        fontWeight: 600,
                        zIndex: 1,
                    }}
                />
            )}

            <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Icon */}
                <Box
                    sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 3,
                        background: gradientConfig.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        mb: 2,
                    }}
                >
                    {getPackageIcon(index)}
                </Box>

                {/* Plan Name */}
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 800,
                        color: theme.palette.text.heading,
                        mb: 0.5,
                        textTransform: 'capitalize',
                    }}
                >
                    {pkg.name}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: theme.palette.text.secondary,
                        mb: 3,
                        minHeight: 40,
                    }}
                >
                    {pkg.description}
                </Typography>

                {/* Price */}
                <Box sx={{ mb: 3 }}>
                    <Stack direction="row" spacing={1} alignItems="baseline" mb={1}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 900,
                                color: gradientConfig.color,
                                fontSize: '2.5rem',
                            }}
                        >
                            GH₵{parseFloat(pkg.price).toLocaleString()}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Chip
                            label={`${pkg.credits.toLocaleString()} Credits`}
                            size="small"
                            sx={{
                                bgcolor: `${gradientConfig.color}15`,
                                color: gradientConfig.color,
                                fontWeight: 600,
                            }}
                        />
                        <Typography
                            variant="caption"
                            sx={{
                                color: theme.palette.text.secondary,
                            }}
                        >
                            {(parseFloat(pkg.price) / pkg.credits).toFixed(2)} GH₵/credit
                        </Typography>
                    </Stack>
                </Box>

                {/* CTA Button */}
                <Button
                    variant={isBestValue ? 'contained' : 'outlined'}
                    fullWidth
                    endIcon={processing ? <CircularProgress size={20} color="inherit" /> : <ArrowRight24Regular />}
                    disabled={processing}
                    onClick={() => onPurchase(pkg)}
                    sx={{
                        py: 1.5,
                        mb: 3,
                        borderRadius: 2,
                        fontWeight: 700,
                        fontSize: '1rem',
                        textTransform: 'none',
                        ...(isBestValue
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
                                    borderColor: gradientConfig.color,
                                    bgcolor: `${gradientConfig.color}08`,
                                },
                            }),
                    }}
                >
                    {processing ? 'Processing...' : 'Purchase Now'}
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
                    {features.map((feature, idx) => (
                        <ListItem key={idx} sx={{ px: 0, py: 0.75 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                                <CheckmarkCircle24Filled
                                    style={{
                                        color: isBestValue ? theme.palette.primary.main : theme.palette.success.main,
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
    );
};

export default PricingCard;