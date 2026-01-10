import React, { useState } from "react";
import {
  Box,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { CustomTable, StatusChip, PagesHeader } from "../../../Component";
import { headers } from "./data";
import { AddOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useFetchAdmins } from "../../../Hooks/Dashboard/admins";
import { formatDate } from "../../../utils/functions";
import { useNavigate } from "react-router-dom";

const Administrators = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();

  const { refetch, admins, loading } = useFetchAdmins();

  return (
    <div>
      <PagesHeader
        label="Manage Admininstrators"
        desc="Manage admministrators, update admin roles and permissions, add administrators, terminate or disable and admin, send mails. "
        enableSearch
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "Add Admininistrator",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/add/admin"),
          },
          {
            label: "Manage Roles",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/view/admin-roles"),
          },
        ]}
      />

      <Box mt={3} mb={3}>
        <CustomTable title="Total Admins" headers={headers}>
          {loading && (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          )}
          {admins.map((row) => (
            <TableRow hover key={row.id}>
              <TableCell>
                <Checkbox />
              </TableCell>

              <TableCell>{row.first_name}</TableCell>
              <TableCell>{row.last_name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{formatDate(row.created_at)}</TableCell>
              <TableCell>
                <StatusChip
                  status={row.status === 1 ? "active" : "inactive"}
                  label={row.status === 1 ? "Active" : "Disabled"}
                />
              </TableCell>

              <TableCell>
                <IconButton size="small">
                  <VisibilityOutlined fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </CustomTable>
      </Box>
    </div>
  );
};

export default Administrators;
