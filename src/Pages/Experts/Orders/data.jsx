export const headers = [
  { key: "order", label: "Order" },
  { key: "status", label: "Status" },
  { key: "deadline", label: "Deadline" },
  { key: "actions", label: "", width: "40px" },
];

export const statusColors = {
  completed: "success",
  assigned: "info",
  cancelled: "warning",
  rejected: "error",
  accepted: "primary",
};

export const statusLabels = {
  completed: "Completed",
  assigned: "Processing",
  cancelled: "Cancelled",
  rejected: "Rejected",
  accepted: "Accepted",
};
