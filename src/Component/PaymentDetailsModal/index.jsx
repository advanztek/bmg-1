import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Divider,
    Grid,
    Stack,
    IconButton,
    Paper
} from "@mui/material";
import {
    Close,
    ContentCopy,
    CheckCircle,
    Pending,
    Error,
    HourglassEmpty
} from "@mui/icons-material";
import StatusChip from "../Dashboard/StatusChip";

const InfoRow = ({ label, value, copyable = false, fieldName = '', copiedField, onCopy }) => (
    <Box sx={{ mb: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
            {label}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {value || 'N/A'}
            </Typography>
            {copyable && value && (
                <IconButton
                    size="small"
                    onClick={() => onCopy(value, fieldName)}
                    sx={{ ml: 1 }}
                >
                    {copiedField === fieldName ? (
                        <CheckCircle fontSize="small" color="success" />
                    ) : (
                        <ContentCopy fontSize="small" />
                    )}
                </IconButton>
            )}
        </Stack>
    </Box>
);

const PaymentDetailsModal = ({ open, onClose, payment }) => {
    const [copiedField, setCopiedField] = React.useState(null);

    if (!payment) return null;

    const handleCopy = (text, fieldName) => {
        navigator.clipboard.writeText(text);
        setCopiedField(fieldName);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatAmount = (amount, currency) => {
        return `${currency} ${(amount / 100).toLocaleString('en-NG', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'success':
            case 'completed':
                return <CheckCircle sx={{ color: 'success.main' }} />;
            case 'pending':
                return <HourglassEmpty sx={{ color: 'warning.main' }} />;
            case 'failed':
                return <Error sx={{ color: 'error.main' }} />;
            default:
                return <Pending sx={{ color: 'grey.500' }} />;
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    maxHeight: '90vh'
                }
            }}
        >
            <DialogTitle>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box>
                        <Typography variant="h5" fontWeight={600}>
                            Payment Details
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Transaction ID: #{payment.id}
                        </Typography>
                    </Box>
                    <IconButton onClick={onClose} size="small">
                        <Close />
                    </IconButton>
                </Stack>
            </DialogTitle>

            <Divider />

            <DialogContent sx={{ pt: 3 }}>
                {/* Status Section */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        mb: 3,
                        bgcolor: 'grey.50',
                        borderRadius: 2,
                        textAlign: 'center'
                    }}
                >
                    <Stack alignItems="center" spacing={2}>
                        {getStatusIcon(payment.status)}
                        <Box>
                            <StatusChip
                                status={payment.status}
                                label={payment.status?.toUpperCase()}
                                sx={{ mb: 1 }}
                            />
                            <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
                                {formatAmount(payment.amount, payment.currency)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Total Amount
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>

                {/* Payment Information */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                        Payment Information
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <InfoRow
                                label="Order Number"
                                value={payment.metadata?.order_number}
                                copyable
                                fieldName="order_number"
                                copiedField={copiedField}
                                onCopy={handleCopy}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InfoRow
                                label="Payment Type"
                                value={payment.metadata?.type?.replace(/_/g, ' ').toUpperCase()}
                                copiedField={copiedField}
                                onCopy={handleCopy}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InfoRow
                                label="Reference"
                                value={payment.reference}
                                copyable
                                fieldName="reference"
                                copiedField={copiedField}
                                onCopy={handleCopy}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InfoRow
                                label="Paystack Reference"
                                value={payment.paystack_reference}
                                copyable
                                fieldName="paystack_reference"
                                copiedField={copiedField}
                                onCopy={handleCopy}
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Transaction Details */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                        Transaction Details
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <InfoRow
                                label="Transaction ID"
                                value={payment.paystack_transaction_id || 'Pending'}
                                copiedField={copiedField}
                                onCopy={handleCopy}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InfoRow
                                label="Currency"
                                value={payment.currency}
                                copiedField={copiedField}
                                onCopy={handleCopy}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InfoRow
                                label="Created At"
                                value={formatDate(payment.created_at)}
                                copiedField={copiedField}
                                onCopy={handleCopy}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InfoRow
                                label="Last Updated"
                                value={formatDate(payment.updated_at)}
                                copiedField={copiedField}
                                onCopy={handleCopy}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InfoRow
                                label="Webhook Verified"
                                value={payment.webhook_verified ? 'Yes' : 'No'}
                                copiedField={copiedField}
                                onCopy={handleCopy}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InfoRow
                                label="Webhook Event"
                                value={payment.webhook_event || 'N/A'}
                                copiedField={copiedField}
                                onCopy={handleCopy}
                            />
                        </Grid>
                    </Grid>
                </Box>

                {/* Gateway Response */}
                {payment.gateway_response && (
                    <>
                        <Divider sx={{ my: 3 }} />
                        <Box>
                            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                                Gateway Response
                            </Typography>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2,
                                    bgcolor: 'grey.50',
                                    borderRadius: 1,
                                    fontFamily: 'monospace',
                                    fontSize: '0.875rem'
                                }}
                            >
                                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                                    {payment.gateway_response}
                                </Typography>
                            </Paper>
                        </Box>
                    </>
                )}
            </DialogContent>

            <Divider />

            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={onClose} variant="outlined" color="inherit">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PaymentDetailsModal;