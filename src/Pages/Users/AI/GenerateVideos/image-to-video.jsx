/* eslint-disable no-unused-vars */
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
  Switch,
  FormControlLabel,
  Collapse,
  Slider,
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
  Settings,
  VolumeUp,
  PhotoLibrary,
  SmartDisplay,
} from "@mui/icons-material";
import { CustomButton } from "../../../../Component";
import { useGenerateImageToVideo } from "../../../../Hooks/Users/generate_videos";
import { showToast } from "../../../../utils/toast";

// Configuration based on Joi schema for Pollo provider
const POLLO_LENGTHS = [
  { id: 1, name: "1 second", label: "Ultra Short" },
  { id: 2, name: "2 seconds", label: "Very Short" },
  { id: 3, name: "3 seconds", label: "Short" },
  { id: 4, name: "4 seconds", label: "Short" },
  { id: 5, name: "5 seconds", label: "Medium", recommended: true },
  { id: 6, name: "6 seconds", label: "Medium" },
  { id: 7, name: "7 seconds", label: "Long" },
  { id: 8, name: "8 seconds", label: "Long" },
  { id: 9, name: "9 seconds", label: "Very Long" },
  { id: 10, name: "10 seconds", label: "Ultra Long" },
];

const POLLO_RESOLUTIONS = [
  { id: "720p", name: "720p (HD)", description: "1280×720" },
];

const MOTION_SUGGESTIONS = [
  "Slow cinematic zoom in with subtle depth",
  "Gentle camera pan right, smooth transition",
  "Subtle wind and movement, natural atmosphere",
  "Dynamic action sequence with camera tracking",
  "Smooth 360-degree rotation, revealing environment",
  "Time-lapse effect with light changes",
];

