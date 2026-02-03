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
import { headers } from "./data";
import {
  AddOutlined,
  VisibilityOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { EMOJI_ICONS } from "../../../Config/emojiIcons";
import { formatDate } from "../../../utils/functions";
import { useFetchVouchers } from "../../../Hooks/Dashboard/vouchers";
import EditVoucherModal from "./edit";
import SingleVoucherModal from "./single";

const VouchersPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const { vouchers, loading: vouchersLoading, refetch } = useFetchVouchers();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const handleOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    await refetch();
    setSelectedId(null);
  };

  const handleOpenEdit = (id) => {
    setSelectedVoucher(id);
    setEditModal(true);
  };

  const handleCloseEdit = async () => {
    setEditModal(false);
    await refetch();
    setSelectedVoucher(null);
  };

  return (
    <div>
      <PagesHeader
        label="Manage Vouchers"
        desc="Control and manage vouchers, add, edit and delete vouchers."
        enableSearch
        placeholder="Search vouchers..."
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "Add Gift",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/vouchers"),
          },
          {
            label: "Add Coupons",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/coupons"),
          },
          {
            label: "View Orders",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/orders"),
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
              icon={EMOJI_ICONS.cardGift}
              title="Total Vouchers"
              value={vouchers.length}
              onAction={() => console.log("View Users")}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <InfoCard
              icon={EMOJI_ICONS.category}
              title="Vouchers Sold"
              value="0"
              onAction={() => console.log("View Users")}
            />
          </Grid>
        </Grid>
      </Box>

      <Box mt={3} mb={3}>
        <CustomTable title="Available Vouchers" headers={headers}>
          {vouchersLoading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          ) : vouchers.length > 0 ? (
            vouchers.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{formatDate(row.created_at)}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{formatDate(row.updated_at)}</TableCell>

                <TableCell>
                  <StatusChip
                    status={row.status === true ? "active" : "inactive"}
                    label={row.status === true ? "Active" : "Disabled"}
                  />
                </TableCell>

                <TableCell>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="end"
                    gap={0.5}
                  >
                    <IconButton size="small" onClick={() => handleOpen(row.id)}>
                      <VisibilityOutlined fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenEdit(row.id)}
                    >
                      <EditOutlined fontSize="small" />
                    </IconButton>
                  </Stack>
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
                    No Voucher(s) Available.
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          )}
        </CustomTable>
      </Box>

      <SingleVoucherModal
        open={open}
        onClose={handleClose}
        couponId={selectedId}
      />

      <EditVoucherModal
        open={editModal}
        onClose={handleCloseEdit}
        couponId={selectedVoucher}
      />
    </div>
  );
};

export default VouchersPage;
