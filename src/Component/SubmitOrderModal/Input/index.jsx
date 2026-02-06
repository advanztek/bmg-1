import { Box, FormHelperText, Stack, Typography } from "@mui/material";

export default function Input({
  value,
  onChange,
  label = "Label",
  type = "text",
  rows = 4,
  error,
}) {
  return (
    <Stack gap="10px">
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
      {type === "textarea" ? (
        <Box
          component="textarea"
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          sx={{
            border: error ? "1px dashed #ff00042a" : "1px solid #e0e0ea",
            backgroundColor: error ? "#ff00040c" : "#ffffff",
            outline: "none",
            borderRadius: "8px",
            padding: "10px 10px",
            fontSize: "14px",
            color: "#272629",
            resize: "none",
          }}
        />
      ) : (
        <Box
          component="input"
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          sx={{
            border: error ? "1px dashed #ff00042a" : "1px solid #e0e0ea",
            backgroundColor: error ? "#ff00040c" : "#ffffff",
            outline: "none",
            borderRadius: "8px",
            padding: "0px 10px",
            fontSize: "14px",
            color: "#272629",
            height: "32px",
          }}
        />
      )}
      {error && (
        <FormHelperText error sx={{ fontSize: "12px", fontWeight: 500 }}>
          {error}
        </FormHelperText>
      )}
    </Stack>
  );
}
