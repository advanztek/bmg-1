import React from "react";
import {
  Box,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Stack,
  Grid,
  CircularProgress,
  Typography,
} from "@mui/material";
import { CustomTable, PagesHeader, InfoCard } from "../../../Component";
import { Visibility } from "@mui/icons-material";
import { headers, statusColors, statusLabels } from "./data";
import {
  VisibilityOutlined,
  TipsAndUpdatesOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { EMOJI_ICONS } from "../../../Config/emojiIcons";
import { useFetchUserOrders } from "../../../Hooks/Users/orders";
import Chip from "../../../Component/Chip";
import { formatGHS } from "../../../utils/currency";
import { toTitleCase } from "../../../utils/functions";

const UserOrders = () => {
  const navigate = useNavigate();
  const { orders, loading } = useFetchUserOrders();

  function viewOrderDetails(orderId) {
    console.log("order id");
    console.log(orderId);

    if (!orderId) return;
    navigate("/dashboard/user/order/details", { state: { orderId } });
  }

  return (
    <div>
      <PagesHeader
        label="Orders Overview"
        desc={
          "Manage all your orders, track orders progress, update orders status, payment status.  "
        }
        searchEnabled={false}
        actions={[
          {
            label: "View Consulations",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/user/orders"),
          },
          {
            label: "AI Services",
            icon: <TipsAndUpdatesOutlined />,
            onClick: () => navigate("/dashboard/user/artificial-intelligence"),
          },
        ]}
      />
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
            title="Total"
            value="0"
            color="#61B5FF"
            actionLabel="Total Orders"
            onAction={() => console.log("View Users")}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <InfoCard
            icon={EMOJI_ICONS.success}
            title="Completed"
            value="0"
            actionLabel="Completed Orders"
            color="#61B5FF"
            onAction={() => console.log("View Users")}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <InfoCard
            icon={EMOJI_ICONS.pending}
            title="Pending"
            value="0"
            actionLabel="Pending Orders"
            color="#61B5FF"
            onAction={() => console.log("View Users")}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <InfoCard
            icon={EMOJI_ICONS.cancel}
            title="Cancelled"
            value="0"
            actionLabel="Cancelled Orders"
            color="#61B5FF"
            onAction={() => console.log("View Users")}
          />
        </Grid>
      </Grid>

      <Box mt={3} mb={3}>
        <CustomTable title="Total Orders" headers={headers}>
          {loading ? (
            <TableRow>
              <TableCell colSpan={headers.length}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          ) : orders?.orders?.length > 0 ? (
            orders?.orders.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>

                <TableCell>{row.order_number}</TableCell>
                <TableCell>{formatGHS(row?.amount)}</TableCell>
                <TableCell>{toTitleCase(row?.payment_method)}</TableCell>
                <TableCell>{row?.items?.length}</TableCell>

                <TableCell>
                  <Chip
                    label={statusLabels[row?.status]}
                    color={statusColors[row?.status]}
                    noShadow
                  />
                </TableCell>

                <TableCell>{row?.created_at}</TableCell>

                <TableCell>
                  <Stack direction={"row"} gap={1}>
                    <IconButton
                      size="small"
                      onClick={() => viewOrderDetails(row?.id)}
                    >
                      <Visibility fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={headers.length}>
                <Stack alignItems="center" spacing={2}>
                  <Typography
                    variant="body1"
                    sx={{ color: "#2C3891", fontWeight: 600 }}
                  >
                    No Order(s) Available
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

export default UserOrders;
