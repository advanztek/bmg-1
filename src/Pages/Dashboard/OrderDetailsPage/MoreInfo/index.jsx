import { Box } from "@mui/material";
import LabelValue from "./LabelValue";
import {
  CalendarClockFilled,
  CalendarEditFilled,
  CartFilled,
  DiversityFilled,
  GiftFilled,
  KeyMultipleFilled,
  MoneyFilled,
  QrCodeFilled,
  WalletCreditCardFilled,
} from "@fluentui/react-icons";
import {
  formatGHS,
  getFormattedDate,
  toTitleCase,
} from "../../../../utils/functions";

export default function MoreInfo({ data }) {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: "1fr", md: "repeat(2, 1fr)" }}
      gap="22px"
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        border: "1px solid rgb(224, 224, 234)",
        padding: { xs: "16px", md: "22px" },
      }}
    >
      <LabelValue
        icon={CartFilled}
        label="Order Number"
        value={data?.order_number}
      />
      <LabelValue
        icon={WalletCreditCardFilled}
        label="Payment Method"
        value={toTitleCase(data?.payment_method)}
      />
      <LabelValue
        icon={KeyMultipleFilled}
        label="Transaction ID"
        value={data?.payment_reference}
      />
      <LabelValue
        icon={DiversityFilled}
        label="Payment Channel"
        value={data?.payment_channel}
      />
      <LabelValue
        icon={GiftFilled}
        label="Discount"
        value={data?.discount ? formatGHS(data?.discount) : "0.000"}
      />
      <LabelValue
        icon={QrCodeFilled}
        label="Coupon Code"
        value={
          !data?.coupon_code || data?.coupon_code == "null"
            ? "-"
            : toTitleCase(data?.coupon_code)
        }
      />
      <LabelValue
        icon={CalendarClockFilled}
        label="Order At"
        value={getFormattedDate(data?.created_at)}
      />
      <LabelValue
        icon={CalendarEditFilled}
        label="Last Updated"
        value={getFormattedDate(data?.updated_at)}
      />
    </Box>
  );
}
