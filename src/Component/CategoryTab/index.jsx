import React, { useState } from "react";
import { Box, Chip, Typography, Stack, Container } from "@mui/material";
import {
    MegaphoneLoud20Filled,
    Video20Filled,
    Briefcase20Filled,
    Pen24Filled,
    PaintBrush20Filled,
    CallPark20Filled,
    Code24Filled,
} from "@fluentui/react-icons";

const categories = [
    { label: "Graphic Design", icon: <PaintBrush20Filled /> },
    { label: "Digital Marketing", icon: <MegaphoneLoud20Filled /> },
    { label: "Video & Animation", icon: <Video20Filled /> },
    { label: "Business", icon: <Briefcase20Filled /> },
    { label: "AI Services", icon: <CallPark20Filled /> },
    { label: "Programming & Tech", icon: <Code24Filled /> },
    { label: "Writing", icon: <Pen24Filled /> },
];

const CategoryTabs = () => {
    const [active, setActive] = useState("Trending");

    return (

        <Box
            sx={{
                width: "100%",
                backgroundColor: "#F0F1FE",
                borderBottom: "1px solid #E5E7EB",
                py: 2,
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Container maxWidth="lg">
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                    px: 2,
                    maxWidth: "1200px",
                    width: "100%",
                    "&::-webkit-scrollbar": { display: "none" },
                }}
            >
                <Typography
                    sx={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "#111827",
                        mr: 1,
                        flexShrink: 0,
                    }}
                >
                    Trending
                </Typography>

                {categories.map((cat) => (
                    <Chip
                        key={cat.label}
                        icon={cat.icon}
                        label={cat.label}
                        clickable
                        onClick={() => setActive(cat.label)}
                        sx={{
                            borderRadius: "20px",
                            px: 1,
                            py: 1.5,
                            height: "30px",
                            fontSize: "0.8rem",
                            color: active === cat.label ? "#1D4ED8" : "#6B7280",
                            backgroundColor:
                                active === cat.label ? "#DBEAFE" : "rgba(0,0,0,0.02)",
                            border:
                                active === cat.label
                                    ? "1px solid #3B82F6"
                                    : "1px solid #3B82F6",
                            transition: "all 0.2s ease-in-out",
                            "&:hover": {
                                backgroundColor: "#EFF6FF",
                                borderColor: "#93C5FD",
                            },
                        }}
                    />
                ))}
            </Stack>
            </Container>
     </Box >
    );
};

export default CategoryTabs;
