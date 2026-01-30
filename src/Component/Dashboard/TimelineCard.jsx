import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

const TimelineCard = ({ icon, value, label = "Last Activity" }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
        bgcolor: "grey.50",
        borderRadius: 2,
        border: "1px solid",
        borderColor: "grey.200",
      }}
    >
      <Avatar
        sx={{
          bgcolor: "primary.main",
          width: 40,
          height: 40,
          mr: 2,
        }}
      >
        {icon}
      </Avatar>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          {label}
        </Typography>
        <Typography variant="body2" fontWeight={500}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default TimelineCard;
