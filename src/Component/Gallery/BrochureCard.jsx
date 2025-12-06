import { Box } from "@mui/material";
import { cardStyle } from "./style";

export default function BrochureCard({ img }) {
  return (
    <Box sx={{ ...cardStyle }}>
      <Box
        component="img"
        src={img}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: 1,
        }}
      />
    </Box>
  );
}
