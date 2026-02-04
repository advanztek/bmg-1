import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import OrderItem from "./OrderItem";
import Overview from "./Overview";
import MoreInfo from "./MoreInfo";
import { ChevronLeft } from "@mui/icons-material";
import { useGetUserOrderDetails } from "../../../Hooks/Users/orders";

export default function CustomerOrderDetailsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.orderId) {
      navigate(-1);
    }
  }, [state]);

  const orderId = state?.orderId;

  const { data: details, loading } = useGetUserOrderDetails(orderId);

  function goBackToOrder() {
    navigate("/dashboard/user/orders");
  }

  function previewOrderItem(orderItem) {
    navigate("/dashboard/user/order/service", {
      state: { details: orderItem },
    });
  }

  return loading ? (
    <CircularProgress sx={{ display: "block", marginX: "auto" }} />
  ) : details ? (
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
        alignItems="start"
        gap="12px"
      >
        <MoreInfo data={details} />
        <Stack gap="22px">
          {details?.items?.map((orderItem, index) => (
            <OrderItem
              key={index}
              data={orderItem}
              onPreview={() => previewOrderItem(orderItem)}
            />
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
  ) : (
    "Data Not Foud!"
  );
}
