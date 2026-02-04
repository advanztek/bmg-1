import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stack,
    Avatar,
    Box,
    Typography,
    Divider,
    Alert,
    Card,
    CardContent,
    Button,
    CircularProgress
} from "@mui/material";
import { ShoppingCart, Info } from "@mui/icons-material";

const PurchaseDialog = ({ open, onClose, selectedPackage, processing, onConfirm }) => {
    return (
        <Dialog
            open={open}
            onClose={() => !processing && onClose()}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                elevation: 8,
                sx: { borderRadius: 2 }
            }}
        >
            <DialogTitle sx={{ pb: 1 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                        <ShoppingCart />
                    </Avatar>
                    <Box>
                        <Typography variant="h6" fontWeight={700}>
                            Confirm Purchase
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Review your order details
                        </Typography>
                    </Box>
                </Stack>
            </DialogTitle>

            <Divider />

            <DialogContent sx={{ pt: 3 }}>
                {selectedPackage && (
                    <Stack spacing={3}>
                        <Alert severity="info" icon={<Info />}>
                            Credits will be instantly added to your account upon successful payment
                        </Alert>

                        <Card
                            variant="outlined"
                            sx={{
                                border: 2,
                                borderColor: "primary.main",
                                bgcolor: "primary.50"
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" fontWeight={700} mb={2}>
                                    {selectedPackage.name}
                                </Typography>

                                {selectedPackage.description && (
                                    <Typography variant="body2" color="text.secondary" mb={3}>
                                        {selectedPackage.description}
                                    </Typography>
                                )}

                                <Divider sx={{ my: 2 }} />

                                <Stack spacing={2}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body1" color="text.secondary">
                                            Credits:
                                        </Typography>
                                        <Typography variant="h6" fontWeight={700}>
                                            {selectedPackage.credits.toLocaleString()}
                                        </Typography>
                                    </Stack>

                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body1" color="text.secondary">
                                            Price per credit:
                                        </Typography>
                                        <Typography variant="body1" fontWeight={600}>
                                            GH₵{(parseFloat(selectedPackage.price) / selectedPackage.credits).toFixed(2)}
                                        </Typography>
                                    </Stack>

                                    <Divider />

                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="h6" fontWeight={700}>
                                            Total Amount:
                                        </Typography>
                                        <Typography variant="h4" fontWeight={800} color="primary.main">
                                            GH₵{parseFloat(selectedPackage.price).toLocaleString()}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>
                )}
            </DialogContent>

            <Divider />

            <DialogActions sx={{ p: 3 }}>
                <Button
                    onClick={onClose}
                    disabled={processing}
                    sx={{ textTransform: "none", fontWeight: 600 }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    size="large"
                    disabled={processing}
                    sx={{
                        textTransform: "none",
                        fontWeight: 700,
                        px: 4
                    }}
                    startIcon={processing ? <CircularProgress size={20} color="inherit" /> : <ShoppingCart />}
                >
                    {processing ? "Processing..." : "Confirm & Pay"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PurchaseDialog;