import { Stack, Typography } from "@mui/material";
import { toTitleCase } from "../../../../utils/functions";
import { statusColors } from "./data";
import { formatGHS } from "../../../../utils/currency";
import Chip from "../../../../Component/Chip";

export default function Overview({ data }) {
  return (
    <Stack
      direction="row"
      gap="22px"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "12px",
        boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.25)",
        padding: { xs: "16px 20px", md: "22px 42px" },
      }}
    >
      <Stack gap="10px">
        <Stack gap="8px">
          <Typography
            fontSize={{ xs: "18px", md: "24px" }}
            fontWeight={600}
            color="#272629"
            lineHeight={1}
          >
            {formatGHS(data?.subtotal)}
          </Typography>
          <Typography
            fontSize="12px"
            fontWeight={600}
            lineHeight={1}
            color="rgb(150, 150, 170)"
          >
            TOTAL ORDER
          </Typography>
        </Stack>
      </Stack>

      <Stack>
        <Typography
          color="rgb(150, 150, 170)"
          fontSize={{ xs: "14px", md: "16px" }}
          fontWeight={600}
        >
          Status
        </Typography>
        <Chip
          label={toTitleCase(data?.status)}
          color={statusColors[data?.status]}
        />
      </Stack>
    </Stack>
  );
}
