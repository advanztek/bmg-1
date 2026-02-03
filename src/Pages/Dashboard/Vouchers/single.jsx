/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Divider,
  Stack,
  Avatar,
  Button,
  Chip,
  Skeleton,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import {
  CloseOutlined,
  CalendarTodayOutlined,
  UpdateOutlined,
  DeleteOutlined,
  LocalOfferOutlined,
  PercentOutlined,
  AttachMoneyOutlined,
  EventAvailableOutlined,
  EventBusyOutlined,
  PublicOutlined,
  PersonOutlined,
  ConfirmationNumberOutlined,
} from "@mui/icons-material";
import {
  formatDate,
  getDiscountDisplay,
  isActive,
  getUsagePercentage,
} from "../../../utils/functions";
import { showToast } from "../../../utils/toast";
import { ConfirmDeleteModal, InfoItem, TimelineCard } from "../../../Component";
import {
  useFetchCoupons,
  useGetCoupon,
  useDeleteCoupon,
} from "../../../Hooks/Dashboard/coupons";

const SingleVoucherModal = ({ open, onClose, voucherId }) => {
  const { data, getCoupon, loading: couponLoading } = useGetCoupon();
  const { refetch } = useFetchCoupons();
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const deleteCoupon = useDeleteCoupon();

  useEffect(() => {
    if (open && voucherId) {
      getCoupon(voucherId);
    }
  }, [open, voucherId]);

  const handleConfirm = () => {
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    if (!data?.id) {
      showToast.error("Invalid coupon ID");
      return;
    }

    setLoading(true);
    try {
      const res = await deleteCoupon(data.id);
      if (res) {
        setOpenDelete(false);
        onClose();
        await refetch();
        showToast.success("Coupon deleted successfully.");
      }
    } catch (error) {
      console.error(error);
      showToast.error("Failed to delete coupon.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: "90vh",
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 16,
          top: 16,
          zIndex: 1,
          bgcolor: "rgba(255,255,255,0.95)",
          boxShadow: 3,
          "&:hover": {
            bgcolor: "error.light",
            color: "white",
            transform: "scale(1.1)",
          },
          transition: "all 0.3s ease",
        }}
      >
        <CloseOutlined />
      </IconButton>

      <DialogContent sx={{ p: 0 }}>
        {couponLoading ? (
          <Box sx={{ p: 4 }}>
            <Skeleton
              variant="rectangular"
              height={200}
              sx={{ mb: 2, borderRadius: 2 }}
            />
            <Skeleton variant="text" width="40%" height={30} sx={{ mb: 3 }} />
            <Skeleton
              variant="rectangular"
              height={120}
              sx={{ mb: 3, borderRadius: 2 }}
            />
            <Stack spacing={2}>
              <Skeleton
                variant="rectangular"
                height={80}
                sx={{ borderRadius: 2 }}
              />
              <Skeleton
                variant="rectangular"
                height={80}
                sx={{ borderRadius: 2 }}
              />
            </Stack>
          </Box>
        ) : !data ? (
          <Box sx={{ p: 6, textAlign: "center" }}>
            <LocalOfferOutlined
              sx={{ fontSize: 80, color: "grey.300", mb: 2 }}
            />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Coupon not found
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              The requested coupon could not be loaded
            </Typography>
            <Button variant="outlined" onClick={onClose}>
              Close
            </Button>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                background: isActive()
                  ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  : "linear-gradient(135deg, #757575 0%, #424242 100%)",
                p: 4,
                pb: 5,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
                  <Chip
                    label={isActive(data) ? "Active" : "Inactive"}
                    size="small"
                    sx={{
                      bgcolor: isActive(data) ? "#4caf50" : "#f44336",
                      color: "white",
                      fontWeight: 600,
                    }}
                  />
                  <Chip
                    icon={
                      data.applies_to === "global" ? (
                        <PublicOutlined />
                      ) : (
                        <PersonOutlined />
                      )
                    }
                    label={
                      data.applies_to === "global"
                        ? "Global Coupon"
                        : "Specific Target"
                    }
                    size="small"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      color: "white",
                      fontWeight: 600,
                      backdropFilter: "blur(10px)",
                    }}
                  />
                  <Chip
                    label={`ID: ${data.id}`}
                    size="small"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      color: "white",
                      fontWeight: 600,
                      backdropFilter: "blur(10px)",
                    }}
                  />
                </Stack>

                <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                  <ConfirmationNumberOutlined
                    sx={{ fontSize: 40, color: "white" }}
                  />
                  <Typography
                    variant="h3"
                    fontWeight={700}
                    color="white"
                    sx={{
                      textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                      letterSpacing: 2,
                    }}
                  >
                    {data.code}
                  </Typography>
                </Stack>

                <Box
                  sx={{
                    display: "inline-block",
                    bgcolor: "rgba(255,255,255,0.95)",
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color="primary.main"
                  >
                    {getDiscountDisplay(data)}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ p: 4 }}>
              {/* Discount Details */}
              <Typography
                variant="overline"
                fontWeight={700}
                color="text.secondary"
                sx={{ letterSpacing: 1.2 }}
              >
                Discount Details
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2} mb={3}>
                <Grid item size={{ xs: 12, sm: 6 }}>
                  <Card
                    sx={{
                      border: "2px solid #e3f2fd",
                      borderRadius: 2,
                      boxShadow: "none",
                    }}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar sx={{ bgcolor: "#1976d2" }}>
                          {data.discount_type === "percentage" ? (
                            <PercentOutlined />
                          ) : (
                            <AttachMoneyOutlined />
                          )}
                        </Avatar>
                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight={600}
                          >
                            Discount Type
                          </Typography>
                          <Typography
                            variant="body1"
                            fontWeight={700}
                            sx={{ textTransform: "capitalize" }}
                          >
                            {data.discount_type}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item size={{ xs: 12, sm: 6 }}>
                  <Card
                    sx={{
                      border: "2px solid #fff3e0",
                      borderRadius: 2,
                      boxShadow: "none",
                    }}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar sx={{ bgcolor: "#f57c00" }}>
                          <AttachMoneyOutlined />
                        </Avatar>
                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight={600}
                          >
                            Max Discount
                          </Typography>
                          <Typography variant="body1" fontWeight={700}>
                            ${parseFloat(data.discount_max_amount).toFixed(2)}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Typography
                variant="overline"
                fontWeight={700}
                color="text.secondary"
                sx={{ letterSpacing: 1.2 }}
              >
                Validity Period
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2} mb={3}>
                <Grid item size={{ xs: 12, sm: 6 }}>
                  <Card
                    sx={{
                      border: "2px solid #e8f5e9",
                      borderRadius: 2,
                      boxShadow: "none",
                    }}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar sx={{ bgcolor: "#4caf50" }}>
                          <EventAvailableOutlined />
                        </Avatar>
                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight={600}
                          >
                            Start Date
                          </Typography>
                          <Typography variant="body1" fontWeight={700}>
                            {formatDate(data.start_date)}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item size={{ xs: 12, sm: 6 }}>
                  <TimelineCard
                    icon={<CalendarTodayOutlined sx={{ fontSize: 20 }} />}
                    label="Joined Date"
                    value={formatDate(data.created_at)}
                  />{" "}
                  <Card
                    sx={{
                      border: "2px solid #ffebee",
                      borderRadius: 2,
                      boxShadow: "none",
                    }}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar sx={{ bgcolor: "#f44336" }}>
                          <EventBusyOutlined />
                        </Avatar>
                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight={600}
                          >
                            End Date
                          </Typography>
                          <Typography variant="body1" fontWeight={700}>
                            {formatDate(data.end_date)}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Typography
                variant="overline"
                fontWeight={700}
                color="text.secondary"
                sx={{ letterSpacing: 1.2 }}
              >
                Usage Statistics
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2} mb={3}>
                <Grid item size={{ xs: 12, sm: 6 }} md={3}>
                  <Box
                    sx={{
                      p: 2.5,
                      bgcolor: "#f3f0ff",
                      borderRadius: 2,
                      border: "2px solid #d1c4e9",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h4" fontWeight={700} color="#764ba2">
                      {data.used_count}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      Times Used
                    </Typography>
                  </Box>
                </Grid>

                <Grid item size={{ xs: 12, sm: 6 }} md={3}>
                  <Box
                    sx={{
                      p: 2.5,
                      bgcolor: "#e3f2fd",
                      borderRadius: 2,
                      border: "2px solid #bbdefb",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h4" fontWeight={700} color="#1976d2">
                      {data.usage_limit}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      Usage Limit
                    </Typography>
                  </Box>
                </Grid>

                <Grid item size={{ xs: 12, sm: 6 }} md={3}>
                  <Box
                    sx={{
                      p: 2.5,
                      bgcolor: "#fff3e0",
                      borderRadius: 2,
                      border: "2px solid #ffb74d",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h4" fontWeight={700} color="#f57c00">
                      {data.per_user_limit}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      Per User Limit
                    </Typography>
                  </Box>
                </Grid>

                <Grid item size={{ xs: 12, sm: 6 }} md={3}>
                  <Box
                    sx={{
                      p: 2.5,
                      bgcolor: "#e8f5e9",
                      borderRadius: 2,
                      border: "2px solid #81c784",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h4" fontWeight={700} color="#4caf50">
                      {getUsagePercentage(data).toFixed(0)}%
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      Usage Rate
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {data.target_id && (
                <>
                  <Typography
                    variant="overline"
                    fontWeight={700}
                    color="text.secondary"
                    sx={{ letterSpacing: 1.2 }}
                  >
                    Target Information
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Card
                    sx={{
                      border: "2px solid #f0f4ff",
                      borderRadius: 2,
                      mb: 3,
                    }}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Typography variant="body1" fontWeight={600}>
                        Target ID: {data.target_id}
                      </Typography>
                    </CardContent>
                  </Card>
                </>
              )}

              <Typography
                variant="overline"
                fontWeight={700}
                color="text.secondary"
                sx={{ letterSpacing: 1.2 }}
              >
                Timeline
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Stack spacing={2} mb={3}>
                <Card
                  sx={{
                    borderRadius: 2,
                    border: "1px solid #e0e0e0",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        <CalendarTodayOutlined />
                      </Avatar>
                      <Box>
                        <Typography
                          variant="caption"
                          fontWeight={600}
                          color="text.secondary"
                        >
                          Created At
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {formatDate(data.created_at)}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>

                <Card
                  sx={{
                    borderRadius: 2,
                    border: "1px solid #e0e0e0",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar sx={{ bgcolor: "success.main" }}>
                        <UpdateOutlined />
                      </Avatar>
                      <Box>
                        <Typography
                          variant="caption"
                          fontWeight={600}
                          color="text.secondary"
                        >
                          Last Updated
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {formatDate(data.updated_at)}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="flex-end"
              >
                <Button
                  variant="outlined"
                  onClick={onClose}
                  sx={{
                    textTransform: "none",
                    px: 3,
                    borderRadius: 2,
                    fontWeight: 600,
                  }}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteOutlined />}
                  onClick={handleConfirm}
                  sx={{
                    textTransform: "none",
                    px: 3,
                    borderRadius: 2,
                    fontWeight: 600,
                  }}
                >
                  Delete Coupon
                </Button>
              </Stack>
            </Box>
          </>
        )}
      </DialogContent>

      <ConfirmDeleteModal
        open={openDelete}
        title="Delete Coupon"
        itemName={`${data?.code}`}
        loading={loading}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
    </Dialog>
  );
};

export default SingleVoucherModal;
