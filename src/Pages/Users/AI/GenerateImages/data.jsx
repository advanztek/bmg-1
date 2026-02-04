import {
    keyframes,
} from "@mui/material";

// Shimmer animation keyframes
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

export { slideRight, pulse, shimmer }