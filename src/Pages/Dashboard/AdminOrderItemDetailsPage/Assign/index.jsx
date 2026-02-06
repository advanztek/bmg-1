import { Button, Stack, Typography, FormHelperText } from "@mui/material";
import DatePicker from "./DatePicker";
import { ShieldTaskFilled } from "@fluentui/react-icons";
import Searchbar from "./Searchbar";
import ExpertCard from "./ExpertCard";
import { useAssignOrder } from "../../../../Hooks/Dashboard/orders";
import { useState } from "react";

export default function Assign({ experts, orderItemId, orderId, onSuccess }) {
  const { loading, assignOrder } = useAssignOrder();
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [deadline, setDeadline] = useState("");
  const [deadlineError, setDeadlineError] = useState("");
  const [expertError, setExpertError] = useState("");

  async function submitOrderAssignment() {
    // Clear previous errors
    setDeadlineError("");
    setExpertError("");

    // Validate inputs
    let hasError = false;

    if (!deadline) {
      setDeadlineError("Please specify a deadline");
      hasError = true;
    }

    if (!selectedExpert) {
      setExpertError("Please select an expert");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const response = await assignOrder({
      expert: selectedExpert?.id,
      order_id: orderId,
      order_item_id: orderItemId,
      deadline: deadline,
    });

    if (response) {
      setSelectedExpert(null);
      setDeadline("");
    }
  }

  function selectExpert(expert) {
    setSelectedExpert(expert);
    setExpertError(""); // Clear error when expert is selected
  }

  function handleDeadlineChange(value) {
    setDeadline(value);
    setDeadlineError(""); // Clear error when deadline is set
  }

  return (
    <Stack
      gap="22px"
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        border: "1px solid rgb(224, 224, 234)",
        padding: { xs: "14px", md: "16px" },
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography fontWeight={700} color="#2C3891" fontSize="18px">
          Assign
        </Typography>
        <ShieldTaskFilled fontSize={30} color="#9f9fad" />
      </Stack>
      <Stack gap="10px">
        <DatePicker
          value={deadline}
          onChange={handleDeadlineChange}
          error={deadlineError}
        />
        <Searchbar />
        {experts &&
          experts?.length > 0 &&
          experts?.map((item, index) => (
            <ExpertCard
              key={index}
              data={item}
              selected={selectedExpert?.id == item?.id}
              onSelect={() => selectExpert(item)}
            />
          ))}
        {expertError && (
          <FormHelperText error sx={{ fontSize: "12px", fontWeight: 500 }}>
            {expertError}
          </FormHelperText>
        )}
      </Stack>
      <Stack alignItems="end">
        <Button
          variant="contained"
          sx={{ borderRadius: "10px" }}
          onClick={submitOrderAssignment}
          disabled={loading}
        >
          {loading ? "Assigning..." : "Assign"}
        </Button>
      </Stack>
    </Stack>
  );
}
