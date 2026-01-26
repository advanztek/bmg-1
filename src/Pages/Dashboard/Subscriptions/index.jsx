import React, { useEffect } from "react";
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import {
  AddOutlined,
  EditOutlined,
  DeleteOutlined,
  VisibilityOutlined,
  CheckCircleOutlined,
  StarOutlined,
  PeopleOutlined,
} from "@mui/icons-material";
import { PagesHeader } from "../../../Component";
import { useNavigate } from "react-router-dom";
import { useFetchSubPlans } from "../../../Hooks/Dashboard/subscriptions";
import { useLoader } from "../../../Contexts/LoaderContext";

const SubscriptionsPage = () => {
  const navigate = useNavigate();
  const { plans, loading: plansLoading, refetch } = useFetchSubPlans();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    if (plansLoading) {
      showLoader("Fetching Plans...");
    } else {
      hideLoader();
    }
  }, [plansLoading]);

  const handleEdit = (planId) => {
    console.log("Edit plan:", planId);
    navigate(`/dashboard/admin/edit/subscription/${planId}`);
  };

  const handleDelete = (planId) => {
    if (
      window.confirm("Are you sure you want to delete this subscription plan?")
    ) {
      console.log("Delete plan:", planId);
    }
  };

  const handleViewDetails = (planId) => {
    console.log("View details:", planId);
    navigate(`/dashboard/admin/subscription/${planId}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <PagesHeader
        label="Subscription Plans"
        desc="Manage your subscription tiers and pricing"
        searchEnabled={false}
        actions={[
          {
            label: "Add New Plan",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/subscription"),
          },
          {
            label: "Add Service Types",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/service-type"),
          },
        ]}
      />

      <Grid container spacing={3} mt={1}>
        {plans.map((plan) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={plan.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                border: plan.isFeatured ? "2px solid" : "1px solid",
                borderColor: plan.isFeatured ? "warning.main" : "divider",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: 6,
                  transform: "translateY(-4px)",
                },
              }}
            >
              {plan.isFeatured && (
                <Box
                  sx={{
                    background:
                      "linear-gradient(90deg, #ff6b35 0%, #f7931e 100%)",
                    color: "white",
                    py: 1,
                    textAlign: "center",
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                  >
                    <StarOutlined sx={{ fontSize: 16 }} />
                    <Typography variant="caption" fontWeight={700}>
                      MOST POPULAR
                    </Typography>
                  </Stack>
                </Box>
              )}

              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ textAlign: "center", mb: 3 }}>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    {plan.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, minHeight: 40 }}
                  >
                    {plan.description}
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="baseline"
                    justifyContent="center"
                    spacing={0.5}
                  >
                    <Typography variant="h3" fontWeight={700} color="primary">
                      ${plan.price}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      /{plan.duration}
                    </Typography>
                  </Stack>
                </Box>

                <Divider sx={{ my: 2 }} />
                {/* <Box sx={{ mb: 3 }}>
                  <Stack spacing={1.5}>
                    {plan?.plans?.map((feature, index) => (
                      <Stack
                        key={index}
                        direction="row"
                        alignItems="flex-start"
                        spacing={1}
                      >
                        <CheckCircleOutlined
                          sx={{ fontSize: 20, color: "success.main", mt: 0.2 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {feature}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box> */}
                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid size={{ xs: 12 }}>
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 2,
                        bgcolor: "grey.50",
                        borderRadius: 2,
                      }}
                    >
                      <PeopleOutlined
                        sx={{ fontSize: 24, color: "primary.main", mb: 1 }}
                      />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                      >
                        Users
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {plan.maxUsers || "Unlimited"}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Stack spacing={1.5}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<EditOutlined />}
                    onClick={() => handleEdit(plan.id)}
                    sx={{ textTransform: "none", py: 1.2 }}
                  >
                    Edit Plan
                  </Button>
                  <Stack direction="row" spacing={1.5}>
                    <Button
                      variant="outlined"
                      fullWidth
                      size="small"
                      startIcon={<VisibilityOutlined />}
                      onClick={() => handleViewDetails(plan.id)}
                      sx={{ textTransform: "none" }}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      fullWidth
                      size="small"
                      startIcon={<DeleteOutlined />}
                      onClick={() => handleDelete(plan.id)}
                      sx={{ textTransform: "none" }}
                    >
                      Delete
                    </Button>
                  </Stack>
                </Stack>

                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <Chip
                    label={plan.isActive ? "Active" : "Inactive"}
                    size="small"
                    color={plan.isActive ? "success" : "default"}
                    sx={{ fontWeight: 600 }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {!plansLoading && plans.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            bgcolor: "white",
            borderRadius: 2,
            mt: 3,
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No subscription plans yet
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Create your first subscription plan to get started
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddOutlined />}
            onClick={() => navigate("/dashboard/admin/add/subscription")}
          >
            Add New Plan
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SubscriptionsPage;
