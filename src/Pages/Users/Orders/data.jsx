export const headers = [
  { key: "select", label: "", width: "40px" },
  { key: "ordernumber", label: "Order Number" },
  { key: "description", label: "Amount" },
  { key: "ordertype", label: "Payment Method" },
  { key: "items", label: "Order Items" },
  { key: "status", label: "Status" },
  { key: "date", label: "Order Date" },
  { key: "actions", label: "", width: "40px" },
];

export const statusColors = {
  pending: "primary",
  completed: "success",
  processing: "info",
};

export const statusLabels = {
  pending: "Pending",
  completed: "Completed",
  processing: "Progress",
};
