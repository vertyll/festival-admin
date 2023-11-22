export function normalDate(dateString) {
  return new Date(dateString).toLocaleString("pl-PL");
}

export function formatDate(dateString) {
  return dateString ? new Date(dateString).toISOString().split("T")[0] : "";
}
