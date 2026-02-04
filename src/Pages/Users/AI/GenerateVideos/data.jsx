/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
    keyframes,
} from "@mui/material";


// Animation keyframes
const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
`;

const slideRight = keyframes`
  0% {
    transform: translateX(-20px);
    opacity: 0.5;
  }
  50% {
    transform: translateX(0px);
    opacity: 1;
  }
  100% {
    transform: translateX(20px);
    opacity: 0.5;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Provider options
export const providers = [
    { id: "sora", name: "OpenAI Sora", description: "High-quality text and image to video" },
    { id: "pollo", name: "Pollo AI (Kling)", description: "Image to video with audio" },
];

// Sora-specific configurations
export const soraModels = [
    {
        id: "sora-2",
        name: "Sora 2 (Standard)",
        description: "Balanced quality and speed",
        recommended: true
    },
    {
        id: "sora-2-pro",
        name: "Sora 2 Pro (Enhanced)",
        description: "Maximum quality, slower generation"
    },
];

export const soraDurations = [
    { id: "4", name: "4 seconds", label: "Quick", seconds: 4 },
    { id: "8", name: "8 seconds", label: "Medium", seconds: 8, recommended: true },
    { id: "12", name: "12 seconds", label: "Long", seconds: 12 },
];

export const soraSizes = [
    {
        id: "1280x720",
        name: "1280×720 (16:9 Landscape)",
        ratio: "16:9",
        description: "Standard HD landscape",
        recommended: true
    },
    {
        id: "720x1280",
        name: "720×1280 (9:16 Portrait)",
        ratio: "9:16",
        description: "Mobile-friendly portrait"
    },
    {
        id: "1792x1024",
        name: "1792×1024 (16:9 HD)",
        ratio: "16:9",
        description: "High-definition landscape"
    },
    {
        id: "1024x1792",
        name: "1024×1792 (9:16 HD)",
        ratio: "9:16",
        description: "High-definition portrait"
    },
];

// Pollo-specific configurations
export const polloLengths = [
    { id: 1, name: "1 second", label: "Ultra Short", seconds: 1 },
    { id: 2, name: "2 seconds", label: "Very Short", seconds: 2 },
    { id: 3, name: "3 seconds", label: "Short", seconds: 3 },
    { id: 4, name: "4 seconds", label: "Short", seconds: 4 },
    { id: 5, name: "5 seconds", label: "Medium", seconds: 5, recommended: true },
    { id: 6, name: "6 seconds", label: "Medium", seconds: 6 },
    { id: 7, name: "7 seconds", label: "Long", seconds: 7 },
    { id: 8, name: "8 seconds", label: "Long", seconds: 8 },
    { id: 9, name: "9 seconds", label: "Very Long", seconds: 9 },
    { id: 10, name: "10 seconds", label: "Ultra Long", seconds: 10 },
];

export const polloResolutions = [
    {
        id: "720p",
        name: "720p (HD)",
        description: "1280×720 High Definition",
        recommended: true
    },
];

// Legacy exports for backward compatibility
// These map to Sora configurations
export const timeframe = soraDurations;
export const quality = soraSizes;

// Prompt suggestion templates
export const textToVideoPrompts = [
    "A cinematic drone shot of a modern city at sunset, ultra-realistic, smooth motion",
    "Ocean waves crashing on a rocky shore, slow motion, dramatic lighting",
    "Time-lapse of clouds moving over mountain peaks, golden hour",
    "Close-up of a blooming flower, macro photography, nature documentary style",
    "Neon-lit cyberpunk street at night, rain reflections, camera tracking shot",
    "Peaceful forest path with dappled sunlight, gentle breeze, serene atmosphere",
    "Spacecraft traveling through asteroid field, epic sci-fi cinematography",
    "Underwater coral reef with colorful fish, crystal clear water, documentary style",
];

export const imageToVideoMotions = [
    "Slow cinematic zoom in with subtle depth",
    "Gentle camera pan right, smooth transition",
    "Subtle wind and movement, natural atmosphere",
    "Dynamic action sequence with camera tracking",
    "Smooth 360-degree rotation, revealing environment",
    "Time-lapse effect with light changes",
    "Parallax effect with foreground and background separation",
    "Ken Burns effect with slow zoom and pan",
];

// Video generation settings defaults
export const defaultSettings = {
    sora: {
        provider: "sora",
        model: "sora-2",
        seconds: "8",
        size: "1280x720",
        enhance_prompt: true,
    },
    pollo: {
        provider: "pollo",
        length: 5,
        resolution: "720p",
        generateAudio: true,
        enhance_prompt: true,
    },
};

// Validation limits based on Joi schema
export const validationLimits = {
    prompt: {
        min: 1,
        max: 10000,
    },
    seed: {
        type: "integer",
    },
};

// Helper function to get configuration by provider
export const getProviderConfig = (provider) => {
    if (provider === "sora") {
        return {
            models: soraModels,
            durations: soraDurations,
            sizes: soraSizes,
            defaults: defaultSettings.sora,
        };
    } else if (provider === "pollo") {
        return {
            lengths: polloLengths,
            resolutions: polloResolutions,
            defaults: defaultSettings.pollo,
        };
    }
    return null;
};

// Helper function to validate settings against Joi schema
export const validateSettings = (provider, settings) => {
    const errors = [];

    // Common validation
    if (!settings.prompt || settings.prompt.trim().length < 1) {
        errors.push("Prompt is required and must be at least 1 character");
    }
    if (settings.prompt && settings.prompt.length > 10000) {
        errors.push("Prompt must not exceed 10,000 characters");
    }

    // Provider-specific validation
    if (provider === "sora") {
        if (!["sora-2", "sora-2-pro"].includes(settings.model)) {
            errors.push("Invalid Sora model selected");
        }
        if (!["4", "8", "12"].includes(settings.seconds)) {
            errors.push("Invalid duration for Sora");
        }
        if (!["720x1280", "1280x720", "1024x1792", "1792x1024"].includes(settings.size)) {
            errors.push("Invalid resolution for Sora");
        }
    } else if (provider === "pollo") {
        if (!Number.isInteger(settings.length) || settings.length < 1 || settings.length > 10) {
            errors.push("Invalid length for Pollo (must be 1-10 seconds)");
        }
        if (settings.resolution !== "720p") {
            errors.push("Invalid resolution for Pollo");
        }
    }

    return {
        valid: errors.length === 0,
        errors,
    };
};

export { shimmer, pulse, slideRight, rotate }
