import { Box, Stack, Typography } from "@mui/material";

export default function LabelValue({ icon: Icon, label, value }) {
  return (
    <Stack direction="row" alignItems="center" gap="12px">
      <Box
        sx={{
          "& *": {
            color: "#2C3891",
          },
          height: "32px",
          width: "32px",
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
          color="rgb(150, 150, 170)"
          fontWeight={400}
          lineHeight={1}
        >
          {label}
        </Typography>
        <Typography fontSize="12px" lineHeight={1} fontWeight={600}>
          {value}
        </Typography>
      </Stack>
    </Stack>
  );
}
