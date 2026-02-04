import React from "react";
import {
  Box,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Stack
} from "@mui/material";
import { CustomTable, StatusChip, PagesHeader, PaymentDetailsModal } from "../../../Component";
import {
  Visibility,
  AddOutlined,
  VisibilityOutlined
} from "@mui/icons-material";
import { headers } from "./data";
import { useNavigate } from "react-router-dom";
import { useUserPayments } from "../../../Hooks/Dashboard/payments";
import BrandLoader from "../../../Component/BrandLoader";

const UserPaymentsPage = () => {
  const navigate = useNavigate();
  const { loading, payments: apiData } = useUserPayments();
  const [selectedPayment, setSelectedPayment] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  console.log("apiData:", apiData);

  // Transform API data to match table expectations
  const data = React.useMemo(() => {
    return apiData?.map(payment => ({
      id: payment.id,
      subject: payment.metadata?.order_number || payment.reference,
      description: `${payment.metadata?.type || 'Payment'} - ${payment.reference}`,
      dueDate: new Date(payment.created_at).toLocaleDateString('en-GB'),
      amount: `${payment?.currency} ${(payment.amount / 100).toLocaleString()}`,
      status: payment.status,
      rawData: payment // Keep original data for detail view
    })) || [];
  }, [apiData]);

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment.rawData);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedPayment(null), 200); // Clear after animation
  };

  return (
    <div>
      <PagesHeader
        label="Payments"
        desc="See all your payments, view their status and make pending payments on orders."
        actions={[
          {
            label: "My Orders",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/user/orders")
          }
        ]}
      />
      <Box mt={3} mb={3}>
        <CustomTable title="Total Payments" headers={headers}>
          {loading ? (
            <TableRow>
              <TableCell colSpan={8} align="center">
                <BrandLoader />
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} align="center">
                No payments found
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow hover key={row.id}>
                <TableCell><Checkbox /></TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.subject}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.dueDate}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>
                  <StatusChip status={row.status} label={row.status} />
                </TableCell>
                <TableCell>
                  <Stack direction="row" gap={1}>
                    <IconButton
                      size="small"
                      onClick={() => handleViewDetails(row)}
                      title="View Details"
                    >
                      <Visibility fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))
          )}
        </CustomTable>
      </Box>

      {/* Payment Details Modal */}
      <PaymentDetailsModal
        open={modalOpen}
        onClose={handleCloseModal}
        payment={selectedPayment}
      />
    </div>
  );
};

export default UserPaymentsPage;