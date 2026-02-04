export const headers = [
  { key: "order", label: "Order" },
  { key: "status", label: "Status" },
  { key: "deadline", label: "Deadline" },
  { key: "actions", label: "", width: "40px" },
];

export const statusColors = {
  completed: "success",
  assigned: "info",
  declined: "error",
  cancelled: "warning",
};

export const statusLabels = {
  completed: "Completed",
  assigned: "Processing",
  declined: "Declined",
  cancelled: "Terminated",
};
