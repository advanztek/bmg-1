// ImageToVideoInput.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Select,
  MenuItem,
  Stack,
  CircularProgress,
  Divider,
  IconButton,
  Chip,
  Tabs,
  Tab,
  alpha,
} from "@mui/material";
import {
  Send,
  CloudUpload,
  Close,
  Link as LinkIcon,
  PlayArrow,
  Timer,
  HighQuality,
  AutoAwesome,
} from "@mui/icons-material";
import { quality, timeframe } from "../data";
import { CustomButton } from "../../../../Component";
import { useGenerateImageToVideo } from "../../../../Hooks/Users/generate_videos";
import { showToast } from "../../../../utils/toast";

const MOTION_SUGGESTIONS = [
  "Slow cinematic zoom in",
  "Gentle camera pan right",
  "Subtle wind and movement",
  "Dynamic action sequence",
  "Smooth rotate 360 degrees",
];

const ImageToVideoInput = ({ onGeneratingChange, onImageGenerated }) => {
  const [inputMode, setInputMode] = useState(0); // 0 = Upload, 1 = URL
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [duration, setDuration] = useState("");
  const [resolution, setResolution] = useState("");

  const generateVideo = useGenerateImageToVideo();

  useEffect(() => {
    onGeneratingChange?.(isGenerating);
  }, [isGenerating, onGeneratingChange]);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!imageUrl.trim() && !imageFile) {
      showToast.error("Please provide an image");
      return;
    }

    setIsGenerating(true);

    try {
      const formData = new FormData();

      if (imageFile) {
        formData.append("image", imageFile);
      } else {
        formData.append("imageUrl", imageUrl);
      }

      formData.append("prompt", prompt);
      formData.append("duration", duration);
      formData.append("resolution", resolution);

      console.log("PayLoad:", {
        imageFile,
        imageUrl,
        prompt,
        duration,
        resolution,
      });

      const response = await generateVideo(formData);
      if (response) {
        onImageGenerated?.(response);
        setPrompt("");
        setImageFile(null);
        setImageUrl("");
        setImagePreview(null);
        showToast.success("Video generation started!");
      }
    } catch (error) {
      showToast.error(error || "Failed to generate video");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        showToast.error("Please upload a valid image file");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        showToast.error("Image size should be less than 10MB");
        return;
      }

      setImageFile(file);
      setImageUrl("");

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlLoad = () => {
    if (imageUrl.trim()) {
      setImagePreview(imageUrl);
      setImageFile(null);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImageUrl("");
    setImagePreview(null);
  };

  const handleSuggestionClick = (suggestion) => {
    setPrompt(suggestion);
  };

  return (
    <Box maxWidth={800} mx="auto" mb={4}>
      <Card
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {/* Header with gradient */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            p: 3,
            color: "white",
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center" mb={1}>
            <Box
              sx={{
                p: 1.5,
                bgcolor: "rgba(255,255,255,0.2)",
                borderRadius: 2,
                backdropFilter: "blur(10px)",
              }}
            >
              <PlayArrow sx={{ fontSize: 28 }} />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                Image to Video Generator
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Transform static images into dynamic videos with AI
              </Typography>
            </Box>
          </Stack>
        </Box>

        <CardContent sx={{ p: 4 }}>
          {/* Image Input Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Source Image
            </Typography>

            {/* Tab Selector for Upload/URL */}
            <Tabs
              value={inputMode}
              onChange={(e, newValue) => {
                setInputMode(newValue);
                handleRemoveImage();
              }}
              sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}
            >
              <Tab
                icon={<CloudUpload />}
                iconPosition="start"
                label="Upload Image"
                sx={{ textTransform: "none", fontWeight: 600 }}
              />
              <Tab
                icon={<LinkIcon />}
                iconPosition="start"
                label="Image URL"
                sx={{ textTransform: "none", fontWeight: 600 }}
              />
            </Tabs>

            {/* Upload Mode */}
            {inputMode === 0 && (
              <Box>
                {!imagePreview ? (
                  <Box
                    sx={{
                      border: "2px dashed",
                      borderColor: "primary.light",
                      borderRadius: 2,
                      p: 4,
                      textAlign: "center",
                      bgcolor: alpha("#667eea", 0.03),
                      cursor: "pointer",
                      transition: "all 0.3s",
                      "&:hover": {
                        borderColor: "primary.main",
                        bgcolor: alpha("#667eea", 0.08),
                      },
                    }}
                    onClick={() =>
                      document.getElementById("video-image-upload").click()
                    }
                  >
                    <CloudUpload
                      sx={{
                        fontSize: 48,
                        color: "primary.main",
                        mb: 2,
                      }}
                    />
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Drop image here or click to browse
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      Supports JPG, PNG, WEBP (Max 10MB)
                    </Typography>
                    <Chip
                      label="Recommended: High quality, clear images"
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ mt: 1 }}
                    />
                    <input
                      id="video-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      position: "relative",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      component="img"
                      src={imagePreview}
                      alt="Preview"
                      sx={{
                        width: "100%",
                        maxHeight: 400,
                        objectFit: "contain",
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "divider",
                      }}
                    />
                    <IconButton
                      onClick={handleRemoveImage}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        bgcolor: "rgba(0,0,0,0.6)",
                        color: "white",
                        "&:hover": {
                          bgcolor: "rgba(0,0,0,0.8)",
                        },
                      }}
                    >
                      <Close />
                    </IconButton>
                    {imageFile && (
                      <Chip
                        label={imageFile.name}
                        size="small"
                        sx={{
                          position: "absolute",
                          bottom: 8,
                          left: 8,
                          bgcolor: "rgba(0,0,0,0.7)",
                          color: "white",
                        }}
                      />
                    )}
                  </Box>
                )}
              </Box>
            )}

            {/* URL Mode */}
            {inputMode === 1 && (
              <Box>
                <Stack direction="row" spacing={1}>
                  <TextField
                    fullWidth
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    InputProps={{
                      startAdornment: (
                        <LinkIcon sx={{ mr: 1, color: "primary.main" }} />
                      ),
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleUrlLoad();
                      }
                    }}
                  />
                  <CustomButton
                    title="Load"
                    onClick={handleUrlLoad}
                    disabled={!imageUrl.trim()}
                    sx={{ minWidth: 100 }}
                  />
                </Stack>

                {imagePreview && (
                  <Box
                    sx={{
                      mt: 2,
                      position: "relative",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      component="img"
                      src={imagePreview}
                      alt="Preview"
                      sx={{
                        width: "100%",
                        maxHeight: 400,
                        objectFit: "contain",
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "divider",
                      }}
                    />
                    <IconButton
                      onClick={handleRemoveImage}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        bgcolor: "rgba(0,0,0,0.6)",
                        color: "white",
                        "&:hover": {
                          bgcolor: "rgba(0,0,0,0.8)",
                        },
                      }}
                    >
                      <Close />
                    </IconButton>
                  </Box>
                )}
              </Box>
            )}
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Motion Description */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Motion & Style Description
            </Typography>

            <TextField
              fullWidth
              multiline
              minRows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe how the image should animate..."
              helperText="Example: Slow zoom in, cinematic lighting, subtle wind effect."
              size="small"
              sx={{ mb: 2 }}
            />

            {/* Motion Suggestions */}
            <Box sx={{ mt: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <AutoAwesome sx={{ fontSize: 16, color: "primary.main" }} />
                <Typography
                  variant="caption"
                  fontWeight={600}
                  color="text.secondary"
                >
                  Quick Suggestions
                </Typography>
              </Stack>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {MOTION_SUGGESTIONS.map((suggestion, index) => (
                  <Chip
                    key={index}
                    label={suggestion}
                    size="small"
                    onClick={() => handleSuggestionClick(suggestion)}
                    sx={{
                      cursor: "pointer",
                      border: "1px solid",
                      borderColor: "primary.light",
                      bgcolor: "background.paper",
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: "primary.main",
                        color: "white",
                        borderColor: "primary.main",
                        transform: "translateY(-2px)",
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Video Settings */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Video Settings
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Duration</InputLabel>
                <Select
                  value={duration}
                  label="Duration"
                  onChange={(e) => setDuration(e.target.value)}
                  startAdornment={
                    <Timer sx={{ mr: 1, color: "action.active" }} />
                  }
                >
                  {timeframe.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Quality</InputLabel>
                <Select
                  value={resolution}
                  label="Quality"
                  onChange={(e) => setResolution(e.target.value)}
                  startAdornment={
                    <HighQuality sx={{ mr: 1, color: "action.active" }} />
                  }
                >
                  {quality.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Box>

          {/* Generate Button */}
          <CustomButton
            fullWidth
            title={isGenerating ? "Generating Video..." : "Generate Video"}
            color="accent"
            variant="filled"
            onClick={handleGenerate}
            disabled={(!imageUrl.trim() && !imageFile) || isGenerating}
            endIcon={
              isGenerating ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <Send />
              )
            }
            sx={{
              mt: 2,
              textTransform: "none",
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: "1rem",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
              },
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ImageToVideoInput;
