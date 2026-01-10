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
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { useGenerateImage } from "../../../../Hooks/Dashboard/generate_images";
import { showToast } from "../../../../utils/toast";

const TextToImageInput = ({ onGeneratingChange }) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const generateImage = useGenerateImage();

  /* notify parent whenever generating changes */
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

      const response = await generateImage(payload);
      if (response) {
        setPrompt("");
      }
    } catch (error) {
      showToast.error(error || "Failed to create category");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Box sx={{ mx: "auto", mb: 6 }}>
      <Card elevation={0} sx={{ border: "1px solid #e0e0e0", borderRadius: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            color="text.secondary"
            mb={2}
          >
            Describe your ideas and images for reference
          </Typography>

          <Box sx={{ position: "relative" }}>
            <TextField
              fullWidth
              multiline
              rows={5}
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
    </Box>
  );
};

export default TextToImageInput;
