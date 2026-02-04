// UserGenerateImages.jsx
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
} from "@mui/icons-material";
import { BASE_IMAGE_URL } from "../../../../Config/paths";


const GeneratedImages = ({ generatedImages, handleImageClick, handleDeleteImage }) => {
    return (generatedImages.map((image) => (
        <Grid item size={{ xs: 12, md: 4 }} key={image.id}>
            <Card
                elevation={0}
                onClick={() => handleImageClick(image)}
                sx={{
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 1,
                    border: "1px solid #e0e0e0",
                    transition: "all 0.3s",
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 6,
                        "& .image-overlay": {
                            opacity: 1,
                        },
                        "& .card-image": {
                            transform: "scale(1.1)",
                        },
                    },
                }}
            >
                <CardMedia
                    component="img"
                    image={`${BASE_IMAGE_URL}/${image.image}`}
                    alt={image.prompt}
                    className="card-image"
                    sx={{
                        aspectRatio: "1/1",
                        objectFit: "cover",
                        transition: "transform 0.3s",
                    }}
                />

                <Box
                    className="image-overlay"
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background:
                            "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)",
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
                        {image.prompt}
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
                                // Implement download functionality
                                const link = document.createElement("a");
                                link.href = image.url || image.image_url;
                                link.download = `generated-${image.id}.png`;
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
                                handleDeleteImage(image.id);
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

export default GeneratedImages