import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Eye24Regular, EyeOff24Regular } from "@fluentui/react-icons";
import { AuthSlider } from "../../../../Component";

const ResetPasswordPage = () => {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSubmit = () => {
    if (formData.newPassword === formData.confirmPassword) {
      // Reset password logic
      console.log("Password reset successful");
    } else {
      console.log("Passwords do not match");
    }
  };

  const inputBaseStyles = {
    mb: 2.5,
    backgroundColor: "transparent !important",
    "& .MuiInputBase-root": {
      backgroundColor: "transparent !important",
      borderRadius: 0,
      color: theme.palette.text.primary,
    },
    "& input": {
      backgroundColor: "transparent !important",
      color: theme.palette.text.primary,
    },
  };

  const passwordsMatch =
    formData.newPassword &&
    formData.confirmPassword &&
    formData.newPassword === formData.confirmPassword;
  const canSubmit =
    formData.newPassword && formData.confirmPassword && passwordsMatch;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
        display: "flex",
        overflow: "hidden",
      }}
    >
      <Grid
        container
        sx={{
          minHeight: "100vh",
          margin: 0,
          width: "100%",
        }}
      >
        <Grid
          size={{ xs: 12, md: 7 }}
          sx={{
            bgcolor: theme.palette.primary.light,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: { xs: 4, md: 7 },
          }}
        >
          <AuthSlider />
        </Grid>

        <Grid
          size={{ xs: 12, md: 5 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            px: { xs: 4, md: 6 },
            bgcolor: theme.palette.background.default,
          }}
        >
          <Box sx={{ maxWidth: 450, width: "100%" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 2,
                textAlign: "center",
                fontSize: { xs: "1.5rem", md: "1.75rem" },
                color: theme.palette.text.heading,
              }}
            >
              Reset Password
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mb: 4,
                textAlign: "center",
                color: theme.palette.text.secondary,
                fontSize: "0.95rem",
                lineHeight: 1.6,
              }}
            >
              Enter your new password below. Make sure it's strong and secure.
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mb: 0.5,
                fontWeight: 700,
                color: theme.palette.text.heading,
              }}
            >
              New Password
            </Typography>
            <TextField
              fullWidth
              variant="standard"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange("newPassword")}
              sx={inputBaseStyles}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <EyeOff24Regular /> : <Eye24Regular />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Typography
              variant="body2"
              sx={{
                mb: 0.5,
                fontWeight: 700,
                color: theme.palette.text.heading,
              }}
            >
              Confirm Password
            </Typography>
            <TextField
              fullWidth
              variant="standard"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange("confirmPassword")}
              sx={inputBaseStyles}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleToggleConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <EyeOff24Regular />
                      ) : (
                        <Eye24Regular />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {formData.confirmPassword && !passwordsMatch && (
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.error.main,
                  display: "block",
                  mt: -2,
                  mb: 2,
                }}
              >
                Passwords do not match
              </Typography>
            )}

            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              disabled={!canSubmit}
              sx={{
                py: 1.5,
                mt: 2,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: 2,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: theme.palette.primary.bg,
                },
                "&:disabled": {
                  backgroundColor: theme.palette.action.disabledBackground,
                  color: theme.palette.action.disabled,
                },
              }}
            >
              RESET PASSWORD
            </Button>

            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                mt: 3,
                color: theme.palette.text.secondary,
              }}
            >
              Remember your password?{" "}
              <Link
                href="/login"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Back to Login
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResetPasswordPage;
