import { CircleSmallFilled, InfoFilled } from "@fluentui/react-icons";
import { Box, Stack, Typography } from "@mui/material";
import LabelValue from "./LabelValue";
import { formatDate } from "../../../../utils/functions";

export default function Requirement({ data }) {
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        // boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.25)",
        border: "1px solid rgb(224, 224, 234)",
        padding: { xs: "18px 14px", md: "22px 16px" },
        display: "flex",
        flexDirection: "column",
        gap: "22px",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography fontWeight={700} color="#2C3891" fontSize="18px">
          Requirements
        </Typography>
        <InfoFilled fontSize={30} color="#9f9fad" />
      </Stack>
      {data?.map((requirement, index) =>
        requirement?.value ? (
          <LabelValue
            key={index}
            icon={CircleSmallFilled}
            label={requirement?.label}
            value={
              requirement?.type === "text" ||
              requirement?.type === "number" ||
              requirement?.type === "radio"
                ? requirement?.value
                : requirement?.type === "date"
                  ? formatDate(requirement?.value)
                  : requirement?.type === "checkbox" ||
                      requirement?.type === "array"
                    ? requirement?.value?.join(" , ")
                    : "-"
            }
          />
        ) : null,
      )}
    </Box>
  );
}
