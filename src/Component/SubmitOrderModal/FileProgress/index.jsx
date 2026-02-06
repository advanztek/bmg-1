import { Stack, Typography } from "@mui/material";
import RingProgress from "./RingProgress";

export default function FileProgress({ nFiles }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap="12px"
      justifyContent="space-between"
    >
      <Typography color="#272629" fontWeight={600} fontSize="12px">
        Files
      </Typography>
      <Stack direction="row" alignItems="center" gap="12px">
        <Typography
          fontWeight={600}
          color="rgb(100, 100, 120)"
          fontSize="12px"
        >{`${nFiles} / 3`}</Typography>
        <RingProgress
          value={Math.min(100, Math.round((nFiles / 3) * 100))}
          size={22}
          strokeWidth={4}
        />
      </Stack>
    </Stack>
  );
}
