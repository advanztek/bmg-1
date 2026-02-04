import { Button, Stack, Typography } from "@mui/material";
import DatePicker from "./DatePicker";
import { ShieldTaskFilled } from "@fluentui/react-icons";
import Searchbar from "./Searchbar";
import ExpertCard from "./ExpertCard";
import { useAssignOrder } from "../../../../Hooks/Dashboard/orders";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Assign({ experts, orderItemId, orderId, onSuccess }) {
  const { loading, assignOrder } = useAssignOrder();
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [deadline, setDeadline] = useState("");

  async function submitOrderAssignment() {
    if (!deadline || !selectedExpert) {
      toast.info(
        "Ensure you have selected an expert and specified the deadline",
      );
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
      await onSuccess();
    }
  }

  function selectExpert(expert) {
    setSelectedExpert(expert);
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
        <DatePicker value={deadline} onChange={(value) => setDeadline(value)} />
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
      </Stack>
      <Stack alignItems="end">
        <Button
          variant="contained"
          sx={{ borderRadius: "10px" }}
          onClick={submitOrderAssignment}
          loading={loading}
        >
          Assign
        </Button>
      </Stack>
    </Stack>
  );
}
