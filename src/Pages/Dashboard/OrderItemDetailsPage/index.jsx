import { Box, Stack } from "@mui/material";
import Details from "./Details";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGetUserDetails } from "../../../Hooks/Dashboard/users";
import Customer from "./Customer";
import Expert from "./Expert";

export default function OrderItemDetailsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.details || !state?.customerId) {
      navigate(-1);
    }
  }, [state]);

  const details = state?.details;
  const { data: customerDetails, loading: customerDetailsLoading } =
    useGetUserDetails(state?.customerId);

  console.log("customer details");
  console.log(customerDetails);

  return customerDetailsLoading ? (
    "..."
  ) : (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: "1fr", md: "repeat(3, 1fr)" }}
      alignItems="start"
      gap="22px"
      sx={{
        "& *": {
          fontFamily: "Inter !important",
        },
      }}
    >
      <Stack gap="22px">
        <Details data={details} />
      </Stack>

      <Customer data={customerDetails} />
      <Expert data={customerDetails} />
    </Box>
  );
}
