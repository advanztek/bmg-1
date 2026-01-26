/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
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
  Chip,
  Skeleton,
  keyframes,
} from "@mui/material";
import {
  VideoLibrary,
  Delete,
  Download,
  Close,
  ArrowForward,
  PlayCircleOutline,
} from "@mui/icons-material";
import { EMOJI_ICONS } from "../../../../Config/emojiIcons";
import { DashboardTab, CustomTab } from "../../../../Component";
import { videoTabs } from "../data";
import ImageToVideoInput from "./image-to-video";
import TextToVideoInput from "./text-to-video";
import { useFetchGeneratedVideos } from "../../../../Hooks/Users/generate_videos";
import { BASE_IMAGE_URL } from "../../../../Config/paths";

// Animation keyframes
const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
`;

const slideRight = keyframes`
  0% {
    transform: translateX(-20px);
    opacity: 0.5;
  }
  50% {
    transform: translateX(0px);
    opacity: 1;
  }
  100% {
    transform: translateX(20px);
    opacity: 0.5;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Beautiful Generating Animation Component
const GeneratingAnimation = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 450,
        p: 4,
      }}
    >
      {/* Animated Icons */}
      <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 4 }}>
        <Box
          sx={{
            animation: `${pulse} 1.5s ease-in-out infinite`,
            fontSize: 56,
          }}
        >
          🎬
        </Box>
        <ArrowForward
          sx={{
            fontSize: 48,
            color: "primary.main",
            animation: `${slideRight} 2s ease-in-out infinite`,
          }}
        />
        <Box
          sx={{
            animation: `${pulse} 1.5s ease-in-out infinite 0.3s`,
            fontSize: 56,
          }}
        >
          🎥
        </Box>
      </Stack>

      {/* Rotating Circle */}
      <Box
        sx={{
          position: "relative",
          width: 120,
          height: 120,
          mb: 3,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "4px solid",
            borderColor: "primary.light",
            borderTopColor: "primary.main",
            animation: `${rotate} 1s linear infinite`,
          }}
        />
        <PlayCircleOutline
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: 48,
            color: "primary.main",
            animation: `${pulse} 2s ease-in-out infinite`,
          }}
        />
      </Box>

      {/* Shimmer Box */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 450,
          height: 180,
          borderRadius: 3,
          background: `
            linear-gradient(
              90deg,
              #f0f0f0 0%,
              #e0e0e0 20%,
              #f0f0f0 40%,
              #e0e0e0 60%,
              #f0f0f0 80%,
              #e0e0e0 100%
            )
          `,
          backgroundSize: "1000px 100%",
          animation: `${shimmer} 2s linear infinite`,
          position: "relative",
          overflow: "hidden",
          border: "3px solid",
          borderColor: "primary.main",
          boxShadow: "0 8px 32px rgba(25, 118, 210, 0.2)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              linear-gradient(
                90deg,
                transparent 0%,
                rgba(25, 118, 210, 0.3) 50%,
                transparent 100%
              )
            `,
            backgroundSize: "1000px 100%",
            animation: `${shimmer} 2s linear infinite`,
          },
        }}
      />

      {/* Loading Text */}
      <Stack spacing={1} alignItems="center" sx={{ mt: 4 }}>
        <Typography variant="h5" fontWeight={700} color="primary">
          Generating Your Video...
        </Typography>
        <Typography variant="body1" color="text.secondary">
          AI is crafting your video. This may take a moment.
        </Typography>
      </Stack>

      {/* Progress Dots */}
      <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
        {[0, 1, 2, 3].map((i) => (
          <Box
            key={i}
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor: "primary.main",
              animation: `${pulse} 1.2s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

// Skeleton Loading Component
const SkeletonVideoCard = () => (
  <Card
    elevation={0}
    sx={{
      borderRadius: 2,
      border: "1px solid #e0e0e0",
      overflow: "hidden",
    }}
  >
    <Skeleton
      variant="rectangular"
      sx={{
        aspectRatio: "16/9",
        width: "100%",
      }}
      animation="wave"
    />
    <Box sx={{ p: 2 }}>
      <Skeleton variant="text" width="80%" height={24} animation="wave" />
      <Skeleton
        variant="text"
        width="60%"
        height={20}
        animation="wave"
        sx={{ mt: 1 }}
      />
    </Box>
  </Card>
);

