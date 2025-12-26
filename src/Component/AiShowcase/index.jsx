import React, { useState, useEffect, useRef } from "react";
import {
    Video24Regular,
    Image24Regular,
    VideoClip24Regular,
    ChartMultiple24Regular,
    MicSparkle24Regular,
    Globe24Regular,
    Play24Filled,
} from "@fluentui/react-icons";

import {
    Box,
    Typography,
    Button,
    Stack,
    Paper,
    IconButton,
    Grid,
    Container,
    useMediaQuery,
    useTheme,
    TextField,
    InputAdornment,
    Chip,
    Menu, MenuItem,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function AIServicesShowcase({ mode = "light" }) {
    const [activeService, setActiveService] = useState(0);
    const [userInput, setUserInput] = useState("");
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const navigate = useNavigate();
    const theme = useTheme();
    const typingTimeoutRef = useRef(null);

    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleGetStarted = () => {
        navigate('/register');
    }

    const services = [
        {
            id: 0,
            name: "AI Video Generator",
            icon: <Video24Regular />,
            image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=600&fit=crop",
            gradient: `linear-gradient(to bottom right, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
            placeholder: "Generate a cinematic product showcase...",
            route: "/video-generator"
        },
        {
            id: 1,
            name: "AI Image Generator",
            icon: <Image24Regular />,
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
            gradient: `linear-gradient(to bottom right, ${theme.palette.info.light}, ${theme.palette.primary.main})`,
            placeholder: "Create a futuristic city landscape...",
            route: "/image-generator"
        },
        {
            id: 2,
            name: "AI Video Editor",
            icon: <VideoClip24Regular />,
            image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop",
            gradient: `linear-gradient(to bottom right, ${theme.palette.warning.main}, ${theme.palette.error.main})`,
            placeholder: "Edit my video with smooth transitions...",
            route: "/video-editor"
        },
        {
            id: 3,
            name: "AI Biz Strategy",
            icon: <ChartMultiple24Regular />,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
            gradient: `linear-gradient(to bottom right, ${theme.palette.success.main}, ${theme.palette.info.dark})`,
            placeholder: "Generate a business strategy for my startup...",
            route: "/biz-strategy"
        },
        {
            id: 4,
            name: "AI Voice Generator",
            icon: <MicSparkle24Regular />,
            image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=800&h=600&fit=crop",
            gradient: `linear-gradient(to bottom right, ${theme.palette.secondary.light}, ${theme.palette.error.dark})`,
            placeholder: "Create a professional voiceover narration...",
            route: "/voice-generator"
        },
        {
            id: 5,
            name: "AI Web Generator",
            icon: <Globe24Regular />,
            image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop",
            gradient: `linear-gradient(to bottom right, ${theme.palette.primary.light}, ${theme.palette.secondary.dark})`,
            placeholder: "Build a modern landing page for my agency...",
            route: "/web-generator"
        },
    ];

    // Quick tabs for suggestions
    const quickTabs = [
        "Modern SaaS Landing Page",
        "Corporate Business Website",
        "Creative Portfolio Website",
        "Restaurant Website",
        "Healthcare Clinic Website",
        "Digital Marketing Agency",
        "Real Estate Website",
        "Fitness & Wellness Website"
    ];

    // Typing animation effect
    useEffect(() => {
        if (userInput) {
            setIsTyping(false);
            setDisplayText(userInput);
            return;
        }

        setIsTyping(true);
        const currentPlaceholder = services[activeService].placeholder;
        let currentIndex = 0;

        const typeNextChar = () => {
            if (currentIndex < currentPlaceholder.length) {
                setDisplayText(currentPlaceholder.slice(0, currentIndex + 1));
                currentIndex++;
                typingTimeoutRef.current = setTimeout(typeNextChar, 80);
            } else {
                // Pause at the end, then restart
                typingTimeoutRef.current = setTimeout(() => {
                    currentIndex = 0;
                    setDisplayText("");
                    typingTimeoutRef.current = setTimeout(typeNextChar, 500);
                }, 2000);
            }
        };

        typeNextChar();

        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, [activeService, userInput]);

    const handleServiceChange = (index) => {
        setActiveService(index);
        setUserInput("");
        setDisplayText("");
    };

    // Navigate to the service page when clicking on active card
    const handleCardClick = (index) => {
        if (index === activeService) {
            navigate(services[index].route);
        } else {
            handleServiceChange(index);
        }
    };

    const handleQuickTabClick = (tab) => {
        setUserInput(tab);
    };

    const getCardStyle = (index) => {
        if (index === activeService) {
            return {
                zIndex: 50,
                transform: "scale(1)",
                opacity: 1,
                left: "50%",
                top: "50%",
                transformOrigin: "center",
                translate: "-50% -50%",
            };
        }

        if (isMobile) {
            return {
                display: "none",
            };
        }

        const positions = [
            { x: "-120px", y: "-80px", scale: 0.7, rotate: -8, zIndex: 30 },
            { x: "100px", y: "-100px", scale: 0.65, rotate: 5, zIndex: 25 },
            { x: "-150px", y: "80px", scale: 0.6, rotate: -5, zIndex: 20 },
            { x: "120px", y: "100px", scale: 0.55, rotate: 8, zIndex: 15 },
            { x: "-80px", y: "120px", scale: 0.5, rotate: -3, zIndex: 10 },
        ];

        const relativeIndex = (index - activeService + services.length) % services.length;
        if (relativeIndex === 0) return { display: "none" };

        const posIndex = Math.min(relativeIndex - 1, positions.length - 1);
        const pos = positions[posIndex];

        return {
            transform: `translate(${pos.x}, ${pos.y}) scale(${pos.scale}) rotate(${pos.rotate}deg)`,
            zIndex: pos.zIndex,
            opacity: 0.85,
        };
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const fileInputRef = useRef(null);
    const open = Boolean(anchorEl);

    // Add these handler functions before the return statement
    const handlePlusClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleAddFiles = () => {
        fileInputRef.current?.click();
        handleMenuClose();
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            console.log('Files selected:', files);
            // Add your file upload logic here
            Array.from(files).forEach(file => {
                console.log('File name:', file.name);
                console.log('File size:', file.size);
                console.log('File type:', file.type);
            });
        }
    };

    const handleTakeScreenshot = async () => {
        handleMenuClose();
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: { mediaSource: 'screen' }
            });

            const video = document.createElement('video');
            video.srcObject = stream;
            video.play();

            video.onloadedmetadata = () => {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0);

                canvas.toBlob((blob) => {
                    console.log('Screenshot captured:', blob);
                    // You can upload the blob or convert to file
                    const file = new File([blob], 'screenshot.png', { type: 'image/png' });
                    console.log('Screenshot file:', file);
                });

                stream.getTracks().forEach(track => track.stop());
            };
        } catch (error) {
            if (error.name === 'NotAllowedError') {
                console.log('User cancelled screen capture');
            } else {
                console.error('Error taking screenshot:', error);
                alert('Unable to capture screen. Please check permissions.');
            }
        }
    };

    const handleTakePhoto = async () => {
        handleMenuClose();
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' }
            });

            // Create overlay
            const overlay = document.createElement('div');
            overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        `;

            // Create video element
            const video = document.createElement('video');
            video.srcObject = stream;
            video.autoplay = true;
            video.style.cssText = `
            max-width: 90%;
            max-height: 70vh;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        `;

            // Create buttons container
            const buttonsDiv = document.createElement('div');
            buttonsDiv.style.cssText = `
            display: flex;
            gap: 16px;
            margin-top: 24px;
        `;

            // Create capture button
            const captureBtn = document.createElement('button');
            captureBtn.textContent = '📷 Capture Photo';
            captureBtn.style.cssText = `
            padding: 12px 32px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            border-radius: 8px;
            border: none;
            background-color: #1976d2;
            color: white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            transition: all 0.2s ease;
        `;

            captureBtn.onmouseover = () => {
                captureBtn.style.backgroundColor = '#1565c0';
                captureBtn.style.transform = 'translateY(-2px)';
            };
            captureBtn.onmouseout = () => {
                captureBtn.style.backgroundColor = '#1976d2';
                captureBtn.style.transform = 'translateY(0)';
            };

            // Create cancel button
            const cancelBtn = document.createElement('button');
            cancelBtn.textContent = '✕ Cancel';
            cancelBtn.style.cssText = `
            padding: 12px 32px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            border-radius: 8px;
            border: 2px solid white;
            background-color: transparent;
            color: white;
            transition: all 0.2s ease;
        `;

            cancelBtn.onmouseover = () => {
                cancelBtn.style.backgroundColor = 'rgba(255,255,255,0.1)';
            };
            cancelBtn.onmouseout = () => {
                cancelBtn.style.backgroundColor = 'transparent';
            };

            const cleanup = () => {
                stream.getTracks().forEach(track => track.stop());
                document.body.removeChild(overlay);
            };

            captureBtn.onclick = () => {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0);

                canvas.toBlob((blob) => {
                    console.log('Photo captured:', blob);
                    const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
                    console.log('Photo file:', file);
                    // Add your upload logic here
                });

                cleanup();
            };

            cancelBtn.onclick = cleanup;

            buttonsDiv.appendChild(captureBtn);
            buttonsDiv.appendChild(cancelBtn);
            overlay.appendChild(video);
            overlay.appendChild(buttonsDiv);
            document.body.appendChild(overlay);

        } catch (error) {
            if (error.name === 'NotAllowedError') {
                alert('Camera access denied. Please allow camera permissions in your browser settings.');
            } else {
                console.error('Error accessing camera:', error);
                alert('Unable to access camera. Please check your device has a camera and permissions are granted.');
            }
        }
    };


    return (
        <Box
            sx={{
                py: { xs: 6, md: 8 },
                backgroundImage: "url('/Images/Wave.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ maxWidth: "1400px", mx: "auto", px: { xs: 2, sm: 3 } }}>
                    {/* HEADER */}
                    <Grid data-aos='fade-down' container alignItems="center" justifyContent="space-between" mb={{ xs: 4, md: 6 }}>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Typography
                                variant="h1"
                                fontWeight={900}
                                mb={1}
                                color={theme.palette.text.primary}
                                sx={{
                                    fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3.9rem' }
                                }}
                            >
                                Unlock Infinite Possibilities with AI Precision
                            </Typography>
                            <Typography
                                variant="body1"
                                color={theme.palette.text.primary}
                                sx={{
                                    fontSize: { xs: '0.95rem', md: '2rem' }
                                }}
                            >
                                Have the world at your fingertips with BMG AI Service
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }} mt={{ xs: 3, md: 0 }}>
                            <Button
                                onClick={handleGetStarted}
                                variant="outlined"
                                fullWidth
                                sx={{
                                    px: 3,
                                    py: 2.2,
                                    fontWeight: 600,
                                    borderWidth: 2,
                                    borderRadius: 2,
                                    borderColor: theme.palette.primary.main,
                                    color: theme.palette.primary.main,
                                    "&:hover": {
                                        backgroundColor: theme.palette.primary.main,
                                        color: theme.palette.primary.contrastText,
                                        borderWidth: 2,
                                    },
                                }}
                            >
                                Start for Free
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid data-aos='flip-down' container spacing={{ xs: 3, md: 6 }}>
                        {/* LEFT SIDEBAR - SERVICE BUTTONS */}
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Stack
                                spacing={2}
                                sx={{
                                    flexDirection: { xs: 'row', md: 'column' },
                                    overflowX: { xs: 'auto', md: 'visible' },
                                    overflowY: 'hidden',
                                    pb: { xs: 2, md: 0 },
                                    '&::-webkit-scrollbar': {
                                        height: '6px',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        backgroundColor: theme.palette.primary.main,
                                        borderRadius: '3px',
                                    },
                                }}
                            >
                                {services.map((service, index) => (
                                    <Button
                                        key={service.id}
                                        fullWidth
                                        startIcon={service.icon}
                                        onClick={() => handleServiceChange(index)}
                                        sx={{
                                            textTransform: "none",
                                            px: { xs: 2, md: 3 },
                                            py: 2,
                                            borderRadius: 3,
                                            fontWeight: 600,
                                            boxShadow: 2,
                                            minWidth: { xs: '200px', md: 'auto' },
                                            flexShrink: { xs: 0, md: 1 },
                                            whiteSpace: 'nowrap',
                                            bgcolor: activeService === index
                                                ? theme.palette.primary.main
                                                : theme.palette.background.paper,
                                            color: activeService === index
                                                ? theme.palette.primary.contrastText
                                                : theme.palette.primary.main,
                                            "&:hover": {
                                                boxShadow: 4,
                                                bgcolor: activeService === index
                                                    ? theme.palette.primary.dark
                                                    : theme.palette.primary.lightBg,
                                            },
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        {service.name}
                                    </Button>
                                ))}
                            </Stack>
                        </Grid>

                        {/* RIGHT SIDE - CARD SHOWCASE */}
                        <Grid size={{ xs: 12, md: 9 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: 3,
                                }}
                            >
                                {/* Hidden file input */}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    multiple
                                    accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                                    onChange={handleFileChange}
                                />

                                {/* Text Field Container */}
                                <Box sx={{ width: '100%', maxWidth: '700px', mb: 2, position: 'relative' }}>
                                    <TextField
                                        fullWidth
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        placeholder={isTyping ? "" : services[activeService].placeholder}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton
                                                        edge="start"
                                                        size="small"
                                                        onClick={handlePlusClick}
                                                        aria-controls={open ? 'attachment-menu' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={open ? 'true' : undefined}
                                                        sx={{
                                                            bgcolor: theme.palette.primary.main,
                                                            color: theme.palette.primary.contrastText,
                                                            width: 32,
                                                            height: 32,
                                                            '&:hover': {
                                                                bgcolor: theme.palette.primary.dark,
                                                            },
                                                        }}
                                                    >
                                                        <Box sx={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>+</Box>
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        edge="end"
                                                        size="small"
                                                        sx={{
                                                            bgcolor: theme.palette.primary.main,
                                                            color: theme.palette.primary.contrastText,
                                                            width: 32,
                                                            height: 32,
                                                            '&:hover': {
                                                                bgcolor: theme.palette.primary.dark,
                                                            },
                                                        }}
                                                    >
                                                        <Box sx={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>↑</Box>
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            sx: {
                                                bgcolor: mode === 'light'
                                                    ? theme.palette.background.paper
                                                    : 'rgba(255, 255, 255, 0.05)',
                                                backdropFilter: mode === 'dark' ? 'blur(10px)' : 'none',
                                                fontSize: { xs: '0.9rem', md: '1rem' },
                                                px: 2,
                                                py: 1.5,
                                                '& fieldset': {
                                                    borderColor: mode === 'light'
                                                        ? theme.palette.divider
                                                        : 'rgba(255, 255, 255, 0.1)',
                                                    borderWidth: 1,
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: mode === 'light'
                                                        ? theme.palette.primary.main
                                                        : 'rgba(255, 255, 255, 0.2)',
                                                },
                                            },
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused fieldset': {
                                                    borderColor: theme.palette.primary.main,
                                                    borderWidth: 2,
                                                },
                                            },
                                        }}
                                    />

                                    {/* Dropdown Menu */}
                                    <Menu
                                        id="attachment-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleMenuClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        PaperProps={{
                                            elevation: 8,
                                            sx: {
                                                mt: 1,
                                                minWidth: 240,
                                                borderRadius: 2,
                                                bgcolor: mode === 'light'
                                                    ? theme.palette.background.paper
                                                    : 'rgba(30, 30, 30, 0.98)',
                                                backdropFilter: 'blur(20px)',
                                                border: mode === 'light'
                                                    ? `1px solid ${theme.palette.divider}`
                                                    : '1px solid rgba(255, 255, 255, 0.12)',
                                                boxShadow: theme.shadows[10],
                                            }
                                        }}
                                    >
                                        <MenuItem
                                            onClick={handleAddFiles}
                                            sx={{
                                                py: 1.5,
                                                px: 2.5,
                                                gap: 2,
                                                '&:hover': {
                                                    bgcolor: mode === 'light'
                                                        ? theme.palette.action.hover
                                                        : 'rgba(255, 255, 255, 0.08)',
                                                }
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: 2,
                                                    bgcolor: mode === 'light'
                                                        ? 'rgba(25, 118, 210, 0.1)'
                                                        : 'rgba(144, 202, 249, 0.16)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <Typography sx={{ fontSize: '20px' }}>📁</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <Typography variant="body2" fontWeight={600} color="text.primary">
                                                    Add Files
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
                                                    Upload images, videos, or docs
                                                </Typography>
                                            </Box>
                                        </MenuItem>

                                        <MenuItem
                                            onClick={handleTakeScreenshot}
                                            sx={{
                                                py: 1.5,
                                                px: 2.5,
                                                gap: 2,
                                                '&:hover': {
                                                    bgcolor: mode === 'light'
                                                        ? theme.palette.action.hover
                                                        : 'rgba(255, 255, 255, 0.08)',
                                                }
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: 2,
                                                    bgcolor: mode === 'light'
                                                        ? 'rgba(156, 39, 176, 0.1)'
                                                        : 'rgba(206, 147, 216, 0.16)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <Typography sx={{ fontSize: '20px' }}>📸</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <Typography variant="body2" fontWeight={600} color="text.primary">
                                                    Take Screenshot
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
                                                    Capture your screen
                                                </Typography>
                                            </Box>
                                        </MenuItem>

                                        <MenuItem
                                            onClick={handleTakePhoto}
                                            sx={{
                                                py: 1.5,
                                                px: 2.5,
                                                gap: 2,
                                                '&:hover': {
                                                    bgcolor: mode === 'light'
                                                        ? theme.palette.action.hover
                                                        : 'rgba(255, 255, 255, 0.08)',
                                                }
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: 2,
                                                    bgcolor: mode === 'light'
                                                        ? 'rgba(76, 175, 80, 0.1)'
                                                        : 'rgba(102, 187, 106, 0.16)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <Typography sx={{ fontSize: '20px' }}>📷</Typography>
                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <Typography variant="body2" fontWeight={600} color="text.primary">
                                                    Take Photo
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
                                                    Use your camera
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                    </Menu>

                                    {/* Typing animation display */}
                                    {isTyping && !userInput && (
                                        <Typography
                                            sx={{
                                                position: 'absolute',
                                                mt: -4.5,
                                                ml: 7,
                                                color: theme.palette.text.secondary,
                                                fontSize: { xs: '0.9rem', md: '1rem' },
                                                pointerEvents: 'none',
                                                '&::after': {
                                                    content: '"|"',
                                                    animation: 'blink 1s infinite',
                                                    ml: 0.5,
                                                },
                                                '@keyframes blink': {
                                                    '0%, 100%': { opacity: 1 },
                                                    '50%': { opacity: 0 },
                                                },
                                            }}
                                        >
                                            {displayText}
                                        </Typography>
                                    )}
                                </Box>

                                {/* Quick Tabs */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 1,
                                        justifyContent: 'center',
                                        maxWidth: '800px',
                                        px: 2,
                                    }}
                                >
                                    {quickTabs.map((tab, index) => (
                                        <Chip
                                            key={index}
                                            label={tab}
                                            onClick={() => handleQuickTabClick(tab)}
                                            sx={{
                                                bgcolor: mode === 'light'
                                                    ? theme.palette.background.paper
                                                    : 'rgba(255, 255, 255, 0.08)',
                                                backdropFilter: mode === 'dark' ? 'blur(10px)' : 'none',
                                                color: theme.palette.text.primary,
                                                border: mode === 'light'
                                                    ? `1px solid ${theme.palette.divider}`
                                                    : '1px solid rgba(255, 255, 255, 0.1)',
                                                borderRadius: 3,
                                                px: 1,
                                                py: 2.5,
                                                fontSize: { xs: '0.75rem', md: '0.85rem' },
                                                fontWeight: 500,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                '&:hover': {
                                                    bgcolor: mode === 'light'
                                                        ? theme.palette.action.hover
                                                        : 'rgba(255, 255, 255, 0.12)',
                                                    borderColor: mode === 'light'
                                                        ? theme.palette.primary.main
                                                        : 'rgba(255, 255, 255, 0.2)',
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: mode === 'light' ? 2 : 'none',
                                                },
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Box>
                            {/* CARD SHOWCASE */}
                            <Box
                                sx={{
                                    position: "relative",
                                    height: { xs: "400px", sm: "500px", md: "600px" },
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    mt: 4,
                                }}
                            >
                                {services.map((service, index) => {
                                    const style = getCardStyle(index);
                                    if (style.display === "none") return null;

                                    return (
                                        <Paper
                                            key={service.id}
                                            onClick={() => handleCardClick(index)}
                                            sx={{
                                                position: "absolute",
                                                cursor: "pointer",
                                                transition: "all 0.7s ease",
                                                width: {
                                                    xs: "90%",
                                                    sm: "85%",
                                                    md: index === activeService ? "600px" : "520px",
                                                },
                                                height: {
                                                    xs: "85%",
                                                    sm: "75%",
                                                    md: index === activeService ? "400px" : "320px",
                                                },
                                                maxWidth: { xs: '400px', sm: '500px', md: 'none' },
                                                overflow: "hidden",
                                                borderRadius: 4,
                                                backgroundColor: theme.palette.background.paper,
                                                boxShadow: index === activeService ? 8 : 4,
                                                '&:hover': {
                                                    boxShadow: index === activeService ? 12 : 6,
                                                    transform: index === activeService
                                                        ? 'scale(1.02)'
                                                        : style.transform,
                                                },
                                                ...style,
                                            }}
                                        >
                                            {/* TOP BAR (WINDOW DOTS) */}
                                            <Box
                                                sx={{
                                                    p: { xs: 1.5, md: 2 },
                                                    display: "flex",
                                                    gap: 1
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: { xs: 10, md: 14 },
                                                        height: { xs: 10, md: 14 },
                                                        borderRadius: "50%",
                                                        bgcolor: theme.palette.error.main,
                                                    }}
                                                />
                                                <Box
                                                    sx={{
                                                        width: { xs: 10, md: 14 },
                                                        height: { xs: 10, md: 14 },
                                                        borderRadius: "50%",
                                                        bgcolor: theme.palette.warning.main,
                                                    }}
                                                />
                                                <Box
                                                    sx={{
                                                        width: { xs: 10, md: 14 },
                                                        height: { xs: 10, md: 14 },
                                                        borderRadius: "50%",
                                                        bgcolor: theme.palette.success.main,
                                                    }}
                                                />
                                            </Box>

                                            {/* IMAGE CONTAINER */}
                                            <Box
                                                sx={{
                                                    position: "relative",
                                                    width: "100%",
                                                    height: "100%",
                                                    mt: { xs: -2, md: -3 },
                                                }}
                                            >
                                                <img
                                                    src={service.image}
                                                    alt={service.name}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover",
                                                    }}
                                                />

                                                {/* COLOR OVERLAY */}
                                                <Box
                                                    sx={{
                                                        position: "absolute",
                                                        inset: 0,
                                                        background: service.gradient,
                                                        opacity: 0.25,
                                                        mixBlendMode: "overlay",
                                                    }}
                                                />

                                                {/* ACTIVE CARD INFORMATION */}
                                                {index === activeService && (
                                                    <Box
                                                        sx={{
                                                            position: "absolute",
                                                            bottom: 0,
                                                            left: 0,
                                                            right: 0,
                                                            p: { xs: 2, sm: 2.5, md: 3 },
                                                            background: "linear-gradient(to top, rgba(0,0,0,.85), transparent)",
                                                        }}
                                                    >
                                                        <Stack
                                                            direction="row"
                                                            spacing={{ xs: 1.5, md: 2 }}
                                                            alignItems="center"
                                                        >
                                                            <Box
                                                                sx={{
                                                                    width: { xs: 50, md: 60 },
                                                                    height: { xs: 50, md: 60 },
                                                                    bgcolor: "rgba(255,255,255,0.25)",
                                                                    backdropFilter: "blur(6px)",
                                                                    borderRadius: 3,
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    fontSize: { xs: '20px', md: '24px' },
                                                                    color: '#fff',
                                                                }}
                                                            >
                                                                {service.icon}
                                                            </Box>

                                                            <Box sx={{ flex: 1 }}>
                                                                <Typography
                                                                    variant="h6"
                                                                    color="white"
                                                                    sx={{
                                                                        fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' }
                                                                    }}
                                                                >
                                                                    {service.name}
                                                                </Typography>
                                                                <Typography
                                                                    variant="body2"
                                                                    color="white"
                                                                    sx={{
                                                                        fontSize: { xs: '0.8rem', md: '0.875rem' }
                                                                    }}
                                                                >
                                                                    Click to explore • Transform your ideas into reality
                                                                </Typography>
                                                            </Box>
                                                        </Stack>
                                                    </Box>
                                                )}

                                                {/* PLAY BUTTON (ONLY FOR VIDEO ITEMS) */}
                                                {(index === 0 || index === 2) && index === activeService && (
                                                    <IconButton
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigate(service.route);
                                                        }}
                                                        sx={{
                                                            position: "absolute",
                                                            top: "50%",
                                                            left: "50%",
                                                            transform: "translate(-50%, -50%)",
                                                            width: { xs: 60, sm: 70, md: 80 },
                                                            height: { xs: 60, sm: 70, md: 80 },
                                                            bgcolor: theme.palette.background.paper,
                                                            color: theme.palette.text.primary,
                                                            borderRadius: "50%",
                                                            boxShadow: 6,
                                                            '&:hover': {
                                                                bgcolor: theme.palette.primary.main,
                                                                color: theme.palette.primary.contrastText,
                                                                transform: "translate(-50%, -50%) scale(1.1)",
                                                            },
                                                            transition: 'all 0.3s ease',
                                                        }}
                                                    >
                                                        <Play24Filled style={{ fontSize: { xs: 24, md: 28 } }} />
                                                    </IconButton>
                                                )}
                                            </Box>
                                        </Paper>
                                    );
                                })}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}