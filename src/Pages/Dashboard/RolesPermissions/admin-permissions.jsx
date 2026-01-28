import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Stack,
  Chip,
  LinearProgress,
  Alert,
  Button,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  EditOutlined,
  Info,
  LockOutlined,
} from "@mui/icons-material";

const AdminPermissionsView = ({ permissions, onEdit, loading = false }) => {
  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <LinearProgress />
        <Typography
          variant="body2"
          color="text.secondary"
          mt={2}
          textAlign="center"
        >
          Loading permissions...
        </Typography>
      </Box>
    );
  }

  if (!permissions) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">
          No permissions data available for this administrator.
        </Alert>
      </Box>
    );
  }

  const permissionItems = [
    { key: "create", label: "Create", icon: <CheckCircle />, color: "success" },
    { key: "read", label: "Read", icon: <CheckCircle />, color: "info" },
    { key: "update", label: "Update", icon: <CheckCircle />, color: "warning" },
    { key: "delete", label: "Delete", icon: <Cancel />, color: "error" },
  ];

  const grantedPermissions = permissionItems.filter(
    (item) => permissions[item.key],
  ).length;
  const totalPermissions = permissionItems.length;
  const permissionPercentage = (grantedPermissions / totalPermissions) * 100;

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h6" fontWeight={600}>
            Access Permissions
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Current permission settings for this administrator
          </Typography>
        </Box>
        {onEdit && (
          <Button
            variant="contained"
            startIcon={<EditOutlined />}
            onClick={onEdit}
            sx={{
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Edit Permissions
          </Button>
        )}
      </Stack>

      {!permissions.status && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <LockOutlined fontSize="small" />
            <Typography variant="body2" fontWeight={600}>
              Permissions are currently inactive
            </Typography>
          </Stack>
        </Alert>
      )}

      <Card
        sx={{
          mb: 3,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        <CardContent>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="overline" sx={{ opacity: 0.9 }}>
                Permission Level
              </Typography>
              <Typography variant="h4" fontWeight={700}>
                {grantedPermissions} / {totalPermissions}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
                {permissionPercentage === 100
                  ? "Full Access Granted"
                  : permissionPercentage >= 75
                    ? "High Access Level"
                    : permissionPercentage >= 50
                      ? "Moderate Access"
                      : "Limited Access"}
              </Typography>
            </Box>
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                border: "6px solid rgba(255,255,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography variant="h4" fontWeight={700}>
                {Math.round(permissionPercentage)}%
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        {permissionItems.map((item) => {
          const isGranted = permissions[item.key];
          return (
            <Grid item size={{ xs: 6, md: 3 }} key={item.key}>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  borderWidth: 2,
                  borderColor: isGranted ? `${item.color}.main` : "grey.300",
                  bgcolor: isGranted ? `${item.color}.light` : "grey.50",
                  transition: "all 0.3s",
                  opacity: isGranted ? 1 : 0.6,
                }}
              >
                <CardContent>
                  <Stack spacing={2} alignItems="center" textAlign="center">
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        bgcolor: isGranted ? `${item.color}.main` : "grey.400",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                      }}
                    >
                      {React.cloneElement(item.icon, { fontSize: "large" })}
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {item.label}
                      </Typography>
                      <Chip
                        label={isGranted ? "Granted" : "Denied"}
                        size="small"
                        color={isGranted ? item.color : "default"}
                        sx={{ mt: 1, fontWeight: 600 }}
                      />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Card sx={{ mt: 3 }} variant="outlined">
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <Info color="info" />
            <Box flex={1}>
              <Typography variant="body2" color="text.secondary">
                <strong>Last Updated:</strong>{" "}
                {new Date(permissions.updated_at).toLocaleString()}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminPermissionsView;
