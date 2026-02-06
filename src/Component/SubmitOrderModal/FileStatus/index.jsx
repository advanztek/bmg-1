import { DismissFilled } from "@fluentui/react-icons";
import { Box, Stack, Typography } from "@mui/material";

export default function FileStatus({
  type,
  name,
  tag,
  onAction,
  ActionIcon = DismissFilled,
}) {
  const icons = {
    audio: "audio.webp",
    video: "video.webp",
    image: "image.webp",
    document: "document.webp",
  };

  return (
    <Stack
      direction="row"
      gap="12px"
      sx={{
        padding: "10px 14px",
        backgroundColor: "rgba(0, 0, 50, 0.05)",
        borderRadius: "10px",
      }}
    >
      <Box component="img" src={`/${icons[type]}`} height="36px" />
      <Stack flex={1}>
        <Typography fontWeight={600} fontSize="12px">
          {name.length > 30
            ? `${name.slice(0, 11)}...${name.slice(-10)}`
            : name}
        </Typography>
        <Typography fontWeight={500} fontSize="12px" color="rgb(100, 100, 120)">
          {tag}
        </Typography>
      </Stack>
      <ActionIcon
        fontSize={22}
        color="rgb(100, 100, 120)"
        style={{ cursor: "pointer" }}
        onClick={onAction}
      />
    </Stack>
  );
}
