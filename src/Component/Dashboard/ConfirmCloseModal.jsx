import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Stack,
  Box,
  CircularProgress,
} from "@mui/material";
import { DeleteOutline, WarningAmberOutlined } from "@mui/icons-material";
import { CustomButton } from "../../Component";

const ConfirmCloseModal = ({
  open,
  title = "Close Confirmation",
  description = "You have unsaved changes. Are you sure you want to close?",
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "error.light",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WarningAmberOutlined color="error" />
          </Box>

          <Typography fontWeight={600}>{title}</Typography>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary" mt={1}>
          {description}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <CustomButton
          title="Cancel"
          variant="outlined"
          color="primary"
          onClick={onClose}
          sx={{ textTransform: "none", minWidth: 110 }}
        />

        <CustomButton
          title={"Confirm"}
          color="secondary"
          variant="filled"
          startIcon={<DeleteOutline />}
          onClick={onConfirm}
          sx={{ textTransform: "none", minWidth: 120 }}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmCloseModal;
