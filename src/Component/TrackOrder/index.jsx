import React, { useState } from "react";
import {
    Box,
    Button,
    Typography,
    TextField,
    Paper,
    Grid,
    Avatar,
    useTheme,
} from "@mui/material";

import LinkIcon from "@mui/icons-material/Link";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import PhoneIcon from "@mui/icons-material/Phone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";

const steps = [
    { id: 1, title: "Link to your website", subtitle: "Step 1 of 6", icon: <LinkIcon /> },
    { id: 2, title: "Logo", subtitle: "Step 2 of 6", icon: <ImageIcon /> },
    { id: 3, title: "Description", subtitle: "Step 3 of 6", icon: <DescriptionIcon /> },
    { id: 4, title: "Contact Info", subtitle: "Step 4 of 6", icon: <PhoneIcon /> },
    { id: 5, title: "Confirm Order Details", subtitle: "Step 5 of 6", icon: <CheckCircleIcon /> },
    { id: 6, title: "Checkout Order", subtitle: "Step 6 of 6", icon: <InventoryIcon /> },
];

export default function OrderTracker() {
    const theme = useTheme();

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        websiteLink: "",
        logoFile: null,
        description: "",
        brandName: "",
        email: "",
        phone: "",
        socialMedia: "",
    });

    const navigate = useNavigate();
    const handleNext = () => currentStep < steps.length && setCurrentStep(currentStep + 1);
    const handlePrev = () => currentStep > 1 && setCurrentStep(currentStep - 1);

    const handleInputChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) setFormData({ ...formData, logoFile: file });
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Box>
                        <Box textAlign="center" mb={4}>
                            <Typography variant="h4" fontWeight="bold">
                                Link to your website & Socials
                            </Typography>
                            <Typography color="text.secondary">
                                Provide URLs to your website for reference
                            </Typography>
                        </Box>

                        <TextField
                            fullWidth
                            name="websiteLink"
                            label="Website Link"
                            value={formData.websiteLink}
                            onChange={handleInputChange}
                            placeholder="https://yourwebsite.com"
                            sx={{
                                mb: 3,
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                },
                            }}
                        />

                        <Paper
                            elevation={0}
                            sx={{
                                border: `2px dashed ${theme.palette.divider}`,
                                p: 5,
                                borderRadius: 2,
                                cursor: "pointer",
                                textAlign: "center",
                                bgcolor: "transparent",
                            }}
                        >
                            <label style={{ cursor: "pointer" }}>
                                <input type="file" hidden onChange={handleFileUpload} />

                                <Avatar
                                    sx={{
                                        bgcolor: theme.palette.accent.gray,
                                        width: 70,
                                        height: 70,
                                        margin: "0 auto",
                                        mb: 2,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <ImageIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                                </Avatar>

                                <Typography fontWeight={600}>Upload File</Typography>
                                <Typography color="text.secondary" fontSize={13}>
                                    Optional: upload screenshots
                                </Typography>
                            </label>
                        </Paper>
                    </Box>
                );

            case 2:
                return (
                    <Box>
                        <Box textAlign="center" mb={5}>
                            <Typography variant="h4" fontWeight="bold">
                                Provide your Brand Logo
                            </Typography>
                            <Typography color="text.secondary">
                                Upload your logo or design inspiration
                            </Typography>
                        </Box>

                        <Paper
                            elevation={0}
                            sx={{
                                textAlign: "center",
                                border: `2px dashed ${theme.palette.divider}`,
                                bgcolor: "transparent",
                                p: 8,
                                borderRadius: 2,
                            }}
                        >
                            <label style={{ cursor: "pointer" }}>
                                <input
                                    type="file"
                                    hidden
                                    accept=".jpg,.jpeg,.png,.pdf"
                                    onChange={handleFileUpload}
                                />

                                <Avatar
                                    sx={{
                                        bgcolor: theme.palette.accent.gray,
                                        width: 100,
                                        height: 100,
                                        margin: "0 auto",
                                        mb: 2,
                                    }}
                                >
                                    <ImageIcon sx={{ fontSize: 50, color: theme.palette.primary.main }} />
                                </Avatar>

                                <Typography fontWeight={600}>Drop logo here</Typography>
                                <Typography color="text.secondary" fontSize={13}>
                                    Formats: JPG, PNG, PDF
                                </Typography>

                                {formData.logoFile && (
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 1,
                                            mt: 2,
                                            display: "inline-block",
                                            bgcolor: "transparent",
                                            border: `1px solid ${theme.palette.divider}`,
                                        }}
                                    >
                                        <Typography color={theme.palette.success.main}>
                                            ✓ {formData.logoFile.name}
                                        </Typography>
                                    </Paper>
                                )}
                            </label>
                        </Paper>
                    </Box>
                );

            case 3:
                return (
                    <Box>
                        <Box textAlign="center" mb={5}>
                            <Typography variant="h4" fontWeight="bold">
                                Describe Your Vision
                            </Typography>
                            <Typography color="text.secondary">
                                Colors, style, features — tell us everything
                            </Typography>
                        </Box>

                        <TextField
                            fullWidth
                            multiline
                            rows={6}
                            name="description"
                            label="Design Details"
                            value={formData.description}
                            onChange={handleInputChange}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                },
                            }}
                        />

                        <Button
                            onClick={handleNext}
                            fullWidth
                            sx={{
                                mt: 3,
                                py: 1.5,
                                borderRadius: 2,
                                bgcolor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                "&:hover": { bgcolor: theme.palette.primary.dark },
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                );

            case 4:
                return (
                    <Box>
                        <Box textAlign="center" mb={5}>
                            <Typography variant="h4" fontWeight="bold">
                                Contact Information
                            </Typography>
                            <Typography color="text.secondary">
                                We’ll contact you for updates and delivery
                            </Typography>
                        </Box>

                        <Grid container spacing={3}>
                            {[
                                { label: "Brand Name", name: "brandName" },
                                { label: "Email", name: "email" },
                                { label: "Phone Number", name: "phone" },
                                { label: "Social Media Handle", name: "socialMedia" },
                            ].map((field, idx) => (
                                <Grid item xs={12} md={idx < 2 ? 12 : 6} key={field.name}>
                                    <TextField
                                        fullWidth
                                        label={field.label}
                                        name={field.name}
                                        onChange={handleInputChange}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: 2,
                                            },
                                        }}
                                    />
                                </Grid>
                            ))}
                        </Grid>

                        <Button
                            onClick={handleNext}
                            fullWidth
                            sx={{
                                mt: 3,
                                py: 1.5,
                                borderRadius: 2,
                                bgcolor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                "&:hover": { bgcolor: theme.palette.primary.dark },
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                );

            case 5:
                return (
                    <Box>
                        <Box textAlign="center" mb={5}>
                            <Typography variant="h4" fontWeight="bold">
                                Review Your Details
                            </Typography>
                            <Typography color="text.secondary">
                                Make sure everything is correct
                            </Typography>
                        </Box>

                        <Paper elevation={0} sx={{ p: 4, borderRadius: 2, bgcolor: "transparent" }}>
                            <Grid container spacing={3}>
                                {[
                                    ["Website Link", formData.websiteLink],
                                    ["Logo File", formData.logoFile?.name],
                                    ["Brand Name", formData.brandName],
                                    ["Email", formData.email],
                                    ["Phone", formData.phone],
                                    ["Social Media", formData.socialMedia],
                                ].map(([label, value]) => (
                                    <Grid item xs={12} md={6} key={label}>
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 2,
                                                borderRadius: 2,
                                                bgcolor: "transparent",
                                                border: `1px solid ${theme.palette.divider}`,
                                            }}
                                        >
                                            <Typography fontWeight="bold">{label}</Typography>
                                            <Typography>{value || "Not Provided"}</Typography>
                                        </Paper>
                                    </Grid>
                                ))}

                                <Grid item xs={12}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            borderRadius: 2,
                                            bgcolor: "transparent",
                                            border: `1px solid ${theme.palette.divider}`,
                                        }}
                                    >
                                        <Typography fontWeight="bold">Description</Typography>
                                        <Typography>{formData.description || "Not Provided"}</Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                );

            case 6:
                return (
                    <Box textAlign="center" py={7}>
                        <Avatar
                            sx={{
                                width: 120,
                                height: 120,
                                margin: "0 auto",
                                mb: 3,
                                bgcolor: theme.palette.success.light,
                            }}
                        >
                            <CheckCircleIcon sx={{ fontSize: 70, color: theme.palette.success.main }} />
                        </Avatar>

                        <Typography variant="h3" fontWeight="bold" mb={2}>
                            Check Out 🎉
                        </Typography>

                        <Typography variant="h6" color="text.secondary">
                            Your order details are ready.
                        </Typography>

                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                mt: 4,
                                borderRadius: 2,
                                bgcolor: "transparent",
                                border: `1px solid ${theme.palette.divider}`,
                                maxWidth: 600,
                                mx: "auto",
                            }}
                        >
                            <Typography mb={2}>
                                Click below to proceed to your checkout page.
                            </Typography>

                            <Button
                                variant="contained"
                                size="large"
                                fullWidth
                                sx={{
                                    mt: 3,
                                    py: 1.5,
                                    fontWeight: 700,
                                    borderRadius: 2,
                                }}
                                onClick={() => navigate("/checkout")}
                            >
                                Go to Checkout
                            </Button>
                        </Paper>
                    </Box>
                );

            default:
                return null;
        }
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                // background: theme.palette.accent.lightBlue,
                py: 6,
                px: 2,
            }}
        >
            <Box maxWidth="900px" mx="auto">
                <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 2, background: theme.palette.accent.lightBlue }}>
                    <Box display="flex" justifyContent="space-between" position="relative">
                        <Box
                            sx={{
                                position: "absolute",
                                top: 30,
                                left: "3%",
                                right: "3%",
                                height: 4,
                                bgcolor: theme.palette.divider,
                            }}
                        >
                            <Box
                                sx={{
                                    height: "100%",
                                    width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                                    bgcolor: theme.palette.success.light,
                                    transition: "0.4s ease",
                                }}
                            />
                        </Box>

                        {steps.map((step) => {
                            const isCompleted = currentStep > step.id;
                            const isCurrent = currentStep === step.id;

                            return (
                                <Box key={step.id} width="16%" textAlign="center">
                                    <Avatar
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            margin: "0 auto",
                                            bgcolor: isCompleted
                                                ? theme.palette.success.main
                                                : isCurrent
                                                    ? theme.palette.primary.main
                                                    : theme.palette.background.paper,
                                            border: `2px solid ${theme.palette.divider}`,
                                            transform: isCurrent ? "scale(1.2)" : "scale(1)",
                                            transition: "0.3s",
                                        }}
                                    >
                                        {isCompleted ? (
                                            <CheckCircleIcon sx={{ color: theme.palette.primary.contrastText }} />
                                        ) : (
                                            React.cloneElement(step.icon, {
                                                style: {
                                                    color: isCurrent
                                                        ? theme.palette.primary.contrastText
                                                        : theme.palette.text.secondary,
                                                },
                                            })
                                        )}
                                    </Avatar>

                                    <Typography
                                        fontSize={11}
                                        fontWeight={600}
                                        mt={1}
                                        color={
                                            isCurrent
                                                ? theme.palette.primary.main
                                                : isCompleted
                                                    ? theme.palette.success.main
                                                    : theme.palette.text.secondary
                                        }
                                    >
                                        {step.title}
                                    </Typography>

                                    <Typography fontSize={10} color="text.secondary">
                                        {step.subtitle}
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Box>
                </Paper>

                <Paper elevation={0} sx={{ p: 5, borderRadius: 2, border: `1px solid ${theme.palette.divider}`, }}>
                    {renderStepContent()}
                </Paper>

                {currentStep < 6 && (
                    <Box display="flex" justifyContent="center" gap={2} mt={4}>
                        <Button
                            onClick={handlePrev}
                            disabled={currentStep === 1}
                            startIcon={<ChevronLeftIcon />}
                            sx={{
                                px: 4,
                                py: 1,
                                borderRadius: 2,
                                fontWeight: "bold",
                                bgcolor: currentStep === 1 ? theme.palette.divider : theme.palette.primary.main,
                                color:
                                    currentStep === 1
                                        ? theme.palette.text.disabled
                                        : theme.palette.primary.contrastText,
                                "&:hover": {
                                    bgcolor:
                                        currentStep === 1 ? theme.palette.divider : theme.palette.primary.dark,
                                },
                            }}
                        >
                            Prev
                        </Button>

                        <Button
                            onClick={handleNext}
                            disabled={currentStep === 6}
                            endIcon={<ChevronRightIcon />}
                            sx={{
                                px: 4,
                                py: 1,
                                borderRadius: 2,
                                fontWeight: "bold",
                                bgcolor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                "&:hover": { bgcolor: theme.palette.primary.dark },
                            }}
                        >
                            Next
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
