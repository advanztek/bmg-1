/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
    Box,
    Card,
    Skeleton,
} from "@mui/material";

// Skeleton Loading Component
const SkeletonVideoCard = () => (
    <Card
        elevation={0}
        sx={{
            borderRadius: 2,
            border: "1px solid #e0e0e0",
            overflow: "hidden",
        }}
    >
        <Skeleton
            variant="rectangular"
            sx={{
                aspectRatio: "16/9",
                width: "100%",
            }}
            animation="wave"
        />
        <Box sx={{ p: 2 }}>
            <Skeleton variant="text" width="80%" height={24} animation="wave" />
            <Skeleton
                variant="text"
                width="60%"
                height={20}
                animation="wave"
                sx={{ mt: 1 }}
            />
        </Box>
    </Card>
);

export default SkeletonVideoCard