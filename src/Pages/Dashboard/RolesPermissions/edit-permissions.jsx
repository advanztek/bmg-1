import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  Switch,
  FormControlLabel,
  Stack,
  Alert,
  IconButton,
  Chip,
  Card,
  CardContent,
} from "@mui/material";
import {
  CloseOutlined,
  SaveOutlined,
  CheckCircle,
  Cancel,
  WarningAmber,
} from "@mui/icons-material";
import { showToast } from "../../../utils/toast";
import { CustomButton, ConfirmCloseModal } from "../../../Component";
import { useUpdateAdminPermissions } from "../../../Hooks/Dashboard/permissions";

const EditAdminPermissions = ({
  open,
  onClose,
  permissions,
  adminData,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    create: false,
    read: false,
    update: false,
    delete: false,
    status: false,
  });
  const [loading, setLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const { updatePermissions } = useUpdateAdminPermissions();
  const [openConfirm, setOpenConfirm] = useState(false);

  // ✅ FIX: Sync formData with permissions when modal opens
  useEffect(() => {
    if (permissions && open) {
      console.log("Syncing permissions to form:", permissions);
      setFormData({
        create: permissions.create ?? false,
        read: permissions.read ?? false,
        update: permissions.update ?? false,
        delete: permissions.delete ?? false,
        status: permissions.status ?? false,
      });
      setHasChanges(false); // Reset changes flag
    }
  }, [permissions, open]);

  console.log("Current formData:", formData);
  console.log("Received permissions:", permissions);

  const handleToggle = (field) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: !prev[field] };
      setHasChanges(true);
      return newData;
    });
  };

  const handleConfirm = () => {
    if (hasChanges) {
      setOpenConfirm(true);
    } else {
      onClose();
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updatePermissions(permissions.id, formData);
      await onSave(formData);
      showToast.success("Permissions updated successfully");
      setHasChanges(false);
      onClose();
    } catch (error) {
      console.error("Error updating permissions:", error);
      showToast.error("Failed to update permissions");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setHasChanges(false);
    setOpenConfirm(false);
  };

  const permissionItems = [
    {
      key: "create",
      label: "Create",
      description: "Allow creating new records and resources",
      icon: <CheckCircle />,
      color: "success",
    },
    {
      key: "read",
      label: "Read",
      description: "Allow viewing and accessing existing data",
      icon: <CheckCircle />,
      color: "info",
    },
    {
      key: "update",
      label: "Update",
      description: "Allow modifying and editing existing records",
      icon: <CheckCircle />,
      color: "warning",
    },
    {
      key: "delete",
      label: "Delete",
      description: "Allow removing records permanently",
      icon: <Cancel />,
      color: "error",
    },
  ];

  const grantedCount = Object.values(formData).filter(Boolean).length;

  return (
    <Dialog
      open={open}
      onClose={handleConfirm}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 },
      }}
    >
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h6" fontWeight={600}>
              Edit Permissions
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage access rights for {adminData?.first_name}{" "}
              {adminData?.last_name}
            </Typography>
          </Box>
          <IconButton onClick={handleConfirm} size="small">
            <CloseOutlined />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent dividers>
        {/* Status Toggle */}
        <Alert severity="info" sx={{ mb: 3 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              overflowX: "auto",
              "&::-webkit-scrollbar": {
                width: "0px",
              },
              px: { xs: 1, md: 5 },
            }}
          >
            <Box>
              <Typography variant="body2" fontWeight={600}>
                Permission Status
              </Typography>
              <Typography variant="caption">
                Enable or disable all permissions for this admin
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.status}
                  onChange={() => handleToggle("status")}
                  color="success"
                />
              }
              label={formData.status ? "Active" : "Inactive"}
              labelPlacement="start"
            />
          </Stack>
        </Alert>

        {/* Permission Cards */}
        <Stack spacing={2}>
          {permissionItems.map((item) => (
            <Card
              key={item.key}
              variant="outlined"
              sx={{
                borderWidth: 2,
                borderColor: formData[item.key]
                  ? `${item.color}.main`
                  : "grey.300",
                bgcolor: formData[item.key]
                  ? `${item.color}.light`
                  : "transparent",
                transition: "all 0.3s",
              }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    flex={1}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: formData[item.key]
                          ? `${item.color}.main`
                          : "grey.300",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box flex={1}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="body1" fontWeight={600}>
                          {item.label}
                        </Typography>
                        <Chip
                          label={formData[item.key] ? "Granted" : "Denied"}
                          size="small"
                          color={formData[item.key] ? item.color : "default"}
                        />
                      </Stack>
                      <Typography variant="caption" color="text.secondary">
                        {item.description}
                      </Typography>
                    </Box>
                  </Stack>
                  <Switch
                    checked={formData[item.key]}
                    onChange={() => handleToggle(item.key)}
                    color={item.color}
                  />
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Summary */}
        <Card sx={{ mt: 3, bgcolor: "primary.light" }}>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2}>
              <WarningAmber color="primary" />
              <Box flex={1}>
                <Typography variant="body2" fontWeight={600}>
                  {grantedCount} of 5 permissions enabled
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Changes will take effect immediately after saving
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </DialogContent>

      <DialogActions sx={{ p: 2.5 }}>
        <CustomButton
          title="Cancel"
          color="danger"
          variant="outlined"
          startIcon={<CloseOutlined />}
          onClick={handleConfirm}
          sx={{ textTransform: "none", px: 4 }}
        />
        <Button
          variant="contained"
          startIcon={<SaveOutlined />}
          onClick={handleSave}
          disabled={!hasChanges || loading}
          sx={{ textTransform: "none", px: 3 }}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>

      <ConfirmCloseModal
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleClose}
      />
    </Dialog>
  );
};

export default EditAdminPermissions;
