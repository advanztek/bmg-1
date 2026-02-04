import { Box, Stack, Typography } from "@mui/material";

export default function LabelValue({ icon: Icon, label, value }) {
  return (
    <Stack direction="row" alignItems="center" gap="12px">
      <Box
        sx={{
          "& *": {
            color: "#2C3891",
          },
          height: "36px",
          width: "36px",
          borderRadius: "6px",
          boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#EFF0F0",
        }}
      >
        <Icon fontSize={20} />
      </Box>
      <Stack gap="6px">
        <Typography
          fontSize="12px"
          fontWeight={600}
          color="rgb(100, 100, 120)"
          lineHeight={1}
        >
          {label}
        </Typography>
        <Typography fontSize="14px" lineHeight={1} fontWeight={400}>
          {value}
        </Typography>
      </Stack>
    </Stack>
  );
}
