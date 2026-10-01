export const getCurrentMonthDates = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1);
  const fifteenthDay = new Date(year, month, 15);
  const lastDay = new Date(year, month + 1, 0);

  const format = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return {
    first: format(firstDay),
    fifteenth: format(fifteenthDay),
    last: format(lastDay),
  };
};

export const getPrevMonthSixteenthToEnd = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevMonthYear = month === 0 ? year - 1 : year;
  const sixteenth = new Date(prevMonthYear, prevMonth, 16);
  const lastDay = new Date(prevMonthYear, prevMonth + 1, 0);

  const format = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return {
    sixteenth: format(sixteenth),
    last: format(lastDay),
  };
};
