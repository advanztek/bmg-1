import { ShieldTaskFilled } from "@fluentui/react-icons";
import { Button, Modal, Stack, Typography } from "@mui/material";
import { useState } from "react";
import Input from "./Input";
import FilePicker from "./FilePicker";
import FileStatus from "./FileStatus";
import FileProgress from "./FileProgress";
import { useSubmitOrder } from "../../Hooks/experts/orders";
import { convertFileToBase64 } from "../../utils/functions";

export default function SubmitOrderModal({
  orderDetails,
  onSuccess,
  open,
  onClose,
  submitHeadId,
}) {
  const { submitOrder, loading: submitLoading } = useSubmitOrder();
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [linkError, setLinkError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [fileError, setFileError] = useState("");

  const MAX_FILES = 3;
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const validateFile = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      return "File size must be less than 5MB";
    }
    return null;
  };

  const handleFileChange = (newFile) => {
    setFileError("");

    // Check if max files reached
    if (files.length >= MAX_FILES) {
      setFileError(`Maximum ${MAX_FILES} files allowed`);
      return;
    }

    // Validate file size
    const error = validateFile(newFile);
    if (error) {
      setFileError(error);
      return;
    }

    // Add file to array
    setFiles((prev) => [...prev, newFile]);
  };

  const handleFileRemove = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFileError("");
  };

  const handleLinkChange = (value) => {
    setLink(value);
    setLinkError("");

    // Clear files if link is provided
    if (value.trim()) {
      setFiles([]);
    }
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
    setDescriptionError("");
  };

  const handleSubmit = async () => {
    setLinkError("");
    setDescriptionError("");
    setFileError("");

    let hasError = false;

    // Validate that either link or files are provided
    if (!link.trim() && files.length === 0) {
      setLinkError("Please provide either a link or upload files");
      hasError = true;
    }

    // Validate link format if provided
    if (link.trim()) {
      try {
        new URL(link);
      } catch {
        setLinkError("Please enter a valid URL");
        hasError = true;
      }
    }

    // Validate description
    if (!description.trim()) {
      setDescriptionError("Please provide a description");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      let base64Files = [];

      if (files.length > 0) {
        // Convert all files to base64
        base64Files = await Promise.all(
          files.map(async (file) => ({
            name: file.name,
            type: file.type,
            size: file.size,
            base64: await convertFileToBase64(file),
          })),
        );
      }

      const data = {
        link: link.trim() || null,
        description: description.trim(),
        files: base64Files,
        order_id: orderDetails?.order_id,
        order_item_id: orderDetails?.order_item_id,
      };

      if (submitHeadId) {
        data["parent_submission_id"] = submitHeadId;
      }

      const response = await submitOrder(data);

      if (response) {
        setLink("");
        setDescription("");
        setFiles([]);
        onSuccess();
      }
    } catch (error) {
      setFileError("Error processing files. Please try again.");
      console.error("Submission error:", error);
    }
  };

  const formatFileSize = (bytes) => {
    return `${Math.round(bytes / 1024)} KB`;
  };

  const getFileType = (file) => {
    if (file.type.startsWith("image/")) return "image";
    if (file.type.startsWith("video/")) return "video";
    return "document";
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Stack
        gap="22px"
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid rgb(224, 224, 234)",
          padding: { xs: "14px", md: "16px" },
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "95%", sm: "80%", md: "40%", lg: "30%" },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography fontWeight={700} color="#2C3891" fontSize="18px">
            Submit
          </Typography>
          <ShieldTaskFilled fontSize={30} color="#9f9fad" />
        </Stack>

        <Stack gap="10px" sx={{ maxHeight: "65vh", overflowY: "auto" }}>
          <Input
            label="Link to Solution"
            error={linkError}
            value={link}
            onChange={handleLinkChange}
          />

          <Input
            type="textarea"
            label="Description"
            error={descriptionError}
            value={description}
            onChange={handleDescriptionChange}
          />

          <FilePicker
            label="Solution File"
            error={fileError}
            onChange={handleFileChange}
          />

          {files.map((file, index) => (
            <FileStatus
              key={index}
              type={getFileType(file)}
              name={file.name}
              tag={formatFileSize(file.size)}
              onClick={() => handleFileRemove(index)}
            />
          ))}

          {files.length > 0 && <FileProgress nFiles={files.length} />}
        </Stack>

        <Stack alignItems="end">
          <Button
            variant="contained"
            sx={{ borderRadius: "10px" }}
            onClick={handleSubmit}
            loading={submitLoading}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
}
