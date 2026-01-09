import React, { useState } from "react";
import {
  Grid,
  Box,
  Input,
  Stack,
  Switch,
  TextField,
  Typography,
  Chip,
  IconButton,
  FormControl,
  MenuItem,
  Select,
  InputAdornment,
  Divider,
} from "@mui/material";
import {
  AddOutlined,
  DeleteOutlined,
  VisibilityOutlined,
  ArrowBackOutlined,
  CloseOutlined,
  AttachMoneyOutlined,
} from "@mui/icons-material";
import { CustomButton, InputLabel, PagesHeader } from "../../../Component";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../utils/toast";
import { useLoader } from "../../../Contexts/LoaderContext";
import { useCreateSubPlan } from "../../../Hooks/Dashboard/subscriptions";

const AddSubscriptionPage = () => {
  const [planName, setPlanName] = useState("");
  const [planSlug, setPlanSlug] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("monthly");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [features, setFeatures] = useState([]);
  const [currentFeature, setCurrentFeature] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { hideLoader, showLoader } = useLoader();
  const addPlan = useCreateSubPlan()

  const handleAddFeature = () => {
    if (currentFeature.trim()) {
      setFeatures([...features, currentFeature.trim()]);
      setCurrentFeature("");
    }
  };

  const handleRemoveFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !planName.trim() ||
      !price ||
      !description.trim() ||
      features.length === 0
    ) {
      showToast.warning(
        "Please fill in all required fields and add at least one feature"
      );
      return;
    }

    setLoading(true);
    showLoader("Creating Subscription Plan...");

    try {
      const payload = {
        title: planName,
        duration: duration,
        description: description,
        price: price,
        label: planSlug,
        plans: features,
      };
      console.log("PayLoad:", payload);

      const response = await addPlan(payload);
      if (response) {
        showToast.success("Plan added successfully!");
        setPlanName("");
        setPlanSlug("");
        setPrice("");
        setDuration("monthly");
        setDescription("");
        setFeatures([]);
        navigate("/dashboard/admin/categories");
      }
    } catch (error) {
      showToast.error(error || "Failed to create category");
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <PagesHeader
        label="Add Subscription Plan"
        desc="Create new subscription plans with pricing, features, and benefits"
        searchEnabled={false}
        actions={[
          {
            label: "View Subscription Plan",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/subscriptions"),
          },
          {
            label: "Add Category",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/categories"),
          },
          {
            label: "Add Service",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/services"),
          },
        ]}
      />

      <Box sx={{ bgcolor: "white", borderRadius: 2, p: 4 }}>
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Basic Information
            </Typography>
            <Divider />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel text="Plan Name *" />
            <Input
              disableUnderline
              fullWidth
              placeholder="e.g., Premium Plan, Business Plan"
              value={planName}
              onChange={(e) => {
                setPlanName(e.target.value);
                setPlanSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
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

          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel text="Plan Slug" />
            <Input
              disableUnderline
              fullWidth
              placeholder="premium-plan"
              value={planSlug}
              onChange={(e) => setPlanSlug(e.target.value)}
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                px: 2,
                py: 1.5,
                fontSize: "14px",
                bgcolor: "#f9f9f9",
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel text="Price *" />
            <Input
              disableUnderline
              fullWidth
              type="number"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <AttachMoneyOutlined sx={{ fontSize: 20, color: "#666" }} />
                </InputAdornment>
              }
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                px: 2,
                py: 1.5,
                fontSize: "14px",
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel text="Billing Duration" />
            <FormControl fullWidth>
              <Select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #e0e0e0",
                  },
                }}
              >
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="quarterly">Quarterly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
                <MenuItem value="lifetime">Lifetime</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <InputLabel text="Description *" />
            <TextField
              multiline
              rows={4}
              fullWidth
              placeholder="Describe what this plan offers..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#e0e0e0",
                  },
                },
              }}
            />
          </Grid>

          {/* Features Section */}
          <Grid size={{ xs: 12 }} mt={2}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Plan Features
            </Typography>
            <Divider />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <InputLabel text="Add Features *" />
            <Stack direction="row" spacing={2}>
              <Input
                disableUnderline
                fullWidth
                placeholder="e.g., Unlimited storage, 24/7 support"
                value={currentFeature}
                onChange={(e) => setCurrentFeature(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddFeature()}
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  px: 2,
                  py: 1.5,
                  fontSize: "14px",
                }}
              />
              <IconButton
                onClick={handleAddFeature}
                sx={{
                  bgcolor: "#1976d2",
                  color: "white",
                  "&:hover": { bgcolor: "#1565c0" },
                }}
              >
                <AddOutlined />
              </IconButton>
            </Stack>

            {features.length > 0 && (
              <Box mt={2}>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {features.map((feature, index) => (
                    <Chip
                      key={index}
                      label={feature}
                      onDelete={() => handleRemoveFeature(index)}
                      deleteIcon={<CloseOutlined />}
                      sx={{ bgcolor: "#e3f2fd" }}
                    />
                  ))}
                </Stack>
              </Box>
            )}
          </Grid>

          {/* Status Section */}
          <Grid size={{ xs: 12 }} mt={2}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Plan Status
            </Typography>
            <Divider />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ border: "1px solid #e0e0e0", borderRadius: 2, p: 3 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Active Status
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Make this plan available for subscription
                  </Typography>
                </Box>
                <Switch
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  color="success"
                />
              </Stack>
            </Box>
          </Grid>

          <Grid size={{ xs: 12 }} mt={5}>
            <Stack direction="row" justifyContent="space-between">
              <CustomButton
                title="Back"
                color="inherit"
                variant="outlined"
                startIcon={<ArrowBackOutlined />}
                onClick={() => console.log("Go back")}
              />

              <Stack direction="row" gap={2}>
                <CustomButton
                  title="Reset"
                  color="danger"
                  variant="outlined"
                  startIcon={<DeleteOutlined />}
                  onClick={() => {
                    setPlanName("");
                    setPrice("");
                    setDescription("");
                    setFeatures([]);
                  }}
                />
                <CustomButton
                  title={loading ? "Submitting..." : "Create Plan"}
                  variant="filled"
                  disabled={loading}
                  onClick={handleSubmit}
                />
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddSubscriptionPage;
