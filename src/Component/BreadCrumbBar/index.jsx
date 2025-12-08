import React, { useState } from "react";
import {
    Search24Regular,
    Sparkle24Regular,
    ChevronRight20Regular,
} from "@fluentui/react-icons";

import {
    Box,
    Button,
    InputBase,
    Paper,
    Typography,
    Container,
    Fade,
} from "@mui/material";

const BreadcrumbBar = ({
    breadcrumbs = [],
    suggestions = [],
    onSearch = () => { },
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleSearch = () => onSearch(searchQuery);

    return (
        <Box sx={{ py: 0, my: 0 }}>
            <Container maxWidth="lg" sx={{ py: 2, my: 0 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", lg: "row" },
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                        mt: 0,
                        mb: 0,
                    }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            width: '600px',
                            px: 3,
                            py: 0.6,
                            borderRadius: "16px",
                            background: "rgba(255,255,255,0.85)",
                            backdropFilter: "blur(14px)",
                            boxShadow: "0px 6px 24px rgba(0,0,0,0.05)",
                            m: 0,
                        }}
                    >
                        {breadcrumbs.map((crumb, index) => (
                            <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                                <Box
                                    component="a"
                                    href={crumb.href}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        textDecoration: "none",
                                        fontWeight: 600,
                                        color:
                                            index === breadcrumbs.length - 1
                                                ? "#334155"
                                                : "#64748b",
                                        "&:hover": { color: "#f97316" },
                                        transition: "0.25s",
                                    }}
                                >
                                    {crumb.icon && (
                                        <span style={{ fontSize: 17 }}>{crumb.icon}</span>
                                    )}
                                    <Typography fontSize="15px">{crumb.label}</Typography>
                                </Box>

                                {index < breadcrumbs.length - 1 && (
                                    <ChevronRight20Regular
                                        style={{
                                            margin: "0 8px",
                                            fontSize: 16,
                                            color: "#cbd5e1",
                                        }}
                                    />
                                )}
                            </Box>
                        ))}
                    </Paper>

                    {/* ----------------- SEARCH AREA ----------------- */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            width: "100%",
                            justifyContent: { xs: "center", lg: "flex-end" },
                            m: 0,
                            p: 0,
                        }}
                    >
                        <Paper
                            elevation={isFocused ? 8 : 3}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                width: { xs: "100%", lg: "480px" },
                                px: 2,
                                py: 0.6,
                                borderRadius: "18px",
                                border: isFocused
                                    ? "2px solid #fb923c"
                                    : "2px solid transparent",
                                transition: "all 0.35s",
                                boxShadow: isFocused
                                    ? "0 0 0 6px rgba(251,146,60,0.2)"
                                    : "0px 4px 22px rgba(0,0,0,0.07)",
                                m: 0,
                            }}
                        >
                            <Search24Regular
                                style={{
                                    fontSize: 22,
                                    color: isFocused ? "#f97316" : "#94a3b8",
                                    transition: "0.3s",
                                }}
                            />

                            <InputBase
                                placeholder="Search for services..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                                sx={{
                                    ml: 2,
                                    flex: 1,
                                    fontSize: "15.5px",
                                    fontWeight: 500,
                                }}
                            />

                            {searchQuery && (
                                <Sparkle24Regular
                                    style={{
                                        fontSize: 22,
                                        color: "#fb923c",
                                        animation: "pulse 1.6s infinite ease-in-out",
                                    }}
                                />
                            )}
                        </Paper>

                        <Button
                            onClick={handleSearch}
                            variant="contained"
                            sx={{
                                background: "linear-gradient(to right, #fb923c, #f97316)",
                                px: 4,
                                py: 1.2,
                                borderRadius: "16px",
                                fontWeight: 600,
                                fontSize: "15px",
                                textTransform: "none",
                                boxShadow: "0px 8px 24px rgba(249,115,22,0.3)",
                                display: "flex",
                                gap: 1,
                                "&:hover": {
                                    background: "linear-gradient(to right, #f97316, #ea580c)",
                                    transform: "scale(1.07)",
                                    boxShadow: "0px 10px 28px rgba(249,115,22,0.4)",
                                },
                                transition: "0.3s",
                                m: 0,
                            }}
                        >
                            <Search24Regular />
                            Search
                        </Button>
                    </Box>
                </Box>
                <Fade in={isFocused && suggestions.length > 0} unmountOnExit>
                    <Box
                        sx={{
                            mt: isFocused && suggestions.length > 0 ? 2 : 0,   // ONLY adds margin when open
                            maxWidth: { lg: "650px" },
                            ml: { lg: "auto" },
                            pb: isFocused && suggestions.length > 0 ? 1 : 0,   // ONLY adds padding when open
                            transition: "all 0.25s ease-in-out",
                        }}
                    >
                        <Paper
                            elevation={6}
                            sx={{
                                borderRadius: "18px",
                                p: isFocused && suggestions.length > 0 ? 3 : 0, // Remove padding completely when closed
                                border: isFocused && suggestions.length > 0 ? "1px solid #e2e8f0" : "none",
                                background: "white",
                                overflow: "hidden",
                                transition: "all 0.25s ease-in-out",
                            }}
                        >
                            {isFocused && suggestions.length > 0 && (
                                <>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                                        <Box
                                            sx={{
                                                width: "4px",
                                                height: "20px",
                                                background: "linear-gradient(#fb923c, #f97316)",
                                                borderRadius: "4px",
                                            }}
                                        />
                                        <Typography
                                            sx={{
                                                fontSize: "11px",
                                                color: "grey.600",
                                                fontWeight: "bold",
                                                textTransform: "uppercase",
                                                letterSpacing: "1px",
                                            }}
                                        >
                                            Popular Searches
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.4 }}>
                                        {suggestions.map((tag, i) => (
                                            <Button
                                                key={i}
                                                onClick={() => setSearchQuery(tag)}
                                                sx={{
                                                    background: "linear-gradient(to right,#fafafa,#f4f4f5)",
                                                    color: "#334155",
                                                    px: 2.4,
                                                    py: 1,
                                                    borderRadius: "12px",
                                                    border: "1px solid #ececec",
                                                    fontSize: "13px",
                                                    fontWeight: 600,
                                                    "&:hover": {
                                                        background: "linear-gradient(#fff7ed,#ffedd5)",
                                                        color: "#f97316",
                                                        transform: "scale(1.05)",
                                                        boxShadow: "0px 4px 18px rgba(0,0,0,0.08)",
                                                        borderColor: "#f97316",
                                                    },
                                                    transition: "0.3s",
                                                }}
                                            >
                                                {tag}
                                            </Button>
                                        ))}
                                    </Box>
                                </>
                            )}
                        </Paper>
                    </Box>
                </Fade>

            </Container>

            <style>{`
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.25); opacity: 0.5; }
                    100% { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </Box>
    );
};

export default BreadcrumbBar;
