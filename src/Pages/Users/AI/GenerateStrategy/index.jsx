import React, { useState } from "react";
import { Box, Grid, Typography, Stack } from "@mui/material";
import { EMOJI_ICONS } from "../../../../Config/emojiIcons";
import { DashboardTab, CustomTab } from "../../../../Component";
import { strategyTabs } from "../data";
import ManualModeGeneration from "./manaul-mode";
import QuickModeGeneration from "./quick-mode";

const UserGenerateStrategy = () => {
  const [activeTab, setActiveTab] = useState(0);

  function updateActiveTab(tab) {
    setActiveTab(tab);
  }

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            borderBottom: "1px solid #e0e0e0",
            px: 4,
            py: 3,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center" mb={1}>
            {EMOJI_ICONS.generatedImages}

            <Typography variant="h4" fontWeight={700}>
              Strategy Generator
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Generate smart, data-driven strategies tailored to your goals
          </Typography>
        </Box>

        <Grid container spacing={3} mt={2}>
          <Grid item size={{ xs: 12 }}>
            <CustomTab
              tabs={strategyTabs}
              activeTab={activeTab}
              updateActiveTab={updateActiveTab}
            />

            <DashboardTab tabKey={0} activeTab={activeTab}>
              <ManualModeGeneration />
            </DashboardTab>

            <DashboardTab tabKey={1} activeTab={activeTab}>
              <QuickModeGeneration />
            </DashboardTab>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserGenerateStrategy;
