import React, { useState } from "react";
import {
  Grid,
  Box,
  Input,
  Stack,
  Switch,
  TextField,
  Typography,
  Chip,
  IconButton,
  FormControl,
  MenuItem,
  Select,
  InputAdornment,
} from "@mui/material";
import {
  AddOutlined,
  DeleteOutlined,
  VisibilityOutlined,
  ArrowBackOutlined,
  AttachMoneyOutlined,
  CloseOutlined,
} from "@mui/icons-material";
import {
  InputLabel,
  CustomButton,
  PagesHeader,
  UploadMedia,
} from "../../../Component";
import { styles } from "../../../styles/dashboard";
import { useNavigate } from "react-router-dom";
import { useCreateServices } from "../../../Hooks/Dashboard/services";
import { useFetchCategories } from "../../../Hooks/Dashboard/categories";
import { useFetchSubCategories } from "../../../Hooks/Dashboard/sub_categories";
import { showToast } from "../../../utils/toast";
import { useLoader } from "../../../Contexts/LoaderContext";

const AddServicePage = () => {
  const [serviceName, setServiceName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCatId, setSubCatId] = useState("");
  const [serviceStatus, setServiceStatus] = useState(true);
  const [attributes, setAttributes] = useState([]);
  const [currentAttribute, setCurrentFeature] = useState("");

  // requirements
  const [requirements, setRequirements] = useState([]);
  const [currentRequirement, setCurrentRequirement] = useState({
    name: "",
    input_type: "",
    required: true,
  });
  const [details, setDetails] = useState([]);
  const [currentDetail, setCurrentDetail] = useState("");

  const [loading, setLoading] = useState(false);
  const addService = useCreateServices();
  const navigate = useNavigate();
  const { hideLoader, showLoader } = useLoader();
  const { categories } = useFetchCategories();
  const { subCat } = useFetchSubCategories();

  const handleAddFeature = (e) => {
    e.preventDefault();
    if (currentAttribute.trim()) {
      setAttributes([...attributes, currentAttribute.trim()]);
      setCurrentFeature("");
    }
  };

  const handleRemoveFeature = (index) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  const handleAddDetail = (e) => {
    e.preventDefault();
    if (currentDetail.trim()) {
      setDetails([...details, currentDetail.trim()]);
      setCurrentDetail("");
    }
  };

  const handleRemoveDetail = (index) => {
    setDetails(details.filter((_, i) => i !== index));
  };

  // ===== REQUIREMENTS =====
  const addRequirement = (e) => {
    // Prevent form submission
    if (e) e.preventDefault();

    if (!currentRequirement.label || !currentRequirement.type) {
      showToast.warning("Please fill in requirement label and type");
      return;
    }

    setRequirements([...requirements, currentRequirement]);
    setCurrentRequirement({ label: "", type: "", required: true });
  };

  const removeRequirement = (index) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !serviceName.trim() ||
      !categoryId ||
      !subCatId ||
      attributes.length < 3
    ) {
      showToast.warning(
        "Please fill in all required fields and add atleast three service features.",
      );
      return;
    }

    setLoading(true);
    showLoader("Adding Service...");

    try {
      const payload = {
        service_name: serviceName,
        category_id: categoryId,
        subcategory_id: subCatId,
        service_attributes: attributes,
        service_status: serviceStatus,
        service_requirements: requirements.length > 0 ? requirements : undefined,
        service_details: details,
      };
      console.log("PayLoad:", payload);

      const response = await addService(payload);
      if (response) {
        showToast.success("Service added successfully!");
        setServiceName("");
        setAttributes([]);
        setRequirements([]);
        navigate("/dashboard/admin/services");
      }
    } catch (error) {
      console.error("Error adding service:", error);
      showToast.error("Failed to create service");
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  return (
    <>
      <PagesHeader
        label="Add Service"
        desc="Add services, select category and sub categories for services. Go to view services to manage services"
        searchEnabled={false}
        placeholder={"Search services..."}
        actions={[
          {
            label: "View Services",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/services"),
          },
          {
            label: "Add Cateogries",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/categories"),
          },
        ]}
      />

      <Box sx={styles.card}>
        <Box component="form" mt={3} onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  p: 3,
                  bgcolor: "white",
                }}
              >
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12 }}>
                    <InputLabel text="Service Name" />
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Enter Service Name"
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        px: 2,
                        py: 1.5,
                        fontSize: "14px",
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControl fullWidth>
                      <InputLabel text="Service Category" />
                      <Select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        disableUnderline
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          <InputLabel text="Select Service Category" />
                        </MenuItem>

                        {categories.map((cat, index) => (
                          <MenuItem key={index} value={cat.id}>
                            {cat.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControl fullWidth>
                      <InputLabel text="Service Sub Category" />
                      <Select
                        value={subCatId}
                        onChange={(e) => setSubCatId(e.target.value)}
                        disableUnderline
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          <InputLabel text="Select Service Sub Category" />
                        </MenuItem>

                        {subCat.map((cat, index) => (
                          <MenuItem key={index} value={cat.id}>
                            {cat.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Box
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 2,
                        p: 3,
                        bgcolor: "white",
                        mt: 3,
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight={600} mb={2}>
                        Service Status
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="body2" fontWeight={500}>
                          {serviceStatus ? "Active" : "Inactive"}
                        </Typography>
                        <Switch
                          checked={serviceStatus}
                          onChange={(e) => setServiceStatus(e.target.checked)}
                          disabled={loading}
                          color="warning"
                        />
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 7 }}>
              <Typography variant="h4" fontWeight={600} mb={1}>
                Service Attributes
              </Typography>

              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  p: 3,
                  bgcolor: "white",
                  mt: 2,
                }}
              >
                <Grid size={{ xs: 12 }}>
                  <InputLabel text="Add Features *" />
                  <Stack direction="row" spacing={2}>
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="e.g., Unlimited storage, 24/7 support"
                      value={currentAttribute}
                      onChange={(e) => setCurrentFeature(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddFeature(e);
                        }
                      }}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        px: 2,
                        py: 1.5,
                        fontSize: "14px",
                      }}
                    />
                    <IconButton
                      onClick={handleAddFeature}
                      type="button"
                      sx={{
                        bgcolor: "#1976d2",
                        color: "white",
                        "&:hover": { bgcolor: "#1565c0" },
                      }}
                    >
                      <AddOutlined />
                    </IconButton>
                  </Stack>

                  {attributes.length > 0 && (
                    <Box mt={2}>
                      <Stack direction="row" flexWrap="wrap" gap={1}>
                        {attributes.map((feature, index) => (
                          <Chip
                            key={index}
                            label={feature}
                            onDelete={() => handleRemoveFeature(index)}
                            deleteIcon={<CloseOutlined />}
                            sx={{ bgcolor: "#e3f2fd" }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  )}
                </Grid>
              </Box>

              <Typography variant="h4" fontWeight={600} mt={3} mb={1}>
                Service Details
              </Typography>

              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  p: 3,
                  bgcolor: "white",
                  mt: 2,
                }}
              >
                <Grid size={{ xs: 12 }}>
                  <InputLabel text="Add Service Details *" />
                  <Stack direction="row" spacing={2}>
                    <Input
                      disableUnderline
                      fullWidth
                      placeholder="Enter atleast three service details"
                      value={currentDetail}
                      onChange={(e) => setCurrentDetail(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddDetail(e);
                        }
                      }}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        px: 2,
                        py: 1.5,
                        fontSize: "14px",
                      }}
                    />
                    <IconButton
                      onClick={handleAddDetail}
                      type="button"
                      sx={{
                        bgcolor: "#1976d2",
                        color: "white",
                        "&:hover": { bgcolor: "#1565c0" },
                      }}
                    >
                      <AddOutlined />
                    </IconButton>
                  </Stack>

                  {details.length > 0 && (
                    <Box mt={2}>
                      <Stack direction="row" flexWrap="wrap" gap={1}>
                        {details.map((feature, index) => (
                          <Chip
                            key={index}
                            label={feature}
                            onDelete={() => handleRemoveDetail(index)}
                            deleteIcon={<CloseOutlined />}
                            sx={{ bgcolor: "#e3f2fd" }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  )}
                </Grid>
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h4" fontWeight={600} mt={4} mb={1}>
                Service Requirements
              </Typography>

              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  p: 3,
                  bgcolor: "white",
                }}
              >
                <Stack spacing={2}>
                  <Input
                    disableUnderline
                    placeholder="Requirement label (e.g. Upload logo)"
                    value={currentRequirement.label}
                    onChange={(e) =>
                      setCurrentRequirement({
                        ...currentRequirement,
                        label: e.target.value,
                      })
                    }
                    sx={{
                      border: "1px solid #e0e0e0",
                      borderRadius: 1,
                      px: 2,
                      py: 1.5,
                      fontSize: "14px",
                    }}
                  />

                  <Select
                    value={currentRequirement.type}
                    onChange={(e) =>
                      setCurrentRequirement({
                        ...currentRequirement,
                        type: e.target.value,
                      })
                    }
                    displayEmpty
                    sx={{
                      border: "1px solid #e0e0e0",
                      borderRadius: 1,
                    }}
                  >
                    <MenuItem value="" disabled>
                      Select input type
                    </MenuItem>
                    <MenuItem value="text">Text</MenuItem>
                    <MenuItem value="file">File</MenuItem>
                    <MenuItem value="url">URL</MenuItem>
                  </Select>

                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography>Required</Typography>
                    <Switch
                      checked={currentRequirement.required}
                      onChange={(e) =>
                        setCurrentRequirement({
                          ...currentRequirement,
                          required: e.target.checked,
                        })
                      }
                      color="warning"
                    />
                  </Stack>

                  <CustomButton
                    title="Add Requirement"
                    onClick={addRequirement}
                    type="button"
                    variant="outlined"
                  />
                </Stack>

                <Stack mt={2} gap={1}>
                  {requirements.map((req, i) => (
                    <Chip
                      key={i}
                      label={`${req.label} (${req.type}) ${req.required ? "- Required" : "- Optional"}`}
                      onDelete={() => removeRequirement(i)}
                      deleteIcon={<CloseOutlined />}
                      sx={{ bgcolor: "#f5f5f5" }}
                    />
                  ))}
                </Stack>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={5}>
            <Grid size={{ xs: 12 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <CustomButton
                  title="Back"
                  color="inherit"
                  variant="outlined"
                  startIcon={<ArrowBackOutlined />}
                  onClick={() => navigate(-1)}
                  type="button"
                  sx={{ textTransform: "none", px: 3 }}
                />

                <Stack direction="row" gap={2}>
                  <CustomButton
                    title="Delete"
                    color="danger"
                    variant="outlined"
                    startIcon={<DeleteOutlined />}
                    onClick={() => {}}
                    type="button"
                    sx={{ textTransform: "none", px: 4 }}
                  />
                  <CustomButton
                    title={loading ? "Adding..." : "Add Service"}
                    color="primary"
                    variant="filled"
                    disabled={loading}
                    type="submit"
                    sx={{ textTransform: "none", px: 4 }}
                  />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default AddServicePage;
