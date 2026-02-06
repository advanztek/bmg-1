const validateEmail = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return false;
  } else {
    return true;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "-";

  const date = new Date(dateString);

  const datePart = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${datePart} • ${timePart.toLowerCase()}`;
};

// Decode the hashed service ID
const decodeServiceId = (hash) => {
  try {
    if (!hash) return null;

    // URL decode first (handles URL-encoded base64)
    let decodedHash = decodeURIComponent(hash);

    // Replace URL-safe base64 characters if used
    decodedHash = decodedHash.replace(/-/g, "+").replace(/_/g, "/");

    // Decode base64
    const decoded = atob(decodedHash);

    // Extract service ID from format: service_{id}_{timestamp}
    const match = decoded.match(/service_(\d+)_/);
    return match ? match[1] : null;
  } catch (err) {
    console.error("Failed to decode service ID:", err);
    console.error("Hash received:", hash);
  }
};

const fileToBase64 = (file) => {
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const urlToBase64 = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const contentType = response.headers.get("content-type");

    if (!contentType?.startsWith("image/")) {
      throw new Error(`Invalid content-type: ${contentType}`);
    }

    const blob = await response.blob();

    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("urlToBase64 failed:", error.message);
    return null;
  }
};

const encodeServiceId = (id) => {
  try {
    // Create the hash string
    const hashString = `service_${id}_${Date.now() % 10000}`;

    // Base64 encode
    let encoded = btoa(hashString);

    // Make URL-safe by replacing characters
    encoded = encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");

    return encoded;
  } catch (err) {
    console.error("Failed to encode service ID:", err);
    return id; // Fallback to plain ID
  }
};

// Resolve AWS image URLs
const resolveAwsImage = (image) => {
  if (!image) return null;
  if (image.startsWith("http")) return image;
  return `${import.meta.env.VITE_AWS_BUCKET_URL}/${image}`;
};

const truncateText = (text = "", maxLength = 80) => {
  if (!text) return "-";
  return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
};

const getTimeGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 18) {
    return "Good afternoon";
  }

  return "Good evening";
};

const getFormattedDate = () => {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const stripHtml = (html = "") => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const formatGHS = (amount) => {
  return `GHS ${Number(amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-") // spaces & underscores → -
    .replace(/[^\w-]+/g, "") // remove non-word chars
    .replace(/--+/g, "-"); // collapse multiple -
}

function deslugify(slug) {
  return slug
    .toString()
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// Add this function at the top of your component or in a separate utils file
const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      // Keep the full data URL (includes the prefix)
      const dataUrl = reader.result;
      const base64String = dataUrl.split(",")[1];

      resolve({
        base64: base64String,
        dataUrl: dataUrl, // Add this for compatibility with other functions
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
      });
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

export function toTitleCase(text) {
  if (!text) return "";
  if (typeof text !== "string") return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
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

export const formatShortDate = (timestamp) => {
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

export {
  validateEmail,
  validatePassword,
  formatDate,
  fileToBase64,
  urlToBase64,
  truncateText,
  getTimeGreeting,
  getFormattedDate,
  stripHtml,
  decodeServiceId,
  resolveAwsImage,
  encodeServiceId,
  formatGHS,
  slugify,
  deslugify,
  convertFileToBase64,
};
