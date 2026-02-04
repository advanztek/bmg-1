import React from "react";
import { Paper, Typography } from "@mui/material";
import { Info } from "@mui/icons-material";

const EmptyState = () => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 6,
                textAlign: "center",
                border: "2px dashed",
                borderColor: "divider",
                borderRadius: 2
            }}
        >
            <Info sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
            <Typography variant="h6" fontWeight={600} color="text.secondary" mb={1}>
                No Packages Available
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Credit packages are currently unavailable. Please use the custom purchase option above or check back later.
            </Typography>
        </Paper>
    );
};

export default EmptyState;