// UserGenerateImages.jsx
import React from "react";
import {
    Box,
    Typography,
    Stack,
} from "@mui/material";
import {
    ArrowForward,
} from "@mui/icons-material";
import { pulse, shimmer, slideRight } from "./data";

// Loading Component
const GeneratingAnimation = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 400,
                p: 4,
            }}
        >
            {/* Animated Icons */}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
                <Box
                    sx={{
                        animation: `${pulse} 1.5s ease-in-out infinite`,
                        fontSize: 48,
                    }}
                >
                    🎨
                </Box>
                <ArrowForward
                    sx={{
                        fontSize: 40,
                        color: "primary.main",
                        animation: `${slideRight} 2s ease-in-out infinite`,
                    }}
                />
                <Box
                    sx={{
                        animation: `${pulse} 1.5s ease-in-out infinite 0.3s`,
                        fontSize: 48,
                    }}
                >
                    🖼️
                </Box>
            </Stack>

            {/* Shimmer Box */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 400,
                    height: 200,
                    borderRadius: 3,
                    background: `
            linear-gradient(
              90deg,
              #f0f0f0 0%,
              #e0e0e0 20%,
              #f0f0f0 40%,
              #e0e0e0 60%,
              #f0f0f0 80%,
              #e0e0e0 100%
            )
          `,
                    backgroundSize: "1000px 100%",
                    animation: `${shimmer} 2s linear infinite`,
                    position: "relative",
                    overflow: "hidden",
                    border: "2px solid",
                    borderColor: "primary.light",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `
              linear-gradient(
                90deg,
                transparent 0%,
                rgba(25, 118, 210, 0.2) 50%,
                transparent 100%
              )
            `,
                        backgroundSize: "1000px 100%",
                        animation: `${shimmer} 2s linear infinite`,
                    },
                }}
            />

            {/* Loading Text */}
            <Stack spacing={1} alignItems="center" sx={{ mt: 4 }}>
                <Typography variant="h6" fontWeight={600} color="primary">
                    Generating Your Image...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This may take a few moments. Please wait.
                </Typography>
            </Stack>

            {/* Progress Dots */}
            <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
                {[0, 1, 2].map((i) => (
                    <Box
                        key={i}
                        sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            bgcolor: "primary.main",
                            animation: `${pulse} 1s ease-in-out infinite`,
                            animationDelay: `${i * 0.2}s`,
                        }}
                    />
                ))}
            </Stack>
        </Box>
    );
};

export default GeneratingAnimation