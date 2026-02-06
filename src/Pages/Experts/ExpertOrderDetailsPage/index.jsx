import { Box, Button, Stack } from "@mui/material";
import Details from "./Details";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Requirement from "./Requirement";
import Submissions from "./Submissions";
import {
  useGetExpertOrderSubmissions,
  useRespondToOrder,
} from "../../../Hooks/experts/orders";
import BrandLoader from "../../../Component/BrandLoader";

export default function ExpertOrderDetailsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.details) {
      navigate(-1);
    }
  }, [state]);

  const details = state?.details;

  console.log("Order Details ");
  console.log(details);

  const { loading: orderSubmissionsLoading, data: orderSubmissions } =
    useGetExpertOrderSubmissions(details?.order_item_id);

  const { respondToOrder, loading: responseLoading } = useRespondToOrder();
  const [responseAction, setResponseAction] = useState("");

  async function submitOrderResponse(action = "") {
    const confirmed = confirm(
      `Are you sure you want to mark this order as ${action.toUpperCase()}?`,
    );
    if (!confirmed) return;
    setResponseAction(action);
    const response = await respondToOrder({
      action,
      order_item_id: details?.order_item_id,
    });

    if (response) {
      setResponseAction("");
      navigate("/dashboard/expert/orders");
    }
  }

  return orderSubmissionsLoading ? (
    <BrandLoader />
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
      <Details data={details} />
      <Requirement data={details?.requirements || []} />
      <Stack gap="22px">
        <Submissions
          data={orderSubmissions?.submissions}
          orderDetails={details}
        />
        {details?.status !== "accepted" && details?.status !== "rejected" && (
          <Stack direction="row" gap="12px" justifyContent="end">
            <Button
              variant="contained"
              loading={responseAction == "accepted" && responseLoading}
              disabled={responseLoading}
              onClick={() => submitOrderResponse("accepted")}
            >
              Accept
            </Button>
            <Button
              color="error"
              variant="contained"
              loading={responseAction == "rejected" && responseLoading}
              disabled={responseLoading}
              onClick={() => submitOrderResponse("rejected")}
            >
              Reject
            </Button>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
