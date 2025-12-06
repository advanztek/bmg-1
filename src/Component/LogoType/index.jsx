import { Card, Typography, Box, Container } from "@mui/material";
import { motion } from "framer-motion";

export default function LogoTypeSelector({
    label = "Select Option",
    options = [],
    value,
    onChange = () => { },
}) {
    return (
        <Container maxWidth="lg">
            <Box sx={{ pb: 4, }}>
                <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 1 }}
                >
                    {label}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        flexWrap: "wrap",
                    }}
                >
                    {options.map((opt) => {
                        const selected = opt.value === value;

                        return (
                            <Card
                                key={opt.value}
                                component={motion.div}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onChange(opt.value)}
                                sx={{
                                    px: 2.5,
                                    py: 0.4,
                                    minWidth: 120,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    borderRadius: 2,
                                    boxShadow: selected
                                        ? "0 0 0 3px rgba(99, 102, 241, 0.35)"
                                        : "0 2px 6px rgba(0,0,0,0.05)",
                                    background:
                                        selected
                                            ? "rgba(99,102,241,0.1)"
                                            : "rgba(255,255,255,0.55)",
                                    backdropFilter: "blur(8px)",
                                    transition: "0.25s ease",
                                    "&:hover": {
                                        background: "rgba(255,255,255,0.7)",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: "50%",
                                        border: "2px solid #6D6DF8",
                                        background: selected ? "#6D6DF8" : "transparent",
                                        transition: "0.25s",
                                    }}
                                />

                                <Typography fontSize="0.9rem" color="#2E2E4A">
                                    {opt.label}
                                </Typography>

                                <Box sx={{ ml: "auto", opacity: 0.6 }}>{opt.icon}</Box>
                            </Card>
                        );
                    })}
                </Box>
            </Box>
        </Container>
    );
}
