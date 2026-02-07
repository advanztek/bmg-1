import { Button, Stack, Typography } from "@mui/material";
import { formatShortDate, toTitleCase } from "../../../../../utils/functions";
import Chip from "../../../../../Component/Chip";
import { statusColors } from "./data";
import ActionButton from "./ActionButton";
import { STORAGE_URL } from "../../../../../Config/paths";
import { DocumentFolderFilled } from "@fluentui/react-icons";

export default function SubmissionCard({ data, onSubmit }) {
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
        <ActionButton
          onClick={() => {
            window.location.href = data?.link;
          }}
        />
      )}
      {data?.files?.length > 0 &&
        data?.files?.map((item, index) => (
          <ActionButton
            icon={DocumentFolderFilled}
            tag={`File ${index + 1}`}
            caption="Click to view submission file"
            onClick={() => {
              window.location.href = STORAGE_URL + "/" + item;
            }}
          />
        ))}
      <Stack alignItems="end">
        <Button
          sx={{ borderRadius: "10px" }}
          variant="contained"
          onClick={onSubmit}
        >
          Re-Submit
        </Button>
      </Stack>
    </Stack>
  );
}
