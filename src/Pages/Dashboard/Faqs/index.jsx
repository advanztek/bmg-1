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
import {
  AddOutlined,
  VisibilityOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { formatDate, truncateText, stripHtml } from "../../../utils/functions";
import SingleFaqModal from "./single";
import { useFetchFaqs } from "../../../Hooks/Dashboard/faqs";
import EditFaqModal from "./edit";

const FaqsPage = () => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();

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

  const { refetch, faqs, loading: faqsLoading } = useFetchFaqs();

  return (
    <div>
      <PagesHeader
        label="Manage FAQs"
        desc="Manage FAQs - view available FAQs, add new FAQs, update, terminate or disable FAQs."
        enableSearch
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "Add FAQ",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/faq"),
          },
          {
            label: "Add Service FAQ",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/service-faq"),
          },
          {
            label: "Add Category FAQ",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/category-faq"),
          },
        ]}
      />

      <Box mt={3} mb={3}>
        <CustomTable title="Available FAQs" headers={headers}>
          {faqsLoading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <CircularProgress
                  color="secondary"
                  sx={{ display: "block", marginX: "auto" }}
                />
              </TableCell>
            </TableRow>
          ) : faqs.length > 0 ? (
            faqs.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell
                  sx={{
                    maxWidth: 400,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Typography variant="body2" title={row.answer}>
                    {truncateText(row.question, 30)}
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    maxWidth: 400,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Typography variant="body2" title={row.answer}>
                    {truncateText(stripHtml(row.answer), 50)}
                  </Typography>
                </TableCell>

                <TableCell>{formatDate(row.created_at)}</TableCell>
                <TableCell>{formatDate(row.updated_at)}</TableCell>

                <TableCell>
                  <StatusChip
                    status={row.status === 1 ? "active" : "inactive"}
                    label={row.status === 1 ? "Active" : "Disabled"}
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
                    No FAQ Available.
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          )}
        </CustomTable>
      </Box>

      <SingleFaqModal open={open} onClose={handleClose} faqId={selectedId} />

      <EditFaqModal
        open={editModal}
        onClose={handleCloseEdit}
        faqId={selectedFaq}
      />
    </div>
  );
};

export default FaqsPage;
