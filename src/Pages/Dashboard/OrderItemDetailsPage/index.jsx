import { Box } from "@mui/material";
import Details from "./Details";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function OrderItemDetailsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.details) {
      navigate(-1);
    }
  }, [state]);

  const details = state?.details;

  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: "1fr", md: "repeat(3, 1fr)" }}
      gap="22px"
      sx={{
        "& *": {
          fontFamily: "Inter !important",
        },
      }}
    >
      <Details data={details} />
    </Box>
  );
}
