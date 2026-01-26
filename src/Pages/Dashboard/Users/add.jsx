import React, { useState } from "react";
import { Grid, Box, Input, Stack } from "@mui/material";
import {
  AddOutlined,
  DeleteOutlined,
  Password,
  VisibilityOutlined,
} from "@mui/icons-material";
import { InputLabel, CustomButton, PagesHeader } from "../../../Component";
import { validateEmail } from "../../../utils/functions";
import { styles } from "../../../styles/dashboard";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../utils/toast";
import { useAddUser } from "../../../Hooks/Dashboard/users";
import { useLoader } from "../../../Contexts/LoaderContext";

const AddUsersPage = () => {
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);
  const addUser = useAddUser();
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  const formData = {
    first_name,
    last_name,
    email,
    phone,
    password,
  };

  const validateForm = () => {
    const newErrors = {};

    if (!first_name.trim()) newErrors.first_name = "First name is required";
    if (!last_name.trim()) newErrors.last_name = "Last name is required";

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!phone.trim()) newErrors.phone = "Phone number is required";

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast.warning("Please fix the errors in the form.");
      return;
    }

    setLoading(true);
    showLoader();
    try {
      const response = await addUser(formData);

      if (response) {
        setFirstname("");
        setLastname("");
        setEmail("");
        setPhone("");
        setPassword("");

        navigate("/dashboard/admin/customers");
      }
    } catch (error) {
      showToast.error(error || "User registration failed.");
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  return (
    <>
      <PagesHeader
        label="Manage Customers"
        desc={"Manage customers, assign privileges and manage controls"}
        searchEnabled={false}
        actions={[
          {
            label: "View Customers",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/customers"),
          },
          {
            label: "Manage Administrators",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/view/admins"),
          },
        ]}
      />

      <Box sx={styles.card}>
        <Box component="form" mt={3}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel text="First Name" mb />
              <Input
                disableUnderline
                fullWidth
                sx={styles.input}
                value={first_name}
                placeholder=""
                onChange={(e) => setFirstname(e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel text="Last Name" />
              <Input
                disableUnderline
                fullWidth
                sx={styles.input}
                value={last_name}
                onChange={(e) => setLastname(e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={1.5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel text="Email Address" />
              <Input
                disableUnderline
                fullWidth
                sx={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel text="Phone Number" />
              <Input
                disableUnderline
                fullWidth
                sx={styles.input}
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel text="Customer Password" />
              <Input
                disableUnderline
                fullWidth
                sx={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(errors.password)}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel text="Confirm Password" />
              <Input
                disableUnderline
                fullWidth
                sx={styles.input}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={Boolean(errors.confirmPassword)}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={3}>
            <Grid size={{ xs: 12, md: 6 }}></Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Stack direction="row" justifyContent="flex-end" gap={2}>
                <CustomButton
                  title="Cancel"
                  color="warning"
                  variant="filled"
                  startIcon={<DeleteOutlined />}
                  onClick={() => {}}
                  sx={{ textTransform: "none", paddingInline: 20 }}
                />

                <CustomButton
                  title={loading ? "Adding..." : "Add Customer"}
                  color="primary"
                  variant="filled"
                  startIcon={<AddOutlined />}
                  disabled={loading}
                  onClick={handleSubmit}
                  sx={{ textTransform: "none", paddingInline: 20 }}
                />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default AddUsersPage;
