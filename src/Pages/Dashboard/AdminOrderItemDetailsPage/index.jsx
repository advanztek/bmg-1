import { Box, CircularProgress, Stack } from "@mui/material";
import Details from "./Details";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetUserDetails } from "../../../Hooks/Dashboard/users";
import Customer from "./Customer";
import Expert from "./Expert";
import Requirement from "./Requirement";
import {
  useGetExpert,
  useGetExpertsByService,
} from "../../../Hooks/Dashboard/experts";
import AssignCTA from "./AssignCTA";
import Assign from "./Assign";
import ExpertsCTA from "./ExpertsCTA";

export default function AdminOrderItemDetailsPage() {
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
  const { expertData: expert, loading: expertLoading } = useGetExpert(
    details?.expert_id,
  );
  const { data: experts, loading: expertsLoading } = useGetExpertsByService(
    details?.service_id,
  );

  const [assignOpen, setAssignOpen] = useState(false);

  function openAssign() {
    setAssignOpen(true);
  }

  function goToAddExpert() {
    navigate("/dashboard/admin/add/experts");
  }

  function goToOrders() {
    navigate("/dashboard/admin/orders");
  }

  return customerDetailsLoading || expertLoading || expertsLoading ? (
    <CircularProgress sx={{ display: "block", marginX: "auto" }} />
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
      <Customer data={customerDetails} />
      <Stack gap="22px">
        <Requirement data={details?.requirements} />
        {expert && <Expert data={expert} />}
        {/* check if not assigned */}
        {!expert && !assignOpen && <AssignCTA onAssign={openAssign} />}
        {!expert && assignOpen && experts?.length > 0 && (
          <Assign
            experts={experts}
            orderId={details?.order_id}
            orderItemId={details?.id}
            onSuccess={goToOrders}
          />
        )}
        {!expert &&
          details?.status == "pending" &&
          assignOpen &&
          experts?.length < 1 && <ExpertsCTA onAdd={goToAddExpert} />}
      </Stack>
    </Box>
  );
}
