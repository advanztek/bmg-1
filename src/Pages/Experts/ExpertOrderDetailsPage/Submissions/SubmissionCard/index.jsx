import { Stack, Typography } from "@mui/material";
import { formatShortDate, toTitleCase } from "../../../../../utils/functions";
import Chip from "../../../../../Component/Chip";
import { statusColors } from "./data";
import LinkButton from "./LinkButton";

export default function SubmissionCard({ data }) {
  return (
    <Stack
      gap="16px"
      sx={{
        // backgroundColor: "rgba(0, 0, 0, 0.05)",
        borderRadius: "18px",
        backgroundColor: "#ffffff",
        border: "1px solid rgba(0, 0, 0, 0.07)",
        padding: { xs: "14px 18px", md: "16px 20px" },
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography color="#272629" fontSize="14px" fontWeight={600}>
          {formatShortDate(data?.created_at)}
        </Typography>
        <Chip
          color={statusColors[data?.status_admin]}
          label={toTitleCase(data?.status_admin)}
          noShadow
        />
      </Stack>
      {data?.description && (
        <Typography
          color="rgb(100, 100, 120)"
          fontSize="12px"
          lineHeight={2}
          sx={{ textWrap: "pretty" }}
        >
          {data?.description}
        </Typography>
      )}
      {data?.link && (
        <LinkButton
          onClick={() => {
            window.location.href = data?.link;
          }}
        />
      )}
    </Stack>
  );
}
