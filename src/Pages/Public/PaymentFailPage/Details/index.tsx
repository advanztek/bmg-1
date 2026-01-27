import { Box, useTheme } from "@mui/material";
import LabelValue from "./LabelValue";

export default function Details() {
  const theme = useTheme();
  return (
    <Box borderRadius="20px">
      <LabelValue label="Amount" bb>
        $24.98
      </LabelValue>
      <LabelValue label="Transaction ID">TXN-789123456</LabelValue>
      <LabelValue label="Payment Method">**** 4242</LabelValue>
      <LabelValue label="Date">Dec 15, 2024</LabelValue>
      <LabelValue label="Merchant">TechStore Pro</LabelValue>
    </Box>
  );
}
