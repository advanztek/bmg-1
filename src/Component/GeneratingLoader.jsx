import { Box } from "@mui/material";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const GeneratingLoader = ({ size = 200 }) => {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        mx: "auto"
      }}
    >
      <DotLottieReact
        src="https://lottie.host/b44f495f-1577-4e76-8d19-b3fc191dc4d0/g1mDzJGapt.lottie"
        loop
        autoplay
        style={{ width: "100%", height: "100%" }}
      />
    </Box>
  );
};

export default GeneratingLoader;
