import { Box } from "@mui/material";

function DashboardTab({ children, activeTab, tabKey }) {
  if (activeTab !== tabKey) return null;
  return <Box mt={2}>{children}</Box>;
}

export default DashboardTab;
