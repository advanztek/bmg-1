import React, { useState } from "react";
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
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { quality, result, timeframe } from "../data";
import { CustomButton } from "../../../../Component";

const ImageToVideoInput = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [duration, setDuration] = useState("");
  const [resolution, setResolution] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);

    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
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
              placeholder="Prompt is required"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  pr: 2,
                  pb: 7,
                },
              }}
            />
          </Box>

          <Box
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              p: 2,
              bgcolor: "white",
              mt: 2,
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Settings
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <FormControl fullWidth>
                <Select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  disableUnderline
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    <InputLabel text="Select Service Discount Type" />
                  </MenuItem>

                  {timeframe.map((duration, index) => (
                    <MenuItem key={index} value={duration.id}>
                      {duration.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <Select
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  disableUnderline
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    <InputLabel text="Select Service Discount Type" />
                  </MenuItem>

                  {quality.map((res, index) => (
                    <MenuItem key={index} value={res.id}>
                      {res.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <Select
                  value={output}
                  onChange={(e) => setOutput(e.target.value)}
                  disableUnderline
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    <InputLabel text="Select Service Discount Type" />
                  </MenuItem>

                  {result.map((res, index) => (
                    <MenuItem key={index} value={res.id}>
                      {res.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <CustomButton
              fullWidth
              title={isGenerating ? "Generating..." : "Generate"}
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
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ImageToVideoInput;
