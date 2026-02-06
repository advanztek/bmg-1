import { Box, Stack, Typography } from "@mui/material";
import { STORAGE_URL } from "../../../../Config/paths";
import Chip from "../../../../Component/Chip";
import { statusColors, statusLabels } from "./data";
import LabelValue from "./LabelValue";
import { formatDate, toTitleCase } from "../../../../utils/functions";
import { CircleSmallFilled } from "@fluentui/react-icons";

export default function Details({ data }) {
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        // boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.25)",
        border: "1px solid rgb(224, 224, 234)",
        padding: { xs: "16px", md: "20px" },
      }}
    >
      {data?.image && (
        <Box
          component="img"
          src={STORAGE_URL + "/" + data?.image}
          loading="lazy"
          sx={{
            display: "block",
            borderRadius: "14px",
            width: "100%",
            objectFit: "cover",
            maxHeight: "140px",
            userSelect: "none",
          }}
        />
      )}
      <Stack gap="24px" py="22px">
        <Typography
          fontSize="14px"
          fontWeight={600}
          lineHeight={1}
          color="rgb(100, 100, 120)"
          // color="#2C3891"
        >
          {data?.service_name || "-"}
        </Typography>
        <Box>
          <Chip
            label={statusLabels[data?.status]}
            color={statusColors[data?.status]}
            noShadow
          />
        </Box>
        <Typography
          color="rgb(100, 100, 120)"
          fontSize="14px"
          lineHeight={2}
          sx={{ textWrap: "pretty" }}
        >
          {data?.description}.
        </Typography>
        <Box borderTop="1px solid rgba(224, 224, 234, 0.79)" />
        <Stack gap="20px">
          <LabelValue
            icon={CircleSmallFilled}
            label="Category"
            value={toTitleCase(data?.service_type_name || "-")}
          />
          <LabelValue
            icon={CircleSmallFilled}
            label="Quantity"
            value={String(data?.quantity || 1).padStart(3, "0")}
          />
          <LabelValue
            icon={CircleSmallFilled}
            label="Deadline"
            value={formatDate(data?.delivery_deadline)}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
