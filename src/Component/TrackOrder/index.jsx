import React, { useState } from "react";
import {
    Box,
    Button,
    Typography,
    TextField,
    Paper,
    Grid,
    Avatar,
} from "@mui/material";

import LinkIcon from "@mui/icons-material/Link";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import PhoneIcon from "@mui/icons-material/Phone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const steps = [
    { id: 1, title: "Link to your website", subtitle: "Step 1 of 6", icon: <LinkIcon /> },
    { id: 2, title: "Logo", subtitle: "Step 2 of 6", icon: <ImageIcon /> },
    { id: 3, title: "Description", subtitle: "Step 3 of 6", icon: <DescriptionIcon /> },
    { id: 4, title: "Contact Info", subtitle: "Step 4 of 6", icon: <PhoneIcon /> },
    { id: 5, title: "Confirm Order Details", subtitle: "Step 5 of 6", icon: <CheckCircleIcon /> },
    { id: 6, title: "Order Complete", subtitle: "Step 6 of 6", icon: <InventoryIcon /> },
];

export default function OrderTracker() {
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

    const handleNext = () => {
        if (currentStep < steps.length) setCurrentStep(currentStep + 1);
    };

    const handlePrev = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) setFormData({ ...formData, logoFile: file });
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Box>
                        <Box textAlign="center" mb={5}>
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
                            sx={{ mb: 3 }}
                        />

                        <Paper
                            elevation={0}
                            sx={{
                                border: "2px solid #ffedd5",
                                background: "linear-gradient(to bottom right, #fff7ed, #fffbeb)",
                                p: 5,
                                borderRadius: 3,
                                textAlign: "center",
                                cursor: "pointer",
                            }}
                        >
                            <label style={{ cursor: "pointer" }}>
                                <input type="file" hidden onChange={handleFileUpload} />
                                <Avatar sx={{ bgcolor: "#fff", p: 2, mb: 2 }}>
                                    <ImageIcon sx={{ color: "#ea580c", fontSize: 40 }} />
                                </Avatar>
                                <Typography fontWeight={500}>Upload File</Typography>
                                <Typography variant="body2" color="text.secondary">
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
                            sx={{
                                textAlign: "center",
                                border: "2px dashed #93c5fd",
                                background: "linear-gradient(to bottom right, #eff6ff, #eef2ff)",
                                p: 10,
                                borderRadius: 4,
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
                                        bgcolor: "#fff",
                                        p: 3,
                                        width: 100,
                                        height: 100,
                                        margin: "0 auto",
                                        mb: 2,
                                        boxShadow: 2,
                                    }}
                                >
                                    <ImageIcon sx={{ color: "#3b82f6", fontSize: 50 }} />
                                </Avatar>

                                <Typography fontSize={16} fontWeight="600">
                                    Drop logo or inspiration images here
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Formats: JPG, PNG, PDF
                                </Typography>

                                {formData.logoFile && (
                                    <Paper sx={{ p: 1, mt: 2, display: "inline-block" }}>
                                        <Typography color="green">
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
                        />

                        <Button
                            onClick={handleNext}
                            fullWidth
                            sx={{
                                mt: 3,
                                py: 1.5,
                                background: "linear-gradient(to right, #fb923c, #f97316)",
                                color: "#fff",
                                fontWeight: "bold",
                                "&:hover": {
                                    background: "linear-gradient(to right, #f97316, #fb923c)",
                                },
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
                            <Grid item xs={12}>
                                <TextField fullWidth label="Brand Name" name="brandName" onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Email" name="email" onChange={handleInputChange} />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="Phone Number" name="phone" onChange={handleInputChange} />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="Social Media Handle" name="socialMedia" onChange={handleInputChange} />
                            </Grid>
                        </Grid>

                        <Button
                            onClick={handleNext}
                            fullWidth
                            sx={{
                                mt: 3,
                                py: 1.5,
                                background: "linear-gradient(to right, #fb923c, #f97316)",
                                color: "#fff",
                                fontWeight: "bold",
                                "&:hover": {
                                    background: "linear-gradient(to right, #f97316, #fb923c)",
                                },
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

                        <Paper sx={{ p: 4, borderRadius: 3 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Paper sx={{ p: 2 }}>
                                        <Typography fontWeight="bold">Website Link</Typography>
                                        <Typography>{formData.websiteLink || "Not Provided"}</Typography>
                                    </Paper>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Paper sx={{ p: 2 }}>
                                        <Typography fontWeight="bold">Logo File</Typography>
                                        <Typography>{formData.logoFile?.name || "Not Uploaded"}</Typography>
                                    </Paper>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Paper sx={{ p: 2 }}>
                                        <Typography fontWeight="bold">Brand Name</Typography>
                                        <Typography>{formData.brandName || "Not Provided"}</Typography>
                                    </Paper>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Paper sx={{ p: 2 }}>
                                        <Typography fontWeight="bold">Email</Typography>
                                        <Typography>{formData.email || "Not Provided"}</Typography>
                                    </Paper>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Paper sx={{ p: 2 }}>
                                        <Typography fontWeight="bold">Phone</Typography>
                                        <Typography>{formData.phone || "Not Provided"}</Typography>
                                    </Paper>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Paper sx={{ p: 2 }}>
                                        <Typography fontWeight="bold">Social Media</Typography>
                                        <Typography>{formData.socialMedia || "Not Provided"}</Typography>
                                    </Paper>
                                </Grid>

                                <Grid item xs={12}>
                                    <Paper sx={{ p: 2 }}>
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
                                bgcolor: "#bbf7d0",
                                width: 120,
                                height: 120,
                                margin: "0 auto",
                                mb: 3,
                            }}
                        >
                            <CheckCircleIcon sx={{ fontSize: 70, color: "#059669" }} />
                        </Avatar>

                        <Typography variant="h3" fontWeight="bold" mb={2}>
                            Order Complete! 🎉
                        </Typography>

                        <Typography variant="h6" color="text.secondary">
                            Thank you for your submission!
                        </Typography>

                        <Paper
                            sx={{
                                p: 4,
                                mt: 4,
                                borderRadius: 3,
                                background: "linear-gradient(to bottom right, #eff6ff, #eef2ff)",
                                border: "2px solid #e0e7ff",
                                maxWidth: 600,
                                mx: "auto",
                            }}
                        >
                            <Typography mb={2}>
                                We've received all your information and will start immediately.
                            </Typography>
                            <Typography color="text.secondary" fontSize={14}>
                                You will receive a confirmation email soon.
                            </Typography>
                        </Paper>
                    </Box>
                );

            default:
                return null;
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(to bottom right, #eef2ff, #fdf2f8)",
                py: 6,
                px: 2,
            }}
        >
            <Box maxWidth="900px" mx="auto">
                {/* STEP INDICATOR */}
                <Paper sx={{ p: 4, mb: 4, borderRadius: 3 }}>
                    <Box display="flex" justifyContent="space-between" position="relative">
                        {/* Progress Line */}
                        <Box
                            sx={{
                                position: "absolute",
                                top: 30,
                                left: "3%",
                                right: "3%",
                                height: 4,
                                background: "#e5e7eb",
                            }}
                        >
                            <Box
                                sx={{
                                    height: "100%",
                                    background: "linear-gradient(to right, #10b981, #0d9488)",
                                    width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                                    transition: "0.4s ease",
                                }}
                            />
                        </Box>

                        {/* Steps */}
                        {steps.map((step) => {
                            const isCompleted = currentStep > step.id;
                            const isCurrent = currentStep === step.id;

                            return (
                                <Box key={step.id} textAlign="center" width="16%">
                                    <Avatar
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            margin: "0 auto",
                                            transition: "0.3s",
                                            bgcolor: isCompleted
                                                ? "linear-gradient(to right, #10b981, #0d9488)"
                                                : isCurrent
                                                    ? "#fb923c"
                                                    : "#fff",
                                            border: isCurrent ? "4px solid #fed7aa" : "2px solid #d1d5db",
                                            transform: isCurrent ? "scale(1.2)" : "scale(1)",
                                        }}
                                    >
                                        {isCompleted ? (
                                            <CheckCircleIcon sx={{ color: "#fff" }} />
                                        ) : (
                                            React.cloneElement(step.icon, {
                                                style: {
                                                    color: isCurrent ? "#fff" : "#9ca3af",
                                                },
                                            })
                                        )}
                                    </Avatar>

                                    <Typography
                                        fontSize={11}
                                        fontWeight="bold"
                                        mt={1}
                                        color={
                                            isCurrent
                                                ? "orange"
                                                : isCompleted
                                                    ? "teal"
                                                    : "text.secondary"
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

                {/* STEP CONTENT */}
                <Paper sx={{ p: 5, borderRadius: 4 }}>{renderStepContent()}</Paper>

                {/* NAVIGATION BUTTONS */}
                {currentStep < 6 && (
                    <Box display="flex" justifyContent="center" gap={2} mt={4}>
                        <Button
                            onClick={handlePrev}
                            disabled={currentStep === 1}
                            startIcon={<ChevronLeftIcon />}
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 3,
                                fontWeight: "bold",
                                bgcolor: currentStep === 1 ? "#e5e7eb" : "#fb923c",
                                color: currentStep === 1 ? "#9ca3af" : "#fff",
                                "&:hover": {
                                    bgcolor: currentStep === 1 ? "#e5e7eb" : "#ea580c",
                                },
                            }}
                        >
                            Prev
                        </Button>

                        <Button
                            onClick={handleNext}
                            disabled={currentStep === steps.length}
                            endIcon={<ChevronRightIcon />}
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 3,
                                fontWeight: "bold",
                                bgcolor: "#fb923c",
                                color: "#fff",
                                "&:hover": { bgcolor: "#ea580c" },
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
