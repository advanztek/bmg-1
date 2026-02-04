import { MailCheckmarkFilled } from "@fluentui/react-icons";
import { Box, Stack, Typography } from "@mui/material";

export default function Submissions() {
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        // boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.25)",
        border: "1px solid rgb(224, 224, 234)",
        padding: { xs: "18px 14px", md: "22px 16px" },
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography fontWeight={700} color="#2C3891" fontSize="18px">
          Submissions
        </Typography>
        <MailCheckmarkFilled fontSize={30} color="#9f9fad" />
      </Stack>
    </Box>
  );
}
