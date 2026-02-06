import { Box } from "@mui/material";

export default function Chip({ color, label, size = "md", noShadow = false }) {
  const _color = {
    success: "#05970F",
    warning: "#F7941D",
    error: "#FF0004",
    info: "#13ABBC",
    primary: "#2C3891",
  };

  return (
    <Box
      sx={{
        backgroundColor: `${_color[color]}25`,
        boxShadow: noShadow ? "none" : "1px 1px 1px rgba(0, 0, 0, 0.35)",
        padding: size == "sm" ? "5px 8px" : "7px 12px",
        borderRadius: size == "sm" ? "6px" : "8px",
        lineHeight: 1,
        fontSize: size == "sm" ? "10px" : "12px",
        fontWeight: 500,
        color: _color[color],
        width: "fit-content",
        userSelect: "none",
      }}
    >
      {label}
    </Box>
  );
}
