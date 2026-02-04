/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
    Box,
    Grid,
    Typography,
    IconButton,
    Card,
    CardMedia,
    Stack,
} from "@mui/material";
import {
    Delete,
    Download,
    PlayCircleOutline,
} from "@mui/icons-material";
import { BASE_IMAGE_URL } from "../../../../Config/paths";

const GeneratedVideos = ({ generatedVideos, handleVideoClick, handleDeleteVideo }) => {
    return (generatedVideos.map((video) => (
        <Grid item size={{ xs: 12, md: 4, lg: 4 }} key={video.id}>
            <Card
                elevation={0}
                onClick={() => handleVideoClick(video)}
                sx={{
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 2,
                    border: "1px solid #e0e0e0",
                    transition: "all 0.3s",
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 6,
                        "& .video-overlay": {
                            opacity: 1,
                        },
                        "& .card-media": {
                            transform: "scale(1.05)",
                        },
                    },
                }}
            >
                {/* Video Thumbnail */}
                <Box sx={{ position: "relative" }}>
                    <CardMedia
                        component="video"
                        image={`${BASE_IMAGE_URL}/${video.video}`}
                        className="card-media"
                        sx={{
                            aspectRatio: "16/9",
                            objectFit: "cover",
                            transition: "transform 0.3s",
                        }}
                    />

                    {/* Play Icon Overlay */}
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            bgcolor: "rgba(0, 0, 0, 0.6)",
                            borderRadius: "50%",
                            p: 1,
                        }}
                    >
                        <PlayCircleOutline
                            sx={{ fontSize: 48, color: "white" }}
                        />
                    </Box>
                </Box>

                {/* Hover Overlay */}
                <Box
                    className="video-overlay"
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background:
                            "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.5), transparent)",
                        p: 2,
                        opacity: 0,
                        transition: "opacity 0.3s",
                    }}
                >
                    <Typography
                        variant="body2"
                        color="white"
                        fontWeight={500}
                        sx={{
                            mb: 1,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }}
                    >
                        {video.prompt || "Generated Video"}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <IconButton
                            size="small"
                            sx={{
                                bgcolor: "rgba(255,255,255,0.2)",
                                color: "white",
                                backdropFilter: "blur(10px)",
                                "&:hover": {
                                    bgcolor: "rgba(255,255,255,0.3)",
                                },
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                const link = document.createElement("a");
                                link.href = `${BASE_IMAGE_URL}/${video.video}`;
                                link.download = `video-${video.id}.mp4`;
                                link.click();
                            }}
                        >
                            <Download fontSize="small" />
                        </IconButton>
                        <IconButton
                            size="small"
                            sx={{
                                bgcolor: "rgba(255,255,255,0.2)",
                                color: "white",
                                backdropFilter: "blur(10px)",
                                "&:hover": {
                                    bgcolor: "rgba(255,255,255,0.3)",
                                },
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteVideo(video.id);
                            }}
                        >
                            <Delete fontSize="small" />
                        </IconButton>
                    </Stack>
                </Box>
            </Card>
        </Grid>
    )))
}

export default GeneratedVideos
