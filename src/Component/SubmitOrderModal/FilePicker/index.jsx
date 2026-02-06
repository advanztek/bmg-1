import { CloudArrowUpFilled } from "@fluentui/react-icons";
import { FormHelperText, Stack, Typography } from "@mui/material";
import { useRef } from "react";

export default function FilePicker({
  error,
  onChange,
  onBlur = () => null,
  tag = "Choose document to upload",
  caption = "Please click to select a file",
  label,
}) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleBlur = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onBlur(file);
    }
  };

  return (
    <Stack gap="10px">
      {label && (
        <Stack alignItems="end">
          <Typography
            fontSize="12px"
            color="rgb(100, 100, 120)"
            textAlign="right"
            fontWeight={600}
            lineHeight={1}
          >
            {label}
          </Typography>
        </Stack>
      )}

      <Stack
        component="label"
        alignItems="center"
        justifyContent="center"
        border={error ? "1px dashed #ff00042a" : "1px solid #e0e0ea"}
        bgcolor={error ? "#ff00040c" : "#ffffff"}
        py="32px"
        overflow="hidden"
        gap="8px"
        sx={{ cursor: "pointer" }}
        borderRadius="12px"
      >
        <CloudArrowUpFilled
          fontSize={42}
          color={error ? "#ff0004" : "#2C3891"}
        />

        <Stack alignItems="center" gap="4px">
          <Typography
            fontSize="12px"
            fontWeight={600}
            sx={{ userSelect: "none" }}
          >
            {tag}
          </Typography>

          <Typography
            variant="body2"
            color="rgb(100, 100, 120)"
            sx={{ userSelect: "none" }}
            fontSize="12px"
          >
            {caption}
          </Typography>
        </Stack>

        <input
          ref={inputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Stack>

      {error && (
        <FormHelperText error sx={{ fontSize: "12px", fontWeight: 500 }}>
          {error}
        </FormHelperText>
      )}
    </Stack>
  );
}
