import React, { useState } from "react";
import {
  Box,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Grid,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  CustomTable,
  StatusChip,
  PagesHeader,
  InfoCard,
} from "../../../Component";
import { headers, statusLabel } from "./data";
import { VisibilityOutlined, AddOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { EMOJI_ICONS } from "../../../Config/emojiIcons";
import { useFetchOrders } from "../../../Hooks/Dashboard/orders";
import { formatGHS } from "../../../utils/currency";
import { toTitleCase } from "../../../utils/functions";

const OrdersPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const { orders, loading: ordersLoading } = useFetchOrders();

  function viewOrderHistory(details) {
    if (!details) return;
    navigate("/dashboard/admin/order/details", { state: { details } });
  }

  return (
    <div>
      <PagesHeader
        label="Manage Orders"
        desc="View all orders, see their status, update status, assign orders to expert."
        enableSearch
        placeholder={"Search orders..."}
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "Add Service",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/services"),
          },
        ]}
      />

      <Box>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          alignItems={"flex-start"}
          mb={4}
        >
          <Grid size={{ xs: 12, md: 3 }}>
            <InfoCard
              icon={EMOJI_ICONS.shoppingCart}
              title="Orders"
              value={orders.length}
              actionLabel="Total Orders"
              color="#61B5FF"
              onAction={() => console.log("View Users")}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <InfoCard
              icon={EMOJI_ICONS.success}
              actionLabel="Completed Orders"
              title="Orders"
              value={"0"}
              color="#61B5FF"
              onAction={() => console.log("View Users")}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <InfoCard
              icon={EMOJI_ICONS.pending}
              actionLabel="Pending Orders"
              title="Orders"
              value={"0"}
              color="#61B5FF"
              onAction={() => console.log("View Users")}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <InfoCard
              icon={EMOJI_ICONS.cancel}
              actionLabel="Cancelled Orders"
              title="Orders"
              value={"0"}
              color="#61B5FF"
              onAction={() => console.log("View Users")}
            />
          </Grid>
        </Grid>
      </Box>

      <Box mt={3} mb={3}>
        <CustomTable title="Total Orders" headers={headers}>
          {ordersLoading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          ) : orders?.orders?.length > 0 ? (
            orders?.orders?.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{row.order_number}</TableCell>
                <TableCell>{formatGHS(row?.amount)}</TableCell>
                <TableCell>{toTitleCase(row?.payment_method)}</TableCell>
                <TableCell>{row?.items?.length}</TableCell>

                <TableCell>
                  <StatusChip
                    status={row?.status}
                    label={statusLabel[row?.status]}
                  />
                </TableCell>

                <TableCell>{row?.created_at}</TableCell>

                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => viewOrderHistory(row)}
                  >
                    <VisibilityOutlined fontSize="medium" />
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
                    No Order(s) Found.
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          )}{" "}
        </CustomTable>
      </Box>
    </div>
  );
};

export default OrdersPage;
