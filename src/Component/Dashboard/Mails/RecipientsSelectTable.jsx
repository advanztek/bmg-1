import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TablePagination,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useFetchMailRecipients } from "../../../Hooks/Dashboard/mails";

const RecipientsSelectTable = ({ selected = [], onToggleUser }) => {
  const { recipients, loading } = useFetchMailRecipients();

  console.log("recipients:", recipients)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedUsers = recipients.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  if (loading) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <CircularProgress />
      </Paper>
    );
  }

  return (
    <Paper variant="outlined">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              <TableCell>
                <strong>First Name</strong>
              </TableCell>
              <TableCell>
                <strong>Last Name</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography color="text.secondary">No users found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map((user) => {
                const isSelected = selected.some((u) => u.id === user.id);

                return (
                  <TableRow
                    key={user.id}
                    hover
                    role="checkbox"
                    selected={isSelected}
                    sx={{ cursor: "pointer" }}
                    onClick={() => onToggleUser(user)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} />
                    </TableCell>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.last_name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={recipients.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

export default RecipientsSelectTable;
