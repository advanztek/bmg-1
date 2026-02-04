import { Box, Stack, Typography } from "@mui/material";

export default function DatePicker({ value, onChange }) {
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
          Deadline
        </Typography>
      </Stack>
      <Box
        component="input"
        type="datetime-local"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          border: "1px solid rgb(224, 224, 234)",
          backgroundColor: "#ffffff",
          outline: "none",
          borderRadius: "8px",
          padding: "0px 10px",
          fontSize: "14px",
          color: "#272629",
          height: "32px",
        }}
      />
    </Stack>
  );
}
