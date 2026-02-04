/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from 'react';
import { Box, Container, Typography, Chip, Grid, CircularProgress, Alert, Button, Snackbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useBuyCredits, useGetCreditPackages } from '../../Hooks/general';

import PricingHeader from './Pricingheader';
import CustomCreditPurchase from './CustomCreditPurchase';
import PricingCard from './PricingCard';
import PurchaseConfirmationModal from './PurchaseConfirmationModal';

const PricingSection = () => {
    const { data: creditPackages, loading, error } = useGetCreditPackages();
    const { buyCredits } = useBuyCredits();
    const theme = useTheme();

    // State management
    const [customCredits, setCustomCredits] = useState('');
    const [processing, setProcessing] = useState(false);
    const [purchaseError, setPurchaseError] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState({
        open: false,
        type: null, // 'custom' or 'package'
        data: null,
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    // Get the best value package (highest credits per price ratio)
    const bestValuePackage = useMemo(() => {
        if (!creditPackages || creditPackages.length === 0) return null;

        return creditPackages
            .filter(pkg => pkg.is_active)
            .reduce((best, current) => {
                const currentValue = current.credits / parseFloat(current.price);
                const bestValue = best ? best.credits / parseFloat(best.price) : 0;
                return currentValue > bestValue ? current : best;
            }, null);
    }, [creditPackages]);

    const activePackages = creditPackages?.filter(pkg => pkg.is_active) || [];

    // Handlers
    const handleCustomPurchaseClick = (credits, price) => {
        setConfirmationModal({
            open: true,
            type: 'custom',
            data: { credits, price }
        });
    };

    const handlePackagePurchaseClick = (pkg) => {
        setConfirmationModal({
            open: true,
            type: 'package',
            data: pkg
        });
    };

    const handleConfirmPurchase = async () => {
        const { type, data } = confirmationModal;
        setPurchaseError(null);
        setProcessing(true);
        setConfirmationModal({ open: false, type: null, data: null });

        try {
            let creditData;

            if (type === 'custom') {
                creditData = {
                    package_id: null,
                    credits: data.credits,
                    amount: parseFloat(data.price).toFixed(2)
                };
            } else {
                creditData = {
                    package_id: data.id,
                };
            }

            const response = await buyCredits(creditData);

            if (response?.data?.success) {
                setSnackbar({
                    open: true,
                    message: 'Credit purchase initiated successfully! Redirecting to payment...',
                    severity: 'success'
                });

                if (type === 'custom') {
                    setCustomCredits('');
                }

                setTimeout(() => {
                    const payment_link = response?.data?.result?.authorization_url;
                    if (payment_link) {
                        window.location.href = payment_link;
                    }
                }, 2000);
            }
        } catch (err) {
            console.error('Error purchasing credits:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Failed to purchase credits. Please try again.';
            setPurchaseError(errorMessage);
            setSnackbar({
                open: true,
                message: errorMessage,
                severity: 'error'
            });
        } finally {
            setProcessing(false);
        }
    };

    const handleCancelPurchase = () => {
        setConfirmationModal({ open: false, type: null, data: null });
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    // Loading state
    if (loading) {
        return (
            <Box sx={{ bgcolor: theme.palette.background.default, py: { xs: 8, md: 12 } }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center' }}>
                        <CircularProgress size={60} />
                        <Typography variant="h6" sx={{ mt: 3, color: theme.palette.text.secondary }}>
                            Loading pricing plans...
                        </Typography>
                    </Box>
                </Container>
            </Box>
        );
    }

    // Error state
    if (error) {
        return (
            <Box sx={{ bgcolor: theme.palette.background.default, py: { xs: 8, md: 12 } }}>
                <Container maxWidth="lg">
                    <Alert
                        severity="error"
                        sx={{ borderRadius: 2 }}
                        action={
                            <Button color="inherit" size="small" onClick={() => window.location.reload()}>
                                Retry
                            </Button>
                        }
                    >
                        Failed to load pricing plans. Please try again.
                    </Alert>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ bgcolor: theme.palette.background.default, py: { xs: 8, md: 12 } }}>
            <Container maxWidth="lg">
                {/* Header */}
                <PricingHeader />

                {/* Custom Credit Purchase Section */}
                <CustomCreditPurchase
                    customCredits={customCredits}
                    setCustomCredits={setCustomCredits}
                    onPurchase={handleCustomPurchaseClick}
                    processing={processing}
                />

                {/* Divider with text */}
                <Box sx={{ position: 'relative', mb: 6 }}>
                    <Box
                        sx={{
                            height: '1px',
                            bgcolor: theme.palette.divider,
                        }}
                    />
                    <Chip
                        label="OR CHOOSE FROM OUR PACKAGES"
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: theme.palette.background.default,
                            px: 2,
                            fontWeight: 600,
                            color: theme.palette.text.secondary,
                        }}
                    />
                </Box>

                {/* Pricing Cards */}
                {activePackages.length > 0 ? (
                    <Grid container spacing={3} sx={{ mb: 8 }}>
                        {activePackages.map((pkg, index) => (
                            <Grid item xs={12} md={4} key={pkg.id}>
                                <PricingCard
                                    pkg={pkg}
                                    index={index}
                                    isBestValue={bestValuePackage?.id === pkg.id}
                                    onPurchase={handlePackagePurchaseClick}
                                    processing={processing}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Alert severity="info" sx={{ borderRadius: 2, textAlign: 'center' }}>
                        No pre-packaged plans available at the moment. Use the custom credit purchase option above.
                    </Alert>
                )}

                {/* Purchase Confirmation Modal */}
                <PurchaseConfirmationModal
                    open={confirmationModal.open}
                    type={confirmationModal.type}
                    data={confirmationModal.data}
                    onConfirm={handleConfirmPurchase}
                    onCancel={handleCancelPurchase}
                    processing={processing}
                />

                {/* Snackbar for notifications */}
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Container>
        </Box>
    );
};

export default PricingSection;