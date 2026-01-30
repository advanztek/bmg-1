import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  Grid,
  Chip,
  Stack,
  InputAdornment,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SubjectIcon from "@mui/icons-material/Subject";
import CloseIcon from "@mui/icons-material/Close";
import {
  RecipientsTable,
  UserSearch,
  SideBar,
  CustomButton,
  PagesHeader,
  RichTextEditor,
  InboxList,
  RecipientsSelectTable,
} from "../../../Component";
import {
  AddOutlined,
  MailOutlined,
  VisibilityOutlined,
  PeopleOutlined,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFetchMailRecipients } from "../../../Hooks/Dashboard/mails";
import { showToast } from "../../../utils/toast";
import { useLoader } from "../../../Contexts/LoaderContext";
import { useSendMails } from "../../../Hooks/Dashboard/mails";

const ComposeMailPage = () => {
  const [recipientModalOpen, setRecipientModalOpen] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [errors, setErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("compose");
  const [showRecipients, setShowRecipients] = useState(false);
  const { showLoader, hideLoader } = useLoader();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { recipients, loading: recipientsLoading } = useFetchMailRecipients();
  const sendMail = useSendMails();

  console.log("Mail Recipients:", recipients);

  const handleSendToAll = () => {
    const allEmails = recipients.map((user) => user.email);
    setSelectedRecipients(allEmails);
    showToast.info(`Sending Mail to ${selectedRecipients.length} Users`);
  };

  const handleAddFromSearch = (email) => {
    if (!selectedRecipients.includes(email)) {
      setSelectedRecipients([...selectedRecipients, email]);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 32 * 1024 * 1024) {
      setAttachment(file);
    } else {
      setErrors([...errors, "File size must be less than 32MB"]);
    }
  };

  const formData = {
    title: subject,
    content,
    attachment,
    recipients: selectedRecipients,
  };

  console.log("sending res:", formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = [];
    if (selectedRecipients.length === 0)
      newErrors.push("Please select at least one recipient");
    if (!subject.trim()) newErrors.push("Subject is required");
    if (!content.trim()) newErrors.push("Message content is required");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    showLoader("Sendingm Mail...");

    try {
      const response = await sendMail(formData);

      if (response) {
        showToast.success("Method added successfully!");
        setSelectedRecipients([]);
        setSubject("");
        setContent("");
        setAttachment(null);
        setErrors([]);
        navigate("/dashboard/manage/payment-methods");
      }
    } catch (error) {
      showToast.error(error);
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  const handleDiscard = () => {
    setSelectedRecipients([]);
    setSubject("");
    setContent("");
    setAttachment(null);
    setErrors([]);
  };

  return (
    <div>
      <PagesHeader
        label="Compose Mails"
        desc="Manage mails, compose mails, view mails, bulk send mails mark as read."
        enableSearch
        placeholder={"Search orders..."}
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "View Notifications",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/notifications"),
          },
          {
            label: "View Orders",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/orders"),
          },
          {
            label: "Add Service",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/services"),
          },
        ]}
      />
      <Box sx={{ minHeight: "100vh", py: 4 }}>
        <Container maxWidth="xl">
          {/* Error Messages */}
          {errors.length > 0 && (
            <Stack spacing={1} sx={{ mb: 3 }}>
              {errors.map((error, index) => (
                <Alert
                  key={index}
                  severity="error"
                  onClose={() =>
                    setErrors(errors.filter((_, i) => i !== index))
                  }
                >
                  {error}
                </Alert>
              ))}
            </Stack>
          )}

          <Grid container spacing={3}>
            {/* SideBar */}
            <Grid size={{ xs: 12, md: 3 }}>
              <CustomButton
                title={view === "compose" ? "Go To Inbox" : "Compose Mail"}
                fullWidth
                variant="filled"
                color="primary"
                endIcon={<MailOutlined />}
                style={{ marginBottom: "10px", py: 2 }}
                onClick={() =>
                  view === "compose" ? setView("inbox") : setView("compose")
                }
              />

              <SideBar mailCount={12} />
            </Grid>

            {/* Main Content */}
            {view === "compose" ? (
              <Grid size={{ xs: 12, md: 9 }}>
                <Card>
                  <Box
                    sx={{
                      p: 2,
                      color: "#000000",
                      m: 2,
                    }}
                  >
                    <Typography variant="h3" fontWeight={600}>
                      Compose New Message
                    </Typography>
                  </Box>

                  <CardContent sx={{ p: 4 }}>
                    <Box component="div" onSubmit={handleSubmit}>
                      {/* Search Users */}
                      <UserSearch onAddUser={handleAddFromSearch} />

                      {/* Select Recipients */}
                      <Box sx={{ mb: 3 }}>
                        <Stack direction="row" spacing={2}>
                          <Button
                            variant="outlined"
                            startIcon={<PeopleOutlined />}
                            onClick={() => setRecipientModalOpen(true)}
                          >
                            Select Recipients
                          </Button>
                          <Button
                            variant="contained"
                            color="success"
                            startIcon={<PeopleOutlined />}
                            onClick={handleSendToAll}
                          >
                            Send to All Users
                          </Button>
                        </Stack>
                      </Box>

                      {/* Selected Recipients */}
                      <Box sx={{ mb: 3 }}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          onClick={() => setShowRecipients(!showRecipients)}
                          sx={{ cursor: "pointer" }}
                        >
                          <Typography fontWeight={600}>
                            Selected Recipients ({selectedRecipients.length})
                          </Typography>
                          {showRecipients ? <ExpandLess /> : <ExpandMore />}
                        </Stack>

                        <Collapse in={showRecipients}>
                          <RecipientsTable
                            recipients={selectedRecipients}
                            onRemove={(id) =>
                              setSelectedRecipients((prev) =>
                                prev.filter((u) => u.id !== id),
                              )
                            }
                          />
                        </Collapse>
                      </Box>

                      {/* Subject */}
                      <TextField
                        fullWidth
                        label="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        sx={{ mb: 3 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SubjectIcon />
                            </InputAdornment>
                          ),
                        }}
                      />

                      {/* Content */}
                      <RichTextEditor
                        value={content}
                        onChange={setContent}
                        placeholder="Enter service type description..."
                        minHeight="300px"
                        maxHeight="500px"
                      />

                      {/* Attachment */}
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ mb: 1, fontWeight: 500 }}
                        >
                          <AttachFileIcon
                            sx={{ mr: 1, verticalAlign: "middle" }}
                          />
                          Attachment
                        </Typography>
                        <Button
                          variant="outlined"
                          component="label"
                          startIcon={<AttachFileIcon />}
                        >
                          Choose File
                          <input
                            type="file"
                            hidden
                            onChange={handleFileChange}
                          />
                        </Button>
                        {attachment && (
                          <Chip
                            label={attachment.name}
                            onDelete={() => setAttachment(null)}
                            sx={{ ml: 2 }}
                          />
                        )}
                        <Typography
                          variant="caption"
                          display="block"
                          sx={{ mt: 1, color: "text.secondary" }}
                        >
                          Max. 32MB
                        </Typography>
                      </Box>

                      {/* Actions */}
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{ pt: 2, borderTop: 1, borderColor: "divider" }}
                      >
                        <Button
                          variant="contained"
                          color="inherit"
                          startIcon={<CloseIcon />}
                          onClick={handleDiscard}
                          sx={{
                            bgcolor: "grey.800",
                            "&:hover": { bgcolor: "grey.900" },
                          }}
                        >
                          Discard
                        </Button>

                        <CustomButton
                          title={loading ? "Sending..." : "Send"}
                          color="primary"
                          variant="filled"
                          startIcon={
                            loading ? <CircularProgress /> : <SendIcon />
                          }
                          disabled={loading}
                          onClick={handleSubmit}
                          sx={{ textTransform: "none", px: 4 }}
                        />
                      </Stack>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ) : (
              <InboxList />
            )}
          </Grid>
        </Container>
      </Box>
      <Dialog
        open={recipientModalOpen}
        onClose={() => setRecipientModalOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Select Users</DialogTitle>

        <DialogContent>
          <RecipientsSelectTable
            selected={selectedRecipients}
            onToggleUser={(user) => {
              setSelectedRecipients((prev) =>
                prev.some((u) => u.id === user.id)
                  ? prev.filter((u) => u.id !== user.id)
                  : [...prev, user],
              );
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setRecipientModalOpen(false)}>Done</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ComposeMailPage;
