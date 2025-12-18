import React from "react";
import {
    Box,
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    Button,
    Chip,
    useTheme,
} from "@mui/material";
import { services } from "./data";
import { useNavigate } from "react-router-dom";

// Define unique color schemes for each card
const cardColorSchemes = [
    {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        iconBg: "rgba(255, 255, 255, 0.2)",
        iconColor: "#ffffff",
        textColor: "#ffffff",
        textSecondary: "rgba(255, 255, 255, 0.9)",
        borderColor: "rgba(255, 255, 255, 0.3)",
    },
    {
        background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        iconBg: "rgba(255, 255, 255, 0.2)",
        iconColor: "#ffffff",
        textColor: "#ffffff",
        textSecondary: "rgba(255, 255, 255, 0.9)",
        borderColor: "rgba(255, 255, 255, 0.3)",
    },
    {
        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        iconBg: "rgba(255, 255, 255, 0.2)",
        iconColor: "#ffffff",
        textColor: "#ffffff",
        textSecondary: "rgba(255, 255, 255, 0.9)",
        borderColor: "rgba(255, 255, 255, 0.3)",
    },
    {
        background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        iconBg: "rgba(255, 255, 255, 0.2)",
        iconColor: "#ffffff",
        textColor: "#ffffff",
        textSecondary: "rgba(255, 255, 255, 0.9)",
        borderColor: "rgba(255, 255, 255, 0.3)",
    },
    {
        background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        iconBg: "rgba(255, 255, 255, 0.2)",
        iconColor: "#ffffff",
        textColor: "#ffffff",
        textSecondary: "rgba(255, 255, 255, 0.9)",
        borderColor: "rgba(255, 255, 255, 0.3)",
    },
    {
        background: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
        iconBg: "rgba(255, 255, 255, 0.2)",
        iconColor: "#ffffff",
        textColor: "#ffffff",
        textSecondary: "rgba(255, 255, 255, 0.9)",
        borderColor: "rgba(255, 255, 255, 0.3)",
    },
    {
        background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        iconBg: "rgba(255, 255, 255, 0.3)",
        iconColor: "#667eea",
        textColor: "#2d3748",
        textSecondary: "#4a5568",
        borderColor: "rgba(102, 126, 234, 0.3)",
    },
    {
        background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        iconBg: "rgba(255, 255, 255, 0.3)",
        iconColor: "#f5576c",
        textColor: "#2d3748",
        textSecondary: "#4a5568",
        borderColor: "rgba(245, 87, 108, 0.3)",
    },
    {
        background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        iconBg: "rgba(255, 255, 255, 0.3)",
        iconColor: "#ed8936",
        textColor: "#2d3748",
        textSecondary: "#4a5568",
        borderColor: "rgba(237, 137, 54, 0.3)",
    },
];

export default function AIServicesSection() {
    const theme = useTheme();
    const navigate = useNavigate();

    const handleStartFree = () => {
        navigate('/register');
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                py: 2,
                background: theme.palette.background.default,
            }}
        >
            <Container maxWidth="lg">
                <Box data-aos='zoom-out' sx={{ display: { xs: 'block', md: 'flex' }, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Typography
                            variant="h3"
                            fontWeight="900"
                            sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}
                            color={theme.palette.text.heading}
                        >
                            AI Services 🤖
                        </Typography>


                        <Typography
                            variant="body1"
                            color={theme.palette.text.secondary}
                            maxWidth="600px"
                            mb={4}
                        >
                            Pretium lectus ultrices sit tempor, sit ullamcorper volutpat at et.
                            Auctor turpis semper id sit ornare maecenas lectus sed.
                        </Typography>
                    </Box>
                    <Box sx={{ mb: { xs: 4, md: 0 } }}>
                        <Button
                            onClick={handleStartFree}
                            sx={{
                                background: theme.palette.warning.light,
                                color: theme.palette.warning.contrastText,
                                px: 4,
                                py: 1.7,
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: 600,
                                boxShadow: "0 4px 14px 0 rgba(255, 167, 38, 0.39)",
                                "&:hover": {
                                    background: theme.palette.warning.dark,
                                    boxShadow: "0 6px 20px 0 rgba(255, 167, 38, 0.5)",
                                    transform: "translateY(-2px)",
                                },
                                transition: "all 0.3s ease",
                            }}
                        >
                            Start for Free 🚀
                        </Button>

                    </Box>
                </Box>

                <Grid container spacing={3} data-aos='zoom-out'>
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        const colorScheme = cardColorSchemes[index % cardColorSchemes.length];

                        return (
                            <Grid key={service.id} size={{ xs: 12, sm: 6, md: 4 }}>
                                <Card
                                    sx={{
                                        p: 4,
                                        borderRadius: 4,
                                        background: colorScheme.background,
                                        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
                                        position: "relative",
                                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                        overflow: "hidden",
                                        "&:hover": {
                                            transform: "translateY(-12px)",
                                            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
                                        },
                                        "&::before": {
                                            content: '""',
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
                                            pointerEvents: "none",
                                        }
                                    }}
                                >
                                    <Chip
                                        label={service.badge}
                                        size="small"
                                        sx={{
                                            position: "absolute",
                                            top: 20,
                                            right: 20,
                                            bgcolor: "rgba(255, 255, 255, 0.95)",
                                            color: colorScheme.textColor === "#ffffff" ? "#667eea" : colorScheme.iconColor,
                                            fontWeight: 600,
                                            fontSize: "0.75rem",
                                            backdropFilter: "blur(10px)",
                                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                                        }}
                                    />

                                    {/* Icon */}
                                    <Box display="flex" justifyContent="center" my={3} mt={5}>
                                        <Box
                                            sx={{
                                                p: 3,
                                                borderRadius: 3,
                                                background: colorScheme.iconBg,
                                                backdropFilter: "blur(10px)",
                                                transition: "all 0.3s ease",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                "&:hover": {
                                                    transform: "scale(1.1) rotate(5deg)",
                                                },
                                            }}
                                        >
                                            <Icon
                                                style={{
                                                    width: 48,
                                                    height: 48,
                                                    color: colorScheme.iconColor,
                                                }}
                                            />
                                        </Box>
                                    </Box>

                                    {/* Text */}
                                    <CardContent sx={{ textAlign: "center", pb: 2 }}>
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            color={colorScheme.textColor}
                                            mb={1.5}
                                            sx={{
                                                textShadow: colorScheme.textColor === "#ffffff"
                                                    ? "0 2px 4px rgba(0, 0, 0, 0.1)"
                                                    : "none"
                                            }}
                                        >
                                            {service.title}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color={colorScheme.textSecondary}
                                            sx={{
                                                lineHeight: 1.7,
                                                textShadow: colorScheme.textColor === "#ffffff"
                                                    ? "0 1px 2px rgba(0, 0, 0, 0.1)"
                                                    : "none"
                                            }}
                                        >
                                            {service.description}
                                        </Typography>
                                    </CardContent>

                                    {/* Hover Border Glow */}
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            inset: 0,
                                            borderRadius: 4,
                                            border: `2px solid ${colorScheme.borderColor}`,
                                            opacity: 0,
                                            transition: "opacity 0.3s ease",
                                            pointerEvents: "none",
                                            ".MuiCard-root:hover &": { opacity: 1 },
                                        }}
                                    />
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </Box>
    );
}