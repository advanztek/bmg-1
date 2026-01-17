/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  Chip,
  Divider,
  Avatar,
  Skeleton,
} from "@mui/material";
import {
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
  ImageOutlined,
  CalendarTodayOutlined,
  UpdateOutlined,
} from "@mui/icons-material";
import { formatDate } from "../../../utils/functions";
import {
  useFetchServiceTypes,
  useGetServiceType,
} from "../../../Hooks/Dashboard/service_types";
import { BASE_IMAGE_URL } from "../../../Config/paths";

const ServiceTypeModal = ({ open, onClose, typeId, onEdit, onDelete }) => {
  const { typeData, loading, getServiceType } = useGetServiceType();
  const { refetch } = useFetchServiceTypes();

  useEffect(() => {
    if (open && typeId) {
      getServiceType(typeId);
    }
  }, [open, typeId]);

  const handleDelete = async () => {
    if (!typeData?.id) return;
    if (
      window.confirm(`Delete service type "${typeData.service_type_name}"?`)
    ) {
      await onDelete(typeData.id);
      await refetch();
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 16, top: 16, zIndex: 1 }}
      >
        <CloseOutlined />
      </IconButton>

      <DialogContent sx={{ p: 0 }}>
        {loading ? (
          <Box sx={{ p: 4 }}>
            <Skeleton variant="rectangular" height={220} />
            <Skeleton height={40} sx={{ mt: 3 }} />
            <Skeleton height={80} sx={{ mt: 2 }} />
          </Box>
        ) : typeData ? (
          <>
            <Box
              sx={{
                height: 240,
                bgcolor: "grey.100",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {typeData.service_type_image ? (
                <Box
                  component="img"
                  src={`${BASE_IMAGE_URL}/${typeData.service_type_image}`}
                  alt={typeData.service_type_name}
                  sx={{
                    maxHeight: 160,
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <Avatar sx={{ width: 120, height: 120 }}>
                  <ImageOutlined sx={{ fontSize: 60 }} />
                </Avatar>
              )}
            </Box>

            <Box sx={{ p: 4 }}>
              <Typography variant="h4" fontWeight={700}>
                {typeData.service_type_name}
              </Typography>

              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Chip
                  label={typeData.status ? "Active" : "Inactive"}
                  color={typeData.status ? "success" : "default"}
                  size="small"
                />
                <Chip
                  label={typeData.category_name}
                  size="small"
                  variant="outlined"
                />
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Typography
                variant="overline"
                color="text.secondary"
                fontWeight={600}
              >
                Description
              </Typography>
              <Typography
                sx={{ mt: 1, color: "text.secondary", lineHeight: 1.8 }}
              >
                {typeData.description || "No description provided."}
              </Typography>

              <Divider sx={{ my: 4 }} />

              <Typography
                variant="overline"
                color="text.secondary"
                fontWeight={600}
              >
                Timeline
              </Typography>

              <Stack spacing={2} sx={{ mt: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    <CalendarTodayOutlined />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" fontWeight={600}>
                      Created At
                    </Typography>
                    <Typography variant="body2">
                      {formatDate(typeData.created_at)}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: "success.main" }}>
                    <UpdateOutlined />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" fontWeight={600}>
                      Last Updated
                    </Typography>
                    <Typography variant="body2">
                      {formatDate(typeData.updated_at)}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>

              <Divider sx={{ my: 4 }} />

              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button variant="outlined" onClick={onClose}>
                  Close
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteOutlined />}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  startIcon={<EditOutlined />}
                  onClick={() => onEdit(typeData)}
                >
                  Edit
                </Button>
              </Stack>
            </Box>
          </>
        ) : (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography color="text.secondary">
              Service type not found
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ServiceTypeModal;
