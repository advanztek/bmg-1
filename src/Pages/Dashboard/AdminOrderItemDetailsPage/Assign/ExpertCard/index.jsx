import { Box, Stack, Typography } from "@mui/material";
import LabelValue from "./LabelValue";
import {
  GlobeRegular,
  LocationRegular,
  MyLocationRegular,
} from "@fluentui/react-icons";
import { capitalizeEachWord, formatDate } from "./utils";

export default function ExpertCard({ data, selected = false, onSelect }) {
  return (
    <Stack
      component="div"
      gap="12px"
      onClick={onSelect}
      sx={{
        borderRadius: "16px",
        backgroundColor: "rgba(0, 0, 50, 0.05)",
        border: selected
          ? "2px solid #2C3891"
          : "1px solid rgba(0, 0, 50, 0.1)",
        padding: { xs: "14px 18px", md: "16px 22px" },
        cursor: "pointer",
        "& *": {
          userSelect: "none",
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" gap="12px" alignItems="center">
          <Box
            sx={{
              width: "fit-content",
              padding: "2px",
              border: "2px solid #2C3891",
              borderRadius: "999px",
              height: "fit-content",
            }}
          >
            <Box
              component="img"
              src="/avatar.png"
              sx={{
                height: "30px",
                width: "30px",
                borderRadius: "999px",
                display: "block",
              }}
            />
          </Box>
          <Stack gap="6px">
            <Typography
              fontSize="14px"
              fontWeight={700}
              lineHeight={1}
              color="#272629"
            >
              {`${data?.first_name} ${data?.last_name}`}
            </Typography>
            <Typography
              fontSize="10px"
              lineHeight={1}
              color="rgb(100, 100, 120)"
            >
              {`Joined ${formatDate(data?.created_at)}`}
            </Typography>
          </Stack>
        </Stack>
        <Stack gap="4px" alignItems="end">
          <Typography
            textAlign="right"
            sx={{ whiteSpace: "nowrap" }}
            fontSize="10px"
            lineHeight={1}
            color="rgb(100, 100, 120)"
          >
            Experience
          </Typography>
          <Typography
            fontSize="18px"
            fontWeight={600}
            textAlign="right"
            lineHeight={1}
            color="#2C3891"
          >
            {capitalizeEachWord(data?.experience)}
          </Typography>
        </Stack>
      </Stack>
      <Box borderTop="1px solid rgba(224, 224, 234, 0.79)" />
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "repeat(3, 1fr)" }}
        gap="12px"
      >
        <LabelValue
          label="City"
          value={data?.city || "-"}
          icon={MyLocationRegular}
        />
        <LabelValue
          label="State"
          value={data?.state || "-"}
          icon={LocationRegular}
        />
        <LabelValue
          label="Country"
          value={data?.country || "-"}
          icon={GlobeRegular}
        />
      </Box>
    </Stack>
  );
}
