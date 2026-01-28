import { Stack, Typography } from "@mui/material";

interface Props {
  label: string;
  children: string;
  bb?: boolean;
}

export default function LabelValue({ label, bb, children }: Props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      py="16px"
      borderBottom={bb ? `1px solid rgba(0, 0, 0, 0.1)` : "none"}
    >
      <Typography
        whiteSpace="nowrap"
        color="rgba(0, 0, 0, 0.4)"
        fontSize="14px"
      >
        {label}
      </Typography>
      <Typography
        whiteSpace="nowrap"
        fontWeight={600}
        fontSize="14px"
        color="rgba(0, 0, 0, 0.7)"
      >
        {children}
      </Typography>
    </Stack>
  );
}
