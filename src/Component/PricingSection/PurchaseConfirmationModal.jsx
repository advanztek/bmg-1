import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Stack,
    Box,
    Divider,
    Chip,
    Paper,
    IconButton,
    Alert,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Slide,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    Close,
    ShoppingCart,
    CheckCircle,
    Info,
    Security,
    Timer,
    LocalOffer,
    AttachMoney,
} from '@mui/icons-material';
import { calculateSavings } from '../Subscriptions/constants';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PurchaseConfirmationModal = ({ open, type, data, onConfirm, onCancel, processing }) => {
    const theme = useTheme();

    if (!data) return null;

    const isCustom = type === 'custom';
    const credits = isCustom ? data.credits : data.credits;
    const price = isCustom ? data.price : parseFloat(data.price).toFixed(2);
    const packageName = isCustom ? 'Custom Package' : data.name;
    const savings = isCustom ? 0 : calculateSavings(data.credits, data.price);
    const pricePerCredit = (parseFloat(price) / credits).toFixed(2);

    return (
        <Dialog
            open={open}
            onClose={processing ? undefined : onCancel}
            TransitionComponent={Transition}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    boxShadow: `0 24px 48px ${theme.palette.primary.main}15`,
                },
            }}
        >
            {/* Header */}
            <DialogTitle
                sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    position: 'relative',
                    pb: 3,
                }}
            >
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                borderRadius: 2,
                                bgcolor: 'rgba(255, 255, 255, 0.2)',
                                backdropFilter: 'blur(10px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <ShoppingCart sx={{ color: 'white' }} />
                        </Box>
                        <Box>
                            <Typography variant="h6" fontWeight={700}>
                                Confirm Your Purchase
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                                Review your order details before proceeding
                            </Typography>
                        </Box>
                    </Stack>
                    <IconButton
                        onClick={onCancel}
                        disabled={processing}
                        sx={{
                            color: 'white',
                            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
                        }}
                    >
                        <Close />
                    </IconButton>
                </Stack>
            </DialogTitle>

            <DialogContent sx={{ p: 3, pt: 4 }}>
                {/* Package Information */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        mb: 3,
                        background: 'linear-gradient(135deg, #667eea08 0%, #764ba208 100%)',
                        border: '2px solid',
                        borderColor: 'primary.main',
                        borderRadius: 2,
                    }}
                >
                    <Stack spacing={2}>
                        {/* Package Name */}
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                                Package
                            </Typography>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="h6" fontWeight={700} color="text.primary">
                                    {packageName}
                                </Typography>
                                {savings > 0 && (
                                    <Chip label={`Save ${savings}%`} color="error" size="small" sx={{ fontWeight: 600 }} />
                                )}
                            </Stack>
                        </Stack>

                        <Divider />

                        {/* Credits */}
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack direction="row" spacing={1} alignItems="center">
                                <LocalOffer sx={{ fontSize: 18, color: theme.palette.text.secondary }} />
                                <Typography variant="body2" color="text.secondary" fontWeight={600}>
                                    Total Credits
                                </Typography>
                            </Stack>
                            <Typography variant="h6" fontWeight={700}>
                                {credits.toLocaleString()}
                            </Typography>
                        </Stack>

                        {/* Unit Price */}
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack direction="row" spacing={1} alignItems="center">
                                <AttachMoney sx={{ fontSize: 18, color: theme.palette.text.secondary }} />
                                <Typography variant="body2" color="text.secondary" fontWeight={600}>
                                    Price per Credit
                                </Typography>
                            </Stack>
                            <Typography variant="body1" fontWeight={600}>
                                GH₵{pricePerCredit}
                            </Typography>
                        </Stack>

                        <Divider />

                        {/* Total Amount */}
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="subtitle1" fontWeight={700} color="text.primary">
                                Total Amount
                            </Typography>
                            <Typography variant="h4" fontWeight={800} color="primary.main">
                                GH₵{parseFloat(price).toLocaleString()}
                            </Typography>
                        </Stack>
                    </Stack>
                </Paper>

                {/* Features & Benefits */}
                <Box sx={{ mb: 3 }}>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 700,
                            color: theme.palette.text.primary,
                            mb: 2,
                            textTransform: 'uppercase',
                            fontSize: '0.75rem',
                            letterSpacing: 1,
                        }}
                    >
                        What You'll Get
                    </Typography>
                    <List sx={{ py: 0 }}>
                        {[
                            { icon: <CheckCircle color="success" />, text: 'Instant credit activation' },
                            { icon: <Timer color="primary" />, text: 'Credits never expire' },
                            { icon: <LocalOffer color="primary" />, text: 'Use across all AI services' },
                            { icon: <Security color="primary" />, text: 'Secure payment processing' },
                        ].map((item, index) => (
                            <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                                <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        variant: 'body2',
                                        fontWeight: 500,
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>

                {/* Important Information */}
                <Alert
                    severity="info"
                    icon={<Info />}
                    sx={{
                        borderRadius: 2,
                        '& .MuiAlert-message': {
                            width: '100%',
                        },
                    }}
                >
                    <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
                        Important Information
                    </Typography>
                    <Typography variant="caption" color="text.secondary" component="div">
                        • You will be redirected to a secure payment gateway
                        <br />
                        • Credits will be added immediately after successful payment
                        <br />• Transaction is processed securely via our payment partner
                    </Typography>
                </Alert>
            </DialogContent>

            {/* Actions */}
            <DialogActions
                sx={{
                    p: 3,
                    pt: 0,
                    gap: 2,
                }}
            >
                <Button
                    onClick={onCancel}
                    disabled={processing}
                    variant="outlined"
                    size="large"
                    fullWidth
                    sx={{
                        borderWidth: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                            borderWidth: 2,
                        },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    disabled={processing}
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{
                        textTransform: 'none',
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        boxShadow: `0 4px 16px ${theme.palette.primary.main}40`,
                        '&:hover': {
                            boxShadow: `0 6px 24px ${theme.palette.primary.main}60`,
                        },
                    }}
                    startIcon={processing ? null : <ShoppingCart />}
                >
                    {processing ? 'Processing...' : `Pay GH₵${parseFloat(price).toLocaleString()}`}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PurchaseConfirmationModal;