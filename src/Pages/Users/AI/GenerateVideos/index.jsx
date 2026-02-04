/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Stack,
  Chip,
} from "@mui/material";
import {
  VideoLibrary,
} from "@mui/icons-material";
import { EMOJI_ICONS } from "../../../../Config/emojiIcons";
import { DashboardTab, CustomTab } from "../../../../Component";
import { videoTabs } from "../data";
import ImageToVideoInput from "./image-to-video";
import TextToVideoInput from "./text-to-video";
import { useFetchGeneratedVideos } from "../../../../Hooks/Users/generate_videos";
import GeneratingAnimation from "./GeneratingAnimation";
import SkeletonVideoCard from "./SkeletonVideoCard";
import GeneratedVideos from "./GeneratedVideos";
import VideoPreviewModal from "./VideoPreviewModal";

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
          <Grid item size={{ xs: 12, md: 12, lg: 12 }}>
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
          <Grid item xs={12} size={{ xs: 12, md: 12, lg: 12 }}>
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
                    label={`${generatedVideos.length} video${generatedVideos.length !== 1 ? "s" : ""
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
                    <GeneratedVideos generatedVideos={generatedVideos} handleVideoClick={handleVideoClick} handleDeleteVideo={handleDeleteVideo} />
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

      {/* VideoPreviewModal */}
      <VideoPreviewModal selectedVideo={selectedVideo} handleCloseModal={handleCloseModal} handleDeleteVideo={handleDeleteVideo} />
    </Box>
  );
};

export default UserGenerateVideos;
