import React, { useState } from "react";
import {
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    MenuItem,
    Select,
    FormControl,
    Button,
    useTheme,
    Container,
} from "@mui/material";

import {
    Person24Regular,
    Mail24Regular,
    Call24Regular,
    Briefcase24Regular,
    ChevronDown24Regular,
} from "@fluentui/react-icons";
import { FONT_FAMILY } from "../../Config/font";

export default function ConsultantForm() {
    const theme = useTheme();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        service: "",
    });

    const services = [
        "Business Consulting",
        "Financial Advisory",
        "Marketing Strategy",
        "Technology Solutions",
        "Legal Services",
        "HR Consulting",
        "Operations Management",
        "Other",
    ];

    const handleChange = (field) => (e) =>
        setFormData({ ...formData, [field]: e.target.value });

    /** Shared styles for TextFields and Select */
    const inputBaseStyle = {
        "& .MuiOutlinedInput-root": {
            pl: 5,
            background: theme.palette.primary.lightBg,
            borderRadius: 2,
            transition: "0.25s",
            "&:hover": {
                background: theme.palette.primary.light + "22",
            },
            "&.Mui-focused": {
                background: theme.palette.background.paper,
                boxShadow: `0 0 12px ${theme.palette.primary.main}55`,
                borderColor: theme.palette.primary.main,
            },
        },
    };

    /** Icon Color */
    const iconColor = theme.palette.primary.main;

    return (
        <Box
            sx={{
                minHeight: "100vh",
                p:{ xs:2, md:6},
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: theme.palette.primary.main,
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Container maxWidth="lg">

                <Box
                    sx={{
                        position: "absolute",
                        top: 100,
                        left: 100,
                        width: 300,
                        height: 300,
                        background: theme.palette.background.paper + "20",
                        borderRadius: "50%",
                        filter: "blur(90px)",
                    }}
                />

                <Grid container spacing={8} alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }} sx={{ color: theme.palette.secondary.contrastText }}>
                        <Typography sx={{ fontFamily: FONT_FAMILY.tertiary, fontSize: "1.2rem", opacity: 0.9, mb: 2 }}>
                            Didn't find what you want?
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: { xs: "2.3rem", md: "2.5rem" },
                                fontWeight: 900,
                                lineHeight: 1.1,
                                mb: 4,
                                background: `linear-gradient(to right, 
                                ${theme.palette.warning.main}, 
                                ${theme.palette.warning.light}
                            )`,
                                WebkitBackgroundClip: "text",
                                color: "transparent",
                            }}
                        >
                            BOOK A FREE
                            <br />
                            CONSULTATION
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "1.1rem",
                                opacity: 0.9,
                                maxWidth: 400,
                                fontFamily: FONT_FAMILY.tertiary,
                            }}
                        >
                            Talk to our team of experts for professional advice on how to solve
                            your business needs.
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                mb: { xs: 2, md: 0 },
                                p: {xs: 3, md: 5},
                                borderRadius: 3,
                                background: theme.palette.background.paper,
                                color: theme.palette.text.primary,
                            }}
                        >
                            <Grid container spacing={3}>
                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Typography fontWeight={600} mb={1}>
                                            Full Name
                                        </Typography>

                                        <Box sx={{ position: "relative" }}>
                                            <Person24Regular
                                                style={{
                                                    position: "absolute",
                                                    left: 12,
                                                    top: "50%",
                                                    transform: "translateY(-50%)",
                                                    color: iconColor,
                                                    zIndex: 2,
                                                }}
                                            />

                                            <TextField
                                                fullWidth
                                                placeholder="Enter your full name"
                                                value={formData.fullName}
                                                onChange={handleChange("fullName")}
                                                sx={inputBaseStyle}
                                            />
                                        </Box>
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Typography fontWeight={600} mb={1}>
                                            Select Service
                                        </Typography>

                                        <FormControl fullWidth>
                                            <Box sx={{ position: "relative", borderRadius: 2 }}>

                                                <Select
                                                    fullWidth
                                                    value={formData.service}
                                                    onChange={handleChange("service")}
                                                    displayEmpty
                                                    IconComponent={() => (
                                                        <ChevronDown24Regular
                                                            style={{
                                                                color: iconColor,
                                                                position: "absolute",
                                                                right: 12,
                                                                top: "50%",
                                                                transform: "translateY(-50%)",
                                                            }}
                                                        />
                                                    )}
                                                    sx={{
                                                        ...inputBaseStyle,
                                                        "& .MuiOutlinedInput-root": {
                                                            ...inputBaseStyle["& .MuiOutlinedInput-root"],
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value="">Choose a service</MenuItem>
                                                    {services.map((s) => (
                                                        <MenuItem key={s} value={s}>
                                                            {s}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </Box>
                                        </FormControl>
                                    </Grid>

                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <Typography fontWeight={600} mb={1}>
                                        Email
                                    </Typography>

                                    <Box sx={{ position: "relative" }}>
                                        <Mail24Regular
                                            style={{
                                                position: "absolute",
                                                left: 12,
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                                color: iconColor,
                                                zIndex: 2,
                                            }}
                                        />

                                        <TextField
                                            fullWidth
                                            placeholder="your@email.com"
                                            value={formData.email}
                                            onChange={handleChange("email")}
                                            sx={inputBaseStyle}
                                        />
                                    </Box>
                                </Grid>

                                {/* Phone */}
                                <Grid size={{ xs: 12 }}>
                                    <Typography fontWeight={600} mb={1}>
                                        Phone
                                    </Typography>

                                    <Box sx={{ position: "relative" }}>
                                        <Call24Regular
                                            style={{
                                                position: "absolute",
                                                left: 12,
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                                color: iconColor,
                                                zIndex: 2,
                                            }}
                                        />

                                        <TextField
                                            fullWidth
                                            placeholder="+1 (555) 000-0000"
                                            value={formData.phone}
                                            onChange={handleChange("phone")}
                                            sx={inputBaseStyle}
                                        />
                                    </Box>
                                </Grid>

                                {/* Submit Button */}
                                <Grid size={{ xs: 12 }}>
                                    <Button
                                        fullWidth
                                        onClick={() =>
                                            alert("Thank you! Your consultation request has been submitted.")
                                        }
                                        sx={{
                                            mt: 2,
                                            py: 1.2,
                                            borderRadius: 2,
                                            fontSize: "1.1rem",
                                            textTransform: "none",
                                            fontWeight: 600,
                                            background: theme.palette.primary.main,
                                            color: theme.palette.primary.contrastText,
                                            boxShadow: `0 8px 20px ${theme.palette.primary.main}55`,
                                            "&:hover": {
                                                boxShadow: `0 10px 25px ${theme.palette.primary.main}88`,
                                                transform: "translateY(-2px)",
                                            },
                                            transition: "0.25s",
                                        }}
                                    >
                                        Book Now
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
