import React, { useState } from "react";
import { Box, Grid, TextField, Button, Typography, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AuthSlider } from "../../../../Component";
import { useForgotPassWord } from "../../../../Hooks/auth";
import { useLoader } from "../../../../Contexts/LoaderContext";
import { showToast } from "../../../../utils/toast";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../../../utils/functions";

const ForgotPasswordPage = () => {
  const theme = useTheme();
  const forgotPassword = useForgotPassWord();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { showLoader, hideLoader } = useLoader();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      showToast.error("Please enter a valid email address.");
      return false;
    }
    setLoading(true);
    showLoader();

    try {
      const response = await forgotPassword({
        email,
      });

      if (response) {
        showToast.success(`OTP sent to your email!`);
        navigate("/reset-password");
      }
    } catch (error) {
      setLoading(false);

      console.error("Password reset error:", error);
    } finally {
      setLoading(false);
      hideLoader();
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
              Forgot Password?
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
              No worries! Enter your email address below and we'll send you a
              link to reset your password.
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mb: 0.5,
                fontWeight: 700,
                color: theme.palette.text.heading,
              }}
            >
              Email Address
            </Typography>
            <TextField
              fullWidth
              variant="standard"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={inputBaseStyles}
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              disabled={!email}
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
              {loading ? "SENDING..." : "SEND RESET LINK"}
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

export default ForgotPasswordPage;
