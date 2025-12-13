import React, { useState } from "react";
import {
  Stack,
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  Container,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft24Regular,
  ChevronRight24Regular,
  ArrowRight24Regular,
} from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";

export default function CategoriesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleCategories = () => {
    navigate("/category");
  };

  const categories = [
    { title: "GRAPHIC DESIGN", subtitle: "Logo Design", image: "/Images/Img_4.jpg" },
    { title: "VIDEO EDITING", subtitle: "Video Content Production", image: "/Images/Img_5.jpg" },
    { title: "MARKETING", subtitle: "Digital Marketing", image: "/Images/Img_4.jpg" },
    { title: "ANIMATION", subtitle: "3D Design", image: "/Images/Img_5.jpg" },
    { title: "WEB DEVELOPMENT", subtitle: "Full Stack Development", image: "/Images/Img_4.jpg" },
  ];

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % categories.length);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box
        sx={{
          width: "100%",
          py: 8,
          px: { xs: 3, md: 8 },
          borderRadius: 5,
          background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
        }}
      >
        <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
          {/* Header */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="flex-start"
            mb={5}
          >
            <Box sx={{ mb: { xs: 3, md: 0 } }}>
              <Typography variant="h3" color="common.white" fontWeight="bold" mb={1}>
                Categories
              </Typography>
              <Typography variant="body1" color="grey.300" maxWidth="500px">
                Pretium lectus ultrices sit tempor, sit ullamcorper volutpat et et.
                Auctor turpis semper id sit
              </Typography>
            </Box>

            <Button
              onClick={handleCategories}
              variant="outlined"
              sx={{
                color: "common.white",
                borderColor: "common.white",
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "common.white",
                  color: theme.palette.primary.dark,
                },
              }}
              endIcon={<ArrowRight24Regular />}
            >
              View All Categories
            </Button>
          </Stack>

          {/* Slider Wrapper */}
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{
                transform: {
                  xs: `translateX(-${currentIndex * 100}%)`,
                  md: `translateX(-${currentIndex * 25}%)`,
                },
                transition: "transform 0.5s ease-in-out",
                width: {
                  xs: `${categories.length * 100}%`,
                  md: `${categories.length * 25}%`,
                },
              }}
            >
              {categories.map((category, index) => (
                <Box
                  key={index}
                  sx={{
                    minWidth: { xs: "100%", md: "25%" },
                  }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      position: "relative",
                      height: 356,
                      borderRadius: 2,
                      overflow: "hidden",
                      backgroundImage: `url(${category.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* Dark overlay */}
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "rgba(0,0,0,0.4)",
                      }}
                    />

                    {/* Text */}
                    <Box sx={{ position: "relative", zIndex: 1, p: 2 }}>
                      <Typography
                        variant="caption"
                        fontWeight="bold"
                        color="common.white"
                        mb={0.5}
                        letterSpacing={1}
                      >
                        {category.title}
                      </Typography>
                      <Typography variant="body2" color="common.white">
                        {category.subtitle}
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              ))}
            </Stack>

            <IconButton
              onClick={prevSlide}
              aria-label="Previous"
              sx={{
                position: "absolute",
                left: { xs: 8, md: 16 },
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "common.white",
                boxShadow: 2,
                "&:hover": { bgcolor: "grey.100" },
              }}
            >
              <ChevronLeft24Regular
                style={{ color: theme.palette.primary.dark }}
              />
            </IconButton>

            <IconButton
              onClick={nextSlide}
              aria-label="Next"
              sx={{
                position: "absolute",
                right: { xs: 8, md: 16 },
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "common.white",
                boxShadow: 2,
                "&:hover": { bgcolor: "grey.100" },
              }}
            >
              <ChevronRight24Regular
                style={{ color: theme.palette.primary.dark }}
              />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
