import React from "react";
import { Grid, Stack, Typography, Paper } from "@mui/material";
import { Stars } from "@mui/icons-material";
import { CREDIT_RATE } from "./constants";

const InfoBanner = () => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                borderRadius: 2
            }}
        >
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={8}>
                    <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                        <Stars sx={{ fontSize: 32 }} />
                        <Typography variant="h5" fontWeight={700}>
                            Power Your Creativity
                        </Typography>
                    </Stack>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        Choose from our curated packages or create your own custom credit bundle.
                        All credits are instantly activated and never expire.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper
                        sx={{
                            p: 2,
                            background: "rgba(255, 255, 255, 0.15)",
                            backdropFilter: "blur(10px)",
                            textAlign: "center"
                        }}
                    >
                        <Typography variant="body2" sx={{ opacity: 0.9, mb: 0.5 }}>
                            Standard Rate
                        </Typography>
                        <Typography variant="h4" fontWeight={700}>
                            1 Credit = GH₵{CREDIT_RATE}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default InfoBanner;