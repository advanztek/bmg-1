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

export default function AIServicesSection() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                py: 10,
                background: theme.palette.background.default,
            }}
        >
            <Container maxWidth="lg">
                <Box mb={1} sx={{ display: { xs: 'block', md:'flex' }, justifyContent: 'space-between' }}>
                    <Box>
                        <Typography
                            variant="h3"
                            fontWeight="bold"
                            color={theme.palette.text.heading}
                            mb={2}
                        >
                            AI Services
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
                            sx={{
                                background: theme.palette.warning.light,
                                color: theme.palette.warning.contrastText,
                                px: 4,
                                py: 1.7,
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: 600,
                                "&:hover": {
                                    background: theme.palette.warning.dark,
                                },
                            }}
                        >
                            Start for Free
                        </Button>
                    </Box>
                </Box>

                <Grid container spacing={2}>
                    {services.map((service) => {
                        const Icon = service.icon;

                        return (
                            <Grid key={service.id} size={{ xs: 12, sm: 6, md: 4 }}>
                                <Card
                                    sx={{
                                        p: 4,
                                        borderRadius: 4,
                                        background: theme.palette.primary.lightBg,
                                        boxShadow: 3,
                                        position: "relative",
                                        transition: ".3s",
                                        "&:hover": {
                                            transform: "translateY(-8px)",
                                            boxShadow: 6,
                                        },
                                    }}
                                >
                                    <Chip
                                        label={service.badge}
                                        size="small"
                                        sx={{
                                            position: "absolute",
                                            top: 16,
                                            left: 16,
                                            bgcolor:
                                                service.badgeColor === "orange"
                                                    ? theme.palette.warning.light
                                                    : theme.palette.info.light,
                                            color:
                                                service.badgeColor === "orange"
                                                    ? theme.palette.warning.dark
                                                    : theme.palette.info.dark,
                                            fontWeight: 600,
                                        }}
                                    />

                                    {/* Icon */}
                                    <Box display="flex" justifyContent="center" my={3}>
                                        <Box
                                            sx={{
                                                p: 3,
                                                borderRadius: 3,
                                                background: theme.palette.accent.lightBlue,
                                                transition: ".3s",
                                                "&:hover": { transform: "scale(1.1)" },
                                            }}
                                        >
                                            <Icon
                                                style={{
                                                    width: 48,
                                                    height: 48,
                                                    color: theme.palette.primary.main,
                                                }}
                                            />
                                        </Box>
                                    </Box>

                                    {/* Text */}
                                    <CardContent sx={{ textAlign: "center" }}>
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            color={theme.palette.text.primary}
                                            mb={1}
                                        >
                                            {service.title}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color={theme.palette.text.secondary}
                                        >
                                            {service.description}
                                        </Typography>
                                    </CardContent>

                                    {/* Hover Border */}
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            inset: 0,
                                            borderRadius: 4,
                                            border: `2px solid ${theme.palette.accent.blue}`,
                                            opacity: 0,
                                            transition: ".3s",
                                            pointerEvents: "none",
                                            "&:hover": { opacity: 1 },
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
