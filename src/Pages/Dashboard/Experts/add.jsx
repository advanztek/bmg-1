import { useState } from "react";
import {
  Grid,
  Box,
  Input,
  Select,
  FormControl,
  MenuItem,
  CircularProgress,
  Stack
} from "@mui/material";
import {
  AddOutlined,
  DeleteOutlined,
  VisibilityOutlined
} from "@mui/icons-material";
import { InputLabel, CustomButton, PagesHeader } from "../../../Component";
import { skills, experience } from "./data";
import { validateEmail } from "../../../utils/functions";
import { styles } from "../../../styles/dashboard";
import { useNavigate } from "react-router-dom";
import { useAddExpert } from "../../../Hooks/Dashboard/experts";
import { showToast } from "../../../utils/toast";
import { useLoader } from "../../../Contexts/LoaderContext";

const AddExpertPage = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skill, setSkill] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);

  const addExpert = useAddExpert();
  const navigate = useNavigate();
  const { hideLoader, showLoader } = useLoader();


  const validateForm = () => {

    if (
      !firstname.trim() ||
      !lastname.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !skill ||
      !experience
    ) {
      showToast.error("Please fill in all fields.");
      return false;
    }

    if (!validateEmail(email)) {
      showToast.error("Please enter a valid email address.");
      return false;
    }

    return true;
  };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    showLoader("Adding Expert...");

    try {
      const payload = {
        first_name: firstname,
        last_name: lastname,
        email: email,
        skill,
        phone,
        experience,
      };
      console.log("PayLoad:", payload);

      const response = await addExpert(payload);
      if (response) {
        showToast.success("Category added successfully!");
        setFirstname("");
        setEmail("");
        setLastname("");
        setPhone("");
        navigate("/dashboard/view/experts");
      }
    } catch (error) {
      showToast.error(error || "Failed to create category");
    } finally {
      setLoading(false);
      hideLoader();
    }
  };


  const handleCancel = () => {
    navigate("/dashboard/admin/experts");
  };

  return (
    <>
      <PagesHeader
        label="Add Expert"
        desc="Add an expert, assign privileges and manage controls"
        searchEnabled={false}
        actions={[
          {
            label: "View Experts",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/experts")
          }
        ]}
      />

      <Box sx={styles.card}>
        <Box component="form" mt={3}>
          {/* Names */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel text="First Name" />
              <Input
                disableUnderline
                fullWidth
                sx={styles.input}
                value={firstname}
                onChange={setFirstname}
                disabled={loading}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel text="Last Name" />
              <Input
                disableUnderline
                fullWidth
                sx={styles.input}
                value={lastname}
                onChange={setLastname}
                disabled={loading}
              />
            </Grid>
          </Grid>

          {/* Contact */}
          <Grid container spacing={2} mt={1.5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel text="Email Address" />
              <Input
                disableUnderline
                fullWidth
                sx={styles.input}
                value={email}
                onChange={setEmail}
                disabled={loading}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel text="Phone Number" />
              <Input
                disableUnderline
                fullWidth
                type="number"
                sx={styles.input}
                value={phone}
                onChange={setPhone}
                disabled={loading}
              />
            </Grid>
          </Grid>

          {/* Skill & Experience */}
          <Grid container spacing={2} mt={1.5}>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel text="Skill" />
                <Select
                  value={skill}
                  onChange={setSkill}
                  disableUnderline
                  sx={styles.input}
                  displayEmpty
                  disabled={loading}
                >
                  <MenuItem value="" disabled>
                    Select a skill
                  </MenuItem>
                  {skills.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.skill}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel text="Experience" />
                <Select
                  value={experience}
                  onChange={setExperience}
                  disableUnderline
                  sx={styles.input}
                  displayEmpty
                  disabled={loading}
                >
                  <MenuItem value="" disabled>
                    Select experience level
                  </MenuItem>
                  {experience.map((exp) => (
                    <MenuItem key={exp.experience} value={exp.experience}>
                      {exp.experience}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Actions */}
          <Grid container spacing={2} mt={3}>
            <Grid size={{ xs: 12, md: 6 }} />

            <Grid size={{ xs: 12, md: 6 }}>
              <Stack direction="row" justifyContent="flex-end" gap={2}>
                <CustomButton
                  title="Cancel"
                  color="warning"
                  variant="filled"
                  startIcon={<DeleteOutlined />}
                  onClick={handleCancel}
                  disabled={loading}
                  sx={{ textTransform: "none", px: 4 }}
                />

                <CustomButton
                  title={loading ? "Adding..." : "Add Expert"}
                  color="primary"
                  variant="filled"
                  startIcon={
                    loading ? <CircularProgress size={20} /> : <AddOutlined />
                  }
                  disabled={loading}
                  type="submit"
                  onClick={handleSubmit}
                  sx={{ textTransform: "none", px: 4 }}
                />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default AddExpertPage;
