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
import { VisibilityOutlined, AddOutlined } from "@mui/icons-material";
import { useFetchUsers } from "../../../Hooks/Dashboard/users";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const [search, setSearch] = useState();
  const { users, refetch, loading: userLoading } = useFetchUsers();
  const navigate = useNavigate();

  return (
    <div>
      <PagesHeader
        label="Manage Customers"
        desc="Manage user base, view profiles and active status, disable or terminate users, send mails. "
        enableSearch
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "Add Customer",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/customer"),
          },
          {
            label: "Manage Experts",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/experts"),
          },
        ]}
      />

      <Box mt={3} mb={3}>
        <CustomTable title="Total Users" headers={headers}>
          {userLoading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          ) : users.length > 0 ? (
            users.map((row, index) => (
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
                  <IconButton size="small">
                    <VisibilityOutlined fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7}>
                <Stack alignItems="center" spacing={2}>
                  <Typography
                    variant="body1"
                    sx={{ color: "#2C3891", fontWeight: 600 }}
                  >
                    No User Found
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          )}
        </CustomTable>
      </Box>
    </div>
  );
};

export default UsersPage;
