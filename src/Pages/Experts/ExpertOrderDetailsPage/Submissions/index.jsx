import { CheckmarkCircleFilled, InfoFilled } from "@fluentui/react-icons";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { SubmitOrderModal } from "../../../../Component";
import SubmissionCard from "./SubmissionCard";

export default function Submissions({ data, orderDetails }) {
  const [submitOpen, setSubmitOpen] = useState(false);
  const [selectedSubmitHead, setSelectedSubmitHead] = useState(null);

  function handleOrderSubmitSuccess() {
    setSubmitOpen(false);
    setSelectedSubmitHead(null);
    navigate("/dashboard/expert/orders");
  }

  function openSubmitModal(submitHead) {
    setSelectedSubmitHead(submitHead);
    setSubmitOpen(true);
  }

  function closeSubmitModal() {
    setSelectedSubmitHead(null);
    setSubmitOpen(false);
  }

  return (
    <>
      <Box
        sx={{
          // backgroundColor: "#FFFFFF",
          // borderRadius: "16px",
          // border: "1px solid rgb(224, 224, 234)",
          // padding: { xs: "18px 14px", md: "22px 16px" },
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography fontWeight={700} color="#2C3891" fontSize="18px">
            Submissions
          </Typography>
          <CheckmarkCircleFilled fontSize={30} color="#9f9fad" />
        </Stack>

        {data &&
          data?.length > 0 &&
          data?.map((item, index) => (
            <SubmissionCard
              key={index}
              data={item}
              onSubmit={() => openSubmitModal(item)}
            />
          ))}

        {!data && (
          <Stack alignItems="center" justifyContent="center" gap="16px">
            <InfoFilled fontSize={64} color="#ced7d8" />
            <Typography
              fontSize="14px"
              textAlign="center"
              color="rgb(150, 150, 170)"
              width={{ xs: "95%", md: "80%" }}
            >
              Your client is waiting!
            </Typography>
            <Button
              variant="contained"
              sx={{ borderRadius: "10px" }}
              onClick={() => openSubmitModal(null)}
            >
              Submit
            </Button>
          </Stack>
        )}
      </Box>

      <SubmitOrderModal
        open={submitOpen}
        onClose={closeSubmitModal}
        orderDetails={orderDetails}
        submitHeadId={selectedSubmitHead?.id}
        onSuccess={handleOrderSubmitSuccess}
      />
    </>
  );
}
