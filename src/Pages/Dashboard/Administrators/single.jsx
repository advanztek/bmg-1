/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Chip,
  Divider,
  Avatar,
  Skeleton,
  Grid,
  Alert,
} from "@mui/material";
import {
  EditOutlined,
  DeleteOutlined,
  CalendarTodayOutlined,
  UpdateOutlined,
  PhoneOutlined,
  LocationOnOutlined,
  PersonOutlined,
  EmailOutlined,
  VerifiedOutlined,
} from "@mui/icons-material";
import { formatDate } from "../../../utils/functions";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useGetAdmin,
  useDeleteAdmin,
  useFetchAdmins,
} from "../../../Hooks/Dashboard/admins";
import {
  ConfirmDeleteModal,
  InputLabel,
  TimelineCard,
  InfoItem,
  CustomTab,
  DashboardTab,
} from "../../../Component";
import { showToast } from "../../../utils/toast";
import { styles } from "../../../styles/dashboard";
import { tabs } from "./data";
import {
  useUpdateAdminPermissions,
  useGetAdminPermissions,
} from "../../../Hooks/Dashboard/permissions";
import AdminPermissionsView from "../RolesPermissions/admin-permissions";
import EditAdminPermissions from "../RolesPermissions/edit-permissions";

const SingleAdminPage = () => {
  const navigate = useNavigate();
  const { adminData, loading: dataLoading, getAdmin } = useGetAdmin();
  const { refetch } = useFetchAdmins();
  const deleteAdmin = useDeleteAdmin();
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const { state } = location;
  const { adminId } = state || {};

  const [activeTab, setActiveTab] = useState(0);
  const [editPermissionsOpen, setEditPermissionsOpen] = useState(false);
  const {
    permissionsData,
    loading: permissionsLoading,
    getPermissions,
  } = useGetAdminPermissions();
  const { updatePermissions } = useUpdateAdminPermissions();

  useEffect(() => {
    if (adminId) {
      console.log("Fetching admin with ID:", adminId);
      getAdmin(adminId);
      getPermissions(adminId);
    }
  }, [open, adminId]);

  const handleEdit = () => {
    navigate(`/dashboard/edit/admin`, {
      state: { data: adminData },
    });
  };

  const handleConfirm = () => {
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    if (!adminData?.id) {
      showToast.error("Invalid administrator ID");
      return;
    }

    setLoading(true);
    try {
      const res = await deleteAdmin(adminData.id);
      if (res) {
        setOpenDelete(false);
        navigate("/dashboard/view/admins");
        await refetch();
        showToast.success("Administrator deleted successfully.");
      }
    } catch (error) {
      console.error(error);
      showToast.error("Failed to delete Administrator.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={styles.card}>
      <Box sx={{ p: 0, overflow: "auto" }}>
        {dataLoading ? (
          <Box sx={{ p: 4 }}>
            <Stack direction="row" spacing={3} alignItems="center" mb={3}>
              <Skeleton variant="circular" width={120} height={120} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="60%" height={40} />
                <Skeleton variant="text" width="40%" height={30} />
              </Box>
            </Stack>
            <Skeleton variant="rectangular" height={150} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={100} />
          </Box>
        ) : adminData ? (
          <>
            <Box
              sx={{
                bgcolor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                p: 4,
                pb: 6,
                borderRadius: "8px 8px 0 0",
              }}
            >
              <Stack direction="row" spacing={3} alignItems="center">
                <Box sx={{ position: "relative" }}>
                  <Avatar
                    src={adminData?.profile_image || adminData?.avatar}
                    alt={`${adminData?.first_name} ${adminData?.last_name}`}
                    sx={{
                      width: 120,
                      height: 120,
                      border: "4px solid white",
                      boxShadow: 3,
                    }}
                  >
                    <PersonOutlined sx={{ fontSize: 60 }} />
                  </Avatar>
                  {adminData?.is_verified && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 5,
                        right: 5,
                        bgcolor: "success.main",
                        borderRadius: "50%",
                        p: 0.5,
                        border: "3px solid white",
                      }}
                    >
                      <VerifiedOutlined sx={{ fontSize: 20, color: "white" }} />
                    </Box>
                  )}
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color="white"
                    sx={{ mb: 1 }}
                  >
                    {adminData?.first_name} {adminData?.last_name}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="rgba(255,255,255,0.9)"
                    mb={2}
                  >
                    @{adminData?.username || adminData?.email?.split("@")[0]}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip
                      label={adminData?.status ? "Active" : "Inactive"}
                      size="small"
                      color={adminData?.status ? "success" : "default"}
                      sx={{
                        fontWeight: 600,
                        bgcolor: adminData?.status
                          ? "success.main"
                          : "grey.500",
                        color: "white",
                      }}
                    />
                    {adminData?.is_verified && (
                      <Chip
                        label="Verified"
                        size="small"
                        icon={
                          <VerifiedOutlined
                            sx={{ fontSize: 16, color: "white !important" }}
                          />
                        }
                        sx={{
                          bgcolor: "rgba(76, 175, 80, 0.3)",
                          color: "white",
                          fontWeight: 600,
                          backdropFilter: "blur(10px)",
                        }}
                      />
                    )}
                  </Stack>
                  <Box sx={{ mt: 1 }}>
                    <InputLabel
                      text="Assigned Role(s)"
                      size="12px"
                      color="#fff"
                    />
                    {adminData?.sub_role_name &&
                    adminData?.sub_role_name.length > 0 ? (
                      <>
                        {adminData.sub_role_name.map((role, index) => (
                          <Chip
                            label={role}
                            size="small"
                            key={index}
                            sx={{
                              bgcolor: "rgba(255, 255, 255, 0.2)",
                              color: "white",
                              fontWeight: 600,
                              backdropFilter: "blur(10px)",
                              mt: 1,
                              mr: 1,
                            }}
                          />
                        ))}
                      </>
                    ) : (
                      <Alert severity="info">
                        Administrator has no assigned role.
                      </Alert>
                    )}
                  </Box>
                </Box>
              </Stack>
            </Box>
            <Box sx={{ mt: 4 }}>
              <CustomTab
                tabs={tabs}
                activeTab={activeTab}
                updateActiveTab={setActiveTab}
              />
            </Box>

            <DashboardTab tabKey={0} activeTab={activeTab}>
              <Box sx={{ p: 2 }}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="overline"
                    color="text.secondary"
                    fontWeight={600}
                    sx={{ letterSpacing: 1.2 }}
                  >
                    Contact Information
                  </Typography>
                  <Divider sx={{ mt: 1, mb: 2 }} />

                  <Grid container spacing={2}>
                    {adminData?.email && (
                      <Grid item size={{ xs: 12, md: 6 }}>
                        <InfoItem
                          icon={<EmailOutlined />}
                          label="Email Address"
                          value={adminData.email}
                        />
                      </Grid>
                    )}

                    {adminData?.phone && (
                      <Grid item size={{ xs: 12, md: 6 }}>
                        <InfoItem
                          icon={<PhoneOutlined />}
                          label="Phone"
                          value={adminData.phone}
                        />
                      </Grid>
                    )}

                    {adminData?.address_one && (
                      <Grid item size={{ xs: 12 }}>
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
                              bgcolor: "warning.light",
                              width: 40,
                              height: 40,
                              mr: 2,
                            }}
                          >
                            <LocationOnOutlined
                              sx={{ fontSize: 20, color: "warning.main" }}
                            />
                          </Avatar>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              fontWeight={600}
                            >
                              Address
                            </Typography>
                            <Typography variant="body2" fontWeight={500}>
                              {adminData?.address}
                              {adminData?.city && `, ${adminData?.city}`}
                              {adminData?.country && `, ${adminData?.country}`}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="overline"
                    color="text.secondary"
                    fontWeight={600}
                    sx={{ letterSpacing: 1.2 }}
                  >
                    Account Timeline
                  </Typography>
                  <Divider sx={{ mt: 1, mb: 2 }} />

                  <Stack spacing={2}>
                    <TimelineCard
                      icon={<CalendarTodayOutlined sx={{ fontSize: 20 }} />}
                      label="Joined Date"
                      value={formatDate(adminData.created_at)}
                    />

                    <TimelineCard
                      icon={<UpdateOutlined sx={{ fontSize: 20 }} />}
                      label="Last Activity Date"
                      value={formatDate(adminData.updated_at)}
                    />
                  </Stack>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="flex-end"
                  flexWrap="wrap"
                >
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => navigate(-1)}
                    sx={{ textTransform: "none", px: 3 }}
                  >
                    Go Back
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteOutlined />}
                    onClick={handleConfirm}
                    sx={{ textTransform: "none", px: 3 }}
                  >
                    Terminate
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<EditOutlined />}
                    onClick={handleEdit}
                    sx={{ textTransform: "none", px: 3 }}
                  >
                    Edit Admin
                  </Button>
                </Stack>
              </Box>
            </DashboardTab>

            <DashboardTab tabKey={1} activeTab={activeTab}>
              <Box sx={{ p: 2 }}>
                <AdminPermissionsView
                  permissions={permissionsData}
                  loading={permissionsLoading}
                  onEdit={() => setEditPermissionsOpen(true)}
                />
              </Box>
            </DashboardTab>

            <DashboardTab tabKey={2} activeTab={activeTab}>
              <Box>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Activity Log
                </Typography>
                <Alert severity="info">Activity log feature coming soon</Alert>
              </Box>
            </DashboardTab>
          </>
        ) : (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary">
              No user data found
            </Typography>
          </Box>
        )}
      </Box>

      <ConfirmDeleteModal
        open={openDelete}
        title="Delete Administrator"
        itemName={`${adminData?.first_name} ${adminData?.last_name}`}
        loading={loading}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />

      <EditAdminPermissions
        open={editPermissionsOpen}
        onClose={() => setEditPermissionsOpen(false)}
        permissions={permissionsData}
        adminData={adminData}
        onSave={async (data) => {
          await updatePermissions(adminId, data);
          await getPermissions(adminId);
        }}
      />
    </Box>
  );
};

export default SingleAdminPage;