const UserGenerateVideos = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [generatedVideos, setGeneratedVideos] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const { videos, loading: videosLoading, refetch } = useFetchGeneratedVideos();

  function updateActiveTab(tab) {
    setActiveTab(tab);
  }

  useEffect(() => {
    if (videos && videos.length > 0) {
      setGeneratedVideos(videos);
    }
  }, [videos]);

  const handleImageGenerated = async (newVideo) => {
    await refetch();
    if (newVideo) {
      setGeneratedVideos((prevVideos) => [newVideo, ...prevVideos]);
    }
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  const handleDeleteVideo = async (videoId) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      try {
        // await deleteGeneratedVideo(videoId);
        setGeneratedVideos((prevVideos) =>
          prevVideos.filter((vid) => vid.id !== videoId)
        );
        console.log("Delete video:", videoId);
      } catch (error) {
        console.error("Failed to delete video:", error);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
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
            Transform your ideas into captivating videos with BMG AI
          </Typography>
        </Box>

        <Grid container spacing={3} mt={5} sx={{ px: 3 }}>
          {/* Input Section */}
          <Grid item size={{ xs: 12, md: 6, lg: 5 }}>
            <CustomTab
              tabs={videoTabs}
              activeTab={activeTab}
              updateActiveTab={updateActiveTab}
            />

            <DashboardTab tabKey={0} activeTab={activeTab}>
              <TextToVideoInput
                onGeneratingChange={setIsGenerating}
                onImageGenerated={handleImageGenerated}
              />
            </DashboardTab>

            <DashboardTab tabKey={1} activeTab={activeTab}>
              <ImageToVideoInput
                onGeneratingChange={setIsGenerating}
                onImageGenerated={handleImageGenerated}
              />
            </DashboardTab>
          </Grid>

          {/* Library Section */}
          <Grid item xs={12} size={{ xs: 12, md: 6, lg: 7 }}>
            <Box
              sx={{
                maxWidth: 1400,
                mx: "auto",
                p: 3,
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                minHeight: 500,
                bgcolor: "background.paper",
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
                mb={3}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <VideoLibrary color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    {isGenerating ? "Generating..." : "Video Library"}
                  </Typography>
                </Stack>
                {!isGenerating && generatedVideos.length > 0 && (
                  <Chip
                    label={`${generatedVideos.length} video${
                      generatedVideos.length !== 1 ? "s" : ""
                    }`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                )}
              </Stack>

              {/* Generating Animation */}
              {isGenerating ? (
                <GeneratingAnimation />
              ) : videosLoading ? (
                // Skeleton Loading Grid
                <Grid container spacing={2}>
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Grid item size={{ xs: 12, md: 6, lg: 4 }} key={item}>
                      <SkeletonVideoCard />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                // Video Grid
                <Grid container spacing={2}>
                  {generatedVideos.length > 0 ? (
                    generatedVideos.map((video) => (
                      <Grid item size={{ xs: 12, md: 6, lg: 4 }} key={video.id}>
                        <Card
                          elevation={0}
                          onClick={() => handleVideoClick(video)}
                          sx={{
                            cursor: "pointer",
                            position: "relative",
                            overflow: "hidden",
                            borderRadius: 2,
                            border: "1px solid #e0e0e0",
                            transition: "all 0.3s",
                            "&:hover": {
                              transform: "translateY(-4px)",
                              boxShadow: 6,
                              "& .video-overlay": {
                                opacity: 1,
                              },
                              "& .card-media": {
                                transform: "scale(1.05)",
                              },
                            },
                          }}
                        >
                          {/* Video Thumbnail */}
                          <Box sx={{ position: "relative" }}>
                            <CardMedia
                              component="video"
                              image={`${BASE_IMAGE_URL}/${video.video}`}
                              className="card-media"
                              sx={{
                                aspectRatio: "16/9",
                                objectFit: "cover",
                                transition: "transform 0.3s",
                              }}
                            />

                            {/* Play Icon Overlay */}
                            <Box
                              sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                bgcolor: "rgba(0, 0, 0, 0.6)",
                                borderRadius: "50%",
                                p: 1,
                              }}
                            >
                              <PlayCircleOutline
                                sx={{ fontSize: 48, color: "white" }}
                              />
                            </Box>
                          </Box>

                          {/* Hover Overlay */}
                          <Box
                            className="video-overlay"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              right: 0,
                              background:
                                "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.5), transparent)",
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
                              {video.prompt || "Generated Video"}
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
                                  const link = document.createElement("a");
                                  link.href = `${BASE_IMAGE_URL}/${video.video}`;
                                  link.download = `video-${video.id}.mp4`;
                                  link.click();
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
                                  handleDeleteVideo(video.id);
                                }}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Stack>
                          </Box>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    // Empty State
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "60vh", // adjust as needed
                      }}
                    >
                      <Box textAlign="center">
                        <Box sx={{ fontSize: 80, mb: 3 }}>🎬</Box>

                        <Typography
                          variant="h5"
                          fontWeight={600}
                          color="text.secondary"
                          gutterBottom
                        >
                          No Videos Yet
                        </Typography>

                        <Typography
                          variant="body1"
                          color="text.secondary"
                          mb={3}
                        >
                          Start creating amazing AI-powered videos
                        </Typography>

                        <Chip
                          label="Try generating your first video"
                          color="primary"
                          sx={{ px: 2, py: 1, fontSize: "0.9rem" }}
                        />
                      </Box>
                    </Grid>
                  )}
                </Grid>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Video Preview Modal */}
      <Dialog
        open={Boolean(selectedVideo)}
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
            bgcolor: "rgba(0, 0, 0, 0.95)",
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

          {selectedVideo && (
            <Box sx={{ position: "relative" }}>
              <Box
                component="video"
                src={`${BASE_IMAGE_URL}/${selectedVideo.video}`}
                controls
                autoPlay
                sx={{
                  width: "100%",
                  maxHeight: "85vh",
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
                <Typography variant="h6" color="white" fontWeight={600} mb={2}>
                  {selectedVideo.prompt || "Generated Video"}
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    startIcon={<Download />}
                    sx={{ textTransform: "none" }}
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = `${BASE_IMAGE_URL}/${selectedVideo.video}`;
                      link.download = `video-${selectedVideo.id}.mp4`;
                      link.click();
                    }}
                  >
                    Download Video
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Delete />}
                    color="error"
                    sx={{
                      textTransform: "none",
                      borderColor: "rgba(255,255,255,0.3)",
                      color: "white",
                      "&:hover": {
                        borderColor: "error.main",
                        bgcolor: "rgba(211, 47, 47, 0.1)",
                      },
                    }}
                    onClick={() => {
                      handleDeleteVideo(selectedVideo.id);
                      handleCloseModal();
                    }}
                  >
                    Delete
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
