
import React from "react";
import {
    Box,
    Typography,
    Stack,
} from "@mui/material";
import {
    Headphones,
} from "@mui/icons-material";
import { pulse, shimmer, wave } from "./data";

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
            {/* Sound Wave Animation */}
            <Stack direction="row" spacing={1} alignItems="flex-end" mb={4}>
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <Box
                        key={i}
                        sx={{
                            width: 8,
                            height: 60,
                            bgcolor: "primary.main",
                            borderRadius: 1,
                            animation: `${wave} 1s ease-in-out infinite`,
                            animationDelay: `${i * 0.1}s`,
                        }}
                    />
                ))}
            </Stack>

            {/* Headphones Icon with Pulse */}
            <Box
                sx={{
                    p: 3,
                    bgcolor: "primary.light",
                    borderRadius: "50%",
                    mb: 3,
                    animation: `${pulse} 2s ease-in-out infinite`,
                }}
            >
                <Headphones sx={{ fontSize: 64, color: "primary.main" }} />
            </Box>

            {/* Shimmer Box */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 450,
                    height: 120,
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
                    Processing Audio...
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    AI is working its magic. Please wait.
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