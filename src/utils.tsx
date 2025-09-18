const formatDateForDisplay = (date: Date | string): string => {
  if (date instanceof Date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  return date; // Return as-is if not a Date object
};
export { formatDateForDisplay };
