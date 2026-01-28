import React from "react";
import {
  Box,
  Button,
  Card,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Grid,
  CardContent,
  Typography,
} from "@mui/material";
import { MailOutlined } from "@mui/icons-material";
import { useFetchMails } from "../../../Hooks/Dashboard/mails";

const InboxList = () => {
  const { mails } = useFetchMails();

  console.log("mails:", mails);

  return (
    <Grid size={{ xs: 12, md: 9 }}>
      <Card>
        <Box
          sx={{
            p: 2,
            color: "#000000",
            m: 2,
          }}
        >
          <Typography variant="h3" fontWeight={600}>
            OutBox
          </Typography>
        </Box>

        <CardContent sx={{ p: 4 }}>
          <TableContainer>
            <Table>
              <TableBody>
                {mails.map((mail) => (
                  <TableRow hover key={mail.id}>
                    <TableCell sx={{ fontWeight: 600 }}>
                      {mail.subject}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "text.secondary" }}>
                      {new Date(mail.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default InboxList;
