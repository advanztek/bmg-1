import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  IconButton,
  Button,
  Stack,
  Grid,
  Box,
  Input,
  FormControl,
  Select,
  MenuItem,
  Skeleton,
  CircularProgress, 
} from "@mui/material";
import {
  CloseOutlined,
  SaveOutlined,
  LocalOfferOutlined,
  PercentOutlined,
  AttachMoneyOutlined,
} from "@mui/icons-material";
import { CustomButton, InputLabel } from "../../../Component";
import { showToast } from "../../../utils/toast";
import {
  useUpdateCoupon,
  useFetchCoupons,
  useGetCoupon,
} from "../../../Hooks/Dashboard/coupons";

const EditCouponModal = ({ open, onClose, couponId }) => {
  const { data, getCoupon, loading: couponLoading } = useGetCoupon();
  const { refetch } = useFetchCoupons();
  const [loading, setLoading] = useState(false);
  const updateCoupon = useUpdateCoupon();

  const [form, setForm] = useState({
    code: "",
    discount_type: "percentage",
    discount_value: "",
    discount_max_amount: "",
    start_date: "",
    end_date: "",
    usage_limit: "",
    per_user_limit: "",
    applies_to: "global",
    target_id: "",
    status: true,
  });

  useEffect(() => {
    if (open && couponId) {
      getCoupon(couponId);
    }
  }, [open, couponId]);

  useEffect(() => {
    if (data) {
      // Format dates for datetime-local input
      const formatDateForInput = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
      };

      setForm({
        discount_type: data.discount_type || "percentage",
        discount_value: data.discount_value || "",
        discount_max_amount: data.discount_max_amount || "",
        start_date: formatDateForInput(data.start_date),
        end_date: formatDateForInput(data.end_date),
      });
    }
  }, [data]);

  const handleChange = (field) => (e) => {
    const value = field === "status" ? e.target.checked : e.target.value;
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.discount_value || parseFloat(form.discount_value) <= 0) {
      showToast.warning("Please enter a valid discount value");
      return;
    }

    if (!form.start_date || !form.end_date) {
      showToast.warning("Please select start and end dates");
      return;
    }

    if (new Date(form.start_date) >= new Date(form.end_date)) {
      showToast.warning("End date must be after start date");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        discount_type: form.discount_type,
        discount_value: parseFloat(form.discount_value),
        discount_max_amount: form.discount_max_amount
          ? parseFloat(form.discount_max_amount)
          : null,
        start_date: new Date(form.start_date).toISOString(),
        end_date: new Date(form.end_date).toISOString(),
      };

      const res = await updateCoupon(couponId, payload);
      if (res) {
        showToast.success("Coupon updated successfully");
        onClose();
        await refetch();
      }
    } catch (error) {
      console.error(error);
      showToast.error("Failed to update coupon");
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
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 16,
          top: 16,
          zIndex: 1,
          bgcolor: "rgba(255,255,255,0.9)",
          "&:hover": { bgcolor: "error.light", color: "white" },
        }}
      >
        <CloseOutlined />
      </IconButton>

      <DialogContent sx={{ p: 4 }}>
        {couponLoading || !data ? (
          <Stack spacing={2}>
            <Skeleton height={40} width="60%" />
            <Skeleton height={60} />
            <Skeleton height={60} />
            <Skeleton height={60} />
            <Skeleton height={80} />
          </Stack>
        ) : (
          <>
            {/* Header */}
            <Stack direction="row" alignItems="center" spacing={2} mb={1}>
              <LocalOfferOutlined
                sx={{ fontSize: 32, color: "primary.main" }}
              />
              <Typography variant="h5" fontWeight={700}>
                Edit Coupon
              </Typography>
            </Stack>

            <Typography variant="body2" color="text.secondary" mb={3}>
              Update coupon details and discount settings
            </Typography>

            <Box component="form" mt={3}>
              <Grid container spacing={3}>
                {/* Coupon Code */}
                <Grid item size={{ xs: 12, md: 6 }}>
                  <InputLabel text="Coupon Code *" />
                  <Input
                    disableUnderline
                    fullWidth
                    placeholder="e.g., SUMMER2024"
                    value={form.code}
                    onChange={handleChange("code")}
                    disabled
                    sx={{
                      border: "1px solid #e0e0e0",
                      borderRadius: 1,
                      px: 2,
                      py: 1.5,
                      fontSize: "14px",
                      bgcolor: "#f5f5f5",
                    }}
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    Coupon code cannot be changed
                  </Typography>
                </Grid>

                <Grid item size={{ xs: 12, md: 6 }}>
                  <InputLabel text="Discount Type *" />
                  <FormControl fullWidth>
                    <Select
                      value={form.discount_type}
                      onChange={handleChange("discount_type")}
                      displayEmpty
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                      }}
                    >
                      <MenuItem value="percentage">
                        <Stack direction="row" spacing={1} alignItems="center">
                          <PercentOutlined fontSize="small" />
                          <span>Percentage</span>
                        </Stack>
                      </MenuItem>
                      <MenuItem value="fixed">
                        <Stack direction="row" spacing={1} alignItems="center">
                          <AttachMoneyOutlined fontSize="small" />
                          <span>Fixed Amount</span>
                        </Stack>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item size={{ xs: 12, md: 6 }}>
                  <InputLabel
                    text={`Discount Value * ${
                      form.discount_type === "percentage" ? "(%)" : "($)"
                    }`}
                  />
                  <Input
                    disableUnderline
                    fullWidth
                    type="number"
                    placeholder={
                      form.discount_type === "percentage"
                        ? "e.g., 10"
                        : "e.g., 50.00"
                    }
                    value={form.discount_value}
                    onChange={handleChange("discount_value")}
                    inputProps={{
                      min: 0,
                      max:
                        form.discount_type === "percentage" ? 100 : undefined,
                      step: form.discount_type === "percentage" ? 1 : 0.01,
                    }}
                    sx={{
                      border: "1px solid #e0e0e0",
                      borderRadius: 1,
                      px: 2,
                      py: 1.5,
                      fontSize: "14px",
                    }}
                  />
                </Grid>

                <Grid item size={{ xs: 12, md: 6 }}>
                  <InputLabel text="Max Discount Amount ($)" />
                  <Input
                    disableUnderline
                    fullWidth
                    type="number"
                    placeholder="e.g., 100.00"
                    value={form.discount_max_amount}
                    onChange={handleChange("discount_max_amount")}
                    inputProps={{ min: 0, step: 0.01 }}
                    sx={{
                      border: "1px solid #e0e0e0",
                      borderRadius: 1,
                      px: 2,
                      py: 1.5,
                      fontSize: "14px",
                    }}
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    Leave empty for no limit
                  </Typography>
                </Grid>

                <Grid item size={{ xs: 12, md: 6 }}>
                  <InputLabel text="Start Date *" />
                  <Input
                    disableUnderline
                    fullWidth
                    type="datetime-local"
                    value={form.start_date}
                    onChange={handleChange("start_date")}
                    sx={{
                      border: "1px solid #e0e0e0",
                      borderRadius: 1,
                      px: 2,
                      py: 1.5,
                      fontSize: "14px",
                    }}
                  />
                </Grid>

                <Grid item size={{ xs: 12, md: 6 }}>
                  <InputLabel text="End Date *" />
                  <Input
                    disableUnderline
                    fullWidth
                    type="datetime-local"
                    value={form.end_date}
                    onChange={handleChange("end_date")}
                    sx={{
                      border: "1px solid #e0e0e0",
                      borderRadius: 1,
                      px: 2,
                      py: 1.5,
                      fontSize: "14px",
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
              <Button
                variant="outlined"
                onClick={onClose}
                disabled={loading}
                sx={{ textTransform: "none", px: 3 }}
              >
                Cancel
              </Button>

              <CustomButton
                title={loading ? "Updating..." : "Update Coupon"}
                color="primary"
                variant="filled"
                startIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <SaveOutlined />
                  )
                }
                disabled={loading}
                onClick={handleSubmit}
                sx={{ textTransform: "none", px: 4 }}
              />
            </Stack>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditCouponModal;
