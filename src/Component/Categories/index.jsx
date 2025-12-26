import React, { useState } from "react";
import {
  Stack,
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  Container,
  Card,
  CardContent,
  CardMedia,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  ChevronLeft24Regular,
  ChevronRight24Regular,
  ArrowRight24Regular,
} from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";

export default function CategoriesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();

  const categories = [
    {
      title: "BUNDLE",
      subtitle: "SAVE",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop",
      color: "#2563EB",
      badge: "Popular"
    },
    {
      title: "BRAND ESSENTIALS",
      subtitle: "DESIGN",
      image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&h=400&fit=crop",
      color: "#9333EA",
      badge: "New"
    },
    {
      title: "MULTI-PAGE",
      subtitle: "WEBSITE",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      color: "#7C3AED",
      badge: "Trending"
    },
    {
      title: "VEHICLE WRAP",
      subtitle: "DESIGN",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop",
      color: "#DC2626",
      badge: "Featured"
    },
    {
      title: "DOOR HANGER",
      subtitle: "DESIGN",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      color: "#059669",
      badge: "Hot"
    },
    {
      title: "SOCIAL MEDIA",
      subtitle: "MARKETING",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
      color: "#DB2777",
      badge: "Popular"
    },
  ];

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % categories.length);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);

  const navigate = useNavigate();


  return (
    <Box sx={{
      bgcolor: theme.palette.primary.lightBg,
      py: 10,
      position: 'relative',
      overflow: 'hidden',

    }}>
      <Container data-aos='fade-down' maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="center"
          alignItems={{ xs: "flex-start", md: "center" }}
          // mb={6}
          spacing={3}
        >
          <Box>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mt: 3,
                letterSpacing: '-1px',
                textTransform: 'uppercase',
                color: theme.palette.text.primary,
              }}
            >
              Categories 🔖
            </Typography>


            <Typography
              variant="body1"
              sx={{
                color: theme.palette.primary.bg,
                maxWidth: '400px',
                fontSize: '0.8rem',
                lineHeight: 1.6,
              }}
            >
              Explore our premium collection  
            </Typography>
          </Box>

        </Stack>

        {/* Slider Container */}
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            px: { xs: 0, md: 6 },
          }}
        >
          <Box
            // data-aos='fade-down'
            sx={{
              display: 'flex',
              gap: 1,
              py: 2,
              transform: {
                xs: `translateX(-${currentIndex * 100}%)`,
                sm: `translateX(-${currentIndex * 50}%)`,
                md: `translateX(-${currentIndex * 33.33}%)`,
                lg: `translateX(-${currentIndex * 25}%)`,
              },
              transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {categories.map((category, index) => (
              <Card
                key={index}
                sx={{
                  minWidth: {
                    xs: 'calc(100% - 48px)',
                    sm: 'calc(50% - 24px)',
                    md: 'calc(33.33% - 20px)',
                    lg: 'calc(25% - 28px)'
                  },
                  height: '920',
                  borderRadius: 2,
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  bgcolor: category.color,
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: `0 8px 32px ${category.color}40`,
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.02)',
                    boxShadow: `0 20px 60px ${category.color}60`,
                    '& .category-overlay': {
                      opacity: 0.95,
                    },
                    '& .category-image': {
                      transform: 'scale(1.15)',
                    },
                    '& .get-button': {
                      transform: 'translateX(0)',
                      opacity: 1,
                    },
                  },
                }}
              >
                {/* Background Image */}
                <Box
                  className="category-image"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${category.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.6s ease',
                    zIndex: 0,
                  }}
                />

                {/* Color Overlay */}
                <Box
                  className="category-overlay"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(135deg, ${category.color}F5 0%, ${category.color}CC 50%, ${category.color}E6 100%)`,
                    opacity: 0.88,
                    transition: 'opacity 0.4s ease',
                    zIndex: 1,
                  }}
                />

                {/* Content */}
                <CardContent
                  sx={{
                    position: 'relative',
                    zIndex: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    p: 3,
                  }}
                >
                  {/* Top Section */}
                  <Box>
                    <Chip
                      label={category.badge}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(10px)',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '0.7rem',
                        letterSpacing: '1px',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        mb: 2,
                      }}
                    />

                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        letterSpacing: '3px',
                        mb: 1,
                        textTransform: 'uppercase',
                      }}
                    >
                      {category.subtitle}
                    </Typography>

                    <Typography
                      variant="h4"
                      sx={{
                        color: '#fff',
                        fontWeight: 900,
                        fontSize: { xs: '1.75rem', md: '1.4rem' },
                        letterSpacing: '-0.5px',
                        lineHeight: 1.2,
                        textTransform: 'uppercase',
                        textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                      }}
                    >
                      {category.title}
                    </Typography>
                  </Box>

                  {/* Bottom Section - Grid Preview */}
                  <Box>
                    {/* Mini Grid Preview (like in the image) */}
                    {/* <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 1,
                        mb: 3,
                        opacity: 0.8,
                      }}
                    >
                      {[...Array(12)].map((_, i) => (
                        <Box
                          key={i}
                          sx={{
                            aspectRatio: '1',
                            borderRadius: 1.5,
                            bgcolor: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              bgcolor: 'rgba(255, 255, 255, 0.25)',
                              transform: 'scale(1.05)',
                            },
                          }}
                        />
                      ))}
                    </Box> */}

                    {/* GET Button */}
                    {/* <Button
                      className="get-button"
                      fullWidth
                      variant="contained"
                      onClick={() => navigate('/category')}
                      sx={{
                        bgcolor: '#fff',
                        color: category.color,
                        borderRadius: 2.5,
                        py: 1.5,
                        fontWeight: 800,
                        fontSize: '1rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                        transform: 'translateX(-10px)',
                        opacity: 0.95,
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          bgcolor: '#fff',
                          transform: 'translateX(0) scale(1.02)',
                          boxShadow: '0 6px 28px rgba(0, 0, 0, 0.3)',
                        },
                      }}
                    >
                      GET
                    </Button> */}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Navigation Buttons */}
          <IconButton
            onClick={prevSlide}
            aria-label="Previous"
            sx={{
              position: "absolute",
              left: { xs: -8, md: -12 },
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "#fff",
              width: 56,
              height: 56,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              zIndex: 10,
              '&:hover': {
                bgcolor: "#fff",
                transform: 'translateY(-50%) scale(1.1)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <ChevronLeft24Regular style={{ color: '#000', fontSize: '1.5rem' }} />
          </IconButton>

          <IconButton
            onClick={nextSlide}
            aria-label="Next"
            sx={{
              position: "absolute",
              right: { xs: -8, md: -12 },
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "#fff",
              width: 56,
              height: 56,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              zIndex: 10,
              '&:hover': {
                bgcolor: "#fff",
                transform: 'translateY(-50%) scale(1.1)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <ChevronRight24Regular style={{ color: '#000', fontSize: '1.5rem' }} />
          </IconButton>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          sx={{ mt: 5 }}
        >
          {categories.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: currentIndex === index ? 32 : 8,
                height: 8,
                borderRadius: 4,
                bgcolor: currentIndex === index ? '#fff' : 'rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: currentIndex === index ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                },
              }}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}