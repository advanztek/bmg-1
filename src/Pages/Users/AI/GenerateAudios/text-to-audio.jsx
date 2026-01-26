import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Card,
  CardContent,
  Stack,
  CircularProgress,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  alpha,
} from "@mui/material";
import { Send, GraphicEq, Speed, Person } from "@mui/icons-material";
import { CustomButton } from "../../../../Component";
import { showToast } from "../../../../utils/toast";
import { useGenerateTextToAudio } from "../../../../Hooks/Users/generate_audio";

const VOICES = [
  { id: "alloy", name: "Alloy - Neutral" },
  { id: "echo", name: "Echo - Male" },
  { id: "fable", name: "Fable - British Male" },
  { id: "onyx", name: "Onyx - Deep Male" },
  { id: "nova", name: "Nova - Female" },
  { id: "shimmer", name: "Shimmer - Soft Female" },
];

const TextToAudioInput = ({ onGeneratingChange, onAudioGenerated }) => {
  const [input, setInput] = useState("");
  const [voice, setVoice] = useState("alloy");
  const [speed, setSpeed] = useState(1.0);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAudio = useGenerateTextToAudio();

  useEffect(() => {
    onGeneratingChange?.(isGenerating);
  }, [isGenerating, onGeneratingChange]);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!input.trim()) {
      showToast.error("Please enter some text");
      return;
    }

    setIsGenerating(true);

    try {
      const payload = {
        input,
        voice,
        speed,
      };

      console.log("Text-to-Audio Payload:", payload);

      const response = await generateAudio(payload);
      if (response) {
        // Notify parent component about the new image
        onAudioGenerated?.(response);
        setInput("");
        showToast.success("audio generated successfully!");
      }
    } catch (error) {
      showToast.error(error || "Failed to generate audio");
      setIsGenerating(false);
    } finally {
      setIsGenerating(false);
    }
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
              <GraphicEq sx={{ fontSize: 28 }} />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                Text to Audio Generator
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Convert your text into natural-sounding speech
              </Typography>
            </Box>
          </Stack>
        </Box>

        <CardContent sx={{ p: 4 }}>
          {/* Text Input */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Your Text 📝
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={5}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter the text you want to convert to speech..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
            <Stack direction="row" justifyContent="space-between" mt={1}>
              <Typography variant="caption" color="text.secondary">
                {input.length} characters
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Max 5000 characters
              </Typography>
            </Stack>
          </Box>

          {/* Voice Settings */}
          <Box
            sx={{
              p: 3,
              bgcolor: alpha("#667eea", 0.05),
              borderRadius: 2,
              mb: 3,
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Voice Settings 🎙️
            </Typography>

            <Stack spacing={3}>
              {/* Voice Selection */}
              <FormControl fullWidth>
                <InputLabel>Voice Type</InputLabel>
                <Select
                  value={voice}
                  label="Voice Type"
                  onChange={(e) => setVoice(e.target.value)}
                  startAdornment={
                    <Person sx={{ mr: 1, color: "action.active" }} />
                  }
                >
                  {VOICES.map((v) => (
                    <MenuItem key={v.id} value={v.id}>
                      {v.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Speed Control */}
              <Box>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Speed sx={{ fontSize: 20, color: "primary.main" }} />
                    <Typography variant="body2" fontWeight={600}>
                      Speech Speed
                    </Typography>
                  </Stack>
                  <Chip label={`${speed}x`} size="small" color="primary" />
                </Stack>
                <Slider
                  value={speed}
                  onChange={(e, newValue) => setSpeed(newValue)}
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  marks={[
                    { value: 0.5, label: "0.5x" },
                    { value: 1.0, label: "1.0x" },
                    { value: 2.0, label: "2.0x" },
                  ]}
                  valueLabelDisplay="auto"
                />
              </Box>
            </Stack>
          </Box>

          {/* Generate Button */}
          <CustomButton
            fullWidth
            title={isGenerating ? "Generating Audio..." : "Generate Audio"}
            color="accent"
            variant="filled"
            onClick={handleGenerate}
            disabled={!input.trim() || isGenerating}
            endIcon={
              isGenerating ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <Send />
              )
            }
            sx={{
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

export default TextToAudioInput;
