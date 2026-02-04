/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import {
    Box,
    Button,
    Typography,
    IconButton,
    Dialog,
    DialogContent,
    Stack,
    Tooltip,
    Fade,
    Zoom,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Chip,
    Snackbar,
    Alert,
    CircularProgress,
    LinearProgress,
} from "@mui/material";
import {
    Delete,
    Download,
    Close,
    Share,
    ContentCopy,
    Facebook,
    Twitter,
    LinkedIn,
    Pinterest,
    Check,
    Fullscreen,
    FullscreenExit,
    PlayArrow,
    Pause,
    VolumeUp,
    VolumeOff,
} from "@mui/icons-material";
import { BASE_IMAGE_URL, BASE_SERVER_URL } from "../../../../Config/paths";
import axios from "axios";
import { useUserContext } from "../../../../Contexts";

const VideoPreviewModal = ({ selectedVideo, handleCloseModal, handleDeleteVideo }) => {
    const { config } = useUserContext();
    const videoRef = useRef(null);

    const [shareMenuAnchor, setShareMenuAnchor] = useState(null);
    const [copied, setCopied] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const [downloading, setDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);

    const videoUrl = selectedVideo
        ? `${BASE_IMAGE_URL}/${selectedVideo.video}`
        : "";

    const fullVideoUrl = selectedVideo
        ? `${BASE_IMAGE_URL}/${selectedVideo.video}`
        : "";

    const handleShareClick = (event) => {
        setShareMenuAnchor(event.currentTarget);
    };

    const handleShareClose = () => {
        setShareMenuAnchor(null);
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(fullVideoUrl);
            setCopied(true);
            setSnackbar({
                open: true,
                message: "Link copied to clipboard!",
                severity: "success"
            });
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            setSnackbar({
                open: true,
                message: "Failed to copy link",
                severity: "error"
            });
        }
        handleShareClose();
    };

    const handleSocialShare = (platform) => {
        const text = selectedVideo?.prompt || "Check out this AI-generated video!";
        const url = fullVideoUrl;

        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`,
        };

        if (shareUrls[platform]) {
            window.open(shareUrls[platform], "_blank", "width=600,height=400");
        }

        handleShareClose();
        setSnackbar({
            open: true,
            message: `Sharing to ${platform}...`,
            severity: "info"
        });
    };

    const handleDownload = async () => {
        try {
            setDownloading(true);
            setDownloadProgress(0);

            setSnackbar({
                open: true,
                message: "Starting download...",
                severity: "info"
            });

            const response = await axios.get(
                `${BASE_SERVER_URL}/ai/download-video`,
                {
                    params: {
                        url: videoUrl // Pass the video URL
                    },
                    ...config,
                    responseType: 'blob',
                    onDownloadProgress: (progressEvent) => {
                        if (progressEvent.total) {
                            const percentCompleted = Math.round(
                                (progressEvent.loaded * 100) / progressEvent.total
                            );
                            setDownloadProgress(percentCompleted);

                            setSnackbar({
                                open: true,
                                message: `Downloading... ${percentCompleted}%`,
                                severity: "info"
                            });
                        }
                    }
                }
            );

            const blob = response.data;
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `ai-generated-video-${selectedVideo.id}-${Date.now()}.mp4`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            setSnackbar({
                open: true,
                message: "Video downloaded successfully!",
                severity: "success"
            });
        } catch (err) {
            console.error('Download error:', err);

            const errorMessage = err.response?.data?.message || "Failed to download video";

            setSnackbar({
                open: true,
                message: errorMessage,
                severity: "error"
            });
        } finally {
            setDownloading(false);
            setDownloadProgress(0);
        }
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                const response = await fetch(videoUrl);
                const blob = await response.blob();
                const file = new File([blob], `video-${selectedVideo.id}.mp4`, { type: "video/mp4" });

                await navigator.share({
                    title: "AI Generated Video",
                    text: selectedVideo?.prompt || "Check out this video!",
                    files: [file],
                });

                setSnackbar({
                    open: true,
                    message: "Shared successfully!",
                    severity: "success"
                });
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error("Share failed:", err);
                }
            }
        }
        handleShareClose();
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const handleFullscreenClose = () => {
        setIsFullscreen(false);
    };

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <>
            <Dialog
                open={Boolean(selectedVideo)}
                onClose={handleCloseModal}
                maxWidth="lg"
                fullWidth
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 400 }}
                PaperProps={{
                    sx: {
                        bgcolor: "transparent",
                        boxShadow: "none",
                        overflow: "visible",
                    },
                }}
                sx={{
                    "& .MuiBackdrop-root": {
                        bgcolor: "rgba(0, 0, 0, 0.95)",
                        backdropFilter: "blur(20px)",
                    },
                }}
            >
                <DialogContent sx={{ p: 0, position: "relative" }}>
                    {/* Close Button */}
                    <Tooltip title="Close" placement="left">
                        <IconButton
                            onClick={handleCloseModal}
                            sx={{
                                position: "absolute",
                                top: { xs: 8, sm: 16 },
                                right: { xs: 8, sm: 16 },
                                bgcolor: "rgba(0, 0, 0, 0.6)",
                                backdropFilter: "blur(10px)",
                                color: "white",
                                zIndex: 10,
                                "&:hover": {
                                    bgcolor: "rgba(0, 0, 0, 0.8)",
                                    transform: "scale(1.1)",
                                },
                            }}
                        >
                            <Close />
                        </IconButton>
                    </Tooltip>

                    {/* Fullscreen Button */}
                    <Tooltip title="View Fullscreen" placement="left">
                        <IconButton
                            onClick={toggleFullscreen}
                            sx={{
                                position: "absolute",
                                top: { xs: 8, sm: 16 },
                                right: { xs: 56, sm: 64 },
                                bgcolor: "rgba(0, 0, 0, 0.6)",
                                backdropFilter: "blur(10px)",
                                color: "white",
                                zIndex: 10,
                                "&:hover": {
                                    bgcolor: "rgba(0, 0, 0, 0.8)",
                                    transform: "scale(1.1)",
                                },
                            }}
                        >
                            <Fullscreen />
                        </IconButton>
                    </Tooltip>

                    {selectedVideo && (
                        <Zoom in={Boolean(selectedVideo)} timeout={300}>
                            <Box sx={{ position: "relative" }}>
                                {/* Main Video */}
                                <Box
                                    component="video"
                                    ref={videoRef}
                                    src={videoUrl}
                                    autoPlay
                                    controls
                                    sx={{
                                        width: "100%",
                                        maxHeight: "75vh",
                                        objectFit: "contain",
                                        borderRadius: 3,
                                        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                                    }}
                                />

                                {/* Gradient Overlay with Content */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        background:
                                            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)",
                                        p: { xs: 2, sm: 3, md: 4 },
                                        borderRadius: "0 0 24px 24px",
                                    }}
                                >
                                    {/* Prompt Text */}
                                    <Typography
                                        variant="h6"
                                        color="white"
                                        fontWeight={600}
                                        mb={2}
                                        sx={{
                                            fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.25rem" },
                                            lineHeight: 1.5,
                                            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                                            letterSpacing: "0.01em",
                                        }}
                                    >
                                        {selectedVideo.prompt || "Generated Video"}
                                    </Typography>

                                    {/* Metadata Chips */}
                                    {selectedVideo.created_at && (
                                        <Box mb={2}>
                                            <Chip
                                                label={new Date(selectedVideo.created_at).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                                size="small"
                                                sx={{
                                                    bgcolor: "rgba(255, 255, 255, 0.15)",
                                                    backdropFilter: "blur(10px)",
                                                    color: "white",
                                                    fontWeight: 500,
                                                    border: "1px solid rgba(255, 255, 255, 0.2)",
                                                }}
                                            />
                                        </Box>
                                    )}

                                    {/* Action Buttons */}
                                    <Stack
                                        direction={{ xs: "column", sm: "row" }}
                                        spacing={2}
                                        sx={{
                                            "& .MuiButton-root": {
                                                borderRadius: 2,
                                                textTransform: "none",
                                                fontWeight: 600,
                                                fontSize: { xs: "0.875rem", sm: "1rem" },
                                                py: { xs: 1, sm: 1.2 },
                                                backdropFilter: "blur(10px)",
                                                transition: "all 0.3s ease",
                                            }
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            startIcon={downloading ? <CircularProgress size={20} color="inherit" /> : <Download />}
                                            onClick={handleDownload}
                                            disabled={downloading}
                                            sx={{
                                                bgcolor: "white",
                                                color: "black",
                                                position: "relative",
                                                overflow: "hidden",
                                                "&:hover": {
                                                    bgcolor: "rgba(255, 255, 255, 0.9)",
                                                    transform: downloading ? "none" : "translateY(-2px)",
                                                    boxShadow: "0 8px 20px rgba(255,255,255,0.3)",
                                                },
                                                "&.Mui-disabled": {
                                                    bgcolor: "rgba(255, 255, 255, 0.7)",
                                                    color: "rgba(0, 0, 0, 0.7)",
                                                }
                                            }}
                                        >
                                            {downloading ? `Downloading ${downloadProgress}%` : "Download"}
                                            {downloading && (
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={downloadProgress}
                                                    sx={{
                                                        position: "absolute",
                                                        bottom: 0,
                                                        left: 0,
                                                        right: 0,
                                                        height: 3,
                                                        bgcolor: "rgba(0, 0, 0, 0.1)",
                                                        "& .MuiLinearProgress-bar": {
                                                            bgcolor: "rgba(59, 130, 246, 0.8)",
                                                        }
                                                    }}
                                                />
                                            )}
                                        </Button>

                                        <Button
                                            variant="contained"
                                            startIcon={copied ? <Check /> : <Share />}
                                            onClick={handleShareClick}
                                            disabled={downloading}
                                            sx={{
                                                bgcolor: "rgba(59, 130, 246, 0.9)",
                                                color: "white",
                                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                                "&:hover": {
                                                    bgcolor: "rgba(59, 130, 246, 1)",
                                                    transform: "translateY(-2px)",
                                                    boxShadow: "0 8px 20px rgba(59, 130, 246, 0.4)",
                                                },
                                            }}
                                        >
                                            {copied ? "Copied!" : "Share"}
                                        </Button>

                                        <Button
                                            variant="outlined"
                                            startIcon={<Delete />}
                                            color="error"
                                            disabled={downloading}
                                            onClick={() => {
                                                handleDeleteVideo(selectedVideo.id);
                                                handleCloseModal();
                                            }}
                                            sx={{
                                                borderColor: "rgba(239, 68, 68, 0.5)",
                                                color: "rgba(248, 113, 113, 1)",
                                                bgcolor: "rgba(239, 68, 68, 0.1)",
                                                border: "1px solid rgba(239, 68, 68, 0.3)",
                                                "&:hover": {
                                                    borderColor: "rgba(239, 68, 68, 0.8)",
                                                    bgcolor: "rgba(239, 68, 68, 0.2)",
                                                    transform: "translateY(-2px)",
                                                    boxShadow: "0 8px 20px rgba(239, 68, 68, 0.3)",
                                                },
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </Stack>
                                </Box>
                            </Box>
                        </Zoom>
                    )}
                </DialogContent>
            </Dialog>

            {/* Fullscreen Dialog */}
            <Dialog
                open={isFullscreen}
                onClose={handleFullscreenClose}
                maxWidth={false}
                fullScreen
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 400 }}
                PaperProps={{
                    sx: {
                        bgcolor: "black",
                        boxShadow: "none",
                    },
                }}
            >
                <DialogContent
                    sx={{
                        p: 0,
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                    }}
                >
                    {/* Exit Fullscreen Button */}
                    <Tooltip title="Exit Fullscreen" placement="left">
                        <IconButton
                            onClick={handleFullscreenClose}
                            sx={{
                                position: "absolute",
                                top: 16,
                                right: 16,
                                bgcolor: "rgba(0, 0, 0, 0.6)",
                                backdropFilter: "blur(10px)",
                                color: "white",
                                zIndex: 10,
                                "&:hover": {
                                    bgcolor: "rgba(0, 0, 0, 0.8)",
                                    transform: "scale(1.1)",
                                },
                            }}
                        >
                            <FullscreenExit />
                        </IconButton>
                    </Tooltip>

                    {/* Fullscreen Video */}
                    {selectedVideo && (
                        <Box
                            component="video"
                            src={videoUrl}
                            controls
                            autoPlay
                            sx={{
                                maxWidth: "100%",
                                maxHeight: "100vh",
                                objectFit: "contain",
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {/* Share Menu */}
            <Menu
                anchorEl={shareMenuAnchor}
                open={Boolean(shareMenuAnchor)}
                onClose={handleShareClose}
                TransitionComponent={Fade}
                PaperProps={{
                    sx: {
                        bgcolor: "rgba(30, 30, 30, 0.95)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: 2,
                        minWidth: 200,
                        "& .MuiMenuItem-root": {
                            color: "white",
                            py: 1.5,
                            "&:hover": {
                                bgcolor: "rgba(255, 255, 255, 0.1)",
                            },
                        },
                    },
                }}
            >
                <MenuItem onClick={handleCopyLink}>
                    <ListItemIcon>
                        <ContentCopy fontSize="small" sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText>Copy Link</ListItemText>
                </MenuItem>

                {navigator.share && (
                    <MenuItem onClick={handleNativeShare}>
                        <ListItemIcon>
                            <Share fontSize="small" sx={{ color: "white" }} />
                        </ListItemIcon>
                        <ListItemText>Share via...</ListItemText>
                    </MenuItem>
                )}

                <MenuItem onClick={() => handleSocialShare("twitter")}>
                    <ListItemIcon>
                        <Twitter fontSize="small" sx={{ color: "#1DA1F2" }} />
                    </ListItemIcon>
                    <ListItemText>Share on X</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => handleSocialShare("facebook")}>
                    <ListItemIcon>
                        <Facebook fontSize="small" sx={{ color: "#1877F2" }} />
                    </ListItemIcon>
                    <ListItemText>Share on Facebook</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => handleSocialShare("linkedin")}>
                    <ListItemIcon>
                        <LinkedIn fontSize="small" sx={{ color: "#0A66C2" }} />
                    </ListItemIcon>
                    <ListItemText>Share on LinkedIn</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => handleSocialShare("pinterest")}>
                    <ListItemIcon>
                        <Pinterest fontSize="small" sx={{ color: "#E60023" }} />
                    </ListItemIcon>
                    <ListItemText>Pin to Pinterest</ListItemText>
                </MenuItem>
            </Menu>

            {/* Snackbar for Notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={snackbar.severity === "info" && downloading ? null : 3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{
                        backdropFilter: "blur(10px)",
                        fontWeight: 600,
                        minWidth: 250,
                    }}
                >
                    <Box>
                        {snackbar.message}
                        {downloading && snackbar.severity === "info" && (
                            <LinearProgress
                                variant="determinate"
                                value={downloadProgress}
                                sx={{
                                    mt: 1,
                                    height: 4,
                                    borderRadius: 2,
                                    bgcolor: "rgba(255, 255, 255, 0.3)",
                                    "& .MuiLinearProgress-bar": {
                                        bgcolor: "white",
                                    }
                                }}
                            />
                        )}
                    </Box>
                </Alert>
            </Snackbar>
        </>
    );
};

export default VideoPreviewModal;