import React from "react";
import {
  Search24Regular,
  ChevronRight20Regular,
  Globe24Regular
} from "@fluentui/react-icons";

import {
  Box,
  Grid,
  Typography,
  TextField,
  IconButton,
  Select,
  MenuItem,
  useTheme
} from "@mui/material";

import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const theme = useTheme();

  // Social Media
  const socialLinks = [
    { icon: <YouTubeIcon />, name: "YouTube" },
    { icon: <FacebookIcon />, name: "Facebook" },
    { icon: <TwitterIcon />, name: "Twitter" },
    { icon: <InstagramIcon />, name: "Instagram" },
    { icon: <LinkedInIcon />, name: "LinkedIn" }
  ];

  // Footer Links
  const footerLinks = {
    Company: [
      { name: "About Us", href: "#" },
      { name: "Media", href: "#" },
      { name: "Press Releases", href: "#" },
      { name: "Testimonials", href: "#" },
      { name: "Careers", href: "#" }
    ],
    "Popular Services": [
      { name: "Logo Design", href: "#" },
      { name: "Website Development", href: "#" },
      { name: "AI Generator", href: "#" },
      { name: "Animation", href: "#" },
      { name: "Digital Marketing", href: "#" }
    ],
    "Get Started": [
      { name: "Account Login", href: "#" },
      { name: "How It Works", href: "#" },
      { name: "All Services", href: "#" },
      { name: "Free Consultation", href: "#" },
      { name: "Packages", href: "#" }
    ],
    Resources: [
      { name: "Blog", href: "#" },
      { name: "Help Centre", href: "#" },
      { name: "Partners", href: "#" },
      { name: "Gift Voucher", href: "#" },
      { name: "FAQs", href: "#" }
    ]
  };

  return (
    <Box
      component="footer"
      sx={{
        color: theme.palette.primary.contrastText,
        // backgroundColor: theme.palette.background.footer,
        background:'linear-gradient(135deg, #111827, #1e293b, #111827)',
        position: "relative"
      }}
    >
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 3, py: 8 }}>
        <Grid container spacing={6}>
          <Grid size={{xs:12, md:4, lg:4 }}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Box
                component="img"
                src="/Logo/Logo.png"
                sx={{ width: 90, height: "auto" }}
              />
            </Box>

            <Typography sx={{ color: theme.palette.primary.contrastText, mb: 3 }}>
              Empowering businesses with cutting-edge AI solutions and digital
              marketing services. Transform your vision into reality with BMG.
            </Typography>

            {/* SEARCH BAR */}
            <Box sx={{ position: "relative", mb: 3 }}>
              <TextField
                fullWidth
                placeholder="Search services..."
                variant="outlined"
                sx={{
                  "& input": { color: theme.palette.text.primary },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.divider
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.primary.main
                  }
                }}
              />

              <IconButton
                sx={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: theme.palette.primary.main,
                  "&:hover": { bgcolor: theme.palette.primary.dark },
                  color: theme.palette.primary.contrastText
                }}
              >
                <Search24Regular />
              </IconButton>
            </Box>

            {/* SOCIAL ICONS */}
            <Box display="flex" gap={2}>
              {socialLinks.map((s, i) => (
                <Box
                  key={i}
                  component="a"
                  href="#"
                  title={s.name}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: theme.palette.primary.contrastText,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "0.2s",
                    "&:hover": {
                      transform: "scale(1.1)",
                      bgcolor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText
                    },
                    textDecoration: "none",
                    color: theme.palette.text.primary
                  }}
                >
                  {s.icon}
                </Box>
              ))}
            </Box>
          </Grid>

          {Object.entries(footerLinks).map(([category, links]) => (
            <Grid size={{ xs:6, md:2, lg:2 }} key={category}>
              <Typography
                variant="h6"
                fontWeight="bold"
                mb={3}
                sx={{ color: theme.palette.primary.contrastText, }}
              >
                {category}
              </Typography>

              {links.map((link, idx) => (
                <Box
                  key={idx}
                  component="a"
                  href={link.href}
                  style={{ textDecoration: "none" }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1.5,
                    color: theme.palette.primary.contrastText,
                    "&:hover": { color: theme.palette.primary.main }
                  }}
                >
                  <ChevronRight20Regular />
                  {link.name}
                </Box>
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
        sx={{
          borderTop: `1px solid ${theme.palette.divider}`,
          py: 3,
          px: 3
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2
          }}
        >
          {/* COPYRIGHT */}
          <Box display="flex" alignItems="center" gap={2}>
            <Typography sx={{ color: theme.palette.primary.contrastText, }}>
              <strong style={{ color: theme.palette.primary.contrastText, }}>
                BestMarketingGiggs
              </strong>{" "}
              © 2025. All rights reserved.
            </Typography>
          </Box>

          {/* LINKS */}
          <Box
            display="flex"
            alignItems="center"
            gap={3}
            sx={{ color: theme.palette.primary.contrastText, }}
          >
            <a href="#" style={{ color: theme.palette.primary.contrastText, }}>Terms</a> •
            <a href="#" style={{ color: theme.palette.primary.contrastText,}}>Privacy</a> •
            <a href="#" style={{ color: theme.palette.primary.contrastText, }}>Contact</a>
          </Box>

          {/* LANGUAGE SELECT */}
          <Box display="flex" alignItems="center" gap={2}>
            <Globe24Regular style={{ color: theme.palette.primary.contrastText, }} />

            <Select
              defaultValue="EN"
              sx={{
                bgcolor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText,
                borderRadius: 2,
                "& .MuiSvgIcon-root": {
                  color: theme.palette.primary.contrastText,
                }
              }}
            >
              <MenuItem value="EN">EN - English</MenuItem>
              <MenuItem value="ES">ES - Español</MenuItem>
              <MenuItem value="FR">FR - Français</MenuItem>
              <MenuItem value="DE">DE - Deutsch</MenuItem>
            </Select>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
