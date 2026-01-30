import React, { useState } from "react";
import {
  Grid,
  Box,
  Input,
  Stack,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import {
  AddOutlined,
  DeleteOutlined,
  VisibilityOutlined,
  ArrowBackOutlined,
} from "@mui/icons-material";
import { InputLabel, CustomButton, PagesHeader } from "../../../Component";
import { styles } from "../../../styles/dashboard";
import { useNavigate } from "react-router-dom";
import { discountTypes } from "./data";
import { useCreateCoupon } from "../../../Hooks/Dashboard/coupons";
import { useLoader } from "../../../Contexts/LoaderContext";
import { showToast } from "../../../utils/toast";

const AddCoupon = () => {
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState("");
  const [discount, setDiscount] = useState("");
  const [maxDiscount, setMaxDiscount] = useState("");
  const [type, setType] = useState("");

  const [loading, setLoading] = useState(false);
  const createCoupon = useCreateCoupon();
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  const formData = {
    start_date: validFrom,
    end_date: validTo,
    discount_max_amount: maxDiscount,
    discount_value: discount,
    discount_type: type,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validTo.trim() || !validFrom.trim() || !discount || !type) {
      showToast.warning("Please fill in all required fields.");
      return;
    }
    console.log("sending data:", formData);

    setLoading(true);
    showLoader("Creating Coupon...");
    try {
      const response = await createCoupon(formData);

      if (response) {
        showToast.success("Coupon created successfully!");
        setValidFrom("");
        setValidTo("");
        setType("");
        setDiscount("");
        setMaxDiscount("");
        navigate("/dashboard/admin/coupons");
      }
    } catch (error) {
      console.error("Coupon creation failed:", error);
      showToast.error("An error occured while creating coupon ");
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  return (
    <>
      <PagesHeader
        label="Add Coupon"
        desc="Add coupon codes for discount on orders. Go to view coupons to manage coupons"
        searchEnabled={false}
        placeholder={"Search categories..."}
        actions={[
          {
            label: "View Coupons",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/coupons"),
          },
          {
            label: "Add Gifts",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/gifts"),
          },
          {
            label: "View Orders",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/orders"),
          },
        ]}
      />

      <Box sx={styles.card}>
        <Box component="form" mt={3}>
          <Box
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              p: 3,
              bgcolor: "white",
              mt: 2,
            }}
          >
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Valid From" />
                    <Input
                      disableUnderline
                      fullWidth
                      type="date"
                      value={validFrom}
                      onChange={(e) => setValidFrom(e.target.value)}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        px: 2,
                        py: 1.5,
                        fontSize: "14px",
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Valid Untill" />
                    <Input
                      disableUnderline
                      fullWidth
                      type="date"
                      value={validTo}
                      onChange={(e) => setValidTo(e.target.value)}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        px: 2,
                        py: 1.5,
                        fontSize: "14px",
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Type" />
                    <FormControl fullWidth>
                      <Select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        disableUnderline
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          <InputLabel text="Select Discount type" />
                        </MenuItem>

                        {discountTypes.map((type, i) => (
                          <MenuItem key={i} value={type.value}>
                            {type.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Discount" />
                    <Input
                      disableUnderline
                      fullWidth
                      type="number"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        px: 2,
                        py: 1.5,
                        fontSize: "14px",
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Max Discount" />
                    <Input
                      disableUnderline
                      fullWidth
                      type="number"
                      value={maxDiscount}
                      onChange={(e) => setMaxDiscount(e.target.value)}
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
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={2} mt={3}>
            <Grid size={{ xs: 12 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <CustomButton
                  title="Back"
                  color="inherit"
                  variant="outlined"
                  startIcon={<ArrowBackOutlined />}
                  onClick={() => navigate(-1)}
                  sx={{ textTransform: "none", px: 3 }}
                />

                <Stack direction="row" gap={2}>
                  <CustomButton
                    title="Delete"
                    color="danger"
                    variant="outlined"
                    startIcon={<DeleteOutlined />}
                    onClick={() => {}}
                    sx={{ textTransform: "none", px: 4 }}
                  />
                  <CustomButton
                    title={loading ? "Submitting..." : "Submit"}
                    color="primary"
                    variant="filled"
                    disabled={loading}
                    onClick={handleSubmit}
                    sx={{ textTransform: "none", px: 4 }}
                  />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default AddCoupon;
