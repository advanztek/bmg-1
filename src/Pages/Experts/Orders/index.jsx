import {
  Box,
  TableRow,
  TableCell,
  IconButton,
  Stack,
  CircularProgress,
  Typography,
} from "@mui/material";
import { CustomTable, PagesHeader } from "../../../Component";
import { Visibility } from "@mui/icons-material";
import { headers, statusLabels, statusColors } from "./data";
import { useGetExpertOrders } from "../../../Hooks/experts/orders";
import Chip from "../../../Component/Chip";
import { formatDate } from "../../../utils/functions";
import { useNavigate } from "react-router-dom";

const ExpertOrders = () => {
  const navigate = useNavigate();
  const { data, loading } = useGetExpertOrders();

  console.log("Expert Orders ");
  console.log(data);

  function viewOrderDetails(orderId) {
    if (!orderId) return;
    navigate("/dashboard/expert/order/service", {
      state: { details: orderItem, customerId: details?.user_id },
    });
  }

  return (
    <div>
      <PagesHeader
        label="Orders Overview"
        desc={
          "Manage all your orders, update orders status, decline or accept orders.  "
        }
      />
      <Box mt={3} mb={3}>
        <CustomTable title="Assigned Orders" headers={headers} hidePagination>
          {loading ? (
            <TableRow>
              <TableCell colSpan={headers.length}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          ) : data && data?.length > 0 ? (
            data?.map((row) => (
              <TableRow hover key={row.id}>
                <TableCell>#{row.order_number}</TableCell>
                <TableCell>
                  <Chip
                    label={statusLabels[row?.status]}
                    color={statusColors[row?.status]}
                    noShadow
                  />
                </TableCell>
                <TableCell>{formatDate(row?.delivery_deadline)}</TableCell>
                <TableCell>
                  <Stack direction={"row"} gap={1}>
                    <IconButton size="small" onClick={viewOrderDetails}>
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

export default ExpertOrders;
