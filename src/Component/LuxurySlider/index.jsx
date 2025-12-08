import React, { useState } from "react";
import { Box, Card, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import {
    CheckmarkCircle24Regular,
    ChevronLeft20Filled,
    ChevronRight20Filled
} from "@fluentui/react-icons";

const features = [
    "Elite Graphic Designer",
    "Full copyright ownership",
    "Jpg, Png, Pdf, Eps, Svg, Ai",
    "3 revisions | 72 hrs Delivery",
    "2&3-dimensional designs"
];

const slides = [
    {
        title: "Luxury Modern Minimalist Logo",
        price: 3750,
        discount: 25,
        img: "https://via.placeholder.com/300x300.png?text=Logo",
    },
    {
        title: "Premium 3D Logo Package",
        price: 4200,
        discount: 25,
        img: "https://via.placeholder.com/300x300.png?text=3D+Logo",
    },
    {
        title: "Creative Branding Pack",
        price: 3000,
        discount: 25,
        img: "https://via.placeholder.com/300x300.png?text=Branding",
    }
];

export default function LuxurySlider() {
    const [index, setIndex] = useState(0);

    const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
    const prevSlide = () =>
        setIndex((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                maxWidth: 1100,
                mx: "auto",
                height: 650,
                overflow: "hidden",
                mt:8,
            }}
        >
            {slides.map((slide, i) => {
                const isCenter = i === index;

                return (
                    <Card
                        key={i}
                        component={motion.div}
                        initial={false}
                        animate={{
                            scale: isCenter ? 1 : 0.75,
                            opacity: isCenter ? 1 : 0.35,
                            x: (i - index) * 380,
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        sx={{
                            position: "absolute",
                            top: 20,
                            left: "30%",
                            transform: "translateX(-50%)",
                            width: 460,
                            height: 'auto',
                            borderRadius: 4,
                            boxShadow: isCenter
                                ? "0 8px 30px rgba(0,0,0,0.2)"
                                : "0 4px 15px rgba(0,0,0,0.1)",
                            p: 2.5,
                            background: "#fff",
                        }}
                    >
                        {/* Title */}
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, mb: 2, textAlign: "center" }}
                        >
                            {slide.title}
                        </Typography>

                        {/* Image with discount labels */}
                        <Box
                            sx={{
                                position: "relative",
                                borderRadius: 3,
                                overflow: "hidden",
                                width: "100%",
                                height: 200,
                                background: "#12124F",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mb: 2,
                            }}
                        >
                            <img
                                src={slide.img}
                                alt="Logo"
                                style={{ width: "60%", borderRadius: 12 }}
                            />

                            {/* Discount Tags */}
                            <DiscountTag top="8px" left="8px" discount={slide.discount} />
                            <DiscountTag bottom="8px" right="8px" discount={slide.discount} />
                        </Box>

                        {/* Features */}
                        <Box sx={{ px: 1, mb: 2 }}>
                            {features.map((feat, idx) => (
                                <Box
                                    key={idx}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        mb: 0.5,
                                    }}
                                >
                                    <CheckmarkCircle24Regular color="#00C851" />
                                    <Typography sx={{ fontSize: "0.9rem" }}>{feat}</Typography>
                                </Box>
                            ))}
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Typography
                                sx={{
                                    textDecoration: "line-through",
                                    color: "#444",
                                    fontWeight: 600,
                                }}
                            >
                                GHS {slide.price}
                            </Typography>

                            <Typography sx={{ fontWeight: 700, color: "#F59E0B" }}>
                                GHS {slide.price - (slide.price * slide.discount) / 100}
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    bgcolor: "#FBBF24",
                                    color: "#000",
                                    fontWeight: 700,
                                    borderRadius: 2,
                                    textTransform: "none",
                                    "&:hover": { bgcolor: "#f5a217" },
                                }}
                            >
                                Buy Now - {slide.discount}%
                            </Button>

                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    bgcolor: "#000",
                                    color: "#fff",
                                    fontWeight: 700,
                                    borderRadius: 2,
                                    textTransform: "none",
                                    "&:hover": { opacity: 0.85 },
                                }}
                            >
                                Custom Order
                            </Button>
                        </Box>
                    </Card>
                );
            })}

            {/* Navigation Buttons */}
            <NavButton direction="left" onClick={prevSlide} />
            <NavButton direction="right" onClick={nextSlide} />
        </Box>
    );
}

/* Discount label component */
function DiscountTag({ discount, ...pos }) {
    return (
        <Box
            sx={{
                position: "absolute",
                bgcolor: "#22C55E",
                color: "#fff",
                fontSize: "0.7rem",
                px: 1,
                py: 0.3,
                borderRadius: 1,
                fontWeight: 700,
                ...pos,
            }}
        >
            - {discount}%
        </Box>
    );
}

/* Left / Right Navigation buttons */
function NavButton({ direction, onClick }) {
    return (
        <Button
            onClick={onClick}
            sx={{
                position: "absolute",
                top: "50%",
                [direction === "left" ? "left" : "right"]: 10,
                transform: "translateY(-50%)",
                minWidth: 40,
                height: 40,
                p:1,
                borderRadius: "50%",
                bgcolor: "white",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                "&:hover": { bgcolor: "#eee" },
            }}
        >
            {direction === "left" ? <ChevronLeft20Filled/> : <ChevronRight20Filled/>}
        </Button>
    );
}
