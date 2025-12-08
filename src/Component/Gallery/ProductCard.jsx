import { Box, Typography, Stack } from "@mui/material";
import { BeakerFilled } from "@fluentui/react-icons";
import { cardStyle } from "./style";

export default function ProductCard({ img }) {
  return (
    <Box sx={{ ...cardStyle, textAlign: "center" }}>
      <Box
        component="img"
        src={img}
        sx={{ width: "100%", maxHeight: 260, objectFit: "contain" }}
      />

      <Stack spacing={1} mt={1}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          PRODUCT NAME
        </Typography>

        <Typography variant="body2">100% Organic</Typography>

        <Box display="flex" justifyContent="center" gap={1}>
          <BeakerFilled fontSize={20} />
        </Box>
      </Stack>
    </Box>
  );
}
