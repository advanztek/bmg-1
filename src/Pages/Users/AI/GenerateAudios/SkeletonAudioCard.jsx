import React from "react";
import {
    Box,
    Card,
    Stack,
    Skeleton,
} from "@mui/material";

const SkeletonAudioCard = () => (
    <Card
        elevation={0}
        sx={{
            borderRadius: 2,
            border: "1px solid #e0e0e0",
            overflow: "hidden",
        }}
    >
        <Box sx={{ p: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
                <Skeleton variant="circular" width={56} height={56} animation="wave" />
                <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width="70%" height={24} animation="wave" />
                    <Skeleton
                        variant="text"
                        width="40%"
                        height={20}
                        animation="wave"
                        sx={{ mt: 1 }}
                    />
                </Box>
            </Stack>
            <Skeleton
                variant="rectangular"
                height={4}
                sx={{ mt: 2, borderRadius: 1 }}
                animation="wave"
            />
        </Box>
    </Card>
);

export default SkeletonAudioCard;