import React from "react";
import {
    Card,
    CardContent,
    Box,
    Avatar,
    Typography,
    Stack,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button
} from "@mui/material";
import { CardGiftcard, Stars, CheckCircle, ShoppingCart } from "@mui/icons-material";
import { calculatePrice, calculateSavings } from "./constants";

const PackageCard = ({ pkg, gradientConfig, isBestValue, onSelect }) => {
    const savings = calculateSavings(pkg.credits, pkg.price);

    return (
        <Card
            sx={{
                height: "100%",
                position: "relative",
                border: 2,
                borderColor: isBestValue ? "success.main" : "divider",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                    transform: "translateY(-12px)",
                    boxShadow: 8,
                    borderColor: isBestValue ? "success.main" : "primary.main"
                }
            }}
        >
            {/* Best Value Badge */}
            {isBestValue && (
                <Chip
                    label="BEST VALUE"
                    color="success"
                    size="small"
                    icon={<Stars />}
                    sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        fontWeight: 700,
                        zIndex: 1
                    }}
                />
            )}

            {/* Savings Badge */}
            {savings > 0 && (
                <Chip
                    label={`Save ${savings}%`}
                    color="error"
                    size="small"
                    sx={{
                        position: "absolute",
                        top: isBestValue ? 52 : 16,
                        right: 16,
                        fontWeight: 600,
                        zIndex: 1
                    }}
                />
            )}

            <CardContent sx={{ p: 0, height: "100%", display: "flex", flexDirection: "column" }}>
                {/* Header Section */}
                <Box
                    sx={{
                        background: gradientConfig.gradient,
                        p: 3,
                        position: "relative",
                        overflow: "hidden"
                    }}
                >
                    <Avatar
                        sx={{
                            bgcolor: "rgba(255, 255, 255, 0.2)",
                            width: 64,
                            height: 64,
                            mb: 2,
                            backdropFilter: "blur(10px)"
                        }}
                    >
                        <CardGiftcard sx={{ fontSize: 32, color: "white" }} />
                    </Avatar>

                    <Typography
                        variant="h4"
                        fontWeight={700}
                        color="white"
                        sx={{ mb: 1, textTransform: "capitalize" }}
                    >
                        {pkg.name}
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center">
                        <Chip
                            label={`${pkg.credits.toLocaleString()} Credits`}
                            size="small"
                            sx={{
                                bgcolor: "rgba(255, 255, 255, 0.2)",
                                color: "white",
                                fontWeight: 600,
                                backdropFilter: "blur(10px)"
                            }}
                        />
                    </Stack>
                </Box>

                {/* Content Section */}
                <Box sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 3, minHeight: 40 }}
                    >
                        {pkg.description}
                    </Typography>

                    {/* Pricing */}
                    <Box sx={{ mb: 3 }}>
                        <Stack direction="row" spacing={1} alignItems="baseline" mb={1}>
                            <Typography variant="h3" fontWeight={800} color={gradientConfig.color}>
                                GH₵{parseFloat(pkg.price).toLocaleString()}
                            </Typography>
                            {savings > 0 && (
                                <Typography
                                    variant="h6"
                                    color="text.secondary"
                                    sx={{ textDecoration: "line-through" }}
                                >
                                    GH₵{calculatePrice(pkg.credits)}
                                </Typography>
                            )}
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                            {(parseFloat(pkg.price) / pkg.credits).toFixed(2)} GH₵ per credit
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Features */}
                    <List dense sx={{ flexGrow: 1 }}>
                        {[
                            "Instant credit activation",
                            "Never expires",
                            "Use across all services",
                            "24/7 priority support"
                        ].map((feature, index) => (
                            <ListItem disableGutters key={index}>
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                    <CheckCircle color="success" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={feature}
                                    primaryTypographyProps={{
                                        variant: "body2",
                                        fontWeight: 500
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>

                    {/* CTA Button */}
                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{
                            mt: 2,
                            textTransform: "none",
                            fontWeight: 700,
                            py: 1.5,
                            background: gradientConfig.gradient,
                            boxShadow: 3,
                            "&:hover": {
                                boxShadow: 6,
                                transform: "scale(1.02)"
                            }
                        }}
                        onClick={() => onSelect(pkg)}
                        startIcon={<ShoppingCart />}
                    >
                        Purchase Package
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PackageCard;