import React, { useState } from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    IconButton,
    Divider,
    Chip,
    Paper,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Delete24Regular, Tag24Regular } from '@fluentui/react-icons';

const CheckoutPage = () => {
    const theme = useTheme();

    const [couponCode, setCouponCode] = useState('');
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Logo',
            description: 'A Luxury 3D Metallic logo design brings your brand to life, providing depth and personality that a traditional 2D logo cannot achieve.',
            deliveryType: 'Delivery',
            price: 30.00,
            discount: 0,
            image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
        },
        {
            id: 2,
            name: 'Logo',
            description: 'A Luxury 3D Metallic logo design brings your brand to life, providing depth and personality that a traditional 2D logo cannot achieve.',
            deliveryType: 'Delivery',
            price: 25.80,
            discount: 0,
            image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
        },
    ]);

    const handleRemoveItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const handleApplyCoupon = () => {
        console.log('Applying coupon:', couponCode);
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const discount = cartItems.reduce((sum, item) => sum + item.discount, 0);
    const total = subtotal - discount;

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: theme.palette.background.default,
                py: 4,
            }}
        >
            <Container maxWidth="lg">
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        mb: 4,
                        color: theme.palette.text.heading,
                    }}
                >
                    Shopping Cart
                </Typography>

                <Grid container spacing={3}>
                    <Grid size={{ xs:12, md:7 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {cartItems.map((item) => (
                                <Card
                                    key={item.id}
                                    elevation={0}
                                    sx={{
                                        border: `1px solid ${theme.palette.divider}`,
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            boxShadow: theme.palette.mode === 'light'
                                                ? '0 4px 20px rgba(0,0,0,0.08)'
                                                : '0 4px 20px rgba(255,255,255,0.05)',
                                            transform: 'translateY(-2px)',
                                        },
                                    }}
                                >
                                    <CardContent sx={{ p: 3 }}>
                                        <Box sx={{ display: 'flex', gap: 3 }}>
                                            {/* Product Image */}
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    width: 200,
                                                    height: 200,
                                                    borderRadius: 2,
                                                    overflow: 'hidden',
                                                    flexShrink: 0,
                                                    bgcolor: theme.palette.background.paper,
                                                    border: `1px solid ${theme.palette.divider}`,
                                                }}
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                                {item.discount > 0 && (
                                                    <Chip
                                                        label={`-GHS ${item.discount.toFixed(2)}`}
                                                        size="small"
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 10,
                                                            left: 10,
                                                            bgcolor: theme.palette.error.main,
                                                            color: theme.palette.error.contrastText,
                                                            fontWeight: 600,
                                                            fontSize: '0.75rem',
                                                        }}
                                                    />
                                                )}
                                            </Box>

                                            {/* Product Details */}
                                            <Box sx={{ flex: 1 }}>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'flex-start',
                                                        mb: 1.5,
                                                    }}
                                                >
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontWeight: 600,
                                                            color: theme.palette.text.heading,
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Typography>
                                                    <IconButton
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        size="small"
                                                        sx={{
                                                            color: theme.palette.error.main,
                                                            '&:hover': {
                                                                bgcolor: `${theme.palette.error.main}15`,
                                                            },
                                                        }}
                                                    >
                                                        <Delete24Regular />
                                                    </IconButton>
                                                </Box>

                                                <Chip
                                                    label={item.deliveryType}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: theme.palette.primary.lightBg,
                                                        color: theme.palette.primary.main,
                                                        fontWeight: 600,
                                                        fontSize: '0.7rem',
                                                        mb: 1.5,
                                                        height: 24,
                                                    }}
                                                />

                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: theme.palette.text.secondary,
                                                        lineHeight: 1.6,
                                                        mb: 2,
                                                    }}
                                                >
                                                    {item.description}
                                                </Typography>

                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: 700,
                                                        color: theme.palette.primary.main,
                                                    }}
                                                >
                                                    GHS {item.price.toFixed(2)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    </Grid>

                    <Grid size={{ xs:12, md:5 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                position: 'sticky',
                                top: 20,
                                border: `1px solid ${theme.palette.divider}`,
                                borderRadius: 3,
                                overflow: 'hidden',
                            }}
                        >
                            <Box
                                sx={{
                                    bgcolor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                    p: 2.5,
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Order Summary
                                </Typography>
                            </Box>

                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ mb: 3 }}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 1.5,
                                            color: theme.palette.text.heading,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                        }}
                                    >
                                        <Tag24Regular style={{ fontSize: '18px' }} />
                                        Coupon/Gift Code
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            placeholder="Enter coupon code"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    bgcolor: theme.palette.background.default,
                                                },
                                            }}
                                        />
                                        <Button
                                            variant="contained"
                                            onClick={handleApplyCoupon}
                                            sx={{
                                                textTransform: 'none',
                                                borderRadius: 2,
                                                px: 3,
                                                fontWeight: 600,
                                                bgcolor: theme.palette.warning.main,
                                                color: theme.palette.warning.contrastText,
                                                '&:hover': {
                                                    bgcolor: theme.palette.warning.dark,
                                                },
                                            }}
                                        >
                                            Apply
                                        </Button>
                                    </Box>
                                </Box>

                                <Divider sx={{ my: 2.5 }} />

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{ color: theme.palette.text.secondary }}
                                        >
                                            Item
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 600,
                                                color: theme.palette.text.primary,
                                            }}
                                        >
                                            {cartItems.length}
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{ color: theme.palette.text.secondary }}
                                        >
                                            Coupon code{' '}
                                            <Typography
                                                component="span"
                                                variant="caption"
                                                sx={{ color: theme.palette.text.disabled }}
                                            >
                                                (Not Applied)
                                            </Typography>
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 600,
                                                color: theme.palette.text.primary,
                                            }}
                                        >
                                            0
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{ color: theme.palette.text.secondary }}
                                        >
                                            Gift Code{' '}
                                            <Typography
                                                component="span"
                                                variant="caption"
                                                sx={{ color: theme.palette.text.disabled }}
                                            >
                                                (Not Applied)
                                            </Typography>
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 600,
                                                color: theme.palette.text.primary,
                                            }}
                                        >
                                            0
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{ color: theme.palette.text.secondary }}
                                        >
                                            Sub-total
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 600,
                                                color: theme.palette.text.primary,
                                            }}
                                        >
                                            {subtotal.toFixed(2)}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Divider sx={{ my: 2.5 }} />

                                {/* Total */}
                                <Box
                                    sx={{
                                        bgcolor: theme.palette.primary.lightBg,
                                        borderRadius: 2,
                                        p: 2,
                                        mb: 3,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            mb: 0.5,
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 700,
                                                color: theme.palette.text.heading,
                                            }}
                                        >
                                            Total
                                        </Typography>
                                        <Box sx={{ textAlign: 'right' }}>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    textDecoration: 'line-through',
                                                    color: theme.palette.text.disabled,
                                                    display: 'block',
                                                }}
                                            >
                                                GHS {(subtotal + 5.80).toFixed(2)}
                                            </Typography>
                                            <Typography
                                                variant="h5"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: theme.palette.primary.main,
                                                }}
                                            >
                                                GHS {total.toFixed(2)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Action Buttons */}
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        size="large"
                                        sx={{
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            borderRadius: 2,
                                            py: 0.3,
                                            bgcolor: theme.palette.warning.main,
                                            color: theme.palette.warning.contrastText,
                                            boxShadow: `0 4px 14px ${theme.palette.warning.main}40`,
                                            '&:hover': {
                                                bgcolor: theme.palette.warning.dark,
                                                boxShadow: `0 6px 20px ${theme.palette.warning.main}50`,
                                            },
                                        }}
                                    >
                                        Pay
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        size="large"
                                        sx={{
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            borderRadius: 2,
                                            py: 1.5,
                                            borderColor: theme.palette.divider,
                                            color: theme.palette.text.primary,
                                            '&:hover': {
                                                borderColor: theme.palette.primary.main,
                                                bgcolor: `${theme.palette.primary.main}10`,
                                            },
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            </CardContent>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default CheckoutPage;