const ImageToVideoInput = ({ onGeneratingChange, onImageGenerated }) => {
  // Image input state
  const [inputMode, setInputMode] = useState(0); // 0 = Upload, 1 = URL
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Form state matching Joi schema defaults for Pollo
  const [provider] = useState("pollo");
  const [prompt, setPrompt] = useState("");
  const [enhancePrompt, setEnhancePrompt] = useState(true);
  const [length, setLength] = useState(5); // Default 5 seconds
  const [resolution, setResolution] = useState("720p");
  const [generateAudio, setGenerateAudio] = useState(true);
  const [seed, setSeed] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // UI state
  const [isGenerating, setIsGenerating] = useState(false);

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

      // Add image
      if (imageFile) {
        formData.append("image", imageFile);
      } else if (imageUrl.trim()) {
        formData.append("image", imageUrl.trim());
      }

      // Add required fields
      formData.append("provider", provider);
      formData.append("prompt", prompt.trim() || "Animate this image with smooth, natural motion");
      formData.append("enhance_prompt", enhancePrompt);
      formData.append("length", length);
      formData.append("resolution", resolution);
      formData.append("generateAudio", generateAudio);

      // Add optional seed if provided
      if (seed && !isNaN(parseInt(seed))) {
        formData.append("seed", parseInt(seed));
      }

      console.log("Video Generation Payload:", {
        provider,
        hasImage: !!imageFile || !!imageUrl,
        prompt: prompt.trim() || "Animate this image with smooth, natural motion",
        enhancePrompt,
        length,
        resolution,
        generateAudio,
        seed: seed ? parseInt(seed) : undefined,
      });

      const response = await generateVideo(formData);
      if (response) {
        onImageGenerated?.(response);
        setPrompt("");
        setImageFile(null);
        setImageUrl("");
        setImagePreview(null);
        showToast.success("Video generation started successfully!");
      }
    } catch (error) {
      showToast.error(error?.message || "Failed to generate video");
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
      // Basic URL validation
      try {
        new URL(imageUrl.trim());
        setImagePreview(imageUrl.trim());
        setImageFile(null);
      } catch (error) {
        showToast.error("Please enter a valid URL");
      }
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

  const handleRandomSeed = () => {
    setSeed(Math.floor(Math.random() * 1000000).toString());
  };

  return (
    <Box mx="auto" mb={4}>
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
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
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
                Transform static images into dynamic videos with AI motion
              </Typography>
            </Box>
          </Stack>
        </Box>

        <CardContent sx={{ p: 4 }}>
          {/* Image Input Section */}
          <Box sx={{ mb: 4 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <PhotoLibrary sx={{ color: "primary.main" }} />
              <Typography variant="subtitle1" fontWeight={600}>
                Source Image
              </Typography>
              <Chip label="Required" size="small" color="error" />
            </Stack>

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
                      bgcolor: alpha("#f093fb", 0.03),
                      cursor: "pointer",
                      transition: "all 0.3s",
                      "&:hover": {
                        borderColor: "primary.main",
                        bgcolor: alpha("#f093fb", 0.08),
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
                      label="Recommended: High quality, clear images work best"
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
                    helperText="Enter a direct link to an image file"
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
                      onError={() => {
                        showToast.error("Failed to load image from URL");
                        setImagePreview(null);
                      }}
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
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <SmartDisplay sx={{ color: "primary.main" }} />
              <Typography variant="subtitle1" fontWeight={600}>
                Motion & Animation
              </Typography>
              <Chip label="Optional" size="small" variant="outlined" />
            </Stack>

            <TextField
              fullWidth
              multiline
              minRows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe how the image should animate (optional - AI will create natural motion if left empty)"
              helperText={`${prompt.length}/10000 characters. Example: "Slow zoom in with cinematic lighting"`}
              size="small"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            {/* AI Enhancement Toggle */}
            <FormControlLabel
              control={
                <Switch
                  checked={enhancePrompt}
                  onChange={(e) => setEnhancePrompt(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <AutoAwesome sx={{ fontSize: 18, color: "primary.main" }} />
                  <Typography variant="body2" fontWeight={500}>
                    AI Prompt Enhancement
                  </Typography>
                  <Chip
                    label="Recommended"
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ height: 20 }}
                  />
                </Stack>
              }
              sx={{ mb: 2 }}
            />

            {/* Motion Suggestions */}
            <Box>
              <Typography
                variant="caption"
                fontWeight={600}
                color="text.secondary"
                gutterBottom
              >
                Quick Motion Suggestions
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1} mt={1}>
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
                      maxWidth: "100%",
                      height: "auto",
                      minHeight: 32,
                      py: 0.5,
                      "& .MuiChip-label": {
                        whiteSpace: "normal",
                        textAlign: "left",
                      },
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
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                Video Settings
              </Typography>
              <Chip
                icon={<Settings />}
                label={showAdvanced ? "Hide Advanced" : "Show Advanced"}
                onClick={() => setShowAdvanced(!showAdvanced)}
                size="small"
                variant="outlined"
                clickable
              />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
              <FormControl fullWidth>
                <InputLabel>Duration</InputLabel>
                <Select
                  value={length}
                  label="Duration"
                  onChange={(e) => setLength(e.target.value)}
                  startAdornment={
                    <Timer sx={{ mr: 1, color: "action.active" }} />
                  }
                >
                  {POLLO_LENGTHS.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        width="100%"
                        alignItems="center"
                      >
                        <span>{item.name}</span>
                        <Stack direction="row" spacing={0.5}>
                          <Chip label={item.label} size="small" />
                          {item.recommended && (
                            <Chip
                              label="★"
                              size="small"
                              color="primary"
                            />
                          )}
                        </Stack>
                      </Stack>
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
                  {POLLO_RESOLUTIONS.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <span>{item.name}</span>
                        <Typography variant="caption" color="text.secondary">
                          ({item.description})
                        </Typography>
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            {/* Audio Toggle */}
            <FormControlLabel
              control={
                <Switch
                  checked={generateAudio}
                  onChange={(e) => setGenerateAudio(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <VolumeUp sx={{ fontSize: 18 }} />
                  <Typography variant="body2">
                    Generate Audio Track
                  </Typography>
                </Stack>
              }
            />

            {/* Advanced Settings */}
            <Collapse in={showAdvanced}>
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: alpha("#f093fb", 0.05),
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  gutterBottom
                  color="primary"
                >
                  Advanced Options
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                  >
                    <Typography variant="body2" fontWeight={500}>
                      Random Seed (Optional)
                    </Typography>
                    <CustomButton
                      title="Random"
                      size="small"
                      onClick={handleRandomSeed}
                      sx={{ minWidth: 80 }}
                    />
                  </Stack>
                  <TextField
                    fullWidth
                    size="small"
                    value={seed}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^\d+$/.test(value)) {
                        setSeed(value);
                      }
                    }}
                    placeholder="Enter integer or click Random"
                    helperText="Use same seed for reproducible results"
                    type="number"
                  />
                </Box>
              </Box>
            </Collapse>
          </Box>

          {/* Summary Info */}
          <Box
            sx={{
              p: 2,
              bgcolor: "background.default",
              borderRadius: 2,
              mb: 3,
            }}
          >
            <Typography variant="caption" color="text.secondary" gutterBottom>
              Generation Settings Summary
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
              <Chip
                label={`${length}s`}
                size="small"
                icon={<Timer />}
              />
              <Chip
                label={resolution}
                size="small"
                icon={<HighQuality />}
              />
              {generateAudio && (
                <Chip
                  label="Audio Enabled"
                  size="small"
                  icon={<VolumeUp />}
                  color="info"
                  variant="outlined"
                />
              )}
              {enhancePrompt && (
                <Chip
                  label="AI Enhanced"
                  size="small"
                  icon={<AutoAwesome />}
                  color="success"
                  variant="outlined"
                />
              )}
              {seed && (
                <Chip
                  label={`Seed: ${seed}`}
                  size="small"
                  variant="outlined"
                />
              )}
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
              textTransform: "none",
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: "1rem",
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #e082ea 0%, #e4465b 100%)",
              },
              "&:disabled": {
                background: "rgba(0, 0, 0, 0.12)",
                color: "rgba(0, 0, 0, 0.26)",
              },
            }}
          />

          {/* Helper Info */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 2, display: "block", textAlign: "center" }}
          >
            Video generation typically takes 1-3 minutes depending on settings
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ImageToVideoInput;