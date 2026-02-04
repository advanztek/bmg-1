import React from "react";
import {
    Card,
    CardContent,
    Stack,
    Avatar,
    Box,
    Typography,
    TextField,
    InputAdornment,
    Paper,
    Button,
    Fade,
    Zoom
} from "@mui/material";
import { AttachMoney, LocalOffer, ShoppingCart } from "@mui/icons-material";
import { CREDIT_RATE, calculatePrice } from "./constants";

const CustomCreditPurchase = ({ customCredits, setCustomCredits, onPurchase }) => {
    return (
        <Card elevation={2}>
            <CardContent sx={{ p: 4 }}>
                <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                    <Avatar
                        sx={{
                            bgcolor: "primary.main",
                            width: 56,
                            height: 56
                        }}
                    >
                        <AttachMoney sx={{ fontSize: 32 }} />
                    </Avatar>
                    <Box>
                        <Typography variant="h5" fontWeight={700}>
                            Custom Credit Package
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Build your own package with exactly the number of credits you need
                        </Typography>
                    </Box>
                </Stack>

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={3}
                    alignItems={{ xs: "stretch", sm: "flex-end" }}
                >
                    <TextField
                        label="Number of Credits"
                        type="number"
                        value={customCredits}
                        onChange={(e) => setCustomCredits(e.target.value)}
                        placeholder="Enter amount"
                        fullWidth
                        sx={{ maxWidth: 300 }}
                        InputProps={{
                            inputProps: { min: 1, step: 1 },
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LocalOffer color="action" />
                                </InputAdornment>
                            )
                        }}
                        helperText={`Minimum: 1 credit • Rate: GH₵${CREDIT_RATE} per credit`}
                    />

                    {customCredits && parseInt(customCredits) > 0 && (
                        <Fade in={true}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2,
                                    background: "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)",
                                    border: "1px solid",
                                    borderColor: "primary.main",
                                    minWidth: 250
                                }}
                            >
                                <Stack spacing={1}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" color="text.secondary">
                                            Total Credits:
                                        </Typography>
                                        <Typography variant="h6" fontWeight={700}>
                                            {parseInt(customCredits).toLocaleString()}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" color="text.secondary">
                                            Total Price:
                                        </Typography>
                                        <Typography variant="h5" fontWeight={700} color="primary.main">
                                            GH₵{calculatePrice(parseInt(customCredits))}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Paper>
                        </Fade>
                    )}

                    {customCredits && parseInt(customCredits) > 0 && (
                        <Zoom in={true}>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={onPurchase}
                                sx={{
                                    textTransform: "none",
                                    px: 4,
                                    fontWeight: 600,
                                    boxShadow: 3
                                }}
                                startIcon={<ShoppingCart />}
                            >
                                Purchase Now
                            </Button>
                        </Zoom>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
};

export default CustomCreditPurchase;