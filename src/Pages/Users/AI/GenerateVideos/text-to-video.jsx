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
  Chip,
  Switch,
  FormControlLabel,
  alpha,
  Collapse,
} from "@mui/material";
import {
  Send,
  Videocam,
  AutoAwesome,
  Settings,
  Timer,
  HighQuality,
  SmartDisplay,
} from "@mui/icons-material";
import { CustomButton } from "../../../../Component";
import { useGenerateTextToVideo } from "../../../../Hooks/Users/generate_videos";
import { showToast } from "../../../../utils/toast";

// Configuration based on Joi schema
const PROVIDERS = {
  SORA: "sora",
  POLLO: "pollo",
};

const SORA_MODELS = [
  { id: "sora-2", name: "Sora 2 (Standard)" },
  { id: "sora-2-pro", name: "Sora 2 Pro (Enhanced)" },
];

const SORA_DURATIONS = [
  { id: "4", name: "4 seconds", label: "Quick" },
  { id: "8", name: "8 seconds", label: "Medium" },
  { id: "12", name: "12 seconds", label: "Long" },
];

const SORA_SIZES = [
  { id: "720x1280", name: "720×1280 (9:16 HD Portrait)", ratio: "9:16" },
  { id: "1280x720", name: "1280×720 (16:9 HD Landscape)", ratio: "16:9" },
];

const PROMPT_SUGGESTIONS = [
  "A cinematic drone shot of a modern city at sunset, ultra-realistic, smooth motion",
  "Ocean waves crashing on a rocky shore, slow motion, dramatic lighting",
  "Time-lapse of clouds moving over mountain peaks, golden hour",
  "Close-up of a blooming flower, macro photography, nature documentary style",
  "Neon-lit cyberpunk street at night, rain reflections, camera tracking shot",
];

const TextToVideoInput = ({ onGeneratingChange, onImageGenerated }) => {
  // Form state matching Joi schema defaults
  const [provider] = useState(PROVIDERS.SORA); // Currently only Sora for text-to-video
  const [prompt, setPrompt] = useState("");
  const [enhancePrompt, setEnhancePrompt] = useState(true);
  const [model, setModel] = useState("sora-2");
  const [seconds, setSeconds] = useState("4");
  const [size, setSize] = useState("1280x720");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // UI state
  const [isGenerating, setIsGenerating] = useState(false);

  const generateVideo = useGenerateTextToVideo();

  useEffect(() => {
    onGeneratingChange?.(isGenerating);
  }, [isGenerating, onGeneratingChange]);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) {
      showToast.error("Please enter a video description");
      return;
    }

    if (prompt.trim().length < 10) {
      showToast.error("Please provide a more detailed description (minimum 10 characters)");
      return;
    }

    setIsGenerating(true);

    try {
      const payload = {
        provider,
        prompt: prompt.trim(),
        enhance_prompt: enhancePrompt,
        model,
        seconds,
        size,
      };

      console.log("Video Generation Payload:", payload);

      const response = await generateVideo(payload);
      if (response) {
        onImageGenerated?.(response);
        setPrompt("");
        showToast.success("Video generation started successfully!");
      }
    } catch (error) {
      showToast.error(error?.message || "Failed to generate video");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setPrompt(suggestion);
  };

  const getSelectedAspectRatio = () => {
    const selected = SORA_SIZES.find((s) => s.id === size);
    return selected?.ratio || "";
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
              <Videocam sx={{ fontSize: 28 }} />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                Text to Video Generator
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Create stunning videos from text descriptions using AI
              </Typography>
            </Box>
          </Stack>
        </Box>

        <CardContent sx={{ p: 4 }}>
          {/* Video Description */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Video Description
            </Typography>

            <TextField
              fullWidth
              multiline
              minRows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your video in detail..."
              helperText={`${prompt.length}/10000 characters. Be specific about scene, motion, style, and mood.`}
              variant="outlined"
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

            {/* Prompt Suggestions */}
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <SmartDisplay sx={{ fontSize: 16, color: "primary.main" }} />
                <Typography
                  variant="caption"
                  fontWeight={600}
                  color="text.secondary"
                >
                  Example Prompts
                </Typography>
              </Stack>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {PROMPT_SUGGESTIONS.map((suggestion, index) => (
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

          {/* Basic Settings */}
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
                  value={seconds}
                  label="Duration"
                  onChange={(e) => setSeconds(e.target.value)}
                  startAdornment={
                    <Timer sx={{ mr: 1, color: "action.active" }} />
                  }
                >
                  {SORA_DURATIONS.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        width="100%"
                      >
                        <span>{item.name}</span>
                        <Chip label={item.label} size="small" />
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Resolution</InputLabel>
                <Select
                  value={size}
                  label="Resolution"
                  onChange={(e) => setSize(e.target.value)}
                  startAdornment={
                    <HighQuality sx={{ mr: 1, color: "action.active" }} />
                  }
                >
                  {SORA_SIZES.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        width="100%"
                        alignItems="center"
                      >
                        <span>{item.name}</span>
                        <Chip
                          label={item.ratio}
                          size="small"
                          variant="outlined"
                        />
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            {/* Advanced Settings */}
            <Collapse in={showAdvanced}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: alpha("#667eea", 0.05),
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

                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Model</InputLabel>
                  <Select
                    value={model}
                    label="Model"
                    onChange={(e) => setModel(e.target.value)}
                  >
                    {SORA_MODELS.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
            <Stack direction="row" spacing={2} flexWrap="wrap" mt={1}>
              <Chip
                label={`${model.toUpperCase()}`}
                size="small"
                color="primary"
                variant="outlined"
              />
              <Chip
                label={`${seconds}s`}
                size="small"
                icon={<Timer />}
              />
              <Chip
                label={getSelectedAspectRatio()}
                size="small"
                icon={<HighQuality />}
              />
              {enhancePrompt && (
                <Chip
                  label="AI Enhanced"
                  size="small"
                  icon={<AutoAwesome />}
                  color="success"
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
            disabled={!prompt.trim() || isGenerating}
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
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
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
            Video generation typically takes 2-5 minutes depending on settings
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TextToVideoInput;