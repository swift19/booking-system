export const getTodayString = () => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
};

export const getNextDay = (dateString: string) => {
  if (!dateString) return "";

  const date = new Date(`${dateString}T00:00:00`);
  date.setDate(date.getDate() + 1);

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

export const getMinCheckoutDate = (checkInDate: string, todayString: string) => {
  return checkInDate ? getNextDay(checkInDate) : todayString;
};
