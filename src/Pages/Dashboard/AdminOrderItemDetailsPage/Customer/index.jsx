import {
  CheckmarkStarburstFilled,
  CircleSmallFilled,
} from "@fluentui/react-icons";
import { Box, Stack, Typography } from "@mui/material";
import LabelValue from "./LabelValue";
import { formatDate } from "../../../../utils/functions";
import { STORAGE_URL } from "../../../../Config/paths";

export default function Customer({ data }) {
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        // boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.25)",
        border: "1px solid rgb(224, 224, 234)",
        py: { xs: "20px", md: "34px" },
        px: { xs: "14px", md: "16px" },
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Stack gap="12px">
        <Stack alignItems="center" justifyContent="center">
          <Box
            sx={{
              width: "fit-content",
              padding: "4px",
              border: "2px solid rgb(224, 224, 234)",
              // boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.25)",
              borderRadius: "999px",
            }}
          >
            <Box
              component="img"
              src={
                data?.profile_picture
                  ? STORAGE_URL + "/" + data?.profile_picture
                  : "/avatar.png"
              }
              sx={{
                height: { xs: "60px", md: "80px" },
                width: { xs: "60px", md: "80px" },
                borderRadius: "999px",
                display: "block",
                position: "relative",
                userSelect: "none",
              }}
            />
          </Box>
        </Stack>
        <Stack alignItems="center" gap="6px">
          <Stack direction="row" alignItems="center" gap="4px">
            <Typography
              fontSize="16px"
              fontWeight={700}
              color="#272629"
              lineHeight={1}
            >
              {`${data?.first_name} ${data?.last_name}`}
            </Typography>
            {data?.is_verified && (
              <CheckmarkStarburstFilled fontSize={16} color="#2C3891" />
            )}
          </Stack>
          <Typography fontSize="14px" color="rgb(100, 100, 120)" lineHeight={1}>
            ~ Customer.
          </Typography>
        </Stack>
      </Stack>
      <Box borderTop="2px solid #2C3891" sx={{ width: "60px", mx: "auto" }} />
      <LabelValue icon={CircleSmallFilled} label="Email" value={data?.email} />
      <LabelValue icon={CircleSmallFilled} label="Phone" value={data?.phone} />
      <LabelValue
        icon={CircleSmallFilled}
        label="State"
        value={data?.state || "-"}
      />
      <LabelValue
        icon={CircleSmallFilled}
        label="City"
        value={data?.city || "-"}
      />
      <LabelValue
        icon={CircleSmallFilled}
        label="Country"
        value={data?.country || "-"}
      />
      <LabelValue
        icon={CircleSmallFilled}
        label="Joined At"
        value={formatDate(data?.created_at)}
      />
      <LabelValue
        icon={CircleSmallFilled}
        label="Last Updated"
        value={formatDate(data?.updated_at)}
      />
    </Box>
  );
}
