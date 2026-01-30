import { Box, Stack, Typography } from "@mui/material";

export default function OrderBanner() {
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "10px",
        boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.08)",
        padding: "16px",
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <Typography color="#2C3891" fontSize="20.96px" fontWeight={700}>
            Order Details
          </Typography>
          <Typography fontSize="13px" fontWeight={500}>
            ID #ORD_20260127142001_EC4103
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
