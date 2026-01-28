import React, { useState } from "react";
import {
  Box,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Grid,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import {
  CustomTable,
  StatusChip,
  PagesHeader,
  InsightPieCard,
  TopRankingExpertsCard,
  CustomButton,
} from "../../../Component";
import { headers } from "./data";
import {
  AddOutlined,
  VisibilityOutlined,
  DoneOutlined,
  DisabledByDefaultOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  useFetchExperts,
  useUpdateExpertStatus,
} from "../../../Hooks/Dashboard/experts";
import SingleExpertModal from "./single";
import { showToast } from "../../../utils/toast";

const ExpertsPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { experts, loading: expertsLoading, refetch } = useFetchExperts();
  const [selectedId, setSelectedId] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const { updateStatus, loading: disableLoading } = useUpdateExpertStatus();

  const handleOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    await refetch();
    setSelectedId(null);
  };

  const handleUpdateStatus = (id, status) => async (e) => {
    e.preventDefault();

    try {
      setLoadingId(id);
      await updateStatus(id, { status });
      await refetch();
    } catch (error) {
      showToast.error(error || "Failed to update role");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      <PagesHeader
        label="Manage Experts"
        desc="Manage Experts - view all orders, assign new orders, add, edit, terminate or disable and expert."
        enableSearch
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "Add Expert",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/expert"),
          },
        ]}
      />

      <Box>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          mt={3}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <InsightPieCard
              title="Experts Insight"
              chartData={[
                { name: "Active Experts", value: 5000, color: "#4CAF50" },
                { name: "Suspended Experts", value: 2500, color: "#FF9800" },
                { name: "Terminated Experts", value: 1000, color: "#F44336" },
              ]}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TopRankingExpertsCard />
          </Grid>
        </Grid>
      </Box>

      <Box mt={3} mb={3}>
        <CustomTable title="Total Experts" headers={headers}>
          {expertsLoading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          ) : experts.length > 0 ? (
            experts.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>

                <TableCell>{row.first_name}</TableCell>
                <TableCell>{row.last_name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>

                <TableCell>
                  <StatusChip
                    status={row.is_verified === true ? "active" : "inactive"}
                    label={row.is_verified === true ? "Verified" : "Unverified"}
                  />
                </TableCell>

                <TableCell>
                  <StatusChip
                    status={row.status === 1 ? "active" : "inactive"}
                    label={row.status === 1 ? "Active" : "Disabled"}
                  />
                </TableCell>

                <TableCell>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="end"
                    gap={0.5}
                  >
                    <IconButton size="small" onClick={() => handleOpen(row.id)}>
                      <VisibilityOutlined fontSize="small" />
                    </IconButton>

                    {row.status === 1 ? (
                      <CustomButton
                        title={
                          disableLoading && loadingId === row.id ? (
                            <CircularProgress size={15} color="inherit" />
                          ) : (
                            "Disable"
                          )
                        }
                        color="danger"
                        variant="filled"
                        startIcon={<DisabledByDefaultOutlined />}
                        sx={{ textTransform: "none", px: 1 }}
                        onClick={handleUpdateStatus(row.id, false)}
                        disabled={disableLoading && loadingId === row.id}
                      />
                    ) : (
                      <CustomButton
                        title={
                          disableLoading && loadingId === row.id ? (
                            <CircularProgress size={15} color="inherit" />
                          ) : (
                            "Enable"
                          )
                        }
                        startIcon={<DoneOutlined />}
                        color="success"
                        variant="filled"
                        sx={{ textTransform: "none", px: 1 }}
                        onClick={handleUpdateStatus(row.id, true)}
                        disabled={disableLoading && loadingId === row.id}
                      />
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6}>
                <Stack alignItems="center" spacing={2}>
                  <Typography
                    variant="body1"
                    sx={{ color: "#2C3891", fontWeight: 600 }}
                  >
                    No Expert Found.
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          )}
        </CustomTable>
      </Box>

      <SingleExpertModal
        open={open}
        onClose={handleClose}
        userId={selectedId}
      />
    </div>
  );
};

export default ExpertsPage;
