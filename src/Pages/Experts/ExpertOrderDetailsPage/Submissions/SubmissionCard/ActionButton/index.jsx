import { FolderLinkFilled } from "@fluentui/react-icons";
import { Stack, Typography } from "@mui/material";

export default function ActionButton({
  tag = "Link to your order",
  caption = "Click link to access your order",
  icon: Icon = FolderLinkFilled,
  onClick,
}) {
  return (
    <Stack
      component="div"
      alignItems="center"
      justifyContent="center"
      // border="1px dashed #e0e0ea"
      // bgcolor="#ffffff"
      border="1px dashed rgba(0, 0, 0, 0.07)"
      bgcolor="rgba(0, 0, 0, 0.05)"
      py="22px"
      overflow="hidden"
      gap="8px"
      sx={{ cursor: "pointer" }}
      borderRadius="14px"
      onClick={onClick}
    >
      <Icon fontSize={42} color="#2C3891" />

      <Stack alignItems="center" gap="4px">
        <Typography
          fontSize="14px"
          fontWeight={600}
          sx={{ userSelect: "none" }}
        >
          {tag}
        </Typography>

        <Typography
          variant="body2"
          color="rgb(100, 100, 120)"
          sx={{ userSelect: "none" }}
          fontSize="12px"
        >
          {caption}
        </Typography>
      </Stack>
    </Stack>
  );
}
