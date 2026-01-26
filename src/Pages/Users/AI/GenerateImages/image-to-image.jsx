// ImageToImageInput.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
  CircularProgress,
  IconButton,
  Grid,
  Chip,
  Divider,
} from "@mui/material";
import {
  Send,
  CloudUpload,
  Close,
  Image as ImageIcon,
  AutoFixHigh,
  AutoAwesome,
} from "@mui/icons-material";
import { useGenerateImageToImage } from "../../../../Hooks/Users/generate_images";
import { showToast } from "../../../../utils/toast";

const SUGGESTED_PROMPTS = [
  "Convert this image background",
  "Make this image look like a Pixar-style 3D render",
  "Turn this into an anime illustration",
  "Apply a futuristic neon lighting effect",
  "Convert to a realistic oil painting",
  "Make this image look like a vintage photograph",
  "Apply a dark fantasy concept art style",
];

const ImageToImageInput = ({ onGeneratingChange }) => {
  const [prompt, setPrompt] = useState("");
  const [imageBase64, setImageBase64] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageMeta, setImageMeta] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateImage = useGenerateImageToImage();

  useEffect(() => {
    onGeneratingChange?.(isGenerating);
  }, [isGenerating, onGeneratingChange]);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast.error("Please upload a valid image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showToast.error("Image size must be less than 10MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result); // ✅ BASE64 PAYLOAD
      setImagePreview(reader.result);
      setImageMeta({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2),
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageBase64(null);
    setImagePreview(null);
    setImageMeta(null);
  };

  const handleSuggestionClick = (suggestion) => {
    setPrompt(suggestion);
  };

  const handleGenerate = async () => {
    if (!imageBase64) {
      showToast.error("Upload an image first");
      return;
    }

    if (!prompt.trim()) {
      showToast.error("Enter a transformation prompt");
      return;
    }

    setIsGenerating(true);

    try {
      const payload = {
        image: imageBase64,
        prompt,
      };

      const response = await generateImage(payload);

      if (response) {
        showToast.success("Image generated successfully");
        setPrompt("");
        handleRemoveImage();
      }
    } catch (error) {
      showToast.error(error || "Image generation failed");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Box maxWidth={900} mx="auto">
      <Grid container spacing={3}>
        {/* IMAGE UPLOAD */}
        <Grid item size={{ xs: 12 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography fontWeight={600} mb={2}>
                1. Upload Reference Image
              </Typography>

              {!imagePreview ? (
                <Box
                  onClick={() =>
                    document.getElementById("image-upload-input").click()
                  }
                  sx={{
                    border: "2px dashed",
                    borderColor: "divider",
                    borderRadius: 2,
                    p: 5,
                    textAlign: "center",
                    cursor: "pointer",
                    bgcolor: "grey.50",
                    "&:hover": { borderColor: "primary.main" },
                  }}
                >
                  <CloudUpload sx={{ fontSize: 50, color: "primary.main" }} />
                  <Typography fontWeight={600} mt={2}>
                    Click to upload an image
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    JPG, PNG, WEBP • Max 10MB
                  </Typography>

                  <input
                    id="image-upload-input"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageUpload}
                  />
                </Box>
              ) : (
                <Box sx={{ position: "relative" }}>
                  <Box
                    component="img"
                    src={imagePreview}
                    sx={{
                      width: "100%",
                      maxHeight: 280,
                      objectFit: "contain",
                      borderRadius: 2,
                      bgcolor: "grey.100",
                    }}
                  />

                  <IconButton
                    onClick={handleRemoveImage}
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      bgcolor: "rgba(0,0,0,0.6)",
                      color: "#fff",
                      "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                    }}
                  >
                    <Close />
                  </IconButton>

                  <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                    <ImageIcon fontSize="small" />
                    <Typography variant="body2">
                      {imageMeta?.name} ({imageMeta?.size} MB)
                    </Typography>
                  </Stack>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* PROMPT */}
        <Grid item size-={{ xs: 12 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography fontWeight={600} mb={2}>
                2. Describe the Transformation
              </Typography>

              <Box sx={{ position: "relative" }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your ideas and images for reference"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      pr: 2,
                      pb: 7,
                    },
                  }}
                />

                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                  }}
                >
                  <Button
                    variant="contained"
                    endIcon={
                      isGenerating ? (
                        <CircularProgress size={18} color="inherit" />
                      ) : (
                        <Send />
                      )
                    }
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isGenerating}
                    sx={{
                      textTransform: "none",
                      px: 4,
                      borderRadius: 1,
                      fontWeight: 600,
                    }}
                  >
                    {isGenerating ? "Generating..." : "Generate"}
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>

          {/* Prompt Suggestions - Outside the main card */}
          <Box sx={{ mt: 2 }}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mb: 1.5 }}
            >
              <AutoAwesome sx={{ fontSize: 18, color: "primary.main" }} />
              <Typography
                variant="caption"
                fontWeight={600}
                color="text.secondary"
              >
                Suggested Prompts
              </Typography>
            </Stack>

            <Stack direction="row" flexWrap="wrap" gap={1}>
              {SUGGESTED_PROMPTS.map((suggestion, index) => (
                <Chip
                  key={index}
                  label={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  size="small"
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
                      boxShadow: 2,
                    },
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ImageToImageInput;
