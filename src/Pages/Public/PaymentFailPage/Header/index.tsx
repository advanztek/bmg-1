import { DismissCircleFilled } from "@fluentui/react-icons";
import { Box, Stack, Typography } from "@mui/material";
import { FONT_FAMILY } from "../../../../Config/font";

export default function Header() {
  return (
    <Stack gap="8px" alignItems="center">
      <DismissCircleFilled fontSize={52} color="rgba(255, 0, 0, 0.5)" />
      <Box>
        <Typography
          fontSize="16px"
          color="rgb(129, 0, 0)"
          fontWeight={800}
          letterSpacing="1px"
          textAlign="center"
          fontFamily={FONT_FAMILY.tertiary}
          lineHeight={2}
        >
          Payment Failed!
        </Typography>
        <Typography
          color="rgba(0, 0, 0, 0.4)"
          fontFamily={FONT_FAMILY.tertiary}
          textAlign="center"
          fontSize="14px"
          lineHeight={1.5}
        >
          Your payment has been processed successfully. You will receive a
          confirmation email shortly.
        </Typography>
      </Box>
    </Stack>
  );
}
