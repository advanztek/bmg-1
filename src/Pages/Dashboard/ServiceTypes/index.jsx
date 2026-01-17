import React, { useState } from "react";
import {
  Box,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { CustomTable, StatusChip, PagesHeader } from "../../../Component";
import { headers } from "./data";
import { AddOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/functions";
import { useFetchServiceTypes } from "../../../Hooks/Dashboard/service_types";
import { truncateText } from "../../../utils/functions";
import ServiceTypeModal from "./single";

const ServiceTypesPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const {
    serviceTypes,
    refetch,
    loading: typeLoading,
  } = useFetchServiceTypes();

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    await refetch();
    setSelectedId(null);
  };

  return (
    <div>
      <PagesHeader
        label="Manage Service Types"
        desc="Control and manage service types for creating services, add, edit and delete service types."
        enableSearch
        placeholder="Search Categories..."
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "Add Service Type",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/service-type"),
          },
          {
            label: "Add Service",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/service"),
          },
          {
            label: "Add Category",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/sub-categories"),
          },
        ]}
      />

      <Box mt={3} mb={3}>
        <CustomTable title="Total Categories" headers={headers}>
          {typeLoading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          ) : serviceTypes.length > 0 ? (
            serviceTypes.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{row.service_type_name}</TableCell>
                <TableCell>{row.category_name}</TableCell>
                <TableCell
                  sx={{
                    maxWidth: 400,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Typography variant="body2" title={row.description}>
                    {truncateText(row.description, 50)}
                  </Typography>
                </TableCell>{" "}
                <TableCell>{formatDate(row.created_at)}</TableCell>
                <TableCell>{formatDate(row.updated_at)}</TableCell>
                <TableCell>
                  <StatusChip
                    status={row.status === true ? "active" : "inactive"}
                    label={row.status === true ? "Active" : "Disabled"}
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleOpen(row.id)}>
                    <VisibilityOutlined fontSize="small" />
                  </IconButton>
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
                    No Service Type Available.
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          )}
        </CustomTable>
      </Box>

      <ServiceTypeModal open={open} onClose={handleClose} typeId={selectedId} />
    </div>
  );
};

export default ServiceTypesPage;
