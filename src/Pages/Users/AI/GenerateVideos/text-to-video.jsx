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
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { quality, timeframe } from "../data";
import { CustomButton } from "../../../../Component";
import { useGenerateTextToVideo } from "../../../../Hooks/Users/generate_videos";
import { showToast } from "../../../../utils/toast";

const TextToVideoInput = ({ onGeneratingChange, onImageGenerated }) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [duration, setDuration] = useState("");
  const [resolution, setResolution] = useState("");

  const generateVideo = useGenerateTextToVideo();

    useEffect(() => {
      onGeneratingChange?.(isGenerating);
    }, [isGenerating, onGeneratingChange]);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) return;
    setIsGenerating(true);

    try {
      const payload = {
        prompt,
      };
      console.log("PayLoad:", payload);

      const response = await generateVideo(payload);
      if (response) {
        // Notify parent component about the new image
        onImageGenerated?.(response);
        setPrompt("");
        showToast.success("Image generated successfully!");
      }
    } catch (error) {
      showToast.error(error || "Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Box maxWidth={720} mx="auto" mb={6}>
      <Card
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Stack spacing={1} mb={3}>
            <Typography variant="h6" fontWeight={700}>
              Text to Video
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Describe your idea and let AI turn it into a video.
            </Typography>
          </Stack>

          {/* Prompt */}
          <TextField
            fullWidth
            multiline
            minRows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: A cinematic drone shot of a modern city at sunset, ultra-realistic, smooth motion..."
            label="Video prompt"
            helperText="Be descriptive. The more detail you provide, the better the result."
            variant="outlined"
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <Divider sx={{ my: 1 }} />

          {/* Settings */}
          <Stack spacing={2}>
            <Typography variant="subtitle1" fontWeight={600}>
              Settings
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Duration</InputLabel>
                <Select
                  value={duration}
                  label="Duration"
                  onChange={(e) => setDuration(e.target.value)}
                >
                  {timeframe.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Resolution</InputLabel>
                <Select
                  value={resolution}
                  label="Resolution"
                  onChange={(e) => setResolution(e.target.value)}
                >
                  {quality.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Stack>

          {/* Action */}
          <CustomButton
            fullWidth
            title={isGenerating ? "Generating video..." : "Generate video"}
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
              marginTop: 20,
              textTransform: "none",
              padding: "10px",
              borderRadius: 8,
              fontWeight: 600,
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default TextToVideoInput;
