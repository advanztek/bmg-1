// TranscriptionCard.jsx
import React, { useState } from "react";
import {
    Box,
    Typography,
    IconButton,
    Card,
    Stack,
    Chip,
    Collapse,
} from "@mui/material";
import {
    Delete,
    ContentCopy,
    ExpandMore,
    ExpandLess,
    CheckCircle,
} from "@mui/icons-material";
import { formatDistanceToNow } from "date-fns";

const TranscriptionCard = ({ transcription, onDelete }) => {
    const [expanded, setExpanded] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(transcription.transcription?.text || "");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text:", err);
        }
    };

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const transcriptionText = transcription.transcription?.text || "";
    const previewText = transcriptionText.length > 100
        ? `${transcriptionText.substring(0, 100)}...`
        : transcriptionText;

    const modelName = transcription.model_used || "Unknown Model";
    const provider = transcription.provider || "Unknown";
    const createdAt = transcription.created_at
        ? formatDistanceToNow(new Date(transcription.created_at), { addSuffix: true })
        : "Recently";

    const tokensUsed = transcription.transcription?.usage?.total_tokens || 0;

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
                {/* Header */}
                <Stack direction="row" spacing={2} alignItems="flex-start" mb={2}>
                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            bgcolor: "primary.light",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 24,
                        }}
                    >
                        📝
                    </Box>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 0.5 }}
                        >
                            {createdAt}
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" gap={0.5}>
                            <Chip
                                label={provider}
                                size="small"
                                variant="outlined"
                                color="primary"
                            />
                            <Chip
                                label={modelName}
                                size="small"
                                variant="outlined"
                            />
                            {tokensUsed > 0 && (
                                <Chip
                                    label={`${tokensUsed} tokens`}
                                    size="small"
                                    variant="outlined"
                                />
                            )}
                        </Stack>
                    </Box>

                    {/* Action Buttons */}
                    <Stack direction="row" spacing={1}>
                        <IconButton
                            size="small"
                            onClick={handleCopy}
                            sx={{
                                bgcolor: copied ? "success.light" : "info.light",
                                color: copied ? "success.dark" : "info.dark",
                                "&:hover": {
                                    bgcolor: copied ? "success.main" : "info.main",
                                    color: "white",
                                },
                            }}
                        >
                            {copied ? <CheckCircle fontSize="small" /> : <ContentCopy fontSize="small" />}
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={() => onDelete(transcription.id)}
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

                {/* Transcription Text */}
                <Box
                    sx={{
                        bgcolor: "grey.50",
                        borderRadius: 1,
                        p: 2,
                        mb: 1,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            lineHeight: 1.6,
                            color: "text.primary",
                        }}
                    >
                        {expanded ? transcriptionText : previewText}
                    </Typography>
                </Box>

                {/* Expand/Collapse Button */}
                {transcriptionText.length > 100 && (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <IconButton
                            size="small"
                            onClick={toggleExpand}
                            sx={{
                                color: "primary.main",
                                "&:hover": {
                                    bgcolor: "primary.light",
                                },
                            }}
                        >
                            {expanded ? (
                                <>
                                    <ExpandLess fontSize="small" />
                                    <Typography variant="caption" sx={{ ml: 0.5 }}>
                                        Show Less
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    <ExpandMore fontSize="small" />
                                    <Typography variant="caption" sx={{ ml: 0.5 }}>
                                        Show More
                                    </Typography>
                                </>
                            )}
                        </IconButton>
                    </Box>
                )}
            </Box>
        </Card>
    );
};

export default TranscriptionCard;