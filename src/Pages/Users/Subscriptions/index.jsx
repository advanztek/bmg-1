import React, { useState, useMemo } from "react";
import { Box, Grid, Stack, Typography, Alert, Button, Snackbar } from "@mui/material";
import { TrendingUp } from "@mui/icons-material";
import { PagesHeader } from "../../../Component";
import { useBuyCredits, useGetCreditPackages } from "../../../Hooks/general";
import InfoBanner from "../../../Component/Subscriptions/InfoBanner";
import PackageCard from "../../../Component/Subscriptions/PackageCard";
import PurchaseDialog from "../../../Component/Subscriptions/PurchaseDialog";
import LoadingSkeleton from "../../../Component/Subscriptions/LoadingSkeleton";
import EmptyState from "../../../Component/Subscriptions/EmptyState";
import { calculatePrice, getPackageGradient } from "../../../Component/Subscriptions/constants";
import CustomCreditPurchase from "../../../Component/Subscriptions/CustomCreditPurchase";

const UserSubscriptionsPage = () => {
  const { data: creditPackages, loading, error } = useGetCreditPackages();
  const { buyCredits } = useBuyCredits();

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [customCredits, setCustomCredits] = useState("");
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [purchaseError, setPurchaseError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Get the best value package
  const bestValuePackage = useMemo(() => {
    if (!creditPackages || creditPackages.length === 0) return null;

    return creditPackages.reduce((best, current) => {
      const currentValue = current.credits / parseFloat(current.price);
      const bestValue = best ? best.credits / parseFloat(best.price) : 0;
      return currentValue > bestValue ? current : best;
    }, null);
  }, [creditPackages]);

  // Handle custom credit purchase
  const handleCustomPurchase = () => {
    const credits = parseInt(customCredits);
    if (credits && credits > 0) {
      const price = calculatePrice(credits);
      setSelectedPackage({
        id: 'custom',
        name: "Custom Credit Package",
        credits: credits,
        price: price,
        description: `Custom package with ${credits} credits at standard rate`,
        is_active: true,
        is_custom: true
      });
      setPurchaseDialogOpen(true);
    }
  };

  // Handle package selection
  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setPurchaseDialogOpen(true);
  };

  // Handle purchase
  const handlePurchase = async () => {
    setPurchaseError(null);
    setProcessing(true);

    try {
      const creditData = {
        package_id: selectedPackage.is_custom ? null : selectedPackage.id,
        credits: selectedPackage.is_custom ? selectedPackage.credits : undefined,
        amount: selectedPackage.is_custom ? parseFloat(selectedPackage.price).toFixed(2) : undefined
      };

      const response = await buyCredits(creditData);

      if (response?.data?.success) {
        setSnackbar({
          open: true,
          message: 'Credit purchase initiated successfully! Redirecting to payment...',
          severity: 'success'
        });

        setPurchaseDialogOpen(false);
        setSelectedPackage(null);
        setCustomCredits("");

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

  const handleDialogClose = () => {
    setPurchaseDialogOpen(false);
    setSelectedPackage(null);
    setPurchaseError(null);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box>
      <PagesHeader
        label="Credit Packages"
        desc="Purchase credits for AI-powered services including image, video, and audio generation."
      />

      <Grid container spacing={3}>
        {/* Info Banner */}
        <Grid item xs={12}>
          <InfoBanner />
        </Grid>

        {/* Custom Credit Purchase */}
        <Grid item xs={12}>
          <CustomCreditPurchase
            customCredits={customCredits}
            setCustomCredits={setCustomCredits}
            onPurchase={handleCustomPurchase}
          />
        </Grid>

        {/* Available Credit Packages */}
        <Grid item xs={12}>
          <Box sx={{ mb: 4 }}>
            <Stack direction="row" spacing={2} alignItems="center" mb={1}>
              <TrendingUp color="primary" sx={{ fontSize: 32 }} />
              <Typography variant="h4" fontWeight={700}>
                Pre-Packaged Deals
              </Typography>
            </Stack>
            <Typography variant="body1" color="text.secondary">
              Choose from our specially curated packages for the best value
            </Typography>
          </Box>

          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <Alert
              severity="error"
              sx={{ borderRadius: 2 }}
              action={
                <Button color="inherit" size="small" onClick={() => window.location.reload()}>
                  Retry
                </Button>
              }
            >
              Failed to load credit packages. Please try again.
            </Alert>
          ) : creditPackages && creditPackages.length > 0 ? (
            <Grid container spacing={3}>
              {creditPackages
                .filter(pkg => pkg.is_active)
                .map((pkg, index) => {
                  const gradientConfig = getPackageGradient(index);
                  const isBestValue = bestValuePackage?.id === pkg.id;

                  return (
                    <Grid item xs={12} md={4} key={pkg.id}>
                      <PackageCard
                        pkg={pkg}
                        gradientConfig={gradientConfig}
                        isBestValue={isBestValue}
                        onSelect={handlePackageSelect}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          ) : (
            <EmptyState />
          )}
        </Grid>
      </Grid>

      {/* Purchase Confirmation Dialog */}
      <PurchaseDialog
        open={purchaseDialogOpen}
        onClose={handleDialogClose}
        selectedPackage={selectedPackage}
        processing={processing}
        onConfirm={handlePurchase}
        error={purchaseError}
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
    </Box>
  );
};

export default UserSubscriptionsPage;