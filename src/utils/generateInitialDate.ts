export function generateNextDayDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 1);

  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "short" }); // Get month abbreviation
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
