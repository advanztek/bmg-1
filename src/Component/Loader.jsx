import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { DotLoader } from "react-spinners";
import { useLoader } from "../Contexts/LoaderContext";

const GlobalLoader = () => {
  const { loading, title } = useLoader();

  if (!loading) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(226, 237, 246, 0.75)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack alignItems="center" spacing={2}>
        <DotLoader color="#2C3891" size={60} />
        {title && (
          <Typography
            variant="body1"
            sx={{ color: "#2C3891", fontWeight: 500 }}
          >
            {title}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default GlobalLoader;
