import { Box } from "@mui/material";
import Details from "./Details";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Requirement from "./Requirement";
import Submissions from "./Submissions";

export default function ExpertOrderDetailsPage() {
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
      alignItems="start"
      gap="22px"
      sx={{
        "& *": {
          fontFamily: "Inter !important",
        },
      }}
    >
      <Details data={details} />
      <Requirement data={details?.requirements} />
      <Submissions />
    </Box>
  );
}
