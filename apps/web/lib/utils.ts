function padZero(num: number): string {
  return num < 10 ? `0${num}` : num.toString();
}

export function formatDateToMMDDYYYY(date: Date): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    console.error("Invalid date provided to formatDateToMMDDYYYY:", date);
    return "";
  }
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const formattedMonth = padZero(month);
  const formattedDay = padZero(day);
  return `${formattedMonth}/${formattedDay}/${year}`;
}
