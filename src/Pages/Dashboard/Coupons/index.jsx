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
  InfoCard,
  PagesHeader,
  StatusChip,
} from "../../../Component";
import { headers } from "./data";
import {
  AddOutlined,
  EditOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { EMOJI_ICONS } from "../../../Config/emojiIcons";
import { formatDate } from "../../../utils/functions";
import { useFetchCoupons } from "../../../Hooks/Dashboard/coupons";
import EditCouponModal from "./edit";
import SingleCouponModal from "./single";

const CouponsPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const { coupons, loading: couponsLoading, refetch } = useFetchCoupons();

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);

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
    setSelectedFaq(id);
    setEditModal(true);
  };

  const handleCloseEdit = async () => {
    setEditModal(false);
    await refetch();
    setSelectedFaq(null);
  };
  return (
    <div>
      <PagesHeader
        label="Manage Coupons"
        desc="Manage coupon codes, add, edit and delete coupons. update active status"
        enableSearch
        placeholder="Search coupon..."
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "Add Coupon",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/coupons"),
          },
          {
            label: "View Gifts",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/gifts"),
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
              title="Total Coupons"
              value={coupons.length}
              onAction={() => console.log("View Users")}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <InfoCard
              icon={EMOJI_ICONS.category}
              title="Coupons Sold"
              value="0"
              onAction={() => console.log("View Users")}
            />
          </Grid>
        </Grid>
      </Box>

      <Box mt={3} mb={3}>
        <CustomTable title="All Coupons" headers={headers}>
          {couponsLoading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          ) : coupons.length > 0 ? (
            coupons.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.discount_value}</TableCell>
                <TableCell>{row.discount_max_amount}</TableCell>
                <TableCell>{formatDate(row.created_at)}</TableCell>
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
                    No Coupon Code(s) Available.
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          )}
        </CustomTable>
      </Box>

      <SingleCouponModal
        open={open}
        onClose={handleClose}
        couponId={selectedId}
      />

      <EditCouponModal
        open={editModal}
        onClose={handleCloseEdit}
        couponId={selectedFaq}
      />
    </div>
  );
};

export default CouponsPage;
