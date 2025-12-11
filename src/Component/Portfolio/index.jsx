import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FONT_FAMILY } from "../../Config/font";
import Marquee from "react-fast-marquee";
import { useNavigate } from "react-router-dom";

const PortfolioSection = () => {
    const theme = useTheme();

    const items = [
        "/Images/Img_4.jpg",
        "/Images/Img_5.jpg",
        "/Images/Img_4.jpg",
        "/Images/Img_5.jpg",
        "/Images/Img_1.jpg",
        "/Images/Img_5.jpg",
        "/Images/Img_5.jpg",
        "/Images/Img_4.jpg",
        "/Images/Img_5.jpg",
        "/Images/Img_4.jpg",
        "/Images/Img_5.jpg",
        "/Images/Img_4.jpg",
        "/Images/Img_1.jpg",
        "/Images/Img_4.jpg",
    ];

    const navigate = useNavigate();
    
    return (
        <Box
            sx={{
                width: "100%",
                py: 6,
                px: 3,
                borderRadius: 4,
            }}
        >
            <Container maxWidth="lg">

                {/* Header */}
                <Box textAlign="center" mb={4}>
                    <Typography
                        variant="h3"
                        fontWeight="700"
                        color="text.primary"
                        sx={{ mb: 1 }}
                    >
                        Portfolio
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        maxWidth="700px"
                        mx="auto"
                        sx={{ fontFamily: FONT_FAMILY.tertiary }}
                    >
                        Take advantage of our special marketing Kit for bulk SMS,
                        mailing among others
                    </Typography>
                </Box>

                <Marquee pauseOnHover speed={40} gradient={false} style={{ padding: "5px 0" }}>
                    {items.map((img, index) => (
                        <Box
                            key={`row1-${index}`}
                            sx={{
                                width: 150,
                                height: 100,
                                borderRadius: 2,
                                overflow: "hidden",
                                boxShadow: 2,
                                cursor: "pointer",
                                mx: 1.5,
                                transition: "0.3s",
                                "&:hover": {
                                    transform: "translateY(-5px)",
                                    boxShadow: 5
                                }
                            }}
                        >
                            <img
                                src={img}
                                alt="portfolio"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover"
                                }}
                            />
                        </Box>
                    ))}
                </Marquee>

                <Marquee
                    pauseOnHover
                    speed={40}
                    gradient={false}
                    direction="right"
                    style={{ padding: "5px 0" }}
                >
                    {items.map((img, index) => (
                        <Box
                            key={`row2-${index}`}
                            sx={{
                                width: 150,
                                height: 100,
                                borderRadius: 2,
                                overflow: "hidden",
                                boxShadow: 2,
                                cursor: "pointer",
                                mx: 1.5,
                                transition: "0.3s",
                                "&:hover": {
                                    transform: "translateY(-5px)",
                                    boxShadow: 5
                                }
                            }}
                        >
                            <img
                                src={img}
                                alt="portfolio"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover"
                                }}
                            />
                        </Box>
                    ))}
                </Marquee>

                <Box textAlign="center" mt={5}>
                    <Button
                       onClick={() => navigate("/portfolio")}
                        variant="contained"
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            px: 5,
                            py: 1.5,
                            fontWeight: "bold",
                            borderRadius: 2,
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: theme.palette.primary.bg,
                            },
                        }}
                    >
                        View Portfolio
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default PortfolioSection;
