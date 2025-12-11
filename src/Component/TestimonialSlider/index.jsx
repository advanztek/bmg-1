import React from "react";
import Slider from "react-slick";
import {
    Box,
    Container,
    Typography,
    Card,
    Avatar,
    useTheme,
} from "@mui/material";

import { Star24Filled } from "@fluentui/react-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialsSlider = ({ testimonials }) => {
    const theme = useTheme()
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        responsive: [
            {
                breakpoint: 900,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 600,
                settings: { slidesToShow: 1 }
            },
        ],
    };

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>

            <Box sx={{ textAlign: "center", mb: 8 }}>
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 800,
                        color: theme.palette.text.heading,
                        mb: 2,
                    }}
                >
                    BMG is Loved by Thousands
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        color: theme.palette.text.secondary,
                        maxWidth: 600,
                        mx: "auto",
                    }}
                >
                    See what our customers have to say
                </Typography>
            </Box>

            <Slider {...settings}>
                {testimonials.map((t, index) => (
                    <Box key={index} px={2}>
                        <Card
                            sx={{
                                p: 4,
                                bgcolor: theme.palette.background.paper,
                                border: `1px solid ${theme.palette.divider}`,
                                borderRadius: 3,
                                height: "100%",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-8px)",
                                    boxShadow: `0 12px 32px ${theme.palette.primary.main}20`,
                                },
                            }}
                        >
                            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star24Filled
                                        key={i}
                                        style={{
                                            color: theme.palette.warning.main,
                                            fontSize: 20,
                                        }}
                                    />
                                ))}
                            </Box>

                            <Typography
                                variant="body1"
                                sx={{
                                    color: theme.palette.text.primary,
                                    mb: 3,
                                    fontStyle: "italic",
                                    lineHeight: 1.8,
                                }}
                            >
                                "{t.text}"
                            </Typography>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Avatar
                                    src={t.avatar}
                                    sx={{
                                        width: 48,
                                        height: 48,
                                        border: `2px solid ${theme.palette.primary.main}`,
                                    }}
                                />

                                <Box>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontWeight: 700,
                                            color: theme.palette.text.heading,
                                        }}
                                    >
                                        {t.name}
                                    </Typography>

                                    <Typography
                                        variant="caption"
                                        sx={{ color: theme.palette.text.secondary }}
                                    >
                                        {t.role}
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Box>
                ))}
            </Slider>
        </Container>
    );
};

export default TestimonialsSlider;
