export function capitalizeEachWord(text) {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}

export const getOrdinal = (day) => {
  if (day > 3 && day < 21) return "th";

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const formatDate = (timestamp) => {
  if (!timestamp) return "-";

  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return "invalid-date";

  const day = date.getDate();
  const ordinal = getOrdinal(day);

  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";

  hours = hours % 12 || 12;

  const minutesPart =
    minutes === 0 ? "" : `:${minutes.toString().padStart(2, "0")}`;

  return `${day}${ordinal} ${month} ${year} • ${hours}${minutesPart}${ampm}`;
};
