import { SearchFilled } from "@fluentui/react-icons";
import { Box, Stack, Typography } from "@mui/material";

export default function Searchbar() {
  return (
    <Stack gap="10px">
      <Stack alignItems="end">
        <Typography
          fontSize="12px"
          color="rgb(100, 100, 120)"
          textAlign="right"
          fontWeight={600}
          lineHeight={1}
        >
          Expert
        </Typography>
      </Stack>
      <Box
        sx={{
          border: "1px solid rgb(224, 224, 234)",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          padding: "0px 10px",
          height: "32px",
          color: "#272629",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <SearchFilled fontSize={18} color="#646478" />
        <Box
          flex={1}
          component="input"
          placeholder="Search for an Expert"
          sx={{
            outline: "none",
            border: "none",
            backgroundColor: "transparent",
            fontSize: "14px",
            "&::placeholder": {
              fontSize: "14px",
              color: "rgb(100, 100, 120)",
            },
          }}
        />
        <Box
          sx={{
            userSelect: "none",
            fontSize: "9px",
            fontWeight: 500,
            padding: "2px 4px",
            borderRadius: "4px",
            backgroundColor: "rgba(0, 0, 50, 0.3)",
            border: "1px solid rgba(0, 0, 50, 0.35)",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          Enter
        </Box>
      </Box>
    </Stack>
  );
}
