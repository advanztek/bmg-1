import { Box } from "@mui/material";

export default function Chip({ color, label, size = "md" }) {
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
        boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.35)",
        padding: size == "sm" ? "3px 9px" : "4px 12px",
        borderRadius: "4px",
        lineHeight: 1,
        fontSize: size == "sm" ? "10px" : "13px",
        fontWeight: 500,
        color: _color[color],
      }}
    >
      {label}
    </Box>
  );
}
