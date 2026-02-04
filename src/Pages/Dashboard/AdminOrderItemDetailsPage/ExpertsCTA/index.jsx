import { InfoFilled } from "@fluentui/react-icons";
import { Box, Button, Stack, Typography } from "@mui/material";

export default function ExpertsCTA({ onAdd }) {
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
          You do not have Experts who offer this service. Please Add an Expert
          now!
        </Typography>
        <Button
          variant="contained"
          sx={{ borderRadius: "10px" }}
          onClick={onAdd}
        >
          Add Expert
        </Button>
      </Stack>
    </Box>
  );
}
