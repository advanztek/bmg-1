// UserGenerateAudio.jsx
import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Stack,
  Chip,
} from "@mui/material";
import {
  MusicNote,
  Subtitles,
} from "@mui/icons-material";
import { DashboardTab, CustomTab } from "../../../../Component";
import AudioToTextInput from "./audio-to-text";
import TextToAudioInput from "./text-to-audio";
import { audioTabs } from "../data";
import GeneratingAnimation from "./GeneratingAnimation";
import SkeletonAudioCard from "./SkeletonAudioCard";
import AudioPlayerCard from "./AudioPlayerCard";
import TranscriptionCard from "./TranscriptionCard";
import {
  useFetchGeneratedAudios,
  useFetchGeneratedTranscriptions
} from "../../../../Hooks/Users/generate_audio";

const UserGenerateAudio = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    data: generatedAudios,
    loading: isLoadingAudios,
    refetch: refetchAudios
  } = useFetchGeneratedAudios();

  const {
    data: generatedTranscriptions,
    loading: isLoadingTranscriptions,
    refetch: refetchTranscriptions
  } = useFetchGeneratedTranscriptions();

  const updateActiveTab = (tab) => {
    setActiveTab(tab);
  };

  const handleAudioGenerated = async () => {
    await refetchAudios();
  };

  const handleTranscriptionGenerated = async () => {
    await refetchTranscriptions();
  };

  const handleDeleteAudio = async (audioId) => {
    console.log("Deleting audio:", audioId);
    // Implement delete logic here
    await refetchAudios();
  };

  const handleDeleteTranscription = async (transcriptionId) => {
    console.log("Deleting transcription:", transcriptionId);
    // Implement delete logic here
    await refetchTranscriptions();
  };

  // Determine which data to display based on active tab
  const isTextToAudioTab = activeTab === 0;
  const currentData = isTextToAudioTab ? generatedAudios : generatedTranscriptions;
  const isCurrentLoading = isTextToAudioTab ? isLoadingAudios : isLoadingTranscriptions;
  const currentIcon = isTextToAudioTab ? MusicNote : Subtitles;
  const currentLabel = isTextToAudioTab ? "Audio Library" : "Transcriptions";
  const currentEmptyIcon = isTextToAudioTab ? "🎧" : "📝";
  const currentEmptyTitle = isTextToAudioTab ? "No Audio Yet" : "No Transcriptions Yet";
  const currentEmptyDescription = isTextToAudioTab
    ? "Start generating audio from text"
    : "Start transcribing audio files";
  const currentEmptyAction = isTextToAudioTab
    ? "Create your first audio"
    : "Create your first transcription";

  const CurrentIcon = currentIcon;

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
            <Box sx={{ fontSize: 32 }}>🎵</Box>
            <Typography variant="h4" fontWeight={700}>
              Audio Generator
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Generate speech from text or transcribe audio to text with AI
          </Typography>
        </Box>

        <Grid container spacing={3} mt={5} sx={{ px: 3 }}>
          <Grid item size={{ xs: 12, md: 12, lg: 12 }}>
            <CustomTab
              tabs={audioTabs}
              activeTab={activeTab}
              updateActiveTab={updateActiveTab}
            />

            <DashboardTab tabKey={0} activeTab={activeTab}>
              <TextToAudioInput
                onGeneratingChange={setIsGenerating}
                onAudioGenerated={handleAudioGenerated}
              />
            </DashboardTab>

            <DashboardTab tabKey={1} activeTab={activeTab}>
              <AudioToTextInput
                onGeneratingChange={setIsGenerating}
                onTextGenerated={handleTranscriptionGenerated}
              />
            </DashboardTab>
          </Grid>

          <Grid item size={{ xs: 12, md: 12, lg: 12 }}>
            <Box
              sx={{
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
                  <CurrentIcon color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    {isGenerating ? "Processing..." : currentLabel}
                  </Typography>
                </Stack>
                {!isGenerating && currentData.length > 0 && (
                  <Chip
                    label={`${currentData.length} ${isTextToAudioTab ? 'audio' : 'transcription'}${currentData.length !== 1 ? 's' : ''}`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                )}
              </Stack>

              {/* Generating Animation */}
              {isGenerating ? (
                <GeneratingAnimation />
              ) : isCurrentLoading ? (
                // Skeleton Loading
                <Stack spacing={2}>
                  {[1, 2, 3, 4].map((item) => (
                    <SkeletonAudioCard key={item} />
                  ))}
                </Stack>
              ) : (
                // Content List
                <Stack spacing={2}>
                  {currentData.length > 0 ? (
                    currentData.map((item) => (
                      isTextToAudioTab ? (
                        <AudioPlayerCard
                          key={item.id}
                          audio={item}
                          onDelete={handleDeleteAudio}
                        />
                      ) : (
                        <TranscriptionCard
                          key={item.id}
                          transcription={item}
                          onDelete={handleDeleteTranscription}
                        />
                      )
                    ))
                  ) : (
                    // Empty State
                    <Box
                      sx={{
                        textAlign: "center",
                        py: 10,
                      }}
                    >
                      <Box sx={{ fontSize: 80, mb: 3 }}>{currentEmptyIcon}</Box>
                      <Typography
                        variant="h5"
                        fontWeight={600}
                        color="text.secondary"
                        gutterBottom
                      >
                        {currentEmptyTitle}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" mb={3}>
                        {currentEmptyDescription}
                      </Typography>
                      <Chip
                        label={currentEmptyAction}
                        color="primary"
                        sx={{ px: 2, py: 1, fontSize: "0.9rem" }}
                      />
                    </Box>
                  )}
                </Stack>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserGenerateAudio;