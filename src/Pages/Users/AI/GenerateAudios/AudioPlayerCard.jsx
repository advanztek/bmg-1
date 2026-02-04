// AudioPlayerCard.jsx (Updated)
import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    IconButton,
    Card,
    Stack,
    Chip,
    LinearProgress,
} from "@mui/material";
import {
    MusicNote,
    Delete,
    Download,
    PlayArrow,
    Pause,
} from "@mui/icons-material";
import { formatDistanceToNow } from "date-fns";
import { STORAGE_URL } from "../../../../Config/paths";

const AudioPlayerCard = ({ audio, onDelete }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    // Construct the full audio URL
    const audioUrl = audio.audio
        ? `${STORAGE_URL || ""}/${audio.audio}`
        : null;

    const [audioElement] = useState(audioUrl ? new Audio(audioUrl) : null);

    useEffect(() => {
        if (!audioElement) return;

        const handleEnded = () => setIsPlaying(false);
        const handleTimeUpdate = () => {
            if (audioElement.duration) {
                setProgress((audioElement.currentTime / audioElement.duration) * 100);
            }
        };

        audioElement.addEventListener("ended", handleEnded);
        audioElement.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
            audioElement.pause();
            audioElement.removeEventListener("ended", handleEnded);
            audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, [audioElement]);

    const togglePlay = () => {
        if (!audioElement) return;

        if (isPlaying) {
            audioElement.pause();
        } else {
            audioElement.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleDownload = () => {
        if (!audioUrl) return;

        const link = document.createElement("a");
        link.href = audioUrl;
        link.download = `audio-${audio.id}.mp3`;
        link.click();
    };

    const inputText = audio.metadata?.input_text || "Generated Audio";
    const voice = audio.metadata?.voice || "default";
    const duration = audio.metadata?.estimated_duration
        ? `${audio.metadata.estimated_duration}s`
        : null;
    const createdAt = audio.created_at
        ? formatDistanceToNow(new Date(audio.created_at), { addSuffix: true })
        : "Recently";

    const displayText = inputText.length > 80
        ? `${inputText.substring(0, 80)}...`
        : inputText;

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                transition: "all 0.3s",
                "&:hover": {
                    boxShadow: 4,
                    transform: "translateY(-2px)",
                },
            }}
        >
            <Box sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    {/* Play Button */}
                    <IconButton
                        onClick={togglePlay}
                        disabled={!audioElement}
                        sx={{
                            width: 56,
                            height: 56,
                            bgcolor: "primary.main",
                            color: "white",
                            "&:hover": {
                                bgcolor: "primary.dark",
                            },
                            "&:disabled": {
                                bgcolor: "grey.300",
                                color: "grey.500",
                            },
                        }}
                    >
                        {isPlaying ? <Pause /> : <PlayArrow />}
                    </IconButton>

                    {/* Audio Info */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                            variant="body1"
                            fontWeight={600}
                            noWrap
                            sx={{ mb: 0.5 }}
                        >
                            {displayText}
                        </Typography>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block", mb: 0.5 }}
                        >
                            {createdAt}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                            {duration && (
                                <Chip
                                    label={duration}
                                    size="small"
                                    icon={<MusicNote />}
                                    variant="outlined"
                                />
                            )}
                            <Chip
                                label={voice}
                                size="small"
                                variant="outlined"
                                color="primary"
                            />
                            <Chip
                                label={audio.model_used || "AI"}
                                size="small"
                                variant="outlined"
                            />
                        </Stack>
                    </Box>

                    {/* Action Buttons */}
                    <Stack direction="row" spacing={1}>
                        <IconButton
                            size="small"
                            onClick={handleDownload}
                            disabled={!audioUrl}
                            sx={{
                                bgcolor: "success.light",
                                color: "success.dark",
                                "&:hover": {
                                    bgcolor: "success.main",
                                    color: "white",
                                },
                                "&:disabled": {
                                    bgcolor: "grey.200",
                                    color: "grey.400",
                                },
                            }}
                        >
                            <Download fontSize="small" />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={() => onDelete(audio.id)}
                            sx={{
                                bgcolor: "error.light",
                                color: "error.dark",
                                "&:hover": {
                                    bgcolor: "error.main",
                                    color: "white",
                                },
                            }}
                        >
                            <Delete fontSize="small" />
                        </IconButton>
                    </Stack>
                </Stack>

                {/* Progress Bar */}
                {isPlaying && (
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                            mt: 2,
                            height: 4,
                            borderRadius: 2,
                            bgcolor: "primary.light",
                            "& .MuiLinearProgress-bar": {
                                borderRadius: 2,
                            },
                        }}
                    />
                )}
            </Box>
        </Card>
    );
};

export default AudioPlayerCard;