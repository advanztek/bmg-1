import { Box, Stack, Typography } from "@mui/material";
import { STORAGE_URL } from "../../../../Config/paths";
import { formatGHS } from "../../../../utils/currency";
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
        borderRadius: "12px",
        // boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.25)",
        border: "1px solid rgb(224, 224, 234)",
        padding: { xs: "14px", md: "16px" },
      }}
    >
      <Box
        component="img"
        src={STORAGE_URL + "/" + data?.image}
        sx={{
          display: "block",
          borderRadius: "8px",
          width: "100%",
          objectFit: "cover",
          maxHeight: "140px",
        }}
      />
      <Stack gap="18px" py="22px">
        <Stack gap="8px">
          <Typography
            fontSize="13px"
            fontWeight={600}
            lineHeight={1}
            color="#2C3891"
          >
            {data?.service_name}
          </Typography>
          <Typography
            fontSize="22px"
            fontWeight={700}
            color="#272629"
            lineHeight={1}
          >
            {formatGHS(data?.final_price)}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            fontSize="13px"
            fontWeight={600}
            sx={{ textDecoration: "line-through" }}
          >
            {data?.discount_price
              ? formatGHS(data?.discount_amount)
              : formatGHS("0")}
          </Typography>
          <Chip
            label={statusLabels[data?.status]}
            size="sm"
            color={statusColors[data?.status]}
          />
        </Stack>
        <Typography
          color="rgb(100, 100, 120)"
          fontSize="12px"
          lineHeight={1.25}
        >
          {data?.description}
        </Typography>
        <Box borderTop="2px solid rgb(224, 224, 234)" />
        <Stack gap="20px">
          <LabelValue
            icon={CircleSmallFilled}
            label="Service Category"
            value={toTitleCase(data?.service_type_name)}
          />
          <LabelValue
            icon={CircleSmallFilled}
            label="Quantity"
            value={String(data?.quantity).padStart(3, "0")}
          />
          <LabelValue
            icon={CircleSmallFilled}
            label="Order At"
            value={formatDate(data?.created_at)}
          />
          <LabelValue
            icon={CircleSmallFilled}
            label="Last Updated"
            value={formatDate(data?.updated_at)}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
