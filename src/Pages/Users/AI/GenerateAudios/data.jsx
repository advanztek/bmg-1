/* eslint-disable react-hooks/set-state-in-effect */
// UserGenerateAudio.jsx
import React from "react";
import {
    keyframes,
} from "@mui/material";


// Animation keyframes
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

const wave = keyframes`
  0% {
    transform: scaleY(0.5);
  }
  50% {
    transform: scaleY(1);
  }
  100% {
    transform: scaleY(0.5);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

export { pulse, wave, shimmer }