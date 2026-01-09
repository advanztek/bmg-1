import { Box, Stack } from "@mui/material";

const CustomTab = ({
  children,
  tabs = [{ label: "", key: 0 }],
  activeTab,
  updateActiveTab,
}) => {
  const stylesMap = {
    default: {
      fontSize: "14px",
      borderRadius: "8px",
      padding: 1,
      cursor: "pointer",
    },
    active: {
      fontWeight: 700,
      backgroundColor: "#fff",
      border: "1px solid #EAEAEA",
    },
    inactive: {
      fontWeight: 400,
    },
  };

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        p="10px"
        bgcolor="#EBF1F4"
        borderRadius="14px"
        gap={2}
        sx={{
          overflowX: "auto",
        }}
      >
        {tabs?.map((tab, index) => {
          return (
            <Box
              key={index}
              onClick={() => updateActiveTab(tab.key)}
              sx={[
                stylesMap.default,
                activeTab === tab.key ? stylesMap.active : stylesMap.inactive,
              ]}
            >
              {tab?.label}
            </Box>
          );
        })}
      </Stack>
      {children || null}
    </Box>
  );
};

export default CustomTab;
