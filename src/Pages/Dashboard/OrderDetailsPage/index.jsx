import { Box, Button, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import OrderItem from "./OrderItem";
import Overview from "./Overview";
import MoreInfo from "./MoreInfo";
import { ChevronLeft } from "@mui/icons-material";

export default function OrderDetailsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.details) {
      navigate(-1);
    }
  }, [state]);

  const details = state?.details;

  function goBackToOrder() {
    navigate("/dashboard/admin/orders");
  }

  return (
    <Stack
      gap="22px"
      sx={{
        "& *": {
          fontFamily: "Inter !important",
        },
      }}
    >
      <Overview data={details} />

      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "2fr 1fr" }}
        gap="12px"
      >
        <Box>
          <MoreInfo data={details} />
        </Box>
        <Stack gap="22px">
          {details?.items?.map((orderItem, index) => (
            <OrderItem key={index} data={orderItem} />
          ))}
          <Stack alignItems="end">
            <Button
              variant="contained"
              startIcon={<ChevronLeft />}
              onClick={goBackToOrder}
            >
              Go Back
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
