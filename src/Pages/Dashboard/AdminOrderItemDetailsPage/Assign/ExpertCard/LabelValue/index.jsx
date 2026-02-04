import { Stack, Typography } from "@mui/material";

export default function LabelValue({ icon: Icon, label, value }) {
  return (
    <Stack gap="6px" direction="row" alignItems="center">
      <Icon fontSize={26} color="#2C3891" />
      <Stack gap="4px">
        <Typography
          fontSize="12px"
          fontWeight={600}
          color="rgb(100, 100, 120)"
          lineHeight={1}
        >
          {label}
        </Typography>
        <Typography fontSize="12px" color="#272629)" lineHeight={1}>
          {value}
        </Typography>
      </Stack>
    </Stack>
  );
}
