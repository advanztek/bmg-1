// UserGenerateImages.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Stack,
  Chip,
} from "@mui/material";
import {
  Image as ImageIcon
} from "@mui/icons-material";
import { EMOJI_ICONS } from "../../../../Config/emojiIcons";
import { DashboardTab, CustomTab } from "../../../../Component";
import { imageTabs } from "../data";
import ImageToImageInput from "./image-to-image";
import TextToImageInput from "./text-to-image";
import { useFetchGeneratedImages } from "../../../../Hooks/Users/generate_images";
import GeneratingAnimation from "./GeneratingAnimation";
import GeneratedImages from "./GeneratedImages";
import BrandLoader from "../../../../Component/BrandLoader";
import ImagePreviewModal from "./ImagePreviewModal";

const UserGenerateImages = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);

  // Fetch generated images from API
  const { images, loading: imagesLoading, refetch } = useFetchGeneratedImages();

  // Update local state when images are fetched
  useEffect(() => {
    if (images && images.length > 0) {
      setGeneratedImages(images);
    }
  }, [images]);

  function updateActiveTab(tab) {
    setActiveTab(tab);
  }

  const handleImageGenerated = async (newImage) => {
    await refetch();

    // Or if the API returns the generated image, add it to the front
    if (newImage) {
      setGeneratedImages((prevImages) => [newImage, ...prevImages]);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleDeleteImage = async (imageId) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        // Call your delete API here
        // await deleteGeneratedImage(imageId);

        // Remove from local state
        setGeneratedImages((prevImages) =>
          prevImages.filter((img) => img.id !== imageId)
        );

        console.log("Delete image:", imageId);
      } catch (error) {
        console.error("Failed to delete image:", error);
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
              Image Generator
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Imagine and let BMG AI bring it to life
          </Typography>
        </Box>

        <Grid container spacing={3} mt={5}>
          <Grid item size={{ xs: 12, md: 6, lg: 5 }}>
            <CustomTab
              tabs={imageTabs}
              activeTab={activeTab}
              updateActiveTab={updateActiveTab}
            />

            <DashboardTab tabKey={0} activeTab={activeTab}>
              <TextToImageInput
                onGeneratingChange={setIsGenerating}
                onImageGenerated={handleImageGenerated}
              />
            </DashboardTab>

            <DashboardTab tabKey={1} activeTab={activeTab}>
              <ImageToImageInput
                onGeneratingChange={setIsGenerating}
                onImageGenerated={handleImageGenerated}
              />
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
                minHeight: 500,
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center" mb={3}>
                <ImageIcon color="action" />
                <Typography variant="h6" fontWeight={600}>
                  {isGenerating ? "Generating..." : "Library"}
                </Typography>
                {!isGenerating && generatedImages.length > 0 && (
                  <Chip
                    label={`${generatedImages.length} images`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                )}
              </Stack>

              {/* Show loading animation when generating */}
              {isGenerating ? (
                <GeneratingAnimation />
              ) : imagesLoading ? (
                <Box sx={{ textAlign: "center", py: 8 }}>
                  <BrandLoader />
                </Box>
              ) : (
                <Grid container spacing={2}>
                  {generatedImages.length > 0 ? (
                    <GeneratedImages generatedImages={generatedImages} handleImageClick={handleImageClick} handleDeleteImage={handleDeleteImage} />
                  ) : (
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          textAlign: "center",
                          py: 8,
                        }}
                      >
                        <Box sx={{ fontSize: 64, mb: 2 }}>🖼️</Box>
                        <Typography
                          variant="h6"
                          color="text.secondary"
                          gutterBottom
                        >
                          No images yet
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Start generating amazing images with AI
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* ImagePreviewModal */}
      <ImagePreviewModal selectedImage={selectedImage} handleCloseModal={handleCloseModal} handleDeleteImage={handleDeleteImage} />
    </Box>
  );
};

export default UserGenerateImages;
