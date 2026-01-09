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
import { VisibilityOutlined } from "@mui/icons-material";
import { useFetchUsers } from "../../../Hooks/Dashboard/users";

const UsersPage = () => {
  const [search, setSearch] = useState();
  const { users, refetch, loading: userLoading } = useFetchUsers();

  return (
    <div>
      <PagesHeader
        label="Manage Users"
        desc="Manage user base, view profiles and active status, disable or terminate users, send mails. "
        enableSearch
        searchValue={search}
        onSearchChange={setSearch}
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
              <TableCell colSpan={6}>No User Found.</TableCell>
            </TableRow>
          )}
        </CustomTable>
      </Box>
    </div>
  );
};

export default UsersPage;
