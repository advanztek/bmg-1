import { Box, Button, Stack, Typography } from "@mui/material";
import { STORAGE_URL } from "../../../../Config/paths";
import Chip from "../../../../Component/Chip";
import { toTitleCase } from "../../../../utils/functions";
import { formatGHS } from "../../../../utils/currency";
import { statusColors, statusLabels } from "./data";
import { useNavigate } from "react-router-dom";

export default function OrderItem({ data }) {
  const navigate = useNavigate();

  function previewOrderItem() {
    navigate("/dashboard/admin/order/item/details", {
      state: { details: data },
    });
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: "1fr", md: "1fr 3fr" }}
      gap="14px"
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "12px",
        // border: "1px solid rgb(224, 224, 234)",
        boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.25)",
        padding: { xs: "8px", md: "10px" },
      }}
    >
      <Box
        component="img"
        src={STORAGE_URL + "/" + data?.image}
        sx={{
          borderRadius: "8px",
          width: "100%",
          height: { xs: "auto", md: "100%" },
          objectFit: "cover",
          display: "block",
        }}
      />
      <Stack gap="10px">
        <Stack
          direction="row"
          alignItems="center"
          gap="8px"
          justifyContent="space-between"
        >
          <Typography
            color="#272629"
            fontSize="12px"
            fontWeight={600}
            lineHeight={1}
          >
            {data?.service_name}
          </Typography>
          <Chip
            label={statusLabels[data?.status]}
            size="sm"
            color={statusColors[data?.status]}
          />
        </Stack>

        <Typography
          fontSize="11px"
          fontWeight={600}
          color="rgb(100, 100, 120)"
        >{`${toTitleCase(data?.order_type)} • ${data?.quantity}X`}</Typography>

        <Typography
          color="rgb(150, 150, 170)"
          fontSize="12px"
          lineHeight={1.25}
        >
          {data?.description?.length > 70
            ? `${data?.description?.slice(0, 68)}...`
            : data?.description}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          gap="8px"
          justifyContent="space-between"
        >
          <Typography
            fontSize="16px"
            fontWeight={600}
            color="rgb(100, 100, 120)"
          >
            {formatGHS(data?.final_price)}
          </Typography>
          <Stack>
            <Button
              variant="contained"
              size="small"
              sx={{ borderRadius: "6px" }}
              onClick={previewOrderItem}
            >
              Preview
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
