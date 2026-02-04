/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
    Box,
    Typography,
    Stack,
} from "@mui/material";
import {
    ArrowForward,
    PlayCircleOutline,
} from "@mui/icons-material";
import { pulse, rotate, shimmer, slideRight } from "./data";

// Beautiful Generating Animation Component
const GeneratingAnimation = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 450,
                p: 4,
            }}
        >
            {/* Animated Icons */}
            <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 4 }}>
                <Box
                    sx={{
                        animation: `${pulse} 1.5s ease-in-out infinite`,
                        fontSize: 56,
                    }}
                >
                    🎬
                </Box>
                <ArrowForward
                    sx={{
                        fontSize: 48,
                        color: "primary.main",
                        animation: `${slideRight} 2s ease-in-out infinite`,
                    }}
                />
                <Box
                    sx={{
                        animation: `${pulse} 1.5s ease-in-out infinite 0.3s`,
                        fontSize: 56,
                    }}
                >
                    🎥
                </Box>
            </Stack>

            {/* Rotating Circle */}
            <Box
                sx={{
                    position: "relative",
                    width: 120,
                    height: 120,
                    mb: 3,
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        border: "4px solid",
                        borderColor: "primary.light",
                        borderTopColor: "primary.main",
                        animation: `${rotate} 1s linear infinite`,
                    }}
                />
                <PlayCircleOutline
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: 48,
                        color: "primary.main",
                        animation: `${pulse} 2s ease-in-out infinite`,
                    }}
                />
            </Box>

            {/* Shimmer Box */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 450,
                    height: 180,
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
                    border: "3px solid",
                    borderColor: "primary.main",
                    boxShadow: "0 8px 32px rgba(25, 118, 210, 0.2)",
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
                rgba(25, 118, 210, 0.3) 50%,
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
                <Typography variant="h5" fontWeight={700} color="primary">
                    Generating Your Video...
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    AI is crafting your video. This may take a moment.
                </Typography>
            </Stack>

            {/* Progress Dots */}
            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                {[0, 1, 2, 3].map((i) => (
                    <Box
                        key={i}
                        sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            bgcolor: "primary.main",
                            animation: `${pulse} 1.2s ease-in-out infinite`,
                            animationDelay: `${i * 0.15}s`,
                        }}
                    />
                ))}
            </Stack>
        </Box>
    );
};

export default GeneratingAnimation