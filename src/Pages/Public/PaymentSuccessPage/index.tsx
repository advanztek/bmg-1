import { Box, Button, Stack, useTheme } from "@mui/material";
import styles from "./style";
import Header from "./Header";

import Details from "./Details";

export default function PaymentSuccessPage() {
  const theme = useTheme();

  return (
    <Box sx={styles.wrap}>
      <Stack gap="8px" alignItems="center">
        <Box component="img" src="/Logo/Logo.png" height="36px" />
      </Stack>
      <Box
        sx={[
          styles.card,
          {
            border: `1px solid ${theme.palette.divider}`,
          },
        ]}
      >
        <Header />
        <Details />
        <Stack gap="8px">
          <Button
            variant="contained"
            sx={[
              styles.button,
              {
                backgroundColor: "#000000",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#202020",
                },
              },
            ]}
          >
            Download Receipt
          </Button>
          <Button
            variant="contained"
            sx={[
              styles.button,
              {
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                border: "1px solid rgba(0, 0, 0, 0.07)",
                color: "#606060",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.06)",
                },
              },
            ]}
          >
            Go Back
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
