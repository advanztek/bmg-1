import { InfoFilled } from "@fluentui/react-icons";
import { Box, Button, Stack, Typography } from "@mui/material";

export default function AssignCTA({ onAssign }) {
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        // boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.25)",
        border: "1px solid rgb(224, 224, 234)",
        py: { xs: "20px", md: "34px" },
        px: { xs: "14px", md: "16px" },
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Stack alignItems="center" justifyContent="center" gap="16px">
        <InfoFilled fontSize={64} color="#ced7d8" />
        <Typography
          fontSize="14px"
          textAlign="center"
          color="rgb(150, 150, 170)"
          width={{ xs: "95%", md: "80%" }}
        >
          This order hasn’t been assigned yet. Let’s match it with the right
          expert!
        </Typography>
        <Button
          variant="contained"
          sx={{ borderRadius: "10px" }}
          onClick={onAssign}
        >
          Assign
        </Button>
      </Stack>
    </Box>
  );
}
