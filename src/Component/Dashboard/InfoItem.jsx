import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

const InfoItem = ({ icon, value, label = "Admin Email" }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
        bgcolor: "grey.50",
        borderRadius: 2,
      }}
    >
      <Avatar
        sx={{
          bgcolor: "primary.light",
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

export default InfoItem;
