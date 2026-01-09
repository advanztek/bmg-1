import React, { useState } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  IconButton,
  Card,
  CardMedia,
  Dialog,
  DialogContent,
  Stack,
} from "@mui/material";
import {
  Image as ImageIcon,
  Delete,
  Download,
  Close,
} from "@mui/icons-material";
import { EMOJI_ICONS } from "../../../../Config/emojiIcons";
import { DashboardTab, CustomTab } from "../../../../Component";
import { videoTabs } from "../data";
import ImageToVideoInput from "./image-to-video";
import TextToVideoInput from "./text-to-video";

const DRAWER_WIDTH = 320;
const DRAWER_COLLAPSED_WIDTH = 70;

const UserGenerateVideos = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  function updateActiveTab(tab) {
    setActiveTab(tab);
  }

  // Mock data for generated images
  const [generatedImages] = useState([
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
      prompt: "Vibrant portrait with colorful smoke",
      timestamp: "2 mins ago",
      featured: false,
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400&h=400&fit=crop",
      prompt: "Elderly man with cosmic background",
      timestamp: "5 mins ago",
      featured: false,
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=400&fit=crop",
      prompt: "Winding mountain road at sunset",
      timestamp: "8 mins ago",
      featured: false,
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
      prompt: "Professional woman portrait",
      timestamp: "12 mins ago",
      featured: false,
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&h=400&fit=crop",
      prompt: "Close-up beauty portrait",
      timestamp: "15 mins ago",
      featured: false,
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=400&fit=crop",
      prompt: "Fire dancer performance art",
      timestamp: "20 mins ago",
      featured: false,
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1560264280-88b68371db39?w=400&h=400&fit=crop",
      prompt: "Modern tech concept with AI",
      timestamp: "25 mins ago",
      featured: true,
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      prompt: "Professional business portrait",
      timestamp: "30 mins ago",
      featured: false,
    },
  ]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            borderBottom: "1px solid #e0e0e0",
            px: 4,
            py: 3,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center" mb={1}>
            {EMOJI_ICONS.generatedImages}

            <Typography variant="h4" fontWeight={700}>
              Video Generator
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Imagine and let BMG AI bring it to life
          </Typography>
        </Box>

        <Grid container spacing={3} mt={5}>
          <Grid item size={{ xs: 12, md: 6, lg: 5 }}>
            <CustomTab
              tabs={videoTabs}
              activeTab={activeTab}
              updateActiveTab={updateActiveTab}
            />

            <DashboardTab tabKey={0} activeTab={activeTab}>
              <ImageToVideoInput />
            </DashboardTab>

            <DashboardTab tabKey={1} activeTab={activeTab}>
              <TextToVideoInput />
            </DashboardTab>
          </Grid>
          <Grid item size={{ xs: 12, md: 6, lg: 7 }}>
            <Box
              sx={{
                maxWidth: 1400,
                mx: "auto",
                p: 3,
                borderRadius: 2,
                border: "1px solid #e0e0e0",
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center" mb={3}>
                <ImageIcon color="action" />
                <Typography variant="h6" fontWeight={600}>
                  Library
                </Typography>
              </Stack>

              {/* Image Grid */}
              <Grid container spacing={3}>
                {generatedImages.map((image) => (
                  <Grid item size={{ xs: 12, md: 4, lg: 3 }} key={image.id}>
                    <Card
                      elevation={0}
                      onClick={() => handleImageClick(image)}
                      sx={{
                        cursor: "pointer",
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: 1,
                        transition: "all 0.3s",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: 6,
                          "& .image-overlay": {
                            opacity: 1,
                          },
                          "& .card-image": {
                            transform: "scale(1.1)",
                          },
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={image.url}
                        alt={image.prompt}
                        className="card-image"
                        sx={{
                          aspectRatio: "1/1",
                          objectFit: "cover",
                          transition: "transform 0.3s",
                        }}
                      />

                      {/* Hover Overlay */}
                      <Box
                        className="image-overlay"
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)",
                          p: 2,
                          opacity: 0,
                          transition: "opacity 0.3s",
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="white"
                          fontWeight={500}
                          sx={{
                            mb: 1,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {image.prompt}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            size="small"
                            sx={{
                              bgcolor: "rgba(255,255,255,0.2)",
                              color: "white",
                              backdropFilter: "blur(10px)",
                              "&:hover": {
                                bgcolor: "rgba(255,255,255,0.3)",
                              },
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("Download", image.id);
                            }}
                          >
                            <Download fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{
                              bgcolor: "rgba(255,255,255,0.2)",
                              color: "white",
                              backdropFilter: "blur(10px)",
                              "&:hover": {
                                bgcolor: "rgba(255,255,255,0.3)",
                              },
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("Delete", image.id);
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Stack>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Image Preview Modal */}
      <Dialog
        open={Boolean(selectedImage)}
        onClose={handleCloseModal}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "transparent",
            boxShadow: "none",
            overflow: "visible",
          },
        }}
        sx={{
          "& .MuiBackdrop-root": {
            bgcolor: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: "relative" }}>
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              top: -50,
              right: 0,
              color: "white",
              bgcolor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <Close />
          </IconButton>

          {selectedImage && (
            <Box sx={{ position: "relative" }}>
              <Box
                component="img"
                src={selectedImage.url}
                alt={selectedImage.prompt}
                sx={{
                  width: "100%",
                  maxHeight: "80vh",
                  objectFit: "contain",
                  borderRadius: 2,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                  p: 3,
                  borderRadius: "0 0 8px 8px",
                }}
              >
                <Typography
                  variant="body1"
                  color="white"
                  fontWeight={500}
                  mb={2}
                >
                  {selectedImage.prompt}
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    startIcon={<Download />}
                    sx={{ textTransform: "none" }}
                  >
                    Download
                  </Button>
                </Stack>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default UserGenerateVideos;